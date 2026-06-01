export function RadShellAmbient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "url('/assets/rad-scratch-bg-concept.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(229,6,47,0.09),transparent_58%)]" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-[var(--color-blood)]/20 to-transparent" />
    </div>
  );
}
