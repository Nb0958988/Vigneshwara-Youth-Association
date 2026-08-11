import { motion } from "framer-motion";
import { MAPS_LINK } from "../config/invitationConfig.js";

export default function LocationButton() {
  return (
    <motion.a
      href={MAPS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View location on Google Maps"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="flex w-full max-w-[500px] items-center justify-center rounded-full
                 bg-gradient-to-r from-gold-antique via-marigold to-saffron px-6 py-3
                 font-body text-sm font-semibold text-maroon-deep shadow-glow"
    >
      📍 View Location on Google Maps
    </motion.a>
  );
}
