"use client"

import Link from "next/link"
import { Suspense } from "react"
import SearchBar from "./SearchBar"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          oberstufe.site
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/#projekte" className="text-muted-foreground hover:text-foreground transition-colors">
            Projekte
          </Link>
          <Link href="/#ueber" className="text-muted-foreground hover:text-foreground transition-colors">
            Über
          </Link>
          <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        <Suspense fallback={<div className="h-9 w-48 rounded-md bg-muted animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  )
}
