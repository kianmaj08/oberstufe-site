import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import type { Project } from "@/lib/types"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .maybeSingle()
  if (!data) return {}
  return {
    title: `${data.title} | oberstufe.site`,
    description: data.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (!project) notFound()

  const p = project as Project

  return (
    <article className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
      <div className="animate-fade-in-up">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-foreground/40 hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          Zurück
        </Link>
      </div>

      <div className="mt-12 animate-fade-in-up delay-1">
        {p.tags.length > 0 && (
          <p className="mb-6 text-[11px] uppercase tracking-[0.15em] text-foreground/30">
            {p.tags.join(" · ")}
          </p>
        )}

        <h1 className="heading-display text-[clamp(2.5rem,10vw,7rem)]">
          {p.title}
        </h1>
      </div>

      <div className="mt-10 max-w-3xl animate-fade-in-up delay-2">
        <p className="font-body text-lg font-light leading-[1.8] text-foreground/70">
          {p.description}
        </p>
      </div>

      {(p.links.length > 0 || (p.members && p.members.length > 0)) && (
        <div className="mt-8 flex flex-wrap items-center gap-6 animate-fade-in-up delay-3">
          {p.links.map((link) => (
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
          {p.members && p.members.length > 0 && (
            <span className="font-body text-sm font-light text-foreground/40">
              Von {p.members.map((m) => m.name).join(", ")}
            </span>
          )}
        </div>
      )}

      {p.image_url && (
        <div className="mt-16 animate-fade-in-up delay-3">
          <img
            src={p.image_url}
            alt={p.title}
            className="w-full object-cover aspect-video"
          />
        </div>
      )}

      {p.content && (
        <div className="mt-20 max-w-3xl animate-fade-in-up delay-4">
          <div
            className="rich-content"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      )}
    </article>
  )
}
