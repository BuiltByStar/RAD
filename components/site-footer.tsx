import Image from "next/image";
import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-0 bg-[#151f21] text-white">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-14 sm:px-8 lg:grid-cols-3 lg:px-12">
        <div>
          <Image src="/assets/RadNewLogoWordmarkWhite.png" alt="RAD Esports" width={180} height={46} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/68">
            Built for pressure, made for modern competition, and designed to scale across roster, content, and
            partnerships.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Navigate</p>
          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Connect</p>
          <div className="mt-4 grid gap-2">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {channel.value}
              </a>
            ))}
          </div>
          <form className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="h-10 w-full rounded-md border border-white/15 bg-white/10 px-3 text-sm text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 rounded-md bg-white px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#151f21]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-6 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} RAD Esports</p>
          <div className="flex items-center gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
