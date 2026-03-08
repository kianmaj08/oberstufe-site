import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FaqItem } from "@/lib/types"

export default function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items.length) return null
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
      <h2 className="heading-display text-[clamp(2rem,6vw,4.5rem)]">
        FAQ
      </h2>

      <div className="mt-16 max-w-3xl">
        <Accordion type="single" collapsible>
          {items.map((item, i) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b-0 py-0"
            >
              <AccordionTrigger className="py-6 text-left hover:no-underline group/faq transition-colors duration-300">
                <span className="flex items-baseline gap-6">
                  <span className="heading-display text-2xl text-foreground/15 tabular-nums lg:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-base font-normal text-foreground/80 group-hover/faq:text-foreground transition-colors duration-300">
                    {item.question}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pl-[calc(1.5rem+1.5rem+0.75rem)] font-body text-sm font-light leading-[1.8] text-foreground/50 lg:pl-[calc(2rem+1.5rem+0.75rem)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
