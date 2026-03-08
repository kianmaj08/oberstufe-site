export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/30">
          Oberstufe
        </span>
        <span className="text-[11px] tracking-wide text-foreground/25">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
