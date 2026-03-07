export default function Footer({ text = "© 2025 oberstufe.site" }: { text?: string }) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">{text}</p>
      </div>
    </footer>
  )
}
