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
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">Häufige Fragen</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border rounded-lg px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
