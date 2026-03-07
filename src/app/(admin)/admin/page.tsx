import { createServiceClient } from "@/lib/supabase/server"
import { FolderOpen, MessageSquare, ListChecks } from "lucide-react"

async function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default async function AdminDashboard() {
  const supabase = createServiceClient()
  const [
    { count: projectCount },
    { count: faqCount },
    { count: improvementCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("faq_items").select("*", { count: "exact", head: true }),
    supabase.from("planned_improvements").select("*", { count: "exact", head: true }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Projekte" value={projectCount ?? 0} icon={FolderOpen} />
        <StatCard label="FAQ Einträge" value={faqCount ?? 0} icon={MessageSquare} />
        <StatCard label="Verbesserungen" value={improvementCount ?? 0} icon={ListChecks} />
      </div>
    </div>
  )
}
