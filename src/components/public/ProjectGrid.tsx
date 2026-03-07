import ProjectCard from "./ProjectCard"
import type { Project } from "@/lib/types"

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <section id="projekte" className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-center text-muted-foreground py-12">
          Keine Projekte gefunden.
        </p>
      </section>
    )
  }

  return (
    <section id="projekte" className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="mb-6 text-xl font-semibold">Alle Projekte</h2>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
