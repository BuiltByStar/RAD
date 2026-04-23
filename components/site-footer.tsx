import Image from "next/image";
import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="relative mt-0 border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_320px_at_15%_0%,rgba(255,43,69,0.14),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-8 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),rgba(5,5,5,0.82)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 [clip-path:polygon(0_0,calc(100%-22px)_0,100%_22px,100%_100%,22px_100%,0_calc(100%-22px))]">
          <p className="pointer-events-none absolute right-6 top-4 font-[family-name:var(--font-display)] text-[clamp(4rem,14vw,11rem)] uppercase leading-none tracking-[-0.05em] text-white/[0.04] sm:right-8 lg:right-10">
            RAD
          </p>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.75fr_0.75fr]">
            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
                RAD Esports
              </p>
              <Image
                src="/assets/RadNewLogoWordmarkRed.png"
                alt="RAD Esports"
                width={220}
                height={60}
                className="mt-4 h-auto w-[200px] sm:w-[220px]"
              />
              <p className="mt-5 text-sm leading-relaxed text-white/62 sm:text-base">
                Competitive pedigree, scalable branding, and a digital presence built to carry RAD across new titles, media, and activations without losing its edge.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%,0_0)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_10px_rgba(255,43,69,0.75)]" />
                Built for pressure
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Navigate</p>
              <div className="mt-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    <span className="inline-block h-px w-4 bg-[color:var(--color-rad)]/65" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Connect</p>
              <div className="mt-5 flex flex-col gap-3">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    <span className="inline-block h-px w-4 bg-white/20" />
                    {channel.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>© {new Date().getFullYear()} RAD Esports</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
            <span>Built for pressure, content, and the next stage of competition.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/52">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
