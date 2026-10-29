import type { CSSProperties, ReactNode } from "react";

/**
 * Masked slide-up line reveal driven by scroll (`.reveal-mask` in globals.css).
 * `index` staggers siblings: each step starts a little later in the scroll.
 */
export function Reveal({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="reveal-mask">
      <span style={{ "--i": index } as CSSProperties}>{children}</span>
    </span>
  );
}
