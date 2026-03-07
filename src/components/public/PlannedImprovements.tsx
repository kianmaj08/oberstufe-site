import { Badge } from "@/components/ui/badge"
import type { PlannedImprovement } from "@/lib/types"

const statusConfig = {
  planned: { label: "Geplant", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Arbeit", className: "bg-[#8FABD420] text-[#8FABD4] border-[#8FABD440]" },
  completed: { label: "Fertig", className: "bg-green-500/10 text-green-600 border-green-500/20" },
}

export default function PlannedImprovements({ items }: { items: PlannedImprovement[] }) {
  if (!items.length) return null
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">Geplante Verbesserungen</h2>
        <div className="space-y-3">
          {items.map((item) => {
            const config = statusConfig[item.status]
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-border p-4"
              >
                <Badge className={`mt-0.5 shrink-0 border ${config.className}`}>
                  {config.label}
                </Badge>
                <div>
                  <p className="font-medium">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
