import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/** The whole reveal takes about this long, however long the copy is. */
const STREAM_MS = 1400;
/** Cap on the gap between words, so short copy does not crawl. */
const MAX_WORD_GAP_MS = 45;

function countWords(node: ReactNode): number {
  if (typeof node === "string") return node.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(node)) return node.reduce((n: number, child) => n + countWords(child), 0);
  if (isValidElement<{ children?: ReactNode }>(node)) return countWords(node.props.children);
  return 0;
}

function stream(node: ReactNode, next: () => number): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((token, i) =>
      token === "" || /^\s+$/.test(token) ? (
        token
      ) : (
        <span key={i} className="ajc-stream" style={{ animationDelay: `${next()}ms` }}>
          {token}
        </span>
      ),
    );
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children == null) return el;
    return cloneElement(
      el,
      undefined,
      Children.toArray(el.props.children).map((child) => stream(child, next)),
    );
  }
  return node;
}

/**
 * Types its text in word by word, like a streamed reply. Wrap the copy a
 * "Read more" button reveals and set `enabled` once it is open: the words then
 * fade in one after another. While disabled the copy renders untouched.
 * Inline markup (<em>, <strong>) inside the copy is kept.
 */
export function StreamText({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  if (!enabled) return <>{children}</>;

  const gap = Math.min(MAX_WORD_GAP_MS, STREAM_MS / Math.max(countWords(children), 1));
  let word = 0;
  const next = () => gap * word++;

  return <>{Children.toArray(children).map((child) => stream(child, next))}</>;
}
