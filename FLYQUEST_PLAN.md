# FlyQuest-Inspired Complete Redesign — Implementation Plan

> **Goal:** Transform RAD Esports from a dark cinematic "cosmic noir" site into a clean, modern, light-themed esports brand site modeled after FlyQuest.gg.

---

## Reference: FlyQuest Design DNA

| Attribute | FlyQuest Pattern | RAD Current State |
|---|---|---|
| **Background** | Off-white (#FCFCFC) / white | Near-black (#050505) |
| **Text** | Dark charcoal (#151F21) | White (#FFFFFF) |
| **Accent** | Forest green (#214439) / emerald (#275D38) | Crimson red (#FF2B45) |
| **Typography** | Bold custom "Beni-Bold" uppercase headings + Helvetica body | Barlow Condensed + Barlow |
| **Layout** | Full-width hero imagery, 3-column product grids, generous whitespace | Cinematic dark panels, cut-corner cards, crimson glow |
| **Navigation** | Minimalist sticky top bar, logo left, links center, icons right, mega-menu dropdowns | Dark translucent command bar, uppercase label nav |
| **Cards** | White bg cards with subtle shadows, large imagery | Black-glass panels with thin white borders, glowing |
| **Buttons** | Solid dark green fills, clean white text | Crimson gradient fills, white text, sheen hover |
| **Motion** | Subtle, minimal — smooth page transitions | Heavy — framer-motion reveals, grain, radial bloom |
| **Footer** | Dark charcoal bg, white text, 3-column links + newsletter signup | Dark panel with red accents, large "RAD" watermark |
| **Hero** | Full-width lifestyle/team photography, centered text overlay | Immersive dark composition with radial glows |
| **Vibe** | Lifestyle brand x esports org, clean and premium | Military-cinematic control room aesthetic |

---

## Phase 0: Pre-Work and Dependency Changes

### 0.1 — Font Swap
**Current:** Barlow + Barlow Condensed → **New:** Inter (body) + custom bold display font

FlyQuest uses a proprietary "Beni-Bold" font. We substitute with **Outfit** (bold, geometric) for display headings and **Inter** for body copy. Both are available from Google Fonts and give a similar clean, modern, uppercase-friendly feel.

**Files to modify:**
- `app/layout.tsx` — Replace font imports

```diff
-import { Barlow, Barlow_Condensed } from "next/font/google";
+import { Inter, Outfit } from "next/font/google";

-const barlow = Barlow({
-  subsets: ["latin"],
-  weight: ["400", "500", "600", "700"],
-  variable: "--font-body",
-  display: "swap"
-});
-const barlowCondensed = Barlow_Condensed({
-  subsets: ["latin"],
-  weight: ["600", "700", "800"],
-  variable: "--font-display",
-  display: "swap"
-});
+const inter = Inter({
+  subsets: ["latin"],
+  weight: ["400", "500", "600", "700"],
+  variable: "--font-body",
+  display: "swap"
+});
+const outfit = Outfit({
+  subsets: ["latin"],
+  weight: ["600", "700", "800", "900"],
+  variable: "--font-display",
+  display: "swap"
+});
```

### 0.2 — Remove Heavy Dependencies
Consider removing or significantly reducing usage of:
- `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three` — No 3D needed
- `framer-motion` — Keep for subtle transitions but strip all heavy animations

**Files to delete:**
- `components/three-scene.tsx` — Remove entirely
- `components/ambient-background.tsx` — Remove entirely (no grain/glow)
- `components/immersive-hud.tsx` — Remove entirely
- `components/custom-cursor.tsx` — Remove entirely
- `components/world-transition-overlay.tsx` — Remove entirely
- `components/cinematic-hero.tsx` — Remove entirely

### 0.3 — Update Viewport and Theme Color
```diff
 export const viewport: Viewport = {
-  themeColor: "#050505",
-  colorScheme: "dark",
+  themeColor: "#FCFCFC",
+  colorScheme: "light",
   width: "device-width",
   initialScale: 1,
   viewportFit: "cover"
 };
```

---

## Phase 1: Design System Overhaul

### 1.1 — New Color Palette

Replace the entire CSS custom property system. Create a new globals.css:

| Token | Old Value | New Value |
|---|---|---|
| --bg | #050505 | #FCFCFC |
| --bg-deep | #020202 | #FFFFFF |
| --bg-elevated | #040404 | #F5F5F5 |
| --text | #FFFFFF | #151F21 |
| --text-muted | #FFFFFFB3 | #5A6B6F |
| --text-dim | #FFFFFF73 | #8A9A9E |
| --accent | #FF2B45 | #214439 |
| --accent-bright | #FF4D63 | #275D38 |
| --accent-soft | #FF8B99 | #3A8A5C |
| --surface | rgba(255,255,255,0.04) | #FFFFFF |
| --surface-hover | rgba(255,255,255,0.08) | #F0F0F0 |
| --border | rgba(255,255,255,0.1) | #E5E5E5 |
| --border-strong | rgba(255,255,255,0.18) | #D0D0D0 |
| --shadow-card | dark black shadows | 0 4px 20px rgba(0,0,0,0.06) |
| --shadow-hover | red glow | 0 8px 30px rgba(0,0,0,0.1) |

### 1.2 — New Typography Scale

```css
/* Display / Headings */
--font-display: 'Outfit', sans-serif;
/* Headings are UPPERCASE, bold, tightly tracked */
.heading-hero   { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; }
.heading-xl     { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; text-transform: uppercase; }
.heading-lg     { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; text-transform: uppercase; }
.heading-md     { font-size: 1.25rem; font-weight: 700; text-transform: uppercase; }

/* Body */
--font-body: 'Inter', sans-serif;
.body-lg  { font-size: 1.125rem; line-height: 1.75; }
.body-md  { font-size: 1rem; line-height: 1.65; }
.body-sm  { font-size: 0.875rem; line-height: 1.6; }

/* Labels */
.label-md { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
```

### 1.3 — Global Layout Tokens

```css
--container-max: 1440px;
--gutter: clamp(1.5rem, 4vw, 3rem);
--section-padding: clamp(4rem, 8vw, 8rem);
--card-radius: 12px;
--button-radius: 6px;
```

### 1.4 — Files to Modify

| File | Action |
|---|---|
| app/globals.css | **Full rewrite** — Replace 125KB dark theme with clean light design system (~5KB) |
| app/cinematic.css | **Delete entirely** |
| DESIGN.md | **Full rewrite** — Document new "Clean Modern" design system |
| app/layout.tsx | Update body class from bg-black text-white to bg-[#FCFCFC] text-[#151F21] |

---

## Phase 2: Navigation (Header)

### FlyQuest Header Pattern
- **Sticky** white/off-white bar with slight shadow on scroll
- **Logo** on left (SVG, dark colored)
- **Nav links** centered: Home, Shop, Lookbooks, Partners, About Us, News
- **Right side:** Search icon, Account icon, Cart icon
- **Dropdown menus** for items with children (Shop sub-categories)
- **Hover:** Small dot appears under active/hovered link
- **Mobile:** Hamburger slide-out drawer

### RAD Adaptation
Since RAD does not have a shop, the navigation maps to:

| Position | Links |
|---|---|
| Left | RAD Logo (dark version) |
| Center | Home, About, Roster, Content, Partners, News |
| Right | Search (optional), Auth Widget, Discord |

### File Changes

| File | Action |
|---|---|
| components/site-header.tsx | **Major rewrite** |

```diff
 Header Design Changes:
- Dark translucent command bar with backdrop blur
+ Solid white/off-white bar with clean bottom border
- Uppercase tiny tracking labels (10px, 0.24em spacing)
+ Clean sans-serif nav links (14px, Inter, normal weight)
- Crimson underline on active state
+ Dark dot indicator under active link
- "Menu" text button for mobile
+ Hamburger icon for mobile with slide-out drawer
```

### New Header Component Structure
```
<header> (sticky, bg-white, border-bottom)
  <div class="container">
    <div class="header-grid"> (logo | nav | actions)
      <Link> <Image logo-dark /> </Link>
      <nav> {links.map → <NavLink>} </nav>
      <div> <AuthWidget /> </div>
    </div>
  </div>
</header>
```

---

## Phase 3: Homepage

### FlyQuest Homepage Section Map
1. **Hero Slideshow** — Full-width image carousel with bold text overlay + CTA
2. **Free Shipping Ticker** — Scrolling marquee bar
3. **Featured Collection** — Grid of product cards
4. **Mascot/Merch Section** — Large image + product grid
5. **Pro Kit Section** — Full-width lifestyle banner + product carousel
6. **Collaboration Section** — Brand partnership showcase
7. **Eco-Friendly Mission Strip** — Full-width text + CTA
8. **About Blurb** — Text block with CTA
9. **Partners Logos** — Logo carousel + testimonials
10. **Newsletter Signup** — Email capture

### RAD Adaptation (Mapped Sections)

| # | Section | RAD Content | Component |
|---|---|---|---|
| 1 | **Hero Slideshow** | Full-width team photography with bold "THE WILD ONES" text + View Roster / Contact CTAs | HomeHero (rewrite) |
| 2 | **Announcement Ticker** | Scrolling bar: "IGNITE WORLD CHAMPIONS, EMEA S6 CHAMPIONS, #GOWILD" | MarqueeStrip (restyle) |
| 3 | **Team Showcase** | Large team banner + quick-link cards to divisions | HomeTeamShowcase (new) |
| 4 | **Roster Preview** | Player cards in a 3-col grid with hover effects | HomeRosterPreview (new) |
| 5 | **About Strip** | Full-width image + mission statement overlay | HomeAboutStrip (new) |
| 6 | **Org Values** | 4-column value cards (Competition First, etc.) | HomePillars (restyle) |
| 7 | **Partners Section** | Partner logos + testimonials/quotes | HomePartners (new) |
| 8 | **Newsletter / Discord** | Email signup + Discord invite | HomeNewsletter (new) |

### Files to Delete (Home)
| File | Reason |
|---|---|
| components/home/home-intro.tsx | Skip intro modal with animation — FlyQuest has none |
| components/home/home-worlds-portal.tsx | Replace with cleaner team showcase |
| components/home/home-champions-strip.tsx | Redesign into something lighter |

### Files to Rewrite (Home)
| File | Changes |
|---|---|
| components/home/home-hero.tsx | Full-width photo hero, white text overlay, clean CTA buttons, remove all gradient overlays/grid patterns |
| components/home/marquee-strip.tsx | Restyle: dark green or dark charcoal bg, white text, clean sans-serif |
| components/home/home-pillars.tsx | White card backgrounds, dark text, subtle border, no cut-corners |

### New Files to Create (Home)
| File | Purpose |
|---|---|
| components/home/home-team-showcase.tsx | Large team banner with quick-link overlay cards |
| components/home/home-roster-preview.tsx | 3-col player card grid with large photos |
| components/home/home-about-strip.tsx | Full-width lifestyle image + mission text |
| components/home/home-partners.tsx | Partner logo grid + quote testimonials |
| components/home/home-newsletter.tsx | Newsletter email input + Discord link |

### New page.tsx Structure
```tsx
export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <MarqueeStrip />
      <HomeTeamShowcase />
      <HomeRosterPreview />
      <HomeAboutStrip />
      <HomePillars />
      <HomePartners />
      <HomeNewsletter />
    </main>
  );
}
```

---

## Phase 4: Subpages

### 4.1 — Page Shell Overhaul

**Current:** page-shell.tsx and page-shell-hero.tsx use dark cinematic heroes with grid overlays and red gradients.

**New:** Clean full-width hero image with centered/left-aligned text, white-on-photo overlay, minimal styling.

```diff
 Page Shell Hero:
- Dark background with radial red glow, grid overlay, gradient scrims
+ Full-width hero image with simple dark-to-transparent gradient overlay
- Cut-corner panels and telemetry-style labels
+ Clean uppercase heading + body text
- NoteStack with technical metadata
+ Simple subtitle text
```

### 4.2 — About Page

| FlyQuest Section | RAD Adaptation |
|---|---|
| "Making Gaming Better Than We Found It" hero | Full-width team photo hero with "PRESSURE MADE THE IDENTITY" heading |
| Mission pillars with icons | Restyle existing orgValues cards to white bg, dark text |
| Mascot section | Skip — RAD does not have mascots |
| Team culture imagery | Full-width alternating image + text sections about org history |

**File:** app/about/page.tsx — Major restyle

### 4.3 — Roster Page

| FlyQuest Section | RAD Adaptation |
|---|---|
| "TIME TO FLY" hero with team listing | Full-width team photo hero |
| Team category grid (LoL, VALORANT, etc.) | Single team card for Marvel Rivals |
| Player cards with photos | Clean white cards, large player photos (when available), name, role, socials |

**File:** app/roster/page.tsx — Major restyle

### 4.4 — Partners Page

| FlyQuest Section | RAD Adaptation |
|---|---|
| Partner logos in grid/carousel | "Now Booking" activation cards |
| Testimonial quotes | Keep existing content, restyle to white cards |
| "Contact Us" CTA | Prominent green CTA button |

**File:** app/partners/page.tsx — Restyle

### 4.5 — Contact Page

| FlyQuest Section | RAD Adaptation |
|---|---|
| Simple centered form with wide inputs | Keep contact form, restyle: white bg, dark borders, clean inputs |
| Direct email link | Keep existing channels |

**File:** app/contact/page.tsx — Restyle

### 4.6 — Remaining Pages (Terms, Privacy, Cookies)
- Light bg, clean typography, standard text content pages
- Minimal changes needed beyond global theme inheritance

---

## Phase 5: UI Component Library Overhaul

### Current Components to Restyle

Every component in components/ui/ needs updating from dark to light:

| Component | Key Changes |
|---|---|
| Card | bg-white instead of dark glass. Clean shadow instead of glow. border-[#E5E5E5]. Round corners (12px). |
| CardTitle | Dark text (#151F21) instead of white |
| CardEyebrow | Muted dark text, clean label style |
| CardBody | #5A6B6F muted body text |
| Button / CTA | Solid #214439 fill, white text, 6px radius, no sheen |
| Chip / ChipRow | Light bg (#F0F0F0), dark text, round pill shape |
| Container | Keep, update max-width to 1440px |
| Section | Light bg alternating: white and #F5F5F5 |
| SectionHeading | Dark text, green accent eyebrow |
| PlayerCard | White card, large photo area, clean typography |
| Timeline | Vertical line in green, clean white card nodes |
| ContactGrid | White cards with subtle borders |

### New Components to Create

| Component | Purpose |
|---|---|
| MegaMenu | Dropdown navigation for nav items with children |
| ImageSlideshow | Homepage hero carousel (auto-advance + manual dots) |
| PartnerLogoGrid | Grid of partner logos with consistent sizing |
| NewsletterForm | Email input + submit button in footer/section |
| AnnouncementBar | Top-of-page promotional bar (optional) |
| BreadcrumbNav | Simple breadcrumb for subpages |

---

## Phase 6: Footer

### FlyQuest Footer Pattern
- **Dark charcoal** background (#151F21) with white text
- **3-column** layout: Shop links, Helpful Links, Mission statement
- **Newsletter signup** with email input
- **Social icons** (not labeled text links)
- **Bottom bar:** Copyright, payment icons

### RAD Footer Adaptation

```
[DARK BG: #151F21]

[RAD Logo White]    Navigate        Connect
RAD Esports         Home            Discord
"Built for          About           Email
 pressure..."       Roster          YouTube
                    Content         X/Twitter
[Newsletter Input]  Partners
[ Subscribe ]       Contact

---
(c) 2026 RAD Esports  |  Terms  |  Privacy  | Cookies
```

**File:** components/site-footer.tsx — Major restyle

Key changes:
```diff
- Red accent lines and glow dots
+ Clean white dividers
- Massive "RAD" watermark background text
+ Remove or make very subtle
- Technical telemetry styling
+ Clean, modern footer links
+ Add newsletter email signup field
```

---

## Phase 7: Polish and Performance

### 7.1 — Motion Simplification
- **Remove:** Grain overlays, radial bloom backgrounds, conic gradient animations, moving sheen passes, scan lines
- **Keep:** Simple opacity + translateY reveal on scroll (via framer-motion whileInView)
- **Add:** Smooth page transitions via next/navigation

### 7.2 — Image Strategy
- Replace dark-moody hero images with **bright, lifestyle-oriented** team/player photography
- Consider generating new hero images using the generate_image tool
- Ensure all images use next/image with proper sizes attributes

### 7.3 — SEO and Metadata Updates
```diff
 metadata:
-  title: "RAD Esports — Built for Pressure"
+  title: "RAD Esports — The Wild Ones"
   
-  themeColor: "#050505"
+  themeColor: "#FCFCFC"
```

### 7.4 — Responsive Breakpoints
Maintain existing breakpoints but ensure the light theme works cleanly at all sizes. FlyQuest-style layouts rely heavily on generous whitespace, which needs to scale down gracefully on mobile.

### 7.5 — Accessibility
- Ensure sufficient contrast ratios with light backgrounds
- All interactive elements need visible focus states (dark green outline)
- Maintain existing ARIA labels and semantic HTML

---

## Full File Change Summary

### DELETE (10 files)
| File | Reason |
|---|---|
| components/three-scene.tsx | 3D scene — not needed |
| components/ambient-background.tsx | Dark atmospheric bg — not needed |
| components/immersive-hud.tsx | HUD overlay — not needed |
| components/custom-cursor.tsx | Custom cursor — not needed |
| components/world-transition-overlay.tsx | Transition overlay — not needed |
| components/cinematic-hero.tsx | Dark cinematic hero — replaced |
| components/home/home-intro.tsx | Skip intro animation — removed |
| components/home/home-worlds-portal.tsx | Dark portal section — replaced |
| components/home/home-champions-strip.tsx | Champions strip — replaced |
| app/cinematic.css | Dark cinematic styles — removed |

### FULL REWRITE (8 files)
| File | Scope |
|---|---|
| app/globals.css | Complete color/typography/layout system replacement |
| app/layout.tsx | Font swap, body class, remove AmbientBackground |
| components/site-header.tsx | Light nav bar, mega-menu, hamburger mobile |
| components/site-footer.tsx | Dark footer with newsletter, clean links |
| components/home/home-hero.tsx | Full-width photo hero, clean CTAs |
| components/page-shell.tsx | Light page shell wrapper |
| components/page-shell-hero.tsx | Clean photo hero for subpages |
| DESIGN.md | Document new "Clean Modern" design system |

### MAJOR RESTYLE (9 files)
| File | Changes |
|---|---|
| components/home/home-pillars.tsx | White cards, dark text, green accents |
| components/home/marquee-strip.tsx | Dark bg ticker, clean type |
| app/about/page.tsx | Light theme, full-width sections |
| app/roster/page.tsx | White player cards, clean grid |
| app/partners/page.tsx | White cards, green CTAs |
| app/contact/page.tsx | Clean form on white bg |
| components/ui/* (all) | Dark text, white surfaces, green accents |
| components/scroll-reveal.tsx | Simplify to basic fade-in |
| components/scroll-effects.tsx | Simplify or remove |

### CREATE NEW (7 files)
| File | Purpose |
|---|---|
| components/home/home-team-showcase.tsx | Team banner + quick-link cards |
| components/home/home-roster-preview.tsx | Player card preview grid |
| components/home/home-about-strip.tsx | Mission statement strip |
| components/home/home-partners.tsx | Partner logos + quotes |
| components/home/home-newsletter.tsx | Newsletter signup section |
| components/mega-menu.tsx | Dropdown navigation |
| components/newsletter-form.tsx | Reusable email signup form |

---

## Execution Order

Work in this exact order to avoid broken intermediate states:

```
Phase 0 → Phase 1 → Phase 2 → Phase 6 → Phase 3 → Phase 4 → Phase 5 → Phase 7
(pre-work) (design)  (nav)     (footer)  (home)    (pages)   (ui lib)  (polish)
```

**Estimated scope:** ~34 files touched across 7 phases. The globals.css rewrite is the single largest task since the current file is 125KB of dark-theme CSS that needs wholesale replacement.

---

This is a **complete visual identity swap**. The site entire personality changes from "military cinematic control room" to "premium lifestyle esports brand." All dark backgrounds, red glows, cut-corner panels, grain textures, and heavy motion are removed in favor of white surfaces, green accents, generous whitespace, and clean photography. The data layer (lib/site-data.ts) and Supabase backend remain untouched.
