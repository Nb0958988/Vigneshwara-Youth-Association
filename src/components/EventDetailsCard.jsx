import { EVENT_DATE, PUJA_TIME, VENUE_LINES } from "../config/invitationConfig.js";

export default function EventDetailsCard() {
  return (
    <div
      className="w-full max-w-[500px] space-y-4 rounded-2xl border border-gold-antique/30
                 bg-[linear-gradient(160deg,rgba(74,14,18,0.55),rgba(42,14,69,0.55)_60%,rgba(216,64,122,0.12))]
                 p-6 text-center shadow-glow backdrop-blur-sm"
    >
      <DetailRow icon="📅" label={EVENT_DATE} />
      <DetailRow icon="🕉️" label={PUJA_TIME} />
      <DetailRow icon="📍" label={VENUE_LINES.join(", ")} />
    </div>
  );
}

function DetailRow({ icon, label }) {
  return (
    <div className="flex items-start justify-center gap-2 font-body text-sm text-ivory/90">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
