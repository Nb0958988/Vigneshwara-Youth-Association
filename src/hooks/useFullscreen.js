import { useCallback, useEffect, useState } from "react";

/**
 * Requests true browser fullscreen on a given element where the Fullscreen
 * API is supported (Android Chrome, most desktop browsers). iOS Safari does
 * not support element.requestFullscreen() for arbitrary elements (only
 * <video> has a native webkitEnterFullscreen), so on iOS we simply mark the
 * attempt as "handled" and continue playing edge-to-edge - the caller never
 * blocks on this and the video keeps playing regardless of the outcome.
 *
 * isFullscreen tracks the browser's actual fullscreenElement via the
 * fullscreenchange event, so it stays correct even when the user exits with
 * Escape, the Android back gesture, or the OS status bar - none of which
 * call our own exitFullscreen(). Nothing in this hook ever touches video
 * playback, so entering/exiting fullscreen never restarts or pauses it.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
    };
  }, []);

  const requestFullscreen = useCallback((el) => {
    if (!el) return;

    const requestFn =
      el.requestFullscreen ||
      el.webkitRequestFullscreen || // Safari / older Chrome
      el.webkitEnterFullscreen || // iOS Safari <video> only
      el.msRequestFullscreen;

    if (!requestFn) {
      setSupported(false);
      return;
    }

    try {
      const result = requestFn.call(el);
      if (result && typeof result.then === "function") {
        result
          .then(() => setIsFullscreen(true))
          .catch(() => {
            // Blocked by browser policy - keep playing edge-to-edge anyway
            setSupported(false);
          });
      } else {
        setIsFullscreen(true);
      }
    } catch {
      setSupported(false);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    const exitFn =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;
    if (!exitFn) return;
    try {
      exitFn.call(document);
    } catch {
      // Ignore - nothing useful to do if the browser refuses.
    }
  }, []);

  return { requestFullscreen, exitFullscreen, isFullscreen, supported };
}
