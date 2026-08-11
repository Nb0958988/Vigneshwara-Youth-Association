// A simple, original, stylized devotional silhouette of Lord Ganesha -
// generic traditional iconography (crown, trunk, ears, lotus seat), not a
// reproduction of any specific artwork - set inside a glowing mandala ring.
export default function GaneshaMotif({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="animate-divine-glow absolute h-full w-full rounded-full bg-gold-bright/30 blur-2xl" />
      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full"
        role="img"
        aria-label="Lord Ganesha devotional motif"
      >
        <defs>
          <radialGradient id="ring" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="#E8C766" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E3B3" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="96" fill="url(#ring)" />
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          opacity="0.6"
        />

        {/* crown */}
        <path
          d="M78 46 Q100 26 122 46 L118 58 Q100 48 82 58 Z"
          fill="url(#goldFill)"
        />
        <circle cx="100" cy="34" r="5" fill="#E8C766" />

        {/* ears */}
        <ellipse cx="58" cy="90" rx="20" ry="26" fill="url(#goldFill)" />
        <ellipse cx="142" cy="90" rx="20" ry="26" fill="url(#goldFill)" />

        {/* head */}
        <path
          d="M100 58 C132 58 148 82 148 108 C148 128 138 140 128 146
             L128 132 C128 132 120 138 112 138 L112 150 L96 150 L96 138
             C88 138 78 130 74 118 C70 106 68 84 100 58 Z"
          fill="url(#goldFill)"
        />

        {/* trunk */}
        <path
          d="M100 118 C104 130 100 142 92 150 C86 156 88 166 96 168
             C90 172 78 168 78 156 C78 146 86 138 88 128 C90 122 94 118 100 118 Z"
          fill="url(#goldFill)"
        />

        {/* lotus seat */}
        <path
          d="M60 172 C70 162 90 158 100 158 C110 158 130 162 140 172
             C126 178 114 168 100 168 C86 168 74 178 60 172 Z"
          fill="#E8801A"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
