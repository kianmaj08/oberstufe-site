import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_content").select("*")
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PUT(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { key, value }: { key: string; value: string } = await req.json()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("site_content")
    .upsert({ key, value })
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath("/")
  return Response.json(data)
}
