const todoWarned = new Set<string>()

export function TodoWoonInline({ token }: { token: string }) {
  if (typeof window === 'undefined' && !todoWarned.has(token)) {
    todoWarned.add(token)
    console.warn(`[TODO(woon)] unresolved token: ${token}`)
  }
  return (
    <span data-todo-token={token} className="font-mono text-[11px] text-fg-subtle">
      [TODO(woon): {token}]
    </span>
  )
}
