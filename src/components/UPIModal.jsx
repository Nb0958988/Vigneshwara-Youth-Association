import { AnimatePresence, motion } from "framer-motion";
import {
  UPI_ID,
  UPI_PAYEE_NAME,
  UPI_QR_IMAGE,
} from "../config/invitationConfig.js";

export default function UPIModal({ open, onClose, onOpenApp }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 safe-top safe-bottom"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="UPI payment"
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
              onClick={onClose}
              aria-label="Close UPI payment dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full
                         border border-gold-antique/50 text-gold-bright"
            >
              ✕
            </button>

            <h2 className="mt-2 font-telugu text-lg font-semibold text-gold-bright">
              💳 Support Vinayaka Celebrations
            </h2>
            <p className="mt-1 font-body text-sm text-ivory/80">
              Scan &amp; Pay Using PhonePe App
            </p>

            <div className="mt-5 w-full max-w-[260px] overflow-hidden rounded-2xl border border-gold-antique/40 bg-white p-2">
              <img
                src={UPI_QR_IMAGE}
                alt="PhonePe UPI QR code to pay Vigneshwara Youth Association"
                className="h-auto w-full rounded-lg"
              />
            </div>

            <p className="mt-4 font-body text-base font-semibold text-ivory">
              {UPI_PAYEE_NAME}
            </p>
            <p className="mt-1 font-body text-sm text-ivory/70">
              UPI ID: {UPI_ID}
            </p>

            <button
              type="button"
              onClick={onOpenApp}
              aria-label="Open UPI app to pay"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-gold-antique via-marigold to-saffron
                         px-6 py-3 font-body text-sm font-semibold text-maroon-deep shadow-glow
                         transition-transform active:scale-95"
            >
              📱 Open UPI App
            </button>

            <p className="mt-3 font-body text-xs text-ivory/50">
              This only opens your UPI app to complete payment - no card or
              banking details are collected here.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
