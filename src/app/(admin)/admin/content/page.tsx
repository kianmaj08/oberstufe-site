import { createServiceClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FaqEditor from "@/components/admin/content/FaqEditor"
import ImprovementsEditor from "@/components/admin/content/ImprovementsEditor"
import SiteContentEditor from "@/components/admin/content/SiteContentEditor"
import type { FaqItem, PlannedImprovement, SiteContent } from "@/lib/types"

export default async function AdminContentPage() {
  const supabase = createServiceClient()
  const [
    { data: faqItems },
    { data: improvements },
    { data: siteContent },
  ] = await Promise.all([
    supabase.from("faq_items").select("*").order("order"),
    supabase.from("planned_improvements").select("*").order("order"),
    supabase.from("site_content").select("*"),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inhalte verwalten</h1>
      <Tabs defaultValue="about">
        <TabsList className="mb-6">
          <TabsTrigger value="about">Über</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="improvements">Verbesserungen</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <SiteContentEditor
            content={(siteContent as SiteContent[]) ?? []}
          />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor items={(faqItems as FaqItem[]) ?? []} />
        </TabsContent>

        <TabsContent value="improvements">
          <ImprovementsEditor items={(improvements as PlannedImprovement[]) ?? []} />
        </TabsContent>

        <TabsContent value="settings">
          <SiteContentEditor
            content={(siteContent as SiteContent[]) ?? []}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
