"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { RosterGameBrand } from "@/components/roster/roster-game-brand";
import { assets } from "@/lib/assets";
import { inferSocialPlatform, type Person } from "@/lib/site-data";

type RosterRevolverProps = {
  players: Person[];
  game?: string;
  teamStatus?: string;
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

export function RosterRevolver({ players, game, teamStatus }: RosterRevolverProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedBioSlug, setExpandedBioSlug] = useState<string | null>(null);
  const releaseTimerRef = useRef<number | null>(null);
  const hashHandledRef = useRef(false);

  const activePlayer = players[active];
  const stagedPlayers = useMemo(() => {
    if (!players.length) return [];

    return players
      .map((player, index) => ({
        player,
        index,
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
    [players.length, reduced, transitioning]
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    setExpandedBioSlug(null);
  }, [active]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || hashHandledRef.current || !players.length) return;

    const slug = window.location.hash.replace(/^#/, "");
    if (!slug) return;

    const index = players.findIndex((player) => player.slug === slug);
    if (index >= 0) {
      hashHandledRef.current = true;
      setActive(index);
    }
  }, [mounted, players]);

  useEffect(() => {
    if (!mounted || !activePlayer) return;
    window.history.replaceState(null, "", `#${activePlayer.slug}`);
  }, [activePlayer, mounted]);

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  if (!players.length || !activePlayer) return null;

  const showProgress = !reduced && !paused && !transitioning && players.length > 1;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.08 }}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 top-16 bottom-24 -z-10 overflow-hidden"
      >
        <motion.div
          animate={reduced ? undefined : { opacity: [0.35, 0.55, 0.35], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[min(520px,70vw)] w-[min(520px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,6,47,0.14),transparent_68%)]"
        />
      </div>

      <div className="mb-6 border-b border-neutral-900 pb-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlayer.slug}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: 12 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                  {String(active + 1).padStart(2, "0")} / {String(players.length).padStart(2, "0")}
                </p>
                <p className="mt-1 truncate font-[family-name:var(--font-display)] text-xl font-extrabold uppercase text-white sm:text-2xl">
                  {activePlayer.name}
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
                  {activePlayer.role}
                </p>
              </motion.div>
            </AnimatePresence>
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

        <div className="relative h-px overflow-hidden bg-neutral-900">
          <AnimatePresence mode="wait">
            {showProgress ? (
              <motion.div
                key={`progress-${active}`}
                className="absolute inset-y-0 left-0 bg-[var(--color-blood)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: AUTO_DELAY_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {game && teamStatus ? (
        <RosterGameBrand game={game} status={teamStatus} />
      ) : null}

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
          {stagedPlayers.map(({ player, index, offset }) => (
            <motion.article
              key={player.slug}
              role={offset !== 0 ? "button" : undefined}
              tabIndex={offset !== 0 && !transitioning ? 0 : undefined}
              aria-label={offset !== 0 ? `Show ${player.name}` : undefined}
              onClick={
                offset !== 0 && !transitioning
                  ? () => {
                      goTo(index);
                    }
                  : undefined
              }
              onKeyDown={
                offset !== 0 && !transitioning
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        goTo(index);
                      }
                    }
                  : undefined
              }
              className={cn(
                "absolute top-2 h-[480px] origin-center overflow-hidden border bg-[#070709] shadow-[0_24px_64px_-48px_rgba(0,0,0,1)] sm:h-[515px] lg:h-[560px]",
                offset === 0
                  ? "z-30 border-[var(--color-blood)] pointer-events-none"
                  : "z-10 cursor-pointer border-neutral-800 pointer-events-auto transition-[border-color] duration-300 hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]"
              )}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                      scale: 0.92
                    }
              }
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
              {offset === 0 && expandedBioSlug === player.slug && player.bio ? (
                <motion.div
                  className="pointer-events-auto absolute inset-0 z-50 flex flex-col bg-[#070709]/96 p-5 backdrop-blur-md sm:p-6"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-neutral-900 pb-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">
                        Player info
                      </p>
                      <h4 className="mt-2 truncate font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                        {player.name}
                      </h4>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                        {player.role}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpandedBioSlug(null);
                      }}
                      className="grid h-10 w-10 shrink-0 place-items-center border border-neutral-800 bg-black text-neutral-400 transition-colors hover:border-[var(--color-blood)] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]"
                      aria-label={`Close ${player.name} info`}
                    >
                      <span aria-hidden>x</span>
                    </button>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto py-5 pr-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-700">
                    <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                      {player.bio}
                    </p>
                    {player.specialties?.length ? (
                      <div className="mt-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                          Specialties
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {player.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="border border-neutral-800 bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setExpandedBioSlug(null);
                    }}
                    className="mt-auto border border-[var(--color-blood)]/45 bg-[var(--color-blood)]/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-blood)]/18 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]"
                  >
                    Back to card
                  </button>
                </motion.div>
              ) : null}

              {offset === 0 ? (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(229,6,47,0.9),transparent)]"
                  animate={reduced ? undefined : { opacity: [0.4, 1, 0.4], x: ["-100%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}

              <div className="relative h-[66%] overflow-hidden border-b border-neutral-900 bg-black">
                <motion.div
                  className="absolute inset-0"
                  animate={
                    offset === 0 && !reduced
                      ? { scale: [1, 1.06] }
                      : { scale: 1 }
                  }
                  transition={
                    offset === 0 && !reduced
                      ? { duration: 8, ease: "linear", repeat: Infinity, repeatType: "mirror" }
                      : { duration: 0.4 }
                  }
                >
                  {player.image ? (
                    <Image
                      src={player.image}
                      alt={`${player.name} profile image`}
                      fill
                      sizes="(max-width: 768px) 78vw, 390px"
                      className="object-cover"
                      priority={offset === 0}
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
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                  <span className="inline-block border border-neutral-800 bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300">
                    {player.role}
                  </span>
                  {player.number ? (
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tabular-nums leading-none text-white/20">
                      {String(player.number).padStart(2, "0")}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="relative flex h-[34%] flex-col p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  {player.descriptor}
                </p>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {player.name}
                </h4>
                {player.rank ? (
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]">
                    {player.rank}
                  </p>
                ) : null}
                {player.bio ? (
                  <div className="mt-2">
                    <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                      {player.bio}
                    </p>
                    {offset === 0 ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpandedBioSlug(player.slug);
                        }}
                        className="pointer-events-auto mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]"
                        aria-label={`View more info about ${player.name}`}
                      >
                        View more info
                      </button>
                    ) : null}
                  </div>
                ) : null}
                {player.socials?.length ? (
                  <div className="pointer-events-auto mt-auto flex flex-wrap items-center gap-1 pt-4">
                    {player.socials.map((social) => {
                      const platform = social.platform ?? inferSocialPlatform(social.label, social.href);
                      return (
                        <SocialIconLink
                          key={`${social.label}-${social.href}`}
                          href={social.href}
                          platform={platform}
                          label={social.label}
                          ariaLabel={`${player.name} on ${social.label}`}
                          sizeClass="h-8 w-8"
                          iconClass="h-4 w-4"
                          onClick={(event) => event.stopPropagation()}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-800">
          <div className="mx-auto w-fit max-w-full px-1">
            <div
              className={cn(
                "relative flex gap-px overflow-hidden border border-neutral-800/90 bg-neutral-900",
                "shadow-[0_0_48px_-16px_rgba(229,6,47,0.18)]",
                "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px",
                "before:bg-[linear-gradient(90deg,transparent,rgba(229,6,47,0.45),transparent)]"
              )}
            >
              {players.map((player, index) => {
                const isActive = index === active;

                return (
                  <motion.button
                    key={player.slug}
                    type="button"
                    onClick={() => goTo(index)}
                    disabled={transitioning}
                    whileHover={
                      reduced || transitioning ? undefined : { y: -3, transition: { duration: 0.2 } }
                    }
                    whileTap={reduced || transitioning ? undefined : { scale: 0.97 }}
                    className={cn(
                      "group relative flex w-[5rem] shrink-0 flex-col items-center gap-2.5 px-3 py-3.5 transition-[background-color,box-shadow] duration-300",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)] sm:w-[5.25rem]",
                      isActive
                        ? "bg-neutral-950 shadow-[inset_0_0_28px_rgba(229,6,47,0.1)]"
                        : "bg-black hover:bg-neutral-950/90"
                    )}
                    aria-label={`Show ${player.name}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="roster-player-indicator"
                        className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,rgba(229,6,47,0.35),var(--color-blood),rgba(229,6,47,0.35))] shadow-[0_0_14px_rgba(229,6,47,0.9)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.75 }}
                      />
                    ) : null}

                    <motion.div
                      className={cn(
                        "relative overflow-hidden border bg-black transition-[border-color,box-shadow] duration-300",
                        isActive
                          ? "h-12 w-12 border-[var(--color-blood)] shadow-[0_0_22px_rgba(229,6,47,0.4)] sm:h-[3.25rem] sm:w-[3.25rem]"
                          : "h-10 w-10 border-neutral-800 group-hover:border-neutral-600 group-hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.95)] sm:h-11 sm:w-11"
                      )}
                      animate={reduced ? undefined : { scale: isActive ? 1.06 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt=""
                          fill
                          sizes="52px"
                          className={cn(
                            "object-cover transition duration-300",
                            isActive ? "opacity-100" : "opacity-65 group-hover:opacity-90"
                          )}
                        />
                      ) : (
                        <span
                          className={cn(
                            "grid h-full place-items-center font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight",
                            isActive
                              ? "bg-[linear-gradient(165deg,rgba(229,6,47,0.32)_0%,#12080c_55%,#070709_100%)] text-sm text-white shadow-[inset_0_0_20px_rgba(229,6,47,0.15)]"
                              : "bg-[linear-gradient(165deg,#222228_0%,#0d0d10_100%)] text-xs text-white/60 group-hover:text-white/85"
                          )}
                        >
                          {getInitials(player.name)}
                        </span>
                      )}
                    </motion.div>

                    <span
                      className={cn(
                        "max-w-full truncate text-[9px] font-bold uppercase tracking-[0.12em] transition-colors duration-300",
                        isActive
                          ? "text-white drop-shadow-[0_0_8px_rgba(229,6,47,0.35)]"
                          : "text-neutral-600 group-hover:text-neutral-400"
                      )}
                    >
                      {player.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
          <span className="text-neutral-700">Drag, tap adjacent cards, arrow keys, or pick a player below</span>
        </p>
      </div>
    </motion.div>
  );
}
