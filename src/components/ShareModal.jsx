import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppShare from "./WhatsAppShare.jsx";
import InstagramShare from "./InstagramShare.jsx";
import CopyLinkButton from "./CopyLinkButton.jsx";

export default function ShareModal({ open, onClose, invitationUrl }) {
  const [showInstagram, setShowInstagram] = useState(false);

  const handleClose = () => {
    setShowInstagram(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 safe-top safe-bottom"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Share invitation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-sm flex-col items-center overflow-y-auto
                       rounded-3xl border border-gold-antique/40 bg-gradient-to-b from-maroon-deep to-purple-void
                       p-6 text-center shadow-glow"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close share dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full
                         border border-gold-antique/50 text-gold-bright"
            >
              ✕
            </button>

            <h2 className="mt-2 font-telugu text-lg font-semibold text-gold-bright">
              📲 Share Invitation
            </h2>

            <motion.div
              className="mt-6 flex w-full flex-col gap-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <WhatsAppShare invitationUrl={invitationUrl} />
              </motion.div>

              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                type="button"
                onClick={() => setShowInstagram((v) => !v)}
                aria-label="Share on Instagram"
                className="flex w-full items-center justify-center gap-2 rounded-full border
                           border-gold-antique/40 bg-black/25 px-5 py-3 font-body text-sm font-semibold
                           text-ivory transition-transform active:scale-95"
              >
                📸 Instagram
              </motion.button>

              <AnimatePresence>
                {showInstagram && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <InstagramShare invitationUrl={invitationUrl} />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <CopyLinkButton invitationUrl={invitationUrl} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
