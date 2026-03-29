const ITEMS = [
  "Competitive Esports",
  "Marvel Rivals",
  "VALORANT",
  "Creator Division",
  "RAD Esports",
  "Built for Pressure"
];

export function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="at-marquee">
      <div className={`at-marquee-track${reverse ? " at-marquee-track--rev" : ""}`}>
        {doubled.map((item, i) => (
          <span key={i} className="at-marquee-item">
            {item}
            <span className="at-marquee-sep" aria-hidden="true"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
}
