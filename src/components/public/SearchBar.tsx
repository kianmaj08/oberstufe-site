"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set("search", e.target.value)
    } else {
      params.delete("search")
    }
    startTransition(() => {
      router.replace(`/?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <input
      type="text"
      placeholder="Suchen..."
      defaultValue={searchParams.get("search") ?? ""}
      onChange={handleSearch}
      aria-label="Projekte suchen"
      className={`w-full max-w-xs border-b border-foreground/15 bg-transparent pb-2 font-body text-sm font-light placeholder:text-foreground/25 focus:outline-none focus:border-brand/50 transition-colors duration-300 ${isPending ? "opacity-40" : ""}`}
    />
  )
}
