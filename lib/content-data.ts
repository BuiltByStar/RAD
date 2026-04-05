// ─── Content Data (fallback for YouTube API) ───────────────────────────────

export type ContentItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
  type: "video" | "article" | "clip";
  tags: string[];
  featured?: boolean;
};

export const fallbackContent: ContentItem[] = [
  {
    id: "vid-1",
    title: "RAD Esports — World Championship Highlights",
    description:
      "Watch RAD's full tournament run through the Ignite: Mid-Season World Championship. Every round, every clutch, every call.",
    url: "https://www.youtube.com/@RadEsport",
    thumbnail: "/assets/RadPlayerBannerPNG8.png",
    type: "video",
    tags: ["highlights", "tournament", "marvel-rivals"],
    featured: true
  },
  {
    id: "vid-2",
    title: "EMEA Regional Finals — Full Match VOD",
    description:
      "RAD vs the best of EMEA. This is the series that locked the regional title.",
    url: "https://www.youtube.com/@RadEsport",
    thumbnail: "/assets/RadBanner1920_1080.png",
    type: "video",
    tags: ["emea", "vod", "marvel-rivals"]
  },
  {
    id: "vid-3",
    title: "Inside RAD — Team Culture Documentary",
    description:
      "A behind-the-scenes look at how RAD trains, builds, and competes at the highest level.",
    url: "https://www.youtube.com/@RadEsport",
    thumbnail: "/assets/RadBannerNewTest300ppi.png",
    type: "video",
    tags: ["documentary", "behind-the-scenes"]
  },
  {
    id: "vid-4",
    title: "Mash: Captain's Corner Ep. 1",
    description:
      "Team Captain Mash breaks down meta reads, shot calling, and the mindset behind winning.",
    url: "https://www.youtube.com/@RadEsport",
    thumbnail: "/assets/PFP_2048_2048.jpg",
    type: "video",
    tags: ["podcast", "strategy"]
  },
  {
    id: "vid-5",
    title: "RAD Announcement — GoWild Partnership",
    description: "RAD announces its launch-phase activation partnership with GoWild.",
    url: "https://www.youtube.com/@RadEsport",
    thumbnail: "/assets/RadBanner1920_1080.png",
    type: "video",
    tags: ["announcement", "partnership"]
  }
];
