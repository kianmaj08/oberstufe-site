"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
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
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        placeholder="Projekt suchen..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleSearch}
        className={`pl-8 w-48 text-sm transition-opacity ${isPending ? "opacity-70" : ""}`}
        aria-label="Projekte suchen"
      />
    </div>
  )
}
