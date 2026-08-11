import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFullscreen } from "../hooks/useFullscreen.js";
import FullscreenButton from "./FullscreenButton.jsx";
import MusicButton from "./MusicButton.jsx";
import { VIDEO_SRC, MUSIC_SRC } from "../config/invitationConfig.js";

const CONTROLS_HIDE_DELAY = 3000;

export default function VideoIntro({ onFinished }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const { requestFullscreen, exitFullscreen, isFullscreen } = useFullscreen();

  const [hintVisible, setHintVisible] = useState(true);
  const [hasTapped, setHasTapped] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  // Autoplay defensively - some browsers still need a play() call kicked
  // off from script even with the autoplay attribute present. The video's
  // own embedded audio track stays muted throughout; the devotional MP3
  // below is the only audio track that's ever audible, so the two never
  // overlap.
  useEffect(() => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (v) v.play().catch(() => {});
    // Start the music muted too - most mobile browsers block audible
    // autoplay outright. Starting it muted-but-playing means that when the
    // user's first tap unmutes it, it resumes in sync with the video
    // instead of starting late.
    if (a) {
      a.muted = true;
      a.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const scheduleControlsHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, CONTROLS_HIDE_DELAY);
  }, []);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  // Tapping the video area itself: first tap enters fullscreen, unmutes the
  // devotional music (the browser now permits audible playback because
  // this is a real user gesture), and reveals the minimal control bar.
  // Every tap after that just re-reveals the controls (and resets the
  // auto-hide timer) without touching playback, currentTime, or reloading
  // anything - the video and music both simply continue from wherever they
  // already are.
  const handleTap = useCallback(() => {
    if (!hasTapped) {
      setHasTapped(true);
      setHintVisible(false);
      requestFullscreen(containerRef.current);
      const a = audioRef.current;
      if (a) {
        a.muted = false;
        a.play()
          .then(() => setMusicOn(true))
          .catch(() => setMusicOn(false));
      }
    }
    showControls();
  }, [hasTapped, requestFullscreen, showControls]);

  const handleEnded = useCallback(() => {
    // The devotional music accompanies the video specifically - it fades
    // out with it rather than continuing to play under the details screen.
    const a = audioRef.current;
    if (a) a.pause();
    onFinished?.();
  }, [onFinished]);

  const handleToggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.muted || a.paused) {
      a.muted = false;
      a.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    } else {
      a.muted = true;
      setMusicOn(false);
    }
    showControls();
  }, [showControls]);

  const handleToggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      requestFullscreen(containerRef.current);
    }
    showControls();
  }, [isFullscreen, exitFullscreen, requestFullscreen, showControls]);

  return (
    <div
      ref={containerRef}
      onClick={handleTap}
      className="relative h-screen-safe w-screen-safe overflow-hidden
                 bg-gradient-to-b from-purple-void via-maroon-deep to-[#1a0710]"
    >
      {/*
        object-contain (not cover) is deliberate: the full portrait frame -
        Ganesha, both Telugu and English headings, the date, puja time,
        venue, and contact number - must always stay on screen, on every
        phone aspect ratio. Any letterboxing this introduces is filled with
        the same maroon/purple gradient as the rest of the invitation so it
        reads as intentional festival framing, not a bug. The video's own
        audio track is permanently muted - the devotional MP3 below is the
        invitation's only audio.
      */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-contain"
      >
        Your browser does not support inline video playback.
      </video>

      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" playsInline />

      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-x-0 bottom-10 flex justify-center safe-bottom pointer-events-none"
          >
            <span className="animate-pulse-tap font-body text-sm tracking-wide text-ivory/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              Tap to Enter Fullscreen ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-6 flex justify-center gap-3 safe-bottom"
          >
            <MusicButton isMuted={!musicOn} onToggle={handleToggleMusic} />
            <FullscreenButton
              isFullscreen={isFullscreen}
              onToggle={handleToggleFullscreen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
