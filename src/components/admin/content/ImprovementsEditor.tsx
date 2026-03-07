"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import type { PlannedImprovement } from "@/lib/types"

const statusConfig = {
  planned: { label: "Geplant", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Arbeit", className: "bg-[#8FABD420] text-[#8FABD4]" },
  completed: { label: "Fertig", className: "bg-green-500/10 text-green-600" },
}

export default function ImprovementsEditor({ items: initialItems }: { items: PlannedImprovement[] }) {
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newStatus, setNewStatus] = useState<"planned" | "in_progress" | "completed">("planned")
  const router = useRouter()

  async function handleAdd() {
    if (!newTitle.trim()) return
    const res = await fetch("/api/improvements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription || null,
        status: newStatus,
        order: items.length,
      }),
    })
    if (!res.ok) { toast.error("Fehler"); return }
    const data = await res.json()
    setItems((prev) => [...prev, data])
    setNewTitle("")
    setNewDescription("")
    setNewStatus("planned")
    setAdding(false)
    toast.success("Verbesserung hinzugefügt")
    router.refresh()
  }

  async function handleStatusChange(id: string, status: "planned" | "in_progress" | "completed") {
    const res = await fetch(`/api/improvements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) { toast.error("Fehler"); return }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
    toast.success("Status aktualisiert")
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Verbesserung löschen?")) return
    const res = await fetch(`/api/improvements/${id}`, { method: "DELETE" })
    if (!res.ok) { toast.error("Fehler"); return }
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast.success("Verbesserung gelöscht")
    router.refresh()
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const config = statusConfig[item.status]
        return (
          <div key={item.id} className="flex items-start gap-3 rounded-lg border border-border p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-xs border ${config.className}`}>{config.label}</Badge>
                <span className="font-medium">{item.title}</span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Select
                value={item.status}
                onValueChange={(v) => handleStatusChange(item.id, v as "planned" | "in_progress" | "completed")}
              >
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Geplant</SelectItem>
                  <SelectItem value="in_progress">In Arbeit</SelectItem>
                  <SelectItem value="completed">Fertig</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}

      {adding ? (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <div className="space-y-1.5">
            <Label>Titel</Label>
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Beschreibung (optional)</Label>
            <Textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={2} />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as "planned" | "in_progress" | "completed")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Geplant</SelectItem>
                <SelectItem value="in_progress">In Arbeit</SelectItem>
                <SelectItem value="completed">Fertig</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd}>Hinzufügen</Button>
            <Button variant="outline" onClick={() => setAdding(false)}>Abbrechen</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4 mr-2" /> Verbesserung hinzufügen
        </Button>
      )}
    </div>
  )
}
