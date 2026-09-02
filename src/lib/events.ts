type Listener = () => void

const listeners: Record<string, Listener[]> = {}

export function on(event: string, callback: Listener): () => void {
  if (!listeners[event]) listeners[event] = []
  listeners[event].push(callback)
  return () => {
    listeners[event] = (listeners[event] || []).filter((cb) => cb !== callback)
  }
}

export function emit(event: string): void {
  ;(listeners[event] || []).forEach((cb) => {
    try {
      cb()
    } catch {
      // swallow listener errors so one bad subscriber can't break others
    }
  })
}

export const MODULE_COMPLETED = 'module-completed'
