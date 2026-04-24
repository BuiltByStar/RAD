---
version: alpha
name: RAD Esports
description: A cinematic esports identity built on near-black surfaces, disciplined crimson accents, condensed uppercase headlines, cut-corner panels, and restrained motion.
colors:
  background: "#050505"
  background-deep: "#020202"
  background-elevated: "#040404"
  ink: "#0A0A0A"
  ink-2: "#111111"
  surface: "#FFFFFF0A"
  surface-low: "#FFFFFF08"
  surface-mid: "#FFFFFF0F"
  surface-high: "#FFFFFF14"
  surface-strong: "#FFFFFF1A"
  line: "#FFFFFF1A"
  line-strong: "#FFFFFF2E"
  line-bright: "#FFFFFF4D"
  text: "#FFFFFF"
  text-muted: "#FFFFFFB3"
  text-dim: "#FFFFFF73"
  text-faint: "#FFFFFF45"
  primary: "#FF2B45"
  primary-bright: "#FF4D63"
  primary-soft: "#FF8B99"
  primary-deep: "#8A0A1A"
  primary-ember: "#4A0510"
  spotlight: "#FFFFFF14"
  discord: "#5865F2"
typography:
  display-hero:
    fontFamily: Barlow Condensed
    fontSize: 120px
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: -0.06em
  display-xl:
    fontFamily: Barlow Condensed
    fontSize: 96px
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 60px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.01em
  title-md:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0em
  body-lg:
    fontFamily: Barlow
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.82
    letterSpacing: -0.01em
  body-md:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Barlow
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.16em
  label-md:
    fontFamily: Barlow
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.22em
  label-sm:
    fontFamily: Barlow
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.24em
  label-xs:
    fontFamily: Barlow
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.28em
spacing:
  base: 8px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px
  gutter-mobile: 24px
  gutter-tablet: 32px
  gutter-desktop: 48px
  section-y: 96px
  section-y-lg: 128px
  card-gap: 16px
  panel-padding: 24px
  panel-padding-lg: 40px
  container-xl: 1440px
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
  "2xl": 28px
  full: 9999px
radii:
  panel-notch-sm: 10px
  panel-notch-md: 14px
  panel-notch-lg: 18px
  panel-notch-xl: 22px
shadows:
  card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)"
  panel: "0 24px 50px -24px rgba(0, 0, 0, 0.92)"
  panel-hover: "0 34px 76px -24px rgba(255, 43, 69, 0.26)"
  glass: "0 20px 40px -26px rgba(0, 0, 0, 0.95)"
  glow-primary: "0 0 40px rgba(255, 43, 69, 0.25), 0 0 80px rgba(255, 43, 69, 0.12)"
  glow-primary-strong: "0 0 60px rgba(255, 43, 69, 0.4), 0 0 120px rgba(230, 0, 0, 0.25)"
elevation:
  canvas:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.background}"
    shadow: none
  chrome:
    backgroundColor: "{colors.surface-low}"
    borderColor: "{colors.line}"
    shadow: "{shadows.glass}"
  panel:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.line}"
    shadow: "{shadows.panel}"
  panel-interactive:
    backgroundColor: "{colors.surface-mid}"
    borderColor: "{colors.line-strong}"
    shadow: "{shadows.panel-hover}"
  spotlight:
    backgroundColor: "{colors.primary}"
    borderColor: "{colors.primary-bright}"
    shadow: "{shadows.glow-primary}"
motion:
  duration-instant: 150ms
  duration-fast: 220ms
  duration-base: 300ms
  duration-slow: 700ms
  duration-reveal: 900ms
  duration-loop-soft: 3400ms
  duration-loop-medium: 6800ms
  duration-loop-slow: 12000ms
  easing-emphasis: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  easing-out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  easing-linear: linear
components:
  page-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    padding: "{spacing.section-y}"
  header-chrome:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.text}"
    borderColor: "{colors.line}"
    rounded: "{rounded.none}"
    shadow: "{shadows.glass}"
    height: 80px
  hero-kicker:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.text-dim}"
    typography: "{typography.label-sm}"
    borderColor: "{colors.line}"
    padding: 8px 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 0 32px
    height: 56px
    borderColor: "{colors.primary-bright}"
    shadow: "0 18px 50px rgba(255, 43, 69, 0.22)"
  button-primary-hover:
    backgroundColor: "{colors.primary-bright}"
    textColor: "{colors.text}"
    borderColor: "{colors.primary-bright}"
    shadow: "0 24px 72px rgba(255, 43, 69, 0.34)"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.text}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 0 32px
    height: 56px
    borderColor: "{colors.line-strong}"
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
    borderColor: "{colors.line}"
    shadow: "{shadows.panel}"
  card-accent:
    backgroundColor: "{colors.surface-mid}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
    borderColor: "{colors.line}"
    shadow: "{shadows.panel-hover}"
  stat-chip:
    backgroundColor: "{colors.surface-mid}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 16px 16px
    borderColor: "{colors.line}"
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.text-dim}"
    typography: "{typography.label-sm}"
  nav-link-active:
    backgroundColor: transparent
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
  footer-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.panel-padding-lg}"
    borderColor: "{colors.line}"
    shadow: "{shadows.panel}"
---

## Overview
RAD Esports uses a dark cinematic esports visual language rather than a glossy gamer aesthetic. The interface should feel pressure-built, broadcast-ready, and slightly militarized: matte black staging, cold white type, thin technical lines, and a single tuned crimson that appears as a signal, warning light, or ignition source.

The rendered UI confirms that the identity is intentionally restrained. Large parts of the experience are almost-black atmosphere first, with subtle red bloom, faint grid structure, and low-opacity surface layering doing more work than loud color blocks. When red appears, it should feel earned and concentrated, never sprayed across the whole screen.

This system should evoke a premium competition control room, not arcade neon. The mood is disciplined, tense, and sharp, with enough glow and motion to feel alive but never soft or playful.

## Colors
The palette is dominated by near-black neutrals and translucent white overlays. Crimson is the only true brand accent and should function as the system's ignition point.

- **Background (`#050505`)** is the canonical page foundation. Use even darker tones like `#020202` and `#040404` to create section layering without visually leaving the black family.
- **Surface layers** are not opaque cards. They are smoky white-tinted overlays at very low alpha, typically between 3% and 10%, used over black to create glass-metal panels.
- **Lines and separators** are thin white borders at low opacity. They should read like etched panel seams, not conventional gray dividers.
- **Primary crimson (`#FF2B45`)** is the decisive action color. Use it for the strongest button, active status dots, narrow gradient rails, and localized glow fields.
- **Primary bright (`#FF4D63`)** is for highlights, hover accents, and text emphasis around interactive states.
- **Primary soft (`#FF8B99`)** is only for gradient peaks, glow bloom, or the top edge of a hero headline treatment.
- **Text** should stay overwhelmingly white. Secondary copy uses muted white rather than gray so the interface preserves contrast against the black canvas.

Red must stay localized. The system works because most of the interface is monochrome and only a few elements are allowed to "ignite."

## Typography
Typography is the clearest part of the brand voice. It uses two related families with distinct jobs.

- **Barlow Condensed** drives all major headlines, metrics, and section titles. It should appear bold, uppercase, tightly tracked, and vertically compressed. This is the competitive voice of the brand.
- **Barlow** handles body copy, labels, navigation, and support text. It keeps the system readable and contemporary without diluting the hard-edged headline language.
- **Headlines** should be uppercase by default and set with aggressive scale. The hero treatment is oversized, compressed, and slightly negatively tracked.
- **Labels** are small, uppercase, semibold, and heavily letter-spaced. They function like interface telemetry rather than friendly UI captions.
- **Body copy** is not tiny. It is relatively generous and airy, which offsets the density of the dark visuals and keeps the site from feeling claustrophobic.

Avoid mixing in decorative fonts, rounded grotesks, or serif accents. The system relies on condensed force paired with clean operational body text.

## Layout & Spacing
The layout strategy is wide, cinematic, and disciplined.

- Use a **fixed max-width desktop container** around `1440px`, with generous horizontal gutters that grow from mobile to desktop.
- Vertical rhythm follows an **8px base scale**, but sections are spaced in large cinematic intervals. Most major sections want `96px` to `128px` of vertical breathing room.
- Card groups tend to use **12px to 16px internal gaps**, while hero and section compositions use larger asymmetrical spacing.
- The system favors **two-column editorial compositions** on desktop, often pairing a text block with a constructed visual panel.
- On mobile, layouts should collapse cleanly without losing the dramatic atmosphere. Preserve the hierarchy and spacing cadence even when columns stack.

Whitespace should feel intentional and expensive. Do not compress this design into dense dashboard spacing.

## Elevation & Depth
Depth is created primarily through layering, translucency, and glow, not through standard material shadows.

- **Canvas layer:** near-black background with red radial blooms, faint white vignettes, grid overlays, and static grain.
- **Chrome layer:** translucent top navigation and ambient overlays with blur and fine borders.
- **Panel layer:** dark glass-metal cards with light inner highlights and heavy black drop shadows.
- **Signal layer:** small radial glows, red scan lines, gradient streaks, and moving sheen passes that imply energy inside the system.

Shadows should remain soft and dark. Bright elevation comes from crimson glow, not from lifting everything with neutral box-shadow.

## Shapes
The shape language is mostly rectangular, but rarely plain.

- The default silhouette is a **cut-corner panel** rather than a conventional rounded rectangle.
- True border-radius is used sparingly and mostly for internal circles, glows, dots, and occasional outer containers.
- Cards, buttons, and chrome should feel engineered, paneled, and slightly beveled through clip paths and corner trims.
- Small technical corner marks, diagonal cuts, and panel notches are part of the visual grammar and should be preserved.

Do not soften the system into pill-heavy consumer UI. If a surface can be cut rather than rounded, prefer the cut.

## Components
### Header and Navigation
The header is a translucent command bar pinned over the page. It uses a low-opacity border, dark gradient backing, backdrop blur, and tight uppercase navigation labels. The active nav state is understated: a thin crimson underline, not a filled tab.

### Hero
The hero is an immersive composition, not a simple banner. It combines oversized condensed typography, measured body copy, strong CTA buttons, and a constructed visual panel made from image, grid, glow, and cut-corner overlays. The hero should feel like a title card for a live event package.

### Buttons
Primary buttons are vivid crimson gradients with high contrast white text, engineered edges, and a moving sheen on hover. Outline buttons remain dark and restrained, using border and subtle red-tinted surface feedback rather than heavy fills.

### Cards and Panels
Cards are black-glass panels with thin white borders, heavy shadowing, and occasional top-edge accent bars. Hover states should lift slightly, strengthen border contrast, and introduce a localized red glow or sheen rather than a broad background swap.

### Eyebrows, Labels, and Chips
Microcopy is treated like telemetry. Eyebrows often pair a short horizontal rule with uppercase text. Status dots and tiny chips can carry crimson fills, but the surrounding shell should remain mostly monochrome.

### Background Systems
The background should always feel active but subtle: grain, vignette, soft radial blooms, faint grids, and narrow scanning lines. These elements support the mood and should never become louder than the content.

## Do's and Don'ts
- Do keep the interface overwhelmingly black, white, and translucent, with crimson reserved for emphasis.
- Do use condensed uppercase headlines to create the brand voice.
- Do preserve cut corners, technical trims, and paneled geometry.
- Do use motion as atmospheric energy: drift, pulse, sweep, reveal.
- Do keep body copy calm and readable so the dark visuals do not become exhausting.
- Don't convert key surfaces into flat mid-gray cards.
- Don't use multiple bright accent colors alongside the crimson system.
- Don't round every component into pills or soft consumer shapes.
- Don't use bouncy, playful motion curves; movement should feel deliberate and controlled.
- Don't let glow replace hierarchy. Most elements should stay subdued so focal moments still hit.
