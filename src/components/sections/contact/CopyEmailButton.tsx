"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copies the email address, for visitors without a mail app set up (mailto does nothing for them).
 * Falls back to mailto if the clipboard is unavailable (insecure context, denied permission).
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-panel px-5 font-inter text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
    >
      {copied ? <Check aria-hidden className="size-4 text-emerald-600" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
