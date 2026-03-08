import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/types"

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 pt-12">
      <div className="animate-fade-in-up">
        <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">
          Vorgestelltes Projekt
        </p>
      </div>

      <div className="mt-8 animate-fade-in-up delay-1">
        <h1 className="heading-display text-[clamp(3rem,15vw,12rem)]">
          {project.title}
        </h1>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start animate-fade-in-up delay-2">
        <div className="lg:col-span-5">
          <p className="font-body text-lg font-light leading-[1.7] text-foreground/70">
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-foreground/35">
              {project.tags.join(" · ")}
            </p>
          )}

          {project.members && project.members.length > 0 && (
            <p className="mt-4 font-body text-sm font-light text-foreground/50">
              Von {project.members.map((m) => m.name).join(", ")}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 bg-brand px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity duration-300"
            >
              Ansehen
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 underline underline-offset-4 decoration-foreground/15 hover:text-foreground hover:decoration-foreground/40 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {project.image_url && (
          <div className="lg:col-span-7">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full object-cover aspect-[4/3]"
            />
          </div>
        )}
      </div>
    </section>
  )
}
