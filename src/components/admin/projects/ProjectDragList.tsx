"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Pencil, Trash2, Star } from "lucide-react"
import type { Project } from "@/lib/types"

export default function ProjectDragList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const router = useRouter()

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(projects)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    setProjects(reordered)

    const res = await fetch("/api/projects/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((p) => p.id) }),
    })
    if (!res.ok) toast.error("Reihenfolge konnte nicht gespeichert werden")
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" wirklich löschen?`)) return
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
    if (!res.ok) {
      toast.error("Fehler beim Löschen")
      return
    }
    setProjects((prev) => prev.filter((p) => p.id !== id))
    toast.success("Projekt gelöscht")
    router.refresh()
  }

  async function handleSetFeatured(id: string) {
    const res = await fetch("/api/projects/featured", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (!res.ok) {
      toast.error("Fehler")
      return
    }
    setProjects((prev) =>
      prev.map((p) => ({ ...p, is_featured: p.id === id }))
    )
    toast.success("Featured Projekt gesetzt")
    router.refresh()
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="projects">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {projects.map((project, index) => (
              <Draggable key={project.id} draggableId={project.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-shadow ${
                      snapshot.isDragging ? "shadow-lg" : ""
                    }`}
                  >
                    <span
                      {...provided.dragHandleProps}
                      className="cursor-grab text-muted-foreground hover:text-foreground"
                    >
                      <GripVertical className="h-4 w-4" />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{project.title}</span>
                        {project.is_featured && (
                          <Badge className="bg-[#8FABD420] text-[#8FABD4] border-[#8FABD440] text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSetFeatured(project.id)}
                        title="Als Featured setzen"
                        className={project.is_featured ? "text-[#8FABD4]" : "text-muted-foreground"}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Link href={`/admin/projects/${project.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id, project.title)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
