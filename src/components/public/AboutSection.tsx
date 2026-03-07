export default function AboutSection({ text }: { text: string }) {
  if (!text) return null
  return (
    <section id="ueber" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-6 text-2xl font-bold">Über dieses Projekt</h2>
        <p className="max-w-2xl text-muted-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>
    </section>
  )
}
