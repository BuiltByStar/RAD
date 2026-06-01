import Link from "next/link";

import { FluidContainer } from "@/components/ui/fluid-container";
import { SenButton } from "@/components/ui/sen-button";
import { discordInviteUrl } from "@/lib/site-data";

export function HomeCommunityBanner() {
  return (
    <section>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-6 border border-neutral-900 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">RAD community</p>
              <h2 className="mt-3 text-3xl font-black uppercase md:text-4xl lg:text-5xl">
                Join the wild side
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-neutral-500 md:text-base">
                Discord is where match nights, roster drops, and supporter gear updates land first — not a generic fan club link.
              </p>
            </div>
            <SenButton href={discordInviteUrl} className="max-w-sm">
              Join Discord
            </SenButton>
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
