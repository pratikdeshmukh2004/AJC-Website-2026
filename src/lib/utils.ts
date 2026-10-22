/**
 * Shared helpers.
 */

/**
 * Join conditional class names. Lightweight alternative to clsx —
 * filters out falsy values and joins with a space.
 *
 * @example cn("btn", isActive && "btn--active")
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
