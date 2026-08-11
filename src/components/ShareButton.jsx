import { motion } from "framer-motion";

export default function ShareButton({ onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Share invitation"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="w-full max-w-[500px] rounded-full border border-gold-antique/60 px-6 py-3
                 font-body text-sm font-semibold text-gold-bright shadow-glow"
    >
      📲 Share Invitation
    </motion.button>
  );
}
