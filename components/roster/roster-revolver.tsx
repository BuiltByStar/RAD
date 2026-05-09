"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [direction, setDirection] = useState<1 | -1>(1);
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
    (index: number, nextDirection?: 1 | -1) => {
      if (!players.length || transitioning) return;
      const target = wrapIndex(index, players.length);
      const rawDelta = target - active;
      const shortestDelta =
        Math.abs(rawDelta) > players.length / 2
          ? rawDelta > 0
            ? rawDelta - players.length
            : rawDelta + players.length
          : rawDelta;

      const resolvedDirection = nextDirection ?? (shortestDelta >= 0 ? 1 : -1);

      setDirection(resolvedDirection);
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

  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || transitioning || players.length < 2) return;

    const interval = window.setInterval(() => {
      setDirection(1);
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
      className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/45 px-3 py-5 shadow-[0_34px_120px_-72px_rgba(220,20,60,0.62)] sm:px-5 sm:py-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Image
        src={assets.bgRed}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.08]"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(68%_60%_at_50%_18%,rgba(220,20,60,0.24),transparent_62%),linear-gradient(90deg,rgba(52,1,6,0.44),transparent_24%,transparent_76%,rgba(220,20,60,0.11))]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:56px_56px]" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dc143c] to-transparent" />
      <span aria-hidden className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span
        aria-hidden
        className="absolute left-1/2 top-[55%] h-px w-[78%] bg-gradient-to-r from-transparent via-[#dc143c]/32 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translate(calc(-50% + ${direction * 10}px), -50%)` }}
      />

      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff6f88]">Player focus</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlayer.slug}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.52, ease: REVOLVER_EASE }}
            >
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.7rem,6vw,6.2rem)] font-extrabold uppercase leading-[0.78] tracking-normal text-white">
                {activePlayer.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                {activePlayer.bio ?? activePlayer.descriptor}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={transitioning}
            className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#dc143c]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c]"
            aria-label="Previous player"
          >
            <span aria-hidden>&larr;</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={transitioning}
            className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#dc143c]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c]"
            aria-label="Next player"
          >
            <span aria-hidden>&rarr;</span>
          </button>
        </div>
      </div>

      <motion.div
        className="relative z-10 mt-7 h-[520px] touch-pan-y overflow-hidden sm:h-[560px] lg:h-[610px]"
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
                "absolute left-1/2 top-2 h-[480px] w-[min(78vw,330px)] origin-center overflow-hidden rounded-[1.1rem] border bg-[#070709] shadow-[0_34px_90px_-52px_rgba(0,0,0,1)] sm:h-[515px] sm:w-[360px] lg:h-[560px] lg:w-[390px]",
                offset === 0 ? "z-30 border-[#dc143c]/42" : "z-10 border-white/10"
              )}
              animate={{
                x:
                  offset === 0
                    ? "calc(-50% + 0%)"
                    : offset === -1
                      ? "calc(-50% - 46%)"
                      : offset === 1
                        ? "calc(-50% + 46%)"
                        : offset === -2
                          ? "calc(-50% - 82%)"
                          : offset === 2
                            ? "calc(-50% + 82%)"
                            : offset < 0
                              ? "calc(-50% - 118%)"
                              : "calc(-50% + 118%)",
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
              style={{
                zIndex:
                  offset === 0
                    ? 40
                    : Math.abs(offset) === 1
                      ? 30
                    : Math.abs(offset) === 2
                      ? 20
                      : 10
              } as CSSProperties}
            >
              <span aria-hidden className="absolute inset-y-0 left-0 z-20 w-px bg-gradient-to-b from-transparent via-[#dc143c] to-transparent opacity-80" />
              <span aria-hidden className="absolute inset-y-0 right-0 z-20 w-px bg-gradient-to-b from-transparent via-white/28 to-transparent" />
              <span aria-hidden className="absolute left-[-30%] top-[18%] z-20 h-16 w-[150%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.34),rgba(255,255,255,0.1),transparent)] opacity-60" />

              <div className="relative h-[66%] overflow-hidden border-b border-white/10 bg-black">
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={`${player.name} profile image`}
                    fill
                    sizes="(max-width: 768px) 78vw, 390px"
                    className="object-cover opacity-90"
                  />
                ) : (
                  <>
                    <Image
                      src={assets.pfpRed}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 78vw, 390px"
                      className="object-cover opacity-25 grayscale"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-[family-name:var(--font-display)] text-[6rem] font-black uppercase leading-none text-white/86 sm:text-[7rem]">
                        {getInitials(player.name)}
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.24)_42%,#050506_100%),radial-gradient(circle_at_50%_12%,rgba(220,20,60,0.34),transparent_46%)]" />

                <div className="absolute left-4 right-4 top-4 flex items-start gap-3">
                  <span className="rounded-md border border-[#dc143c]/38 bg-[#dc143c]/16 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    {player.role}
                  </span>
                </div>
              </div>

              <div className="relative flex h-[34%] flex-col p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6f88]">
                  {player.descriptor}
                </p>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                  {player.name}
                </h4>
                {player.specialties?.length ? (
                  <ChipRow>
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
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:border-[#dc143c]/38 hover:text-white"
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

      <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
        {players.map((player, index) => (
          <button
            key={player.slug}
            type="button"
            onClick={() => {
              const offset = getShortestOffset(index, active, players.length);
              goTo(index, offset >= 0 ? 1 : -1);
            }}
            disabled={transitioning}
            className={cn(
              "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c]",
              index === active ? "w-10 bg-[#dc143c]" : "w-4 bg-white/24 hover:bg-white/52"
            )}
            aria-label={`Show ${player.name}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
