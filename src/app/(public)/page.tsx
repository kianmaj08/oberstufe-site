import { createClient } from "@/lib/supabase/server"
import FeaturedProject from "@/components/public/FeaturedProject"
import ProjectGrid from "@/components/public/ProjectGrid"
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
    <div>
      {featured && <FeaturedProject project={featured as Project} />}
      <ProjectGrid projects={(projects as Project[]) ?? []} />
      <AboutSection text={contentMap["about_text"] ?? ""} />
      <FaqSection items={(faqItems as FaqItem[]) ?? []} />
      <PlannedImprovements items={(improvements as PlannedImprovement[]) ?? []} />
    </div>
  )
}
