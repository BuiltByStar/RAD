export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020203_0%,#060608_32%,#020203_100%)]" />

      <div
        className="absolute inset-[-10%] opacity-[0.048]"
        style={{
          backgroundImage: "url('/assets/rad-scratch-bg-concept.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover"
        }}
      />
      <div
        className="absolute inset-[-12%] opacity-[0.027] mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/rad-scratch-bg-concept.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          filter: "contrast(1.22) saturate(1.08) hue-rotate(-6deg)"
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(88%_62%_at_50%_-8%,rgba(220,20,60,0.08),transparent_56%),radial-gradient(55%_50%_at_85%_14%,rgba(255,255,255,0.01),transparent_60%),radial-gradient(58%_72%_at_10%_76%,rgba(122,7,20,0.1),transparent_72%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.8)_0%,rgba(3,3,4,0.46)_34%,rgba(52,1,6,0.22)_68%,rgba(0,0,0,0.88)_100%)]" />

      <div className="ambient-orb ambient-orb--left absolute -left-[14%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_45%_42%,rgba(220,20,60,0.14)_0%,rgba(122,7,20,0.12)_28%,transparent_68%)] blur-[68px]" />
      <div className="ambient-orb ambient-orb--right absolute right-[-18%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,80,108,0.06)_0%,rgba(52,1,6,0.12)_38%,transparent_70%)] blur-[80px]" />
      <div className="ambient-orb ambient-orb--left absolute left-[20%] top-[48%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.025)_0%,transparent_72%)] blur-[78px]" />

      <div className="scratch-slash scratch-slash--one" />
      <div className="scratch-slash scratch-slash--two" />
      <div className="scratch-slash scratch-slash--three" />
      <div className="scratch-slash scratch-slash--four" />
      <div className="scratch-slash scratch-slash--five" />

      <div className="absolute inset-y-0 left-[9%] w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute inset-y-0 right-[11%] w-px bg-gradient-to-b from-transparent via-[#dc143c]/16 to-transparent" />

      <div className="ambient-sweep absolute left-[-18%] top-[18%] h-24 w-[140%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.08),rgba(255,255,255,0.025),transparent)] blur-sm" />
      <div className="ambient-sweep absolute left-[-14%] top-[58%] h-20 w-[132%] rotate-[7deg] bg-[linear-gradient(90deg,transparent,rgba(122,7,20,0.12),rgba(255,255,255,0.02),transparent)] blur-md" />

      <div className="absolute left-[-8%] top-[24%] h-[26rem] w-[58rem] rotate-[-14deg] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.06),transparent_72%)] opacity-80 blur-[2px]" />
      <div className="absolute right-[-18%] top-[54%] h-[22rem] w-[44rem] rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.02),rgba(220,20,60,0.07),transparent)] opacity-85 blur-[1px]" />

      <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-[linear-gradient(180deg,transparent,rgba(3,3,4,0.92)_72%,#030304_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_74%_at_50%_42%,transparent_34%,rgba(0,0,0,0.82)_100%)]" />
    </div>
  );
}
