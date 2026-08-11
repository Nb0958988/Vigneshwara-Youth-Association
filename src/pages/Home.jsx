import { Link } from "react-router-dom";

// This page is a development convenience only - it is never part of the
// guest-facing flow (the pamphlet QR always points straight at
// /invitation). It just gives whoever is working on the project quick
// links instead of typing paths by hand.
export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-purple-void via-maroon-deep to-[#1a0710] px-6 text-center text-ivory">
      <p className="font-telugu text-lg text-gold-soft">
        🕉️ శ్రీ విఘ్నేశ్వరాయ నమః 🕉️
      </p>
      <h1 className="font-display text-xl font-bold uppercase tracking-wider text-gold-bright">
        Vigneshwara Youth Association
      </h1>
      <p className="max-w-sm font-body text-sm text-ivory/70">
        This is a development preview page. Guests scanning the printed
        invitation QR code land directly on <code>/invitation</code> — this
        page is only here for you while building and testing.
      </p>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link
          to="/invitation"
          className="rounded-full bg-gold-antique px-6 py-3 font-body text-sm font-semibold text-purple-void shadow-glow"
        >
          🎬 Open Invitation
        </Link>
        <Link
          to="/qr"
          className="rounded-full border border-gold-antique/60 px-6 py-3 font-body text-sm font-semibold text-gold-bright"
        >
          🔗 Generate Invitation QR
        </Link>
      </div>
    </div>
  );
}
