import { useState, useCallback } from "react";

export default function CopyLinkButton({ invitationUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore - nothing more useful to do without clipboard permission.
    }
  }, [invitationUrl]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy invitation link"
      className="flex w-full items-center justify-center gap-2 rounded-full border
                 border-gold-antique/40 bg-black/25 px-5 py-3 font-body text-sm font-semibold
                 text-ivory transition-transform active:scale-95"
    >
      {copied ? "✓ Invitation Link Copied" : "📋 Copy Invitation Link"}
    </button>
  );
}
