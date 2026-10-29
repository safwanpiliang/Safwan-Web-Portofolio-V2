"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Frame } from "lucide-react";

const HANDLES = ["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"];

interface SelectionFrameProps {
  /** Frame name shown above the top-left corner, as in Figma's layer label. */
  label: string;
  /** Classes for the frame box itself (sizing, flex). */
  className?: string;
  children: ReactNode;
}

/**
 * Wraps content as a selected Figma frame: name label, live "W × H" badge measured from the real
 * box (so it matches whatever device is viewing), blue outline and corner handles. Purely decorative.
 */
export function SelectionFrame({ label, className = "", children }: SelectionFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden className="flex items-center justify-between gap-2 pb-1.5 font-inter text-[11px] md:text-xs">
        <span className="flex items-center gap-1 text-slate-500">
          <Frame className="size-3" strokeWidth={2} />
          {label}
        </span>
        {size && (
          <span className="rounded-sm bg-selection px-1.5 py-0.5 font-medium tabular-nums text-white">
            {size.w} × {size.h}
          </span>
        )}
      </div>
      <div ref={frameRef} className={`relative outline outline-1 outline-selection ${className}`}>
        {children}
        {HANDLES.map((pos) => (
          <span key={pos} aria-hidden className={`absolute z-30 size-2 border border-selection bg-white ${pos}`} />
        ))}
      </div>
    </>
  );
}
