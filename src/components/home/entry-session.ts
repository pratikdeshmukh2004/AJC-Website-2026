/**
 * Remembers the landing-gate choice for the current page session.
 *
 * Module-level memory persists across client-side navigations (e.g. leaving
 * Home and coming back via the menu) but resets on reload or a new tab — which
 * is exactly when the gate is needed again, since a reload loses the user
 * gesture that permits audible playback.
 */
let audioChoice: boolean | null = null;

/** The visitor's choice (true = with audio), or null if they haven't entered yet. */
export function getEntryChoice(): boolean | null {
  return audioChoice;
}

export function setEntryChoice(withAudio: boolean): void {
  audioChoice = withAudio;
}
