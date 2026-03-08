import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import FeaturedProject from "@/components/public/FeaturedProject"
import ProjectGrid from "@/components/public/ProjectGrid"
import SearchBar from "@/components/public/SearchBar"
import AboutSection from "@/components/public/AboutSection"
import FaqSection from "@/components/public/FaqSection"
import PlannedImprovements from "@/components/public/PlannedImprovements"
import type { Project, FaqItem, PlannedImprovement, SiteContent } from "@/lib/types"

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

  return (
    <>
      {featured && <FeaturedProject project={featured as Project} />}

      {/* Projects Section */}
      <section id="projekte" className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
        <div className="animate-fade-in-up">
          <h2 className="heading-display text-[clamp(2.5rem,8vw,6rem)]">
            Projekte
          </h2>
        </div>

        <div className="mt-12 animate-fade-in-up delay-1">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        <div className="mt-20">
          <ProjectGrid projects={(projects as Project[]) ?? []} />
        </div>
      </section>

      <AboutSection text={contentMap["about_text"] ?? ""} />
      <FaqSection items={(faqItems as FaqItem[]) ?? []} />
      <PlannedImprovements items={(improvements as PlannedImprovement[]) ?? []} />
    </>
  )
}
