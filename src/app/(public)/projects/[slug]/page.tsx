import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
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
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Link>

      {p.image_url && (
        <img
          src={p.image_url}
          alt={p.title}
          className="mb-8 w-full rounded-xl object-cover aspect-video"
        />
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {p.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="text-3xl font-bold">{p.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{p.description}</p>

      {/* Links */}
      {p.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
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
      )}

      {/* Members */}
      {p.members && p.members.length > 0 && (
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Ein Projekt von:</span>
          <div className="flex items-center gap-2">
            {p.members.map((member) => (
              <div key={member.id} className="flex items-center gap-1.5">
                <Avatar className="size-7">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rich content */}
      {p.content && (
        <div
          className="mt-10 prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: p.content }}
        />
      )}
    </article>
  )
}
