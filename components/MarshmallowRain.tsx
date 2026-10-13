"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Layer = "far" | "mid" | "near";
type Piece = { id: number; layer: Layer; flavour: number; style: CSSProperties };

// Share of pieces per depth layer: lots of small, soft ones far away, a few big crisp ones up close.
const LAYERS: { layer: Layer; share: number; size: [number, number]; speed: [number, number] }[] = [
  { layer: "far", share: 0.45, size: [14, 22], speed: [38, 55] },
  { layer: "mid", share: 0.35, size: [24, 34], speed: [28, 40] },
  { layer: "near", share: 0.2, size: [38, 52], speed: [20, 30] },
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Marshmallows falling gently through the section, at three depths.
export default function MarshmallowRain() {
  const ref = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [still, setStill] = useState(false);

  // Random positions are generated on the client only, so server and client HTML match.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = window.matchMedia("(max-width: 600px)").matches ? 14 : 26;
    const travel = (ref.current?.offsetHeight ?? window.innerHeight) + 120;

    let id = 0;
    const next: Piece[] = [];
    for (const { layer, share, size, speed } of LAYERS) {
      for (let i = 0; i < Math.round(total * share); i++) {
        const duration = rand(...speed);
        // Resting pieces stay clear of the heading: near the top, keep them to the side edges.
        const top = rand(4, 92);
        const left = reduced && top < 25 ? (Math.random() < 0.5 ? rand(2, 18) : rand(82, 96)) : rand(2, 96);
        next.push({
          id: id++,
          layer,
          flavour: Math.floor(Math.random() * 4),
          style: {
            "--size": `${rand(...size)}px`,
            "--travel": `${travel}px`,
            "--sway": `${rand(12, 36) * (Math.random() < 0.5 ? -1 : 1)}px`,
            "--tilt": `${rand(-25, 25)}deg`,
            left: `${left}%`,
            top: reduced ? `${top}%` : undefined,
            animationDuration: `${duration}s`,
            // Negative delay: every piece starts part-way through its trip, so the sky is full on load.
            animationDelay: `${-rand(0, duration)}s`,
          } as CSSProperties,
        });
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only randomness
    setStill(reduced);
    setPieces(next);
  }, []);

  return (
    <div ref={ref} className={`marshmallow-container${still ? " still" : ""}`} aria-hidden="true">
      {pieces.map((p) => (
        <div key={p.id} className={`mm-drift mm-${p.layer}`} style={p.style}>
          <div className={`marshmallow-piece mm-flavour-${p.flavour}`} />
        </div>
      ))}
    </div>
  );
}
