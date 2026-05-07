export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_-25%,rgba(255,0,0,0.18),transparent_52%),radial-gradient(70%_58%_at_84%_12%,rgba(255,255,255,0.04),transparent_55%)]" />

      <div className="absolute -left-[18%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.12)_0%,transparent_66%)] blur-[62px]" />

      <div className="absolute right-[-22%] top-[18%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,64,64,0.06)_0%,transparent_68%)] blur-[70px]" />

      <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute inset-y-0 right-[14%] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

      <div className="absolute left-[-20%] top-[18%] h-24 w-[140%] rotate-[-12deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.08),rgba(255,255,255,0.03),transparent)] blur-sm" />
      <div className="absolute left-[-10%] top-[58%] h-20 w-[120%] rotate-[6deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.05),transparent)] blur-md" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_30%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
