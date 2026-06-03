import { FluidContainer } from "@/components/ui/fluid-container";
import { SocialIcon } from "@/components/icons/social-icons";
import { orgSocialChannels } from "@/lib/site-data";

export function HomeSocialsSection() {
  return (
    <section>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-12 md:px-6 md:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">Stay connected</p>
              <h2 className="mt-2 text-2xl font-black uppercase md:text-3xl">View our socials</h2>
            </div>
            <p className="max-w-md text-sm text-neutral-500">
              Match drops, roster news, and behind-the-scenes content — follow RAD wherever you scroll.
            </p>
          </div>

          <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
            {orgSocialChannels.map((channel, index) => (
              <a
                key={channel.platform}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[168px] flex-col justify-between overflow-hidden bg-black p-6 transition-colors duration-300 hover:bg-neutral-950 sm:min-h-[192px] lg:min-h-[220px]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 0% 100%, rgba(229,6,47,0.12), transparent 55%), radial-gradient(80% 60% at 100% 0%, rgba(229,6,47,0.08), transparent 50%)"
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-[var(--color-blood)] transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-600 transition-colors group-hover:text-neutral-400">
                    0{index + 1}
                  </span>
                  <span className="rounded-full border border-neutral-800 bg-neutral-950/80 p-3 text-neutral-400 transition-all duration-300 group-hover:border-[var(--color-blood)]/40 group-hover:text-[var(--color-blood)] group-hover:shadow-[0_0_24px_rgba(229,6,47,0.18)]">
                    <SocialIcon platform={channel.platform} className="h-7 w-7" />
                  </span>
                </div>

                <div className="relative mt-8">
                  <p className="text-lg font-black uppercase tracking-wide text-white transition-colors group-hover:text-[var(--color-blood)]">
                    {channel.label}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500 transition-colors group-hover:text-neutral-400">
                    {channel.handle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 transition-colors group-hover:text-white">
                    Follow
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-blood)]"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
