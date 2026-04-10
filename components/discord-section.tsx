"use client";

import { useState } from "react";
import Link from "next/link";

import { discordInviteUrl, discordWidgetUrl } from "@/lib/site-data";
import { SectionHeading } from "@/components/sections";

export function DiscordSection() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  return (
    <section className="section home-community">
      <div className="container">
        <SectionHeading
          eyebrow="Community"
          title="Enter the wild."
          description="Discord is where RAD's community, updates, scrims, clips, and live reactions actually come together. Keep the section sharp and useful instead of turning it into filler."
          actionHref={discordInviteUrl}
          actionLabel="Open Discord"
        />

        <div className="home-community__grid">
          <div className="home-community__content">
            <div className="home-community__panel">
              <p className="section-kicker section-kicker--tight">Inside the server</p>
              <ul className="home-list home-list--community">
                <li>
                  <strong>Live match updates</strong>
                  <span>Fast pings, result drops, and real-time reactions during events.</span>
                </li>
                <li>
                  <strong>Behind-the-scenes posts</strong>
                  <span>Extra context, roster updates, and content that does not belong on a static page.</span>
                </li>
                <li>
                  <strong>Community activity</strong>
                  <span>Scrims, giveaways, and direct interaction around the org's biggest moments.</span>
                </li>
              </ul>
            </div>

            <div className="home-community__links">
              <a href={discordInviteUrl} className="text-link" target="_blank" rel="noopener noreferrer">
                Join the server
              </a>
              <Link href="/contact" className="text-link">
                Contact RAD
              </Link>
            </div>
          </div>

          <div className="home-community__widget">
            {!widgetError ? (
              <>
                {!widgetLoaded ? (
                  <div className="home-community__widget-loading">
                    <p className="section-kicker section-kicker--tight">Loading widget</p>
                    <p>Pulling the live community panel in.</p>
                  </div>
                ) : null}

                <iframe
                  src={discordWidgetUrl}
                  title="RAD Discord Widget"
                  className="home-community__iframe"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  onLoad={() => setWidgetLoaded(true)}
                  onError={() => setWidgetError(true)}
                />
              </>
            ) : (
              <div className="home-community__widget-fallback">
                <p className="section-kicker section-kicker--tight">Discord widget unavailable</p>
                <h3>RAD.GG / #GoWild</h3>
                <p>Open the server directly if the embed is blocked in the current browser or region.</p>
                <a href={discordInviteUrl} className="text-link" target="_blank" rel="noopener noreferrer">
                  Open Discord
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
