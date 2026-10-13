"use client";

import { useState } from "react";
import { chessPieces, type PieceKey } from "@/lib/data";

export default function ChessQuiz() {
  const [selected, setSelected] = useState<PieceKey | null>(null);
  const result = selected ? chessPieces[selected] : null;

  return (
    <div className="chess-personality card fade-in">
      <h2>What&apos;s Your Chess Personality?</h2>
      <p>Pick a piece and find out which one matches your approach to challenges.</p>

      <div className="personality-options">
        {(Object.keys(chessPieces) as PieceKey[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`personality-btn${selected === key ? " selected" : ""}`}
            aria-pressed={selected === key}
            onClick={() => setSelected(key)}
          >
            {chessPieces[key].label}
          </button>
        ))}
      </div>

      <div className={`chess-result${result ? " active" : ""}`} aria-live="polite">
        {result && (
          <div key={selected}>
            <span className="result-glyph" aria-hidden="true">
              {result.glyph}
            </span>
            <h4>{result.title}</h4>
            <p>{result.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
