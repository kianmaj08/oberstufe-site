"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import ImageUploader from "./ImageUploader"
import { slugify } from "@/lib/utils"
import type { Project } from "@/lib/types"

const projectSchema = z.object({
  title: z.string().min(1, "Pflichtfeld"),
  description: z.string().min(1, "Pflichtfeld"),
  content: z.string(),
  slug: z.string().min(1, "Pflichtfeld").regex(/^[a-z0-9-]+$/, "Nur a-z, 0-9 und -"),
  image_url: z.string(),
  tags: z.string(),
  is_featured: z.boolean(),
  links: z.array(z.object({ label: z.string().min(1), url: z.string().url("Ungültige URL") })),
  members: z.array(z.object({ id: z.string(), name: z.string().min(1), avatar: z.string() })),
})

type FormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const isEdit = !!project

  const { register, control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      content: project?.content ?? "",
      slug: project?.slug ?? "",
      image_url: project?.image_url ?? "",
      tags: project?.tags?.join(", ") ?? "",
      is_featured: project?.is_featured ?? false,
      links: project?.links ?? [],
      members: project?.members ?? [],
    },
  })

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({ control, name: "links" })
  const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({ control, name: "members" })

  const titleValue = watch("title")

  function handleTitleBlur() {
    if (!isEdit && !watch("slug")) {
      setValue("slug", slugify(titleValue))
    }
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      ...values,
      tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }

    const url = isEdit ? `/api/projects/${project.id}` : "/api/projects"
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      toast.error(data.error ?? "Fehler beim Speichern")
      return
    }

    toast.success(isEdit ? "Projekt aktualisiert" : "Projekt erstellt")
    router.push("/admin/projects")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Titel *</Label>
        <Input id="title" {...register("title")} onBlur={handleTitleBlur} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug *</Label>
        <Input id="slug" {...register("slug")} />
        {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Kurzbeschreibung *</Label>
        <Textarea id="description" {...register("description")} rows={3} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <Label htmlFor="content">Inhalt (HTML)</Label>
        <Textarea id="content" {...register("content")} rows={8} className="font-mono text-sm" />
      </div>

      {/* Image */}
      <div className="space-y-1.5">
        <Label>Vorschaubild</Label>
        <ImageUploader
          value={watch("image_url")}
          onChange={(url) => setValue("image_url", url)}
        />
      </div>

      {/* Tags */}
      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags (kommasepariert)</Label>
        <Input id="tags" {...register("tags")} placeholder="React, Next.js, TypeScript" />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_featured" {...register("is_featured")} className="h-4 w-4" />
        <Label htmlFor="is_featured">Als Featured Projekt anzeigen</Label>
      </div>

      {/* Links */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Links</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => appendLink({ label: "", url: "" })}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Link hinzufügen
          </Button>
        </div>
        {linkFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input placeholder="Label (z.B. GitHub)" {...register(`links.${index}.label`)} />
            <Input placeholder="https://..." {...register(`links.${index}.url`)} />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(index)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {/* Members */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Mitglieder</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendMember({ id: crypto.randomUUID(), name: "", avatar: "" })}
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Mitglied hinzufügen
          </Button>
        </div>
        {memberFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input placeholder="Name" {...register(`members.${index}.name`)} />
            <Input placeholder="Avatar URL (optional)" {...register(`members.${index}.avatar`)} />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeMember(index)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Speichern..." : isEdit ? "Aktualisieren" : "Erstellen"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Abbrechen
        </Button>
      </div>
    </form>
  )
}
