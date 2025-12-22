"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        alert("Command palette coming soon 🚀");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Ambient top shadow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/40 to-transparent" />

      <div
        className="
          mx-auto mt-4 flex h-16 max-w-7xl items-center justify-between px-6
          rounded-2xl
          bg-black/50 backdrop-blur-md border border-white/5
          shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        "
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-white">
          Gyra<span className="text-purple-400">Labs</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Peanut", href: "/peanut" },
            { name: "Contact", href: "/contact" },
            { name: "Pricing", href: "/pricing" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="
                relative text-neutral-400
                transition-all duration-300
                hover:-translate-y-[1px]
                hover:text-white
                after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
                after:bg-gradient-to-r after:from-purple-400 after:to-violet-500
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cmd + K Button */}
          <button
            onClick={() => alert("Command palette coming soon 🚀")}
            className="
              hidden md:flex items-center gap-2
              rounded-xl px-3 py-2 text-sm
              text-neutral-300

              bg-[#0b0f0c]
              shadow-[inset_2px_2px_6px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.6)]

              transition-all duration-300
              hover:text-white
            "
          >
            <span className="text-neutral-400">Search</span>
            <span className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-neutral-400">
              ⌘ K
            </span>
          </button>

          {/* CTA */}
          <button
            className="
              relative rounded-full px-4 py-2 text-sm font-medium
              text-purple-300

              bg-[#0b0f0c]

              shadow-[inset_3px_3px_8px_rgba(255,255,255,0.06),inset_-3px_-3px_10px_rgba(0,0,0,0.7),0_8px_24px_rgba(147,51,234,0.25)]

              transition-all duration-300 ease-out

              hover:text-white
              hover:shadow-[inset_2px_2px_6px_rgba(255,255,255,0.08),inset_-2px_-2px_8px_rgba(0,0,0,0.85),0_10px_30px_rgba(147,51,234,0.35)]

              active:translate-y-[1px]
            "
          >
            Start free
          </button>
        </div>
      </div>
    </header>
  );
}
