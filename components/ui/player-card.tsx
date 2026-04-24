import { Card, CardBody, CardEyebrow, CardTitle } from "./card";
import { Chip, ChipRow } from "./chip";
import { cn } from "./cn";

type Social = { label: string; href: string };

type PlayerCardProps = {
  name: string;
  role: string;
  number?: number;
  descriptor?: string;
  bio?: string;
  specialties?: string[];
  socials?: Social[];
  id?: string;
  className?: string;
};

export function PlayerCard({
  name,
  role,
  number,
  descriptor,
  bio,
  specialties,
  socials,
  id,
  className
}: PlayerCardProps) {
  return (
    <Card tone="default" id={id} className={cn("flex flex-col", className)}>
      <div className="flex items-start justify-between gap-3">
        <CardEyebrow>{role}</CardEyebrow>
        {typeof number === "number" ? (
          <span
            className="font-[family-name:var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            #{String(number).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <CardTitle>{name}</CardTitle>
        {descriptor ? (
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)]/90">
            {descriptor}
          </p>
        ) : null}
        {bio ? <CardBody>{bio}</CardBody> : null}
      </div>

      {specialties?.length ? (
        <ChipRow>
          {specialties.slice(0, 3).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </ChipRow>
      ) : null}

      {socials?.length ? (
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-[color:var(--color-rad)]/26 hover:text-white [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]"
            >
              {social.label}
              <span aria-hidden className="text-white/50">↗</span>
            </a>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
