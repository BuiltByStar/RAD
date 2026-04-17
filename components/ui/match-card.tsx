import { Badge } from "./badge";
import { cn } from "./cn";

type Team = { name: string; logo?: string; score?: number | string };

export type MatchStatus = "upcoming" | "live" | "final";

type MatchCardProps = {
  status: MatchStatus;
  competition: string;
  stage?: string;
  dateLabel?: string;
  home: Team;
  away: Team;
  note?: string;
  href?: string;
  className?: string;
};

const statusMeta: Record<MatchStatus, { label: string; tone: "neutral" | "rad" | "live" }> = {
  upcoming: { label: "Upcoming", tone: "rad" },
  live: { label: "Live now", tone: "live" },
  final: { label: "Final", tone: "neutral" }
};

export function MatchCard({
  status,
  competition,
  stage,
  dateLabel,
  home,
  away,
  note,
  href,
  className
}: MatchCardProps) {
  const meta = statusMeta[status];

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.04] to-white/[0.01] p-5 backdrop-blur",
        "transition duration-300 ease-[var(--ease-emphasis)] hover:border-white/20 hover:from-white/[.06]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge tone={meta.tone}>{meta.label}</Badge>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {competition}
          </span>
        </div>
        {dateLabel ? (
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            {dateLabel}
          </span>
        ) : null}
      </div>

      {stage ? <p className="mt-1 text-xs text-white/50">{stage}</p> : null}

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamBlock team={home} align="left" />
        <span className="font-[family-name:var(--font-display)] text-2xl text-white/50">VS</span>
        <TeamBlock team={away} align="right" />
      </div>

      {note ? (
        <p className="mt-5 border-t border-white/5 pt-4 text-xs text-white/50">{note}</p>
      ) : null}
    </div>
  );

  if (!href) return content;

  const isExternal = /^https?:\/\//.test(href);
  return isExternal ? (
    <a href={href} target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] rounded-2xl">
      {content}
    </a>
  ) : (
    <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] rounded-2xl">
      {content}
    </a>
  );
}

function TeamBlock({ team, align }: { team: Team; align: "left" | "right" }) {
  return (
    <div className={cn("flex items-center gap-3", align === "right" ? "justify-end text-right" : "justify-start")}>
      {align === "left" && team.logo ? <TeamLogo src={team.logo} alt={team.name} /> : null}
      <div className="flex flex-col">
        <span className="font-[family-name:var(--font-display)] text-lg leading-none tracking-tight">
          {team.name}
        </span>
        {team.score !== undefined ? (
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
            {team.score}
          </span>
        ) : null}
      </div>
      {align === "right" && team.logo ? <TeamLogo src={team.logo} alt={team.name} /> : null}
    </div>
  );
}

function TeamLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-contain p-1" loading="lazy" />
    </span>
  );
}
