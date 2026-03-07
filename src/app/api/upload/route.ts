import { auth } from "@clerk/nextjs/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File
  if (!file) return Response.json({ error: "No file provided" }, { status: 400 })

  const supabase = createServiceClient()
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(filename, file, { contentType: file.type, upsert: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const {
    data: { publicUrl },
  } = supabase.storage.from("project-images").getPublicUrl(data.path)

  return Response.json({ url: publicUrl })
}
