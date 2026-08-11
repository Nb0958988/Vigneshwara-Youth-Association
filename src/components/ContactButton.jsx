import { CONTACT_PHONE } from "../config/invitationConfig.js";

export default function ContactButton() {
  return (
    <a
      href={`tel:${CONTACT_PHONE}`}
      aria-label={`Call ${CONTACT_PHONE}`}
      className="flex items-center justify-center gap-2 rounded-full border
                 border-gold-antique/60 px-6 py-3 font-body text-sm font-semibold
                 text-gold-bright shadow-glow transition-transform active:scale-95"
    >
      📞 {CONTACT_PHONE}
    </a>
  );
}
