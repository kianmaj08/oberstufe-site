import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#8FABD4]">
        Vorgestelltes Projekt
      </p>
      <div className="overflow-hidden rounded-2xl border border-border bg-[#1A1A1A]">
        <div className="flex flex-col lg:flex-row">
          {project.image_url && (
            <div className="lg:w-1/2">
              <img
                src={project.image_url}
                alt={project.title}
                className="h-64 w-full object-cover lg:h-full"
              />
            </div>
          )}
          <div className={`flex flex-col justify-center p-8 ${project.image_url ? "lg:w-1/2" : "w-full"}`}>
            <div className="mb-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} className="bg-neutral-700 text-neutral-300 hover:bg-neutral-600 border-0">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-neutral-100 lg:text-3xl">
              {project.title}
            </h2>
            <p className="mt-3 text-neutral-400 line-clamp-3">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#8FABD4] px-4 py-2 text-sm font-medium text-[#1A1A1A] hover:opacity-90 transition-opacity"
              >
                Projekt ansehen
              </Link>
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-neutral-300 hover:border-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  {link.label.toLowerCase().includes("github") ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
