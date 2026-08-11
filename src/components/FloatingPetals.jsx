// Ambient marigold petals + golden particles drifting behind the invitation
// details. Counts are kept low and randomization is seeded once per mount
// so this stays a quiet atmosphere layer, not the visual focus.

const PETAL_COUNT = 10;
const PARTICLE_COUNT = 16;

function seeded(count, seedOffset) {
  return Array.from({ length: count }, (_, i) => {
    const left = (i * 97 + seedOffset * 13) % 100;
    const duration = 9 + ((i * 7 + seedOffset) % 8); // 9-16s
    const delay = (i * 1.3 + seedOffset * 0.4) % 10;
    const drift = ((i % 5) - 2) * 20; // -40..40px
    const size = 10 + (i % 4) * 4;
    return { left, duration, delay, drift, size };
  });
}

const petals = seeded(PETAL_COUNT, 3);
const particles = seeded(PARTICLE_COUNT, 9);

export default function FloatingPetals() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <span
          key={`petal-${i}`}
          className="petal absolute top-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            background:
              "radial-gradient(circle at 30% 30%, #F3A93B, #C9601B 80%)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift-x": `${p.drift}px`,
          }}
        />
      ))}
      {particles.map((p, i) => (
        <span
          key={`particle-${i}`}
          className="particle absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: Math.max(3, p.size / 4),
            height: Math.max(3, p.size / 4),
            background: "#E8C766",
            boxShadow: "0 0 6px 1px rgba(232,199,102,0.8)",
            animationDuration: `${p.duration + 4}s`,
            animationDelay: `${p.delay}s`,
            "--drift-x": `${p.drift / 2}px`,
          }}
        />
      ))}
    </div>
  );
}
