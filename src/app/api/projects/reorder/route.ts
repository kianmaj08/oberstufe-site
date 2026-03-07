import { auth } from "@clerk/nextjs/server"
import { createServiceClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { ids }: { ids: string[] } = await req.json()
  const supabase = createServiceClient()

  const updates = ids.map((id, index) =>
    supabase.from("projects").update({ order: index }).eq("id", id)
  )
  await Promise.all(updates)

  revalidatePath("/")
  return Response.json({ success: true })
}
