"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".fade-in, .hobby-card, .mentor-note, .wf-node, .wf-arrow";

// Fades elements in as they scroll into view, staggering siblings.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(`${SELECTOR}:not(.visible)`);
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
          timers.push(window.setTimeout(() => el.classList.add("visible"), idx * 100));
          observer.unobserve(el);
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
