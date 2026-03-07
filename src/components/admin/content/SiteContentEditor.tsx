"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { SiteContent } from "@/lib/types"

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "site_title", label: "Website-Titel" },
  { key: "site_subtitle", label: "Untertitel" },
  { key: "about_text", label: "Über dieses Projekt", multiline: true },
  { key: "footer_text", label: "Footer Text" },
]

export default function SiteContentEditor({ content }: { content: SiteContent[] }) {
  const contentMap = Object.fromEntries(content.map(({ key, value }) => [key, value]))
  const [values, setValues] = useState<Record<string, string>>(contentMap)
  const [saving, setSaving] = useState<string | null>(null)
  const router = useRouter()

  async function handleSave(key: string) {
    setSaving(key)
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: values[key] ?? "" }),
    })
    setSaving(null)
    if (!res.ok) { toast.error("Fehler beim Speichern"); return }
    toast.success("Gespeichert")
    router.refresh()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {FIELDS.map(({ key, label, multiline }) => (
        <div key={key} className="space-y-2">
          <Label>{label}</Label>
          {multiline ? (
            <Textarea
              value={values[key] ?? ""}
              onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
              rows={5}
            />
          ) : (
            <Input
              value={values[key] ?? ""}
              onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          )}
          <Button
            size="sm"
            onClick={() => handleSave(key)}
            disabled={saving === key}
          >
            {saving === key ? "Speichern..." : "Speichern"}
          </Button>
        </div>
      ))}
    </div>
  )
}
