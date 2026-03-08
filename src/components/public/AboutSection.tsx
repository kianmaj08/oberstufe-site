export default function AboutSection({ text }: { text: string }) {
  if (!text) return null
  return (
    <section id="ueber" className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-end gap-4">
            <h2 className="heading-display text-[clamp(2rem,6vw,4.5rem)]">
              Über
            </h2>
            <div className="mb-2 h-1.5 w-1.5 rounded-full bg-brand" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="font-body text-lg font-light leading-[1.8] text-foreground/70 whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
