import type { PlannedImprovement } from "@/lib/types"

const statusLabels = {
  planned: "Geplant",
  in_progress: "In Arbeit",
  completed: "Fertig",
}

export default function PlannedImprovements({ items }: { items: PlannedImprovement[] }) {
  if (!items.length) return null
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
      <h2 className="heading-display text-[clamp(1.5rem,5vw,3.5rem)]">
        Geplante<br />Verbesserungen
      </h2>

      <div className="mt-16 max-w-3xl space-y-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="group flex items-baseline gap-6 py-5"
            style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-foreground/30 shrink-0 w-20">
              {statusLabels[item.status]}
            </span>
            <div>
              <p className="font-body text-base font-normal text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                {item.title}
              </p>
              {item.description && (
                <p className="mt-1 font-body text-sm font-light text-foreground/40">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
