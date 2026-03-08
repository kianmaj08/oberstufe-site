import Link from "next/link"
import type { Project } from "@/lib/types"

export default function ProjectCard({ project, reversed = false }: { project: Project; reversed?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {project.image_url ? (
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className={reversed ? "lg:col-span-5 lg:order-2" : "lg:col-span-7"}>
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full object-cover aspect-[4/3] transition-opacity duration-500 group-hover:opacity-85"
            />
          </div>
          <div className={reversed ? "lg:col-span-7 lg:order-1" : "lg:col-span-5"}>
            <ProjectInfo project={project} />
          </div>
        </div>
      ) : (
        <div className="max-w-2xl">
          <ProjectInfo project={project} />
        </div>
      )}
    </Link>
  )
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,4vw,2.5rem)] group-hover:opacity-60 transition-opacity duration-300">
        {project.title}
      </h3>
      <p className="mt-4 font-body text-base font-light leading-[1.7] text-foreground/60">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-foreground/30">
          {project.tags.join(" · ")}
        </p>
      )}
      {project.members && project.members.length > 0 && (
        <p className="mt-3 font-body text-sm font-light text-foreground/40">
          {project.members.map((m) => m.name).join(", ")}
        </p>
      )}
    </div>
  )
}
