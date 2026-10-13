"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Piece = { id: number; style: CSSProperties };

export default function MarshmallowRain() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  // Random positions are generated on the client only, so server and client HTML match.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.matchMedia("(max-width: 600px)").matches ? 10 : 22;
    const next = Array.from({ length: count }, (_, id) => {
      const size = Math.random() * 28 + 16;
      return {
        id,
        style: {
          width: `${size}px`,
          height: `${size * 0.85}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}vh`,
          animationDuration: `${Math.random() * 10 + 8}s`,
          animationDelay: `${Math.random() * 6}s`,
        },
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only randomness
    setPieces(next);
  }, []);

  return (
    <div className="marshmallow-container" aria-hidden="true">
      {pieces.map((p) => (
        <div key={p.id} className="marshmallow-piece" style={p.style} />
      ))}
    </div>
  );
}
