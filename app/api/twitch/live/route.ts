import { NextResponse } from "next/server";
import { contentCreators } from "@/lib/creators";

export const dynamic = "force-dynamic";

// ─── In-memory caches ────────────────────────────────────────────────────────
let tokenCache: { token: string; expiresAt: number } | null = null;
let responseCache: { data: unknown; ts: number } | null = null;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

type TwitchStream = {
  user_login: string;
  user_name: string;
  title: string;
  game_name: string;
  viewer_count: number;
  thumbnail_url: string;
  started_at: string;
};

type CreatorStatus = {
  id: string;
  name: string;
  twitchLogin: string;
  role?: string;
  isLive: boolean;
  streamTitle?: string;
  game?: string;
  viewerCount?: number;
  thumbnail?: string;
  startedAt?: string;
};

function offlineCreators(): CreatorStatus[] {
  return contentCreators.map((creator) => ({
    id: creator.id,
    name: creator.name,
    twitchLogin: creator.twitchLogin,
    role: creator.role,
    isLive: false
  }));
}

async function getTwitchToken(): Promise<string | null> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  // Use cached token if still valid
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  try {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials"
      }),
      cache: "no-store"
    });

    if (!res.ok) {
      console.error("Twitch token error:", res.status, await res.text());
      tokenCache = null;
      return null;
    }

    const data = await res.json();
    if (!data.access_token) {
      console.error("Twitch token error: missing access_token");
      tokenCache = null;
      return null;
    }

    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (Math.max(data.expires_in ?? 3600, 120) - 60) * 1000
    };
    return data.access_token;
  } catch (err) {
    console.error("Twitch token error:", err);
    return null;
  }
}

export async function GET() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      creators: offlineCreators(),
      error: "missing_credentials",
      configured: false
    });
  }

  if (contentCreators.length === 0) {
    return NextResponse.json({ creators: [], configured: true });
  }

  // Check cache — only reuse successful Helix payloads
  if (responseCache && Date.now() - responseCache.ts < CACHE_TTL) {
    return NextResponse.json(responseCache.data);
  }

  const token = await getTwitchToken();
  if (!token) {
    return NextResponse.json(
      {
        creators: offlineCreators(),
        error: "token_failed",
        configured: true
      },
      { status: 502 }
    );
  }

  try {
    const logins = contentCreators.map((c) => `user_login=${encodeURIComponent(c.twitchLogin)}`).join("&");
    const res = await fetch(`https://api.twitch.tv/helix/streams?${logins}`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Twitch Helix streams error:", res.status, body);
      // Invalidate token on auth failures so the next request refreshes it
      if (res.status === 401 || res.status === 403) {
        tokenCache = null;
      }
      return NextResponse.json(
        {
          creators: offlineCreators(),
          error: "helix_failed",
          configured: true
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    const liveStreams: TwitchStream[] = Array.isArray(data.data) ? data.data : [];

    const liveMap = new Map<string, TwitchStream>();
    for (const stream of liveStreams) {
      liveMap.set(stream.user_login.toLowerCase(), stream);
    }

    const creators: CreatorStatus[] = contentCreators.map((creator) => {
      const stream = liveMap.get(creator.twitchLogin.toLowerCase());
      return {
        id: creator.id,
        name: creator.name,
        twitchLogin: creator.twitchLogin,
        role: creator.role,
        isLive: !!stream,
        streamTitle: stream?.title,
        game: stream?.game_name,
        viewerCount: stream?.viewer_count,
        thumbnail: stream
          ? stream.thumbnail_url.replace("{width}", "440").replace("{height}", "248")
          : undefined,
        startedAt: stream?.started_at
      };
    });

    // Sort: live creators first
    creators.sort((a, b) => Number(b.isLive) - Number(a.isLive));

    const result = { creators, configured: true };
    responseCache = { data: result, ts: Date.now() };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Twitch API error:", err);
    return NextResponse.json(
      {
        creators: offlineCreators(),
        error: "twitch_unavailable",
        configured: true
      },
      { status: 500 }
    );
  }
}
