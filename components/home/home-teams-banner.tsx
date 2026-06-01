import Image from "next/image";

import { FluidContainer } from "@/components/ui/fluid-container";
import { SenButton } from "@/components/ui/sen-button";
import { assets } from "@/lib/assets";
import { teams } from "@/lib/site-data";

export function HomeTeamsBanner() {
  const team = teams[0];

  return (
    <section className="overflow-hidden">
      <FluidContainer>
        <div className="relative border-x border-neutral-900">
          <div className="relative min-h-[320px] md:min-h-[420px]">
            <Image src={assets.goWild} alt="" fill sizes="100vw" className="object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
            <div className="rad-border-trace relative m-4 flex min-h-[280px] flex-col justify-end border border-neutral-900 p-6 md:m-6 md:min-h-[360px] md:p-14">
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                #GoWild · Where we compete
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black uppercase md:text-5xl lg:text-6xl">
                Meet the roster
              </h2>
              <p className="mt-4 max-w-xl text-sm text-neutral-400 md:text-base">{team.description}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500">{team.status}</p>
              <div className="mt-8">
                <SenButton href="/roster">View roster</SenButton>
              </div>
            </div>
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
