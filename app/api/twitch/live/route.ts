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

    const data = await res.json();
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000
    };
    return data.access_token;
  } catch (err) {
    console.error("Twitch token error:", err);
    return null;
  }
}

export async function GET() {
  const clientId = process.env.TWITCH_CLIENT_ID;

  if (!clientId || contentCreators.length === 0) {
    return NextResponse.json({ creators: [] });
  }

  // Check cache
  if (responseCache && Date.now() - responseCache.ts < CACHE_TTL) {
    return NextResponse.json(responseCache.data);
  }

  const token = await getTwitchToken();
  if (!token) {
    return NextResponse.json({ creators: [] });
  }

  try {
    const logins = contentCreators.map((c) => `user_login=${c.twitchLogin}`).join("&");
    const res = await fetch(
      `https://api.twitch.tv/helix/streams?${logins}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${token}`
        },
        cache: "no-store"
      }
    );

    const data = await res.json();
    const liveStreams: TwitchStream[] = data.data || [];

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
          ? stream.thumbnail_url
              .replace("{width}", "440")
              .replace("{height}", "248")
          : undefined,
        startedAt: stream?.started_at
      };
    });

    // Sort: live creators first
    creators.sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));

    const result = { creators };
    responseCache = { data: result, ts: Date.now() };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Twitch API error:", err);
    return NextResponse.json({ creators: [] }, { status: 500 });
  }
}
