import { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FloatingPetals from "./FloatingPetals.jsx";
import GaneshaMotif from "./GaneshaMotif.jsx";
import Diya from "./Diya.jsx";
import MarigoldGarland from "./MarigoldGarland.jsx";
import EventDetailsCard from "./EventDetailsCard.jsx";
import LocationButton from "./LocationButton.jsx";
import UPIButton from "./UPIButton.jsx";
import UPIModal from "./UPIModal.jsx";
import ShareButton from "./ShareButton.jsx";
import ShareModal from "./ShareModal.jsx";
import ContactButton from "./ContactButton.jsx";
import {
  ORGANIZER,
  EVENT_TITLE_TELUGU,
  DEVOTIONAL_HEADING,
  INVITATION_MESSAGE_TELUGU,
  CLOSING_MESSAGE_TELUGU,
  BAPPA_MORIYA,
  JAI_GANESHA,
  THANK_YOU_MESSAGE,
  UPI_DEEP_LINK,
  getInvitationUrl,
} from "../config/invitationConfig.js";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function InvitationDetails() {
  const [upiOpen, setUpiOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [upiAttempted, setUpiAttempted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const invitationUrl = useMemo(() => getInvitationUrl(), []);

  // If the user tapped "Open UPI App" (leaving to their UPI app) and the
  // tab becomes visible again, assume they've returned from that app and
  // show a thank-you note. This never claims the payment succeeded - it's
  // only an acknowledgement of the attempt, exactly as instructed.
  useEffect(() => {
    if (!upiAttempted) return;
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setShowThankYou(true);
        setUpiAttempted(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [upiAttempted]);

  const handleOpenUpiApp = useCallback(() => {
    setUpiAttempted(true);
    window.location.href = UPI_DEEP_LINK;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen-safe w-screen-safe overflow-y-auto safe-top safe-bottom safe-x
                 bg-[radial-gradient(circle_at_50%_0%,rgba(232,135,30,0.25),transparent_55%),radial-gradient(circle_at_15%_85%,rgba(216,64,122,0.18),transparent_50%),linear-gradient(to_bottom,#3B0A3D,#5B0F1E_35%,#2E0A0E_70%,#170509)]
                 text-ivory"
    >
      <FloatingPetals />

      <div className="relative z-10 mx-auto flex min-h-full max-w-md flex-col items-center px-6 py-10 text-center">
        <MarigoldGarland className="mb-4 w-full" />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-telugu text-lg text-gold-soft"
        >
          {DEVOTIONAL_HEADING}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="relative my-6 flex h-40 w-40 items-center justify-center"
        >
          {/* Soft divine light rays behind Ganesha - slow, subtle rotation only. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-spin-slow rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,214,120,0.28), transparent 18%, transparent 82%, rgba(255,214,120,0.28))",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-full bg-[radial-gradient(circle,rgba(255,214,120,0.35),transparent_70%)]"
          />
          <GaneshaMotif className="relative h-32 w-32" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="font-display text-lg font-bold uppercase tracking-wider text-gold-bright"
        >
          {ORGANIZER}
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-3 flex items-center justify-center gap-2 font-telugu text-2xl font-bold text-marigold"
        >
          <span aria-hidden="true">🔔</span>
          <span>🌺 {EVENT_TITLE_TELUGU} 🌺</span>
          <span aria-hidden="true">🔔</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-2 flex items-center gap-3"
        >
          <Diya className="h-9 w-9" />
          <span className="font-body text-sm text-ivory/80">మీ ఆహ్వానం</span>
          <Diya className="h-9 w-9 scale-x-[-1]" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-6 whitespace-pre-line font-telugu text-base leading-relaxed text-ivory/90"
        >
          {INVITATION_MESSAGE_TELUGU}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="mt-8 flex w-full justify-center"
        >
          <EventDetailsCard />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={7}
          className="mt-8 font-telugu text-base leading-relaxed text-ivory/90"
        >
          {CLOSING_MESSAGE_TELUGU}
          <br />
          {BAPPA_MORIYA}
          <br />
          {JAI_GANESHA}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={8}
          className="mt-9 flex w-full flex-col items-center gap-3"
        >
          <LocationButton />
          <UPIButton onOpen={() => setUpiOpen(true)} />
          <ShareButton onOpen={() => setShareOpen(true)} />
          <ContactButton />
        </motion.div>

        {showThankYou && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 font-telugu text-base font-semibold text-gold-bright"
          >
            {THANK_YOU_MESSAGE}
          </motion.p>
        )}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={9}
          className="mt-8 pb-2 font-body text-xs text-ivory/50"
        >
          {ORGANIZER}
        </motion.p>
      </div>

      <UPIModal
        open={upiOpen}
        onClose={() => setUpiOpen(false)}
        onOpenApp={handleOpenUpiApp}
      />
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        invitationUrl={invitationUrl}
      />
    </motion.div>
  );
}
