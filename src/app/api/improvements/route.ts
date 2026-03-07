import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("planned_improvements")
    .select("*")
    .order("order")
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("planned_improvements")
    .insert(body)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath("/")
  return Response.json(data, { status: 201 })
}
