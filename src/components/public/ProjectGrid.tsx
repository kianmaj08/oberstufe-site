import ProjectCard from "./ProjectCard"
import type { Project } from "@/lib/types"

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="font-body text-sm font-light text-foreground/40">
        Keine Projekte gefunden.
      </p>
    )
  }

  return (
    <div className="space-y-28">
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${(i + 1) * 120}ms` }}
        >
          <ProjectCard project={project} reversed={i % 2 === 1} />
        </div>
      ))}
    </div>
  )
}
