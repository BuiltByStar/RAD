import Link from "next/link";
import type { Person } from "@/lib/site-data";

export function RosterCard({ person, index }: { person: Person; index: number }) {
  const num = person.number ?? index + 1;

  return (
    <Link href={`/roster/${person.slug}`} className="at-roster-card at-glass at-hud-border">
      <div className="at-roster-card-top">
        <span className="at-roster-card-role">{person.role}</span>
        <span className="at-roster-card-num">#{String(num).padStart(2, "0")}</span>
      </div>
      <div className="at-roster-card-body">
        <h3 className="at-roster-card-name">{person.name}</h3>
        {person.realName && (
          <p className="at-roster-card-realname">{person.realName}</p>
        )}
        <p className="at-roster-card-rank">{person.rank || person.descriptor}</p>
      </div>
      {person.tags && person.tags.length > 0 && (
        <div className="at-roster-card-tags">
          {person.tags.map((tag) => (
            <span key={tag} className="at-roster-card-tag">{tag}</span>
          ))}
        </div>
      )}
      <div className="at-roster-card-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
