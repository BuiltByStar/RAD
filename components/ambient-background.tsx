export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_-25%,rgba(255,0,0,0.2),transparent_52%),radial-gradient(70%_58%_at_84%_12%,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="ambient-orb ambient-orb--left absolute -left-[18%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.18)_0%,transparent_66%)] blur-[58px]" />

      <div className="ambient-orb ambient-orb--right absolute right-[-22%] top-[18%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,64,64,0.1)_0%,transparent_68%)] blur-[64px]" />

      <div className="ambient-grid absolute -left-[10%] top-0 h-[140vh] w-[120%] opacity-[0.1] [background-image:linear-gradient(to_right,rgba(255,255,255,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="ambient-sweep absolute left-[-20%] top-[16%] h-24 w-[140%] rotate-[-12deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.12),rgba(255,255,255,0.06),transparent)] blur-sm" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_28%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
