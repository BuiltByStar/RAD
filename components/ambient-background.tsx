export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050507_0%,#08080b_36%,#030304_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(88%_62%_at_50%_-8%,rgba(220,20,60,0.24),transparent_56%),radial-gradient(55%_50%_at_85%_14%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(58%_72%_at_10%_76%,rgba(122,7,20,0.22),transparent_72%)]" />

      <div className="ambient-orb ambient-orb--left absolute -left-[14%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_45%_42%,rgba(220,20,60,0.2)_0%,rgba(122,7,20,0.15)_28%,transparent_68%)] blur-[68px]" />
      <div className="ambient-orb ambient-orb--right absolute right-[-18%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,80,108,0.08)_0%,rgba(52,1,6,0.16)_38%,transparent_70%)] blur-[80px]" />
      <div className="ambient-orb ambient-orb--left absolute left-[20%] top-[48%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_72%)] blur-[78px]" />

      <div className="absolute inset-y-0 left-[9%] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute inset-y-0 right-[11%] w-px bg-gradient-to-b from-transparent via-[#dc143c]/20 to-transparent" />

      <div className="ambient-sweep absolute left-[-18%] top-[18%] h-24 w-[140%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.13),rgba(255,255,255,0.04),transparent)] blur-sm" />
      <div className="ambient-sweep absolute left-[-14%] top-[58%] h-20 w-[132%] rotate-[7deg] bg-[linear-gradient(90deg,transparent,rgba(122,7,20,0.18),rgba(255,255,255,0.03),transparent)] blur-md" />

      <div className="absolute left-[-8%] top-[24%] h-[26rem] w-[58rem] rotate-[-14deg] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.08),transparent_72%)] opacity-80 blur-[2px]" />
      <div className="absolute right-[-18%] top-[54%] h-[22rem] w-[44rem] rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.025),rgba(220,20,60,0.09),transparent)] opacity-85 blur-[1px]" />

      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.92)_0.7px,transparent_0.85px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_24%,transparent_84%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(220,20,60,0.95)_0.55px,transparent_0.75px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_78%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(115deg,transparent_0%,transparent_44%,rgba(255,255,255,0.75)_49%,transparent_54%,transparent_100%)] [background-size:100%_100%] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_76%)]" />

      <div className="absolute left-[8%] top-[14%] h-[40rem] w-[1px] rotate-[20deg] bg-gradient-to-b from-transparent via-[#dc143c]/28 to-transparent" />
      <div className="absolute right-[18%] top-[8%] h-[34rem] w-[1px] rotate-[-24deg] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-[linear-gradient(180deg,transparent,rgba(3,3,4,0.92)_72%,#030304_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_74%_at_50%_42%,transparent_34%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}
