import { cn } from "@/components/ui/cn";
import { RAD_LOGO_DRAW_PATHS, RAD_LOGO_DRAW_TRANSFORM } from "@/lib/rad-logo-draw-path";

type SiteIntroLogoDrawProps = {
  drawing: boolean;
  filled: boolean;
};

const STROKE_STAGGER_S = 0.14;
const STROKE_DRAW_S = 0.72;

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
        viewBox="0 0 880 1080"
        aria-hidden
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform={RAD_LOGO_DRAW_TRANSFORM}>
          <g className="site-intro-logo-draw__strokes">
            {RAD_LOGO_DRAW_PATHS.map((d, i) => (
              <path
                key={`stroke-${i}`}
                pathLength={1}
                d={d}
                style={{
                  animationDelay: `${i * STROKE_STAGGER_S}s`,
                  animationDuration: `${STROKE_DRAW_S}s`
                }}
              />
            ))}
          </g>
          <g className="site-intro-logo-draw__fills">
            {RAD_LOGO_DRAW_PATHS.map((d, i) => (
              <path key={`fill-${i}`} d={d} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
