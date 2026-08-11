// A simple repeating marigold + mango-leaf garland, drawn in CSS/SVG only
// (no external images), used as a festive top border on the final page.
const BEAD_COUNT = 9;

export default function MarigoldGarland({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-end justify-center gap-1 ${className}`}
    >
      {Array.from({ length: BEAD_COUNT }, (_, i) => (
        <div key={i} className="flex flex-col items-center">
          {i % 2 === 0 && (
            <svg
              viewBox="0 0 20 14"
              width="16"
              height="11"
              className="-mb-1"
            >
              <path
                d="M10 14 C2 10 2 2 10 2 C18 2 18 10 10 14 Z"
                fill="#3F7D32"
              />
            </svg>
          )}
          <svg viewBox="0 0 24 24" width="18" height="18">
            <circle cx="12" cy="12" r="10" fill="#E8871E" />
            <circle cx="12" cy="12" r="10" fill="url(#marigoldGrad)" />
            <circle cx="12" cy="12" r="4" fill="#FFDD8A" />
            <defs>
              <radialGradient id="marigoldGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFC94D" />
                <stop offset="100%" stopColor="#D9640F" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
