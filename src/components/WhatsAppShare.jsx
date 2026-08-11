import { buildWhatsAppMessage } from "../config/invitationConfig.js";

export default function WhatsAppShare({ invitationUrl }) {
  const handleClick = () => {
    const message = buildWhatsAppMessage(invitationUrl);
    // wa.me works both as an app deep link on mobile (opens the installed
    // WhatsApp app) and falls back to WhatsApp Web on desktop/when the app
    // isn't installed - no separate fallback branch needed.
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Share invitation on WhatsApp"
      className="flex w-full items-center justify-center gap-2 rounded-full border
                 border-gold-antique/40 bg-black/25 px-5 py-3 font-body text-sm font-semibold
                 text-ivory transition-transform active:scale-95"
    >
      🟢 WhatsApp
    </button>
  );
}
