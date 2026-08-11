import { useState, useCallback } from "react";

// Instagram has no public web API for posting a Story or feed post on the
// user's behalf, so this never pretends otherwise. It copies the link and
// gives the user a one-tap way to open the Instagram app themselves.
export default function InstagramShare({ invitationUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable - the link is still shown below to copy manually.
    }
  }, [invitationUrl]);

  const handleOpenInstagram = useCallback(() => {
    // instagram:// opens the app where installed; browsers that don't
    // recognise the scheme simply ignore the attempt, so this is safe to
    // try unconditionally.
    window.location.href = "instagram://app";
    setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }, 600);
  }, []);

  return (
    <div className="w-full space-y-3 rounded-2xl border border-gold-antique/30 bg-black/20 p-4 text-center">
      <p className="font-body text-sm text-ivory/90">
        📸 Share this invitation on Instagram
      </p>
      <p className="font-body text-xs text-ivory/60">
        Copy the invitation link and share it in your Instagram Story, DM, or
        profile.
      </p>
      <div className="rounded-lg bg-black/30 px-3 py-2 font-body text-xs text-ivory/70 break-all">
        {invitationUrl}
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy invitation link"
          className="rounded-full border border-gold-antique/50 px-5 py-2.5 font-body text-sm
                     font-semibold text-gold-bright transition-transform active:scale-95"
        >
          {copied ? "✓ Invitation Link Copied" : "📋 Copy Invitation Link"}
        </button>
        <button
          type="button"
          onClick={handleOpenInstagram}
          aria-label="Open Instagram"
          className="rounded-full bg-gold-antique px-5 py-2.5 font-body text-sm font-semibold
                     text-purple-void shadow-glow transition-transform active:scale-95"
        >
          📸 Open Instagram
        </button>
      </div>
    </div>
  );
}
