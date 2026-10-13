"use client";

import { useEffect, useState } from "react";

export default function Totoro() {
  const [talking, setTalking] = useState(false);

  useEffect(() => {
    if (!talking) return;
    const t = setTimeout(() => setTalking(false), 4500);
    return () => clearTimeout(t);
  }, [talking]);

  return (
    <div className="totoro-wrap">
      <p className={`totoro-bubble${talking ? " show" : ""}`} role="status">
        {talking ? "Hello! I'm a friendly Totoro — keeper of Ghibli magic and good vibes." : ""}
      </p>
      <button
        type="button"
        className="totoro"
        aria-label="Say hello to Totoro"
        aria-expanded={talking}
        onClick={() => setTalking((t) => !t)}
      />
    </div>
  );
}
