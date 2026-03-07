import type { PlannedImprovement } from "@/lib/types"

const statusConfig = {
  planned: { label: "Geplant", color: "bg-border" },
  in_progress: { label: "In Arbeit", color: "bg-[#8FABD4]" },
  completed: { label: "Fertig", color: "bg-green-500" },
}

export default function PlannedImprovements({ items }: { items: PlannedImprovement[] }) {
  if (!items.length) return null
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Geplante Verbesserungen
        </p>
        <div className="max-w-2xl divide-y divide-border">
          {items.map((item) => {
            const { label, color } = statusConfig[item.status]
            return (
              <div key={item.id} className="flex items-start gap-4 py-4">
                <div className="mt-1.5 flex items-center gap-1.5 shrink-0 w-24">
                  <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
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
