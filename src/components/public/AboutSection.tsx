export default function AboutSection({ text }: { text: string }) {
  if (!text) return null
  return (
    <section id="ueber" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Über dieses Projekt
        </p>
        <p className="max-w-2xl text-base leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      </div>
    </section>
  )
}
