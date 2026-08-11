export default function Diya({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 50"
      className={className}
      role="img"
      aria-label="Diya lamp"
    >
      <g className="animate-flicker" style={{ transformOrigin: "20px 14px" }}>
        <ellipse cx="20" cy="16" rx="4" ry="8" fill="#F3A93B" opacity="0.9" />
        <ellipse cx="20" cy="14" rx="2.2" ry="5" fill="#FFE9B0" />
      </g>
      <path
        d="M6 26 C6 34 12 40 20 40 C28 40 34 34 34 26 Z"
        fill="#C9A227"
      />
      <ellipse cx="20" cy="26" rx="14" ry="4" fill="#E8C766" />
    </svg>
  );
}
