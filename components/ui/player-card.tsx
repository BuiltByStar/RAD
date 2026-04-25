import Image from "next/image";

import { Card, CardBody, CardEyebrow, CardTitle } from "./card";
import { Chip, ChipRow } from "./chip";
import { cn } from "./cn";

type Social = { label: string; href: string };

type PlayerCardProps = {
  name: string;
  role: string;
  image?: string;
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
  image,
  number,
  descriptor,
  bio,
  specialties,
  socials,
  id,
  className
}: PlayerCardProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      tone="default"
      id={id}
      className={cn(
        "flex min-h-[520px] flex-col p-0",
        "transition-transform duration-500 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-[#08080a]">
        {image ? (
          <Image
            src={image}
            alt={`${name} profile image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden">
            <Image
              src="/assets/PFP_2048_2048.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-[0.32] grayscale"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,43,69,0.28),transparent_48%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
            <span className="relative font-[family-name:var(--font-display)] text-[clamp(4rem,8vw,7rem)] font-black uppercase leading-none tracking-[-0.08em] text-white/88 drop-shadow-[0_18px_45px_rgba(255,0,0,0.25)]">
              {initials}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/74 backdrop-blur-md">
            {role}
          </span>
          {typeof number === "number" ? (
            <span
              className="font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none text-white/85"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(number).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <span
          aria-hidden
          className="absolute left-4 top-4 h-2 w-10 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_20px_rgba(255,43,69,0.65)]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <CardEyebrow>{descriptor ?? "RAD Player"}</CardEyebrow>
        </div>

        <div className="mt-3">
          <CardTitle>{name}</CardTitle>
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
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[color:var(--color-rad)]/26 hover:text-white"
              >
                {social.label}
                <span aria-hidden className="text-white/50">↗</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
