"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navLinks } from "@/lib/data";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the sheet whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = navLinks.map(({ href, label }) => {
    const active = isActive(pathname, href);
    return (
      <li key={href}>
        <Link
          href={href}
          className={`nav-link${active ? " active" : ""}`}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <header id="header">
      <nav className="container nav-container" aria-label="Main">
        <ul className="nav-menu">{links}</ul>

        <div className="mobile-bar">
          <Link href="/" className="mobile-brand">
            Eseoghene
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`sheet-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div id="mobile-sheet" className={`mobile-sheet${open ? " open" : ""}`} inert={!open}>
        <ul>{links}</ul>
      </div>
    </header>
  );
}
