export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-panel-border bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
