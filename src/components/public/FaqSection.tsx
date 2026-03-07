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
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Häufige Fragen
        </p>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible>
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-border last:border-0"
              >
                <AccordionTrigger className="py-4 text-sm font-medium text-left hover:no-underline hover:text-[#8FABD4] transition-colors [&[data-state=open]]:text-[#8FABD4]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
