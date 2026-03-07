import { createServiceClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ProjectDragList from "@/components/admin/projects/ProjectDragList"
import type { Project } from "@/lib/types"

export default async function AdminProjectsPage() {
  const supabase = createServiceClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("order")

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projekte</h1>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Projekt
          </Button>
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <ProjectDragList initialProjects={projects as Project[]} />
      ) : (
        <div className="rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Noch keine Projekte vorhanden.</p>
          <Link href="/admin/projects/new">
            <Button className="mt-4">Erstes Projekt erstellen</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
