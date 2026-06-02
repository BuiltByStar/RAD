import Image from "next/image";

import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";

type SiteIntroLogoDrawProps = {
  drawing: boolean;
  filled: boolean;
};

/** Simplified stroke paths that trace the RAD lion mark silhouette */
const DRAW_PATHS = [
  "M 54 38 L 30 62 L 34 98 L 52 118 L 62 96 L 66 68 Z",
  "M 146 38 L 170 62 L 166 98 L 148 118 L 138 96 L 134 68 Z",
  "M 100 28 L 118 118 L 108 118 L 100 78 L 92 118 L 82 118 Z",
  "M 58 42 L 100 22 L 142 42",
  "M 72 108 L 88 132 L 100 140 L 112 132 L 128 108",
  "M 94 118 L 100 128 L 106 118",
  "M 48 52 L 62 72 L 58 88",
  "M 152 52 L 138 72 L 142 88"
] as const;

const FILL_PATHS = [
  "M 54 38 L 30 62 L 34 98 L 52 118 L 62 96 L 66 68 Z",
  "M 146 38 L 170 62 L 166 98 L 148 118 L 138 96 L 134 68 Z",
  "M 100 28 L 118 118 L 108 118 L 100 78 L 92 118 L 82 118 Z",
  "M 58 42 L 100 22 L 142 42 L 146 38 L 170 62 L 166 98 L 148 118 L 128 108 L 112 132 L 100 140 L 88 132 L 72 108 L 52 118 L 34 98 L 30 62 Z"
] as const;

export function SiteIntroLogoDraw({ drawing, filled }: SiteIntroLogoDrawProps) {
  return (
    <div
      className={cn(
        "site-intro-logo-draw",
        drawing && "site-intro-logo-draw--drawing",
        filled && "site-intro-logo-draw--filled"
      )}
    >
      <svg
        className="site-intro-logo-draw__svg"
        viewBox="0 0 200 160"
        aria-hidden
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="site-intro-logo-draw__strokes">
          {DRAW_PATHS.map((d, i) => (
            <path
              key={`stroke-${i}`}
              pathLength={1}
              d={d}
              style={{ animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </g>
        <g className="site-intro-logo-draw__fills">
          {FILL_PATHS.map((d, i) => (
            <path key={`fill-${i}`} d={d} />
          ))}
        </g>
      </svg>
      <Image
        src={assets.logoMark}
        alt=""
        width={200}
        height={200}
        priority
        className="site-intro-logo-draw__mark"
      />
    </div>
  );
}
