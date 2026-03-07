import Link from "next/link"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/types"

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#8FABD4]">
        Vorgestelltes Projekt
      </p>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed line-clamp-4">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 transition-opacity"
            >
              Ansehen <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {link.label.toLowerCase().includes("github") ? (
                  <Github className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {project.image_url && (
          <div className="order-first lg:order-last">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full rounded-xl border border-border object-cover aspect-video"
            />
          </div>
        )}
      </div>
    </section>
  )
}
