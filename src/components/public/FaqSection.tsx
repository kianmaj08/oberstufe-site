import type { FaqItem } from "@/lib/types"

export default function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items.length) return null
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
      <div className="flex items-end gap-4">
        <h2 className="heading-display text-[clamp(2rem,6vw,4.5rem)]">
          FAQ
        </h2>
        <div className="mb-2 h-1.5 w-1.5 rounded-full bg-brand" />
      </div>

      <div className="mt-16 max-w-3xl space-y-12">
        {items.map((item, i) => (
          <div key={item.id} className="group">
            <div className="flex items-baseline gap-6">
              <span className="heading-display text-2xl text-brand/30 tabular-nums shrink-0 lg:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-body text-base font-medium text-foreground/90">
                {item.question}
              </h3>
            </div>
            <p className="mt-3 pl-[calc(1.5rem+1.5rem)] font-body text-sm font-light leading-[1.8] text-foreground/50 lg:pl-[calc(2rem+1.5rem)]">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
