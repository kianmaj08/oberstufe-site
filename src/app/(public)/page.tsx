import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import FeaturedProject from "@/components/public/FeaturedProject"
import ProjectGrid from "@/components/public/ProjectGrid"
import SearchBar from "@/components/public/SearchBar"
import AboutSection from "@/components/public/AboutSection"
import FaqSection from "@/components/public/FaqSection"
import PlannedImprovements from "@/components/public/PlannedImprovements"
import type { Project, FaqItem, PlannedImprovement, SiteContent } from "@/lib/types"

/* ── Fallback content (used when Supabase is empty) ───────────────── */

const FALLBACK_ABOUT = `Dieses Projekt entstand im Rahmen unserer schulischen Arbeiten an der Oberstufe. Wir setzen uns mit Themen wie Philosophie, Kunst, Geschichte und Technologie auseinander — und nutzen dabei unter anderem künstliche Intelligenz als kreatives Werkzeug.

Die Ergebnisse veröffentlichen wir hier auf oberstufe.site: Websites, Präsentationen und interaktive Projekte, die im Unterricht oder in eigenständiger Arbeit entstanden sind.

Unsere Seiten werden über Vercel bereitgestellt, die Domain läuft über Squarespace.

Bitte beachten Sie: Alle Projekte befinden sich in aktiver Entwicklung. Inhalte und Gestaltung können sich jederzeit ändern.

Bei Fragen, Anregungen oder Ideen erreichen Sie uns unter oberstufesite@gmail.com.`

const FALLBACK_FAQ: FaqItem[] = [
  {
    id: "faq-1",
    question: "Was ist oberstufe.site?",
    answer: "oberstufe.site ist unsere zentrale Plattform, auf der wir alle Schülerprojekte der Oberstufe bündeln und öffentlich zugänglich machen.",
    order: 1,
    created_at: "",
  },
  {
    id: "faq-2",
    question: "Warum gibt es mehrere Websites?",
    answer: "Jedes Projekt widmet sich einem eigenen Themengebiet — zum Beispiel Philosophie, Kunst oder Geschichte. Eigenständige Websites ermöglichen es uns, jedes Thema individuell und angemessen zu präsentieren.",
    order: 2,
    created_at: "",
  },
  {
    id: "faq-3",
    question: "Sind die Inhalte schon final?",
    answer: "Nein. Alle Projekte sind noch in Arbeit und werden kontinuierlich weiterentwickelt. Sowohl Inhalte als auch das Design können sich jederzeit ändern.",
    order: 3,
    created_at: "",
  },
  {
    id: "faq-4",
    question: "Wie werden die Seiten betrieben?",
    answer: "Unsere Websites laufen über Vercel als Hosting-Plattform. Die Domain oberstufe.site wird über Squarespace verwaltet.",
    order: 4,
    created_at: "",
  },
  {
    id: "faq-5",
    question: "Kann ich Feedback geben oder Ideen einreichen?",
    answer: "Selbstverständlich. Wir freuen uns über jede Rückmeldung — per E-Mail an oberstufesite@gmail.com oder über unser Feedback-Formular.",
    order: 5,
    created_at: "",
  },
]

const FALLBACK_IMPROVEMENTS: PlannedImprovement[] = [
  {
    id: "imp-1",
    title: "Optimierung der Homepage",
    description: "Verbesserung von Struktur, Design und Benutzerfreundlichkeit der Startseite.",
    status: "in_progress",
    order: 1,
    created_at: "",
  },
  {
    id: "imp-2",
    title: "Integration von Bildmaterial",
    description: "Ergänzung passender Abbildungen auf der Philexikon- und Pieter-Bruegel-Seite, um die Inhalte anschaulicher zu gestalten.",
    status: "planned",
    order: 2,
    created_at: "",
  },
]

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "placeholder-1",
    title: "Philexikon",
    description: "Ein interaktives Philosophie-Lexikon, das zentrale Begriffe, Denker und Strömungen der Philosophiegeschichte verständlich aufbereitet und miteinander verknüpft.",
    content: "",
    slug: "philexikon",
    image_url: null,
    tags: ["Philosophie", "Lexikon", "Bildung"],
    links: [],
    members: [{ id: "m1", name: "Schülergruppe A" }],
    is_featured: false,
    order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-2",
    title: "Pieter Bruegel",
    description: "Eine Erkundung des Lebens und Werks von Pieter Bruegel dem Älteren — seinen Gemälden, seiner Epoche und seinem Einfluss auf die europäische Kunstgeschichte.",
    content: "",
    slug: "pieter-bruegel",
    image_url: null,
    tags: ["Kunst", "Geschichte", "Renaissance"],
    links: [],
    members: [{ id: "m2", name: "Schülergruppe B" }],
    is_featured: false,
    order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-3",
    title: "KI im Unterricht",
    description: "Wie lässt sich künstliche Intelligenz sinnvoll im schulischen Alltag einsetzen? Dieses Projekt untersucht Chancen, Grenzen und praktische Anwendungen von KI-Werkzeugen im Unterricht.",
    content: "",
    slug: "ki-im-unterricht",
    image_url: null,
    tags: ["Technologie", "KI", "Schule"],
    links: [],
    members: [{ id: "m3", name: "Schülergruppe C" }],
    is_featured: false,
    order: 3,
    created_at: "",
    updated_at: "",
  },
]

/* ── Page ──────────────────────────────────────────────────────────── */

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const { search } = await searchParams
  const supabase = await createClient()

  let projectsQuery = supabase
    .from("projects")
    .select("*")
    .eq("is_featured", false)
    .order("order")

  if (search) {
    projectsQuery = projectsQuery.or(
      `title.ilike.%${search}%,description.ilike.%${search}%`
    )
  }

  const [
    { data: featured },
    { data: projects },
    { data: faqItems },
    { data: improvements },
    { data: siteContent },
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("is_featured", true).maybeSingle(),
    projectsQuery,
    supabase.from("faq_items").select("*").order("order"),
    supabase.from("planned_improvements").select("*").order("order"),
    supabase.from("site_content").select("*"),
  ])

  const contentMap = Object.fromEntries(
    ((siteContent as SiteContent[]) ?? []).map(({ key, value }) => [key, value])
  )

  // Use DB data if available, otherwise fall back to hardcoded content
  const aboutText = contentMap["about_text"] || FALLBACK_ABOUT
  const faqList = (faqItems as FaqItem[])?.length ? (faqItems as FaqItem[]) : FALLBACK_FAQ
  const improvementsList = (improvements as PlannedImprovement[])?.length
    ? (improvements as PlannedImprovement[])
    : FALLBACK_IMPROVEMENTS
  const projectList = (projects as Project[])?.length
    ? (projects as Project[])
    : FALLBACK_PROJECTS

  return (
    <>
      {featured && <FeaturedProject project={featured as Project} />}

      {/* Projects Section */}
      <section id="projekte" className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
        <div className="animate-fade-in-up">
          <div className="flex items-end gap-4">
            <h2 className="heading-display text-[clamp(2.5rem,8vw,6rem)]">
              Projekte
            </h2>
            <div className="mb-2 h-1.5 w-1.5 rounded-full bg-brand" />
          </div>
        </div>

        <div className="mt-12 animate-fade-in-up delay-1">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        <div className="mt-20">
          <ProjectGrid projects={projectList} />
        </div>
      </section>

      <AboutSection text={aboutText} />
      <FaqSection items={faqList} />
      <PlannedImprovements items={improvementsList} />
    </>
  )
}
