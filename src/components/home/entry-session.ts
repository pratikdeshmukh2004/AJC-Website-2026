/**
 * Remembers the landing-gate choice for the current page session.
 *
 * Module-level memory persists across client-side navigations (e.g. leaving
 * Home and coming back via the menu) but resets on reload or a new tab — which
 * is exactly when the gate is needed again, since a reload loses the user
 * gesture that permits audible playback.
 */
let audioChoice: boolean | null = null;
const listeners = new Set<() => void>();

/** The visitor's choice (true = with audio), or null if they haven't entered yet. */
export function getEntryChoice(): boolean | null {
  return audioChoice;
}

export function setEntryChoice(withAudio: boolean): void {
  audioChoice = withAudio;
  listeners.forEach((listener) => listener());
}

/**
 * Subscribe to the gate choice, for `useSyncExternalStore`. The site header
 * uses it to stay hidden on Home until the visitor has passed the landing gate.
 */
export function subscribeEntry(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
