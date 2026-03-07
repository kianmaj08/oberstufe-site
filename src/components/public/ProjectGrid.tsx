import ProjectCard from "./ProjectCard"
import type { Project } from "@/lib/types"

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projekte" className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-sm font-medium">
          Alle Projekte
          <span className="ml-2 text-muted-foreground font-normal">{projects.length}</span>
        </h2>
      </div>

      {projects.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Keine Projekte gefunden.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
