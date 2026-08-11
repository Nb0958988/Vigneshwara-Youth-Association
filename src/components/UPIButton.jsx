import { motion } from "framer-motion";

export default function UPIButton({ onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Support Vinayaka Celebrations via UPI"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="flex w-full max-w-[500px] flex-col items-center justify-center rounded-full
                 bg-gradient-to-r from-gold-antique via-marigold to-saffron px-6 py-3
                 font-body text-sm font-semibold text-maroon-deep shadow-glow"
    >
      <span>💳 Support Vinayaka Celebrations</span>
      <span className="text-xs font-normal opacity-80">Contribute via UPI</span>
    </motion.button>
  );
}
