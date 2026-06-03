import type { OrgSocialPlatform } from "@/lib/site-data";
import type { ComponentType } from "react";

type IconProps = { className?: string };

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.14 96.36"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.58,67.58,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2.25h3.7l-8.1 9.3L24 21.75h-7.4l-5.8-7.6-6.6 7.6H.7l8.7-9.9L0 2.25h7.6l5.2 6.9 6.1-6.9Zm-1.3 17.5h2L6.5 4.2H4.3l13.3 15.55Z" />
    </svg>
  );
}

export function TwitchIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M2.1 0 0 2.1v16.8h5.6V24l3.1-3.1h4.7L21 14.7V0H2.1Zm16.8 13.5-3.1 3.1h-4.7l-2.8 2.8v-2.8H4.2V2.1h14.7v11.4ZM15.8 6.3v6.3h-2.1V6.3h2.1Zm-5.6 0v6.3H8.1V6.3h2.1Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .0-1.6.2-2 .3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.0 1 .2 1.6.3 2 .2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2 .3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.0 1.6-.2 2-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.0-1-.2-1.6-.3-2-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2-.3-1.2-.1-1.6-.1-4.7-.1Zm0 3.7a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 1.8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.4-2.6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M16.6 2h2.5c.2 1.8.9 3.5 2.2 4.8 1.4 1.3 3.1 2 4.9 2.2v2.5c-1.9-.1-3.7-.8-5.2-2V14c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8v2.6c-3 .3-5.4 2.8-5.4 5.9 0 3.3 2.7 6 6 6s6-2.7 6-6V2Z" />
    </svg>
  );
}

const iconByPlatform: Record<OrgSocialPlatform, ComponentType<IconProps>> = {
  discord: DiscordIcon,
  youtube: YouTubeIcon,
  x: XIcon,
  twitch: TwitchIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon
};

export function SocialIcon({ platform, className }: { platform: OrgSocialPlatform; className?: string }) {
  const Icon = iconByPlatform[platform];
  return <Icon className={className} />;
}
