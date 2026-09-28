"use client";

import { useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-mainbg border-b border-borderc">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790405860/330421.jpg"
            alt="Dreazy Empire logo"
            className="w-9 h-9 rounded-md object-cover"
          />
          <span className="text-lg font-bold tracking-tight">Dreazy Empire</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-textsecondary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-accent transition">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-textprimary transition ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-textprimary transition ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-textprimary transition ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-borderc bg-mainbg px-6 py-4 flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-4 text-lg border-b border-borderc last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
