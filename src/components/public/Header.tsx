"use client"

import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react"

const navLinks = [
  { href: "/#projekte", label: "Projekte" },
  { href: "/#ueber", label: "Über" },
  { href: "/#faq", label: "FAQ" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/80 hover:text-foreground transition-colors duration-300"
        >
          Oberstufe
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 hover:text-foreground transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-[11px] uppercase tracking-[0.15em] text-foreground/60"
          aria-label="Menü"
        >
          Menü
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center gap-10 md:hidden animate-fade-in">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-7 right-6 text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="heading-display text-4xl text-foreground hover:opacity-50 transition-opacity duration-300"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
