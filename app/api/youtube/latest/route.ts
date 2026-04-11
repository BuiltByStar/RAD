import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── In-memory cache ─────────────────────────────────────────────────────────
let cache: { data: unknown; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type YouTubeVideo = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  durationSeconds: number;
};

function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: "YouTube API not configured", latestVideo: null, recentVideos: [] },
      { status: 200 }
    );
  }

  // Check cache
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const requestOptions = {
      cache: "no-store" as const,
      signal: AbortSignal.timeout(8000)
    };

    // Step 1: Get channel's uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      requestOptions
    );
    if (!channelRes.ok) {
      throw new Error(`YouTube channel lookup failed with ${channelRes.status}`);
    }
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return NextResponse.json({
        error: "Could not find uploads playlist",
        latestVideo: null,
        recentVideos: []
      });
    }

    // Step 2: Get recent uploads (max 20)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${apiKey}`,
      requestOptions
    );
    if (!playlistRes.ok) {
      throw new Error(`YouTube playlist lookup failed with ${playlistRes.status}`);
    }
    const playlistData = await playlistRes.json();
    const items = playlistData.items || [];

    if (items.length === 0) {
      return NextResponse.json({ latestVideo: null, recentVideos: [] });
    }

    // Step 3: Get video durations
    const videoIds = items
      .map((item: { snippet: { resourceId: { videoId: string } } }) => item.snippet.resourceId.videoId)
      .join(",");

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`,
      requestOptions
    );
    if (!videosRes.ok) {
      throw new Error(`YouTube video lookup failed with ${videosRes.status}`);
    }
    const videosData = await videosRes.json();

    // Step 4: Filter out Shorts (< 60 seconds)
    const longFormVideos: YouTubeVideo[] = (videosData.items || [])
      .map((video: {
        id: string;
        snippet: { title: string; description: string; thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } }; publishedAt: string };
        contentDetails: { duration: string };
      }) => {
        const durationSeconds = parseDuration(video.contentDetails.duration);
        return {
          videoId: video.id,
          title: video.snippet.title,
          description: video.snippet.description?.slice(0, 200) || "",
          thumbnail:
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url ||
            video.snippet.thumbnails?.default?.url ||
            "",
          publishedAt: video.snippet.publishedAt,
          duration: video.contentDetails.duration,
          durationSeconds
        };
      })
      .filter((v: YouTubeVideo) => v.durationSeconds >= 60);

    const latestVideo = longFormVideos[0] || null;
    const recentVideos = longFormVideos.slice(1);

    const result = { latestVideo, recentVideos };
    cache = { data: result, ts: Date.now() };

    return NextResponse.json(result);
  } catch (err) {
    console.error("YouTube API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data", latestVideo: null, recentVideos: [] },
      { status: 500 }
    );
  }
}
