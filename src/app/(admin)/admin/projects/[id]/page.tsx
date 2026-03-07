import { createServiceClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ProjectForm from "@/components/admin/projects/ProjectForm"
import type { Project } from "@/lib/types"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const supabase = createServiceClient()
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (!project) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projekt bearbeiten</h1>
      <ProjectForm project={project as Project} />
    </div>
  )
}
