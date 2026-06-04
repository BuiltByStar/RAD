import Link from "next/link";

import { SocialIcon } from "@/components/icons/social-icons";
import { contactChannels, discordInviteUrl, orgSocialChannels } from "@/lib/site-data";

const emailChannel = contactChannels.find((channel) => channel.label === "Email");

export function ContactSocialSection() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Primary contact methods */}
      <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-2">
        <Link
          href={discordInviteUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col bg-black p-7 transition-colors hover:bg-neutral-950 md:p-9"
        >
          <div className="flex items-center justify-between">
            <SocialIcon platform="discord" className="h-7 w-7 text-[#5865f2]" />
            <span aria-hidden className="text-neutral-600 transition group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </div>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">
            Fastest response
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white">
            Open a Discord ticket
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Join the server and create a ticket in the support channel — staff route it from there.
          </p>
        </Link>

        {emailChannel ? (
          <Link
            href={emailChannel.href}
            className="group flex flex-col bg-black p-7 transition-colors hover:bg-neutral-950 md:p-9"
          >
            <div className="flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden
                className="h-7 w-7 text-neutral-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span aria-hidden className="text-neutral-600 transition group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
              Business & press
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white">
              Email the team
            </h2>
            <p className="mt-3 break-all text-sm leading-relaxed text-neutral-500">{emailChannel.value}</p>
          </Link>
        ) : null}
      </div>

      {/* Social channels */}
      <div>
        <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-neutral-900 pb-3">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl">
            Follow RAD
          </h3>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
            {orgSocialChannels.length} channels
          </span>
        </div>

        <div className="grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
          {orgSocialChannels.map((channel) => (
            <a
              key={channel.platform}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-black p-5 transition-colors hover:bg-neutral-950"
            >
              <SocialIcon
                platform={channel.platform}
                className="h-6 w-6 shrink-0 text-neutral-400 transition-colors group-hover:text-[var(--color-blood)]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold uppercase tracking-wide text-white">{channel.label}</p>
                <p className="truncate text-xs text-neutral-500">{channel.handle}</p>
              </div>
              <span aria-hidden className="text-neutral-700 transition group-hover:translate-x-0.5 group-hover:text-white">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
