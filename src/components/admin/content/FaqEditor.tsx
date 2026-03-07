"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, GripVertical } from "lucide-react"
import type { FaqItem } from "@/lib/types"

export default function FaqEditor({ items: initialItems }: { items: FaqItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const router = useRouter()

  async function handleAdd() {
    if (!newQuestion.trim() || !newAnswer.trim()) return
    const res = await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: newQuestion,
        answer: newAnswer,
        order: items.length,
      }),
    })
    if (!res.ok) { toast.error("Fehler"); return }
    const data = await res.json()
    setItems((prev) => [...prev, data])
    setNewQuestion("")
    setNewAnswer("")
    setAdding(false)
    toast.success("FAQ Eintrag hinzugefügt")
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("FAQ Eintrag löschen?")) return
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" })
    if (!res.ok) { toast.error("Fehler"); return }
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast.success("FAQ Eintrag gelöscht")
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border border-border p-4 space-y-2">
          <div className="flex items-start gap-2">
            <GripVertical className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
            <div className="flex-1 space-y-2">
              <p className="font-medium">{item.question}</p>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(item.id)}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {adding ? (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <div className="space-y-1.5">
            <Label>Frage</Label>
            <Input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Was möchtest du fragen?" />
          </div>
          <div className="space-y-1.5">
            <Label>Antwort</Label>
            <Textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} rows={3} placeholder="Antwort..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd}>Hinzufügen</Button>
            <Button variant="outline" onClick={() => setAdding(false)}>Abbrechen</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4 mr-2" /> FAQ Eintrag hinzufügen
        </Button>
      )}
    </div>
  )
}
