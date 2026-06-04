import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/icons/social-icons";
import { FluidContainer } from "@/components/ui/fluid-container";
import { assets } from "@/lib/assets";
import { orgSocialChannels } from "@/lib/site-data";

type FooterLinkProps = { href: string; label: string; external?: boolean };

function FooterLink({ href, label, external }: FooterLinkProps) {
  const className =
    "group flex items-center gap-2 text-neutral-500 transition-colors hover:text-white";

  const inner = (
    <>
      <span>{label}</span>
      <span
        aria-hidden
        className="-translate-x-2 text-[var(--color-blood)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black">
      <FluidContainer>
        <div className="grid h-auto min-h-[300px] grid-cols-12 gap-6 border-x border-t border-neutral-900 px-4 py-8 md:px-6 md:py-14">
          <div className="order-2 col-span-12 flex flex-col gap-4 md:order-1 md:col-span-4">
            <Link href="/">
              <Image src={assets.logoMark} alt="RAD Esports" width={48} height={48} className="h-10 w-10" />
            </Link>
            <p className="text-sm text-neutral-500">© {new Date().getFullYear()} RAD Esports. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-2">
              {orgSocialChannels.map((channel) => (
                <a
                  key={channel.platform}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow RAD on ${channel.label}`}
                  title={channel.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-500 transition-all hover:border-[var(--color-blood)]/50 hover:text-[var(--color-blood)] hover:shadow-[0_0_16px_rgba(229,6,47,0.15)]"
                >
                  <SocialIcon platform={channel.platform} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 col-span-12 grid grid-cols-2 gap-y-8 md:order-2 md:col-span-8 md:flex md:justify-between">
            <div className="flex flex-col gap-5 text-xs lg:text-sm">
              <span className="uppercase tracking-widest">Organization</span>
              <div className="flex flex-col gap-2">
                <FooterLink href="/about" label="About RAD" />
                <FooterLink href="/staff" label="Staff" />
                <FooterLink href="/partners" label="Partners" />
                <FooterLink href="/contact" label="Contact" />
              </div>
            </div>

            <div className="flex flex-col gap-5 text-xs lg:text-sm">
              <span className="uppercase tracking-widest">Compete</span>
              <div className="flex flex-col gap-2">
                <FooterLink href="/roster" label="Roster" />
                <FooterLink href="/content" label="Content" />
                <FooterLink href="/shop" label="Shop" />
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-5 text-xs lg:col-span-1 lg:text-sm">
              <span className="uppercase tracking-widest">Legal</span>
              <div className="flex flex-col gap-2">
                <FooterLink href="/privacy" label="Privacy policy" />
                <FooterLink href="/terms" label="Terms of service" />
              </div>
            </div>
          </div>
        </div>
      </FluidContainer>
    </footer>
  );
}
