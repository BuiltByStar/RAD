"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { Chip, ChipRow, cn } from "@/components/ui";
import { assets } from "@/lib/assets";
import type { Person } from "@/lib/site-data";

type RosterRevolverProps = {
  players: Person[];
};

const AUTO_DELAY_MS = 10000;
const DRAG_THRESHOLD = 72;
const REVOLVER_EASE = [0.22, 1, 0.36, 1] as const;
const TRANSITION_MS = 920;
const STAGE_DEPTH = 4;

const controlButtonClass =
  "flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-800 bg-black text-neutral-400 transition-colors hover:border-[var(--color-blood)] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)] disabled:pointer-events-none disabled:opacity-30";

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getShortestOffset(index: number, active: number, length: number) {
  let offset = index - active;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function RosterRevolver({ players }: RosterRevolverProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const releaseTimerRef = useRef<number | null>(null);

  const activePlayer = players[active];
  const stagedPlayers = useMemo(() => {
    if (!players.length) return [];

    return players
      .map((player, index) => ({
        player,
        offset: getShortestOffset(index, active, players.length)
      }))
      .filter(({ offset }) => Math.abs(offset) <= STAGE_DEPTH);
  }, [active, players]);

  const goTo = useCallback(
    (index: number) => {
      if (!players.length || transitioning) return;
      setTransitioning(true);
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
      setActive(wrapIndex(index, players.length));
      if (!reduced) {
        releaseTimerRef.current = window.setTimeout(() => {
          setTransitioning(false);
          releaseTimerRef.current = null;
        }, TRANSITION_MS);
      } else {
        setTransitioning(false);
      }
    },
    [active, players.length, reduced, transitioning]
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || transitioning || players.length < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, players.length));
      setTransitioning(true);
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
      releaseTimerRef.current = window.setTimeout(() => {
        setTransitioning(false);
        releaseTimerRef.current = null;
      }, TRANSITION_MS);
    }, AUTO_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [paused, players.length, reduced, transitioning]);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  if (!players.length || !activePlayer) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-neutral-900 pb-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500">
            {String(active + 1).padStart(2, "0")} / {String(players.length).padStart(2, "0")}
          </p>
          <p className="mt-1 truncate font-[family-name:var(--font-display)] text-xl font-extrabold uppercase text-white sm:text-2xl">
            {activePlayer.name}
          </p>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
            {activePlayer.role}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={transitioning}
            className={controlButtonClass}
            aria-label="Previous player"
          >
            <span aria-hidden className="text-lg leading-none">
              &larr;
            </span>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={transitioning}
            className={controlButtonClass}
            aria-label="Next player"
          >
            <span aria-hidden className="text-lg leading-none">
              &rarr;
            </span>
          </button>
        </div>
      </div>

      <motion.div
        className="relative h-[520px] touch-pan-y overflow-hidden sm:h-[560px] lg:h-[610px]"
        drag={players.length > 1 && !transitioning ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setPaused(true)}
        onDragEnd={(_, info) => {
          setPaused(false);
          if (info.offset.x <= -DRAG_THRESHOLD) goNext();
          if (info.offset.x >= DRAG_THRESHOLD) goPrev();
        }}
      >
        <div className="absolute inset-0 [perspective:1300px]">
          {stagedPlayers.map(({ player, offset }) => (
            <motion.article
              key={player.slug}
              className={cn(
                "absolute top-2 h-[480px] origin-center overflow-hidden border bg-[#070709] shadow-[0_24px_64px_-48px_rgba(0,0,0,1)] sm:h-[515px] lg:h-[560px]",
                offset === 0
                  ? "z-30 border-[var(--color-blood)]"
                  : "z-10 border-neutral-800"
              )}
              animate={{
                x:
                  offset === 0
                    ? 0
                    : offset === -1
                      ? -180
                      : offset === 1
                        ? 180
                        : offset === -2
                          ? -320
                          : offset === 2
                            ? 320
                            : offset < 0
                              ? -440
                              : 440,
                y:
                  offset === 0
                    ? 0
                    : Math.abs(offset) === 1
                      ? 26
                      : Math.abs(offset) === 2
                        ? 48
                        : 68,
                rotateY:
                  offset === 0
                    ? 0
                    : Math.abs(offset) === 1
                      ? offset * -16
                      : Math.abs(offset) === 2
                        ? offset * -22
                        : offset * -28,
                rotateZ: offset === 0 ? 0 : Math.sign(offset) * -0.8,
                scale:
                  offset === 0
                    ? 1
                    : Math.abs(offset) === 1
                      ? 0.9
                      : Math.abs(offset) === 2
                        ? 0.78
                        : 0.62,
                opacity:
                  offset === 0
                    ? 1
                    : Math.abs(offset) === 1
                      ? 0.84
                      : Math.abs(offset) === 2
                        ? 0.42
                        : 0.08,
                filter:
                  offset === 0
                    ? "brightness(1)"
                    : Math.abs(offset) === 1
                      ? "brightness(0.82)"
                      : "brightness(0.65)"
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: transitioning ? TRANSITION_MS / 1000 : 1.08,
                      ease: REVOLVER_EASE
                    }
              }
              style={
                {
                  left: "calc((100% - min(calc(100% - 3rem), clamp(260px, 54vw, 370px))) / 2)",
                  width: "min(calc(100% - 3rem), clamp(260px, 54vw, 370px))",
                  zIndex:
                    offset === 0
                      ? 40
                      : Math.abs(offset) === 1
                        ? 30
                        : Math.abs(offset) === 2
                          ? 20
                          : 10
                } as CSSProperties
              }
            >
              <div className="relative h-[66%] overflow-hidden border-b border-neutral-900 bg-black">
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={`${player.name} profile image`}
                    fill
                    sizes="(max-width: 768px) 78vw, 390px"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={assets.pfpRed}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 78vw, 390px"
                      className="object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-[family-name:var(--font-display)] text-[6rem] font-black uppercase leading-none text-white/80 sm:text-[7rem]">
                        {getInitials(player.name)}
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent" />

                <div className="absolute left-4 right-4 top-4">
                  <span className="inline-block border border-neutral-800 bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300">
                    {player.role}
                  </span>
                </div>
              </div>

              <div className="relative flex h-[34%] flex-col p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  {player.descriptor}
                </p>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {player.name}
                </h4>
                {player.bio ? (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                    {player.bio}
                  </p>
                ) : null}
                {player.specialties?.length ? (
                  <ChipRow className="mt-3">
                    {player.specialties.slice(0, 3).map((specialty) => (
                      <Chip key={specialty}>{specialty}</Chip>
                    ))}
                  </ChipRow>
                ) : null}
                {player.socials?.length ? (
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {player.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-neutral-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 transition hover:border-[var(--color-blood)] hover:text-white"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {players.map((player, index) => (
          <button
            key={player.slug}
            type="button"
            onClick={() => goTo(index)}
            disabled={transitioning}
            className={cn(
              "h-1 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]",
              index === active ? "w-8 bg-[var(--color-blood)]" : "w-4 bg-neutral-800 hover:bg-neutral-600"
            )}
            aria-label={`Show ${player.name}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
