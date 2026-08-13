import Link from "next/link";

import { SocialIcon } from "@/components/icons/social-icons";
import { contactChannels, discordInviteUrl, orgSocialChannels } from "@/lib/site-data";

const emailChannel = contactChannels.find((channel) => channel.label === "Email");

export function ContactSocialSection() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
      <SocialIcon platform="discord" className="h-10 w-10 text-[#5865f2]" />

      <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[0.95] text-white">
        Get in touch
      </h1>

      <div className="mt-8 flex w-full flex-col items-center gap-3">
        <Link
          href={discordInviteUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full max-w-xs items-center justify-center gap-2 bg-[#5865f2] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
        >
          <SocialIcon platform="discord" className="h-5 w-5" />
          Open a Discord ticket
        </Link>

        {emailChannel ? (
          <Link
            href={emailChannel.href}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 border border-neutral-800 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-neutral-600"
          >
            {emailChannel.value}
          </Link>
        ) : null}
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        {orgSocialChannels.map((channel) => (
          <a
            key={channel.platform}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={channel.label}
            className="grid h-11 w-11 place-items-center border border-neutral-800 text-neutral-400 transition-colors hover:border-[var(--color-blood)]/50 hover:text-[var(--color-blood)]"
          >
            <SocialIcon platform={channel.platform} className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
