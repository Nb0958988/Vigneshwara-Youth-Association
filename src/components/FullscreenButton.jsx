export default function FullscreenButton({ isFullscreen, onToggle }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      className="flex h-9 w-9 items-center justify-center rounded-full border
                 border-gold-antique/50 bg-black/35 text-sm text-gold-bright
                 backdrop-blur-sm transition-transform active:scale-90"
    >
      {isFullscreen ? "⛶" : "⛶"}
    </button>
  );
}
