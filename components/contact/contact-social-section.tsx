import Link from "next/link";

import { SocialIcon } from "@/components/icons/social-icons";
import { Button } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { contactChannels, discordInviteUrl, orgSocialChannels } from "@/lib/site-data";

const emailChannel = contactChannels.find((channel) => channel.label === "Email");

const inquiryTypes = [
  { label: "Partnerships", detail: "Brand activations & campaigns" },
  { label: "Talent & media", detail: "Roster, casting, press" },
  { label: "General", detail: "Community & business questions" }
];

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
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
  );
}

export function ContactSocialSection() {
  return (
    <div className="space-y-px border border-neutral-900 bg-neutral-900">
      <div className="rad-border-trace relative overflow-hidden bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 top-0 h-64 w-64 bg-[radial-gradient(circle,rgba(229,6,47,0.16),transparent_68%)] md:-right-4 md:h-80 md:w-80"
        />

        <div className="relative grid gap-px bg-neutral-900 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-black p-6 md:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">Get in touch</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase leading-[0.95] text-white">
              Discord ticket or team email
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
              We don&apos;t run a web form — open a ticket in the RAD Discord server for partnerships, talent, media,
              and business inquiries. Prefer email? Reach the team inbox directly.
            </p>

            <div className="mt-6 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-3">
              {inquiryTypes.map((type) => (
                <div key={type.label} className="bg-black px-3 py-3 md:px-4 md:py-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
                    {type.label}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{type.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col justify-between bg-black p-6 md:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute right-4 top-4 text-[#5865f2]/12">
              <SocialIcon platform="discord" className="h-28 w-28 md:h-32 md:w-32" />
            </div>

            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-600">Fastest response</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-tight text-white md:text-2xl">
                Open a Discord ticket
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-500">
                Join the server, head to the support channel, and create a ticket — staff will route it from there.
              </p>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
              <Link
                href={discordInviteUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "rad-community-discord group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden sm:w-auto"
                )}
              >
                <span
                  aria-hidden
                  className="rad-community-discord__shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <SocialIcon platform="discord" className="relative h-5 w-5 shrink-0" />
                <span className="relative">Open Discord &amp; create a ticket</span>
                <span aria-hidden className="relative text-neutral-300 transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>

              {emailChannel ? (
                <Button href={emailChannel.href} variant="secondary" size="md" className="w-full sm:w-auto">
                  <MailIcon className="h-4 w-4" />
                  {emailChannel.value}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">Follow RAD</p>
            <h3 className="mt-2 text-xl font-black uppercase md:text-2xl">Social channels</h3>
          </div>
          <p className="max-w-md text-sm text-neutral-500">
            Match drops, roster news, and behind-the-scenes content — stay connected across platforms.
          </p>
        </div>

        <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
          {orgSocialChannels.map((channel, index) => (
            <a
              key={channel.platform}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[168px] flex-col justify-between overflow-hidden bg-black p-6 transition-colors duration-300 hover:bg-neutral-950 sm:min-h-[192px]"
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
    </div>
  );
}
