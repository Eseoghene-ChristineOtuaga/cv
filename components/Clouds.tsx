import type { CSSProperties } from "react";

// Two cumulus silhouettes in a 200x100 box: puffy tops, flat bottoms.
const shapes = [
  { puffs: [[48, 64, 24], [82, 46, 32], [122, 50, 28], [154, 64, 20]], base: [28, 62, 146, 26] },
  { puffs: [[40, 66, 18], [68, 52, 26], [104, 40, 34], [142, 54, 26], [170, 68, 16]], base: [24, 64, 158, 24] },
];

// Each cloud crosses the hero slowly. Far clouds are smaller, fainter, softer, and slower.
const clouds = [
  { shape: 0, width: 240, top: "8%", duration: 170, delay: -40, opacity: 0.55, blur: 0.6, rest: "6%" },
  { shape: 1, width: 320, top: "66%", duration: 230, delay: -150, opacity: 0.45, blur: 1, rest: "62%" },
  { shape: 1, width: 150, top: "28%", duration: 280, delay: -90, opacity: 0.35, blur: 2, rest: "48%" },
  { shape: 0, width: 120, top: "84%", duration: 320, delay: -220, opacity: 0.3, blur: 2.5, rest: "20%" },
  { shape: 0, width: 180, top: "46%", duration: 200, delay: -10, opacity: 0.4, blur: 1.5, rest: "82%" },
];

export default function Clouds() {
  return (
    <div className="hero-sky" aria-hidden="true">
      {clouds.map((c, i) => {
        const { puffs, base } = shapes[c.shape];
        const style = {
          "--w": `${c.width}px`,
          "--rest": c.rest,
          top: c.top,
          opacity: c.opacity,
          filter: c.blur ? `blur(${c.blur}px)` : undefined,
          animationDuration: `${c.duration}s`,
          animationDelay: `${c.delay}s`,
        } as CSSProperties;
        return (
          <svg key={i} className="hero-cloud" viewBox="0 0 200 100" style={style}>
            <defs>
              <linearGradient id={`cloud-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#f8fbf9" />
                <stop offset="100%" stopColor="#e4eef0" />
              </linearGradient>
            </defs>
            <g fill={`url(#cloud-fill-${i})`}>
              {puffs.map(([cx, cy, r]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
              ))}
              <rect x={base[0]} y={base[1]} width={base[2]} height={base[3]} rx={base[3] / 2} />
            </g>
          </svg>
        );
      })}
    </div>
  );
}
