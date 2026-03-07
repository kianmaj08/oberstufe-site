import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between">
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Website ansehen
      </Link>
      <UserButton />
    </header>
  )
}
