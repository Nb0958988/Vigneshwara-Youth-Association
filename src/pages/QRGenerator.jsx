import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

// This is the QR that goes on the printed pamphlet. It encodes ONLY the
// invitation page URL below - never the video file, the UPI QR/deep link,
// or any image data. High error correction ("H") keeps it reliably
// scannable even if the print is slightly smudged or creased.
export default function QRGenerator() {
  const defaultUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/invitation`;
  }, []);

  const [url, setUrl] = useState(defaultUrl);
  const svgRef = useRef(null);

  const handleDownloadPng = () => {
    const canvas = document.getElementById("invitation-qr-canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vinayaka-invitation-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadSvg = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "vinayaka-invitation-qr.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-gradient-to-b from-purple-void via-maroon-deep to-[#1a0710] px-6 py-10 text-center text-ivory">
      <h1 className="font-display text-lg font-bold uppercase tracking-wider text-gold-bright">
        Invitation QR Code
      </h1>
      <p className="max-w-sm font-body text-sm text-ivory/70">
        This is the QR for the printed pamphlet. It only ever encodes the
        invitation page URL below — never the video, the UPI details, or any
        image.
      </p>

      <label className="w-full max-w-sm text-left font-body text-xs text-ivory/60">
        Invitation URL
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gold-antique/40 bg-black/30 px-3 py-2
                     font-body text-sm text-ivory outline-none focus:border-gold-bright"
        />
      </label>

      {/* High contrast black-on-white, high error correction, sized generously for print. */}
      <div className="rounded-2xl bg-white p-5 shadow-glow">
        <QRCodeCanvas
          id="invitation-qr-canvas"
          value={url}
          size={280}
          level="H"
          bgColor="#FFFFFF"
          fgColor="#000000"
          includeMargin
        />
      </div>

      {/* Hidden SVG rendition kept in sync with the same value, used only for the SVG download. */}
      <div className="hidden">
        <QRCodeSVG
          ref={svgRef}
          value={url}
          size={1024}
          level="H"
          bgColor="#FFFFFF"
          fgColor="#000000"
          includeMargin
        />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <button
          type="button"
          onClick={handleDownloadPng}
          className="rounded-full bg-gold-antique px-6 py-3 font-body text-sm font-semibold text-purple-void shadow-glow"
        >
          ⬇️ Download PNG
        </button>
        <button
          type="button"
          onClick={handleDownloadSvg}
          className="rounded-full border border-gold-antique/60 px-6 py-3 font-body text-sm font-semibold text-gold-bright"
        >
          ⬇️ Download SVG
        </button>
      </div>
    </div>
  );
}
