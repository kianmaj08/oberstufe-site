"use client"

import Link from "next/link"
import { Suspense } from "react"
import SearchBar from "./SearchBar"

const navLinks = [
  { href: "/#projekte", label: "Projekte" },
  { href: "/#ueber", label: "Über" },
  { href: "/#faq", label: "FAQ" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          oberstufe.site
        </Link>

        <nav className="hidden gap-5 text-sm md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Suspense fallback={<div className="h-8 w-44 rounded-md bg-muted animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  )
}
