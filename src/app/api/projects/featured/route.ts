import { auth } from "@clerk/nextjs/server"
import { createServiceClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function PUT(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id }: { id: string } = await req.json()
  const supabase = createServiceClient()

  // Un-feature all
  await supabase.from("projects").update({ is_featured: false }).neq("id", "")
  // Feature the selected one
  const { data, error } = await supabase
    .from("projects")
    .update({ is_featured: true })
    .eq("id", id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  revalidatePath("/")
  return Response.json(data)
}
