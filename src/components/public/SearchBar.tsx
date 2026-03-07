"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
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
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder="Suchen..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleSearch}
        aria-label="Projekte suchen"
        className={`h-8 w-44 rounded-md border border-border bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50 focus:border-[#8FABD4] transition-all ${isPending ? "opacity-60" : ""}`}
      />
    </div>
  )
}
