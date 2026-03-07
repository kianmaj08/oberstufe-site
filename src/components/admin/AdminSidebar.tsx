"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projekte", icon: FolderOpen, exact: false },
  { href: "/admin/content", label: "Inhalte", icon: FileText, exact: false },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 border-r border-border bg-sidebar flex flex-col">
      <div className="px-4 py-5 border-b border-border">
        <Link href="/" className="text-sm font-semibold text-foreground hover:opacity-80 transition-opacity">
          oberstufe.site
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">Admin Panel</p>
      </div>
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#8FABD420] text-[#8FABD4]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
