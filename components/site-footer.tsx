import Image from "next/image";
import Link from "next/link";

import { assets } from "@/lib/assets";
import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="rad-dot-surface relative mt-0 overflow-hidden border-t border-white/10 bg-[#040404]">
      <Image
        src={assets.bgRed}
        alt=""
        fill
        sizes="100vw"
        className="z-0 object-cover opacity-[0.08]"
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-8 pt-12 sm:px-8 lg:px-12 lg:pt-14">
        <div className="relative overflow-hidden border border-white/10 bg-black/55 px-6 py-7 sm:px-8 sm:py-9 rad-cut-lg">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.75fr_0.75fr]">
            <div className="relative z-10 max-w-xl">
              <Image
                src={assets.wordmark}
                alt="RAD Esports"
                width={505}
                height={129}
                className="h-auto w-[180px] sm:w-[220px]"
              />
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/66 sm:text-base">
                Built around players. Remembered through history. Welcome to the wild.
              </p>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">Navigate</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)]/75" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">Connect</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/24" />
                    {channel.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-white/8 pt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>(c) {new Date().getFullYear()} RAD Esports</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
            <span>Competition, content, and partner work.</span>
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
