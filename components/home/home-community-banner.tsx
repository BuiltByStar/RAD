import Link from "next/link";

import { FluidContainer } from "@/components/ui/fluid-container";
import { cn } from "@/components/ui/cn";
import { discordInviteUrl } from "@/lib/site-data";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.14 96.36"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.58,67.58,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

export function HomeCommunityBanner() {
  return (
    <section>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-10 md:px-6 md:py-14 lg:py-16">
          <div className="border border-neutral-900 px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="min-w-0 max-w-xl lg:max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                  RAD community
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase leading-[1.05] md:mt-3 md:text-4xl lg:text-5xl">
                  Join the wild side
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500 md:mt-4 md:text-base">
                  Discord is where match nights, roster drops, and supporter gear updates land first — not a
                  generic fan club link.
                </p>
              </div>

              <div className="shrink-0 lg:pl-2">
                <Link
                  href={discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "rad-community-discord group inline-flex w-full items-center justify-center gap-2.5",
                    "sm:w-auto"
                  )}
                >
                  <DiscordIcon className="h-5 w-5 shrink-0 opacity-95" />
                  <span>Join Discord</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
