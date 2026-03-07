export default function Footer({ text = "© 2025 oberstufe.site" }: { text?: string }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <span className="text-sm font-medium">oberstufe.site</span>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </footer>
  )
}
