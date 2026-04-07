"use client";

import { useEffect, useState } from "react";

export function PassiveAtmosphere() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="passive-atmosphere" aria-hidden="true">
      {/* 
        Generating a fixed number of lines with random delays and durations 
        using CSS classes mapped in globals.css for performance 
      */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`speedline speedline-${i + 1}`} />
      ))}
      <div className="atmosphere-vignette" />
    </div>
  );
}
