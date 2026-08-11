import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoIntro from "../components/VideoIntro.jsx";
import InvitationDetails from "../components/InvitationDetails.jsx";

export default function InvitationPage() {
  const [stage, setStage] = useState("video"); // "video" | "details"

  const handleVideoFinished = useCallback(() => {
    setStage("details");
  }, []);

  return (
    <div className="h-screen-safe w-screen-safe overflow-hidden bg-[#2E0A0E]">
      <AnimatePresence mode="wait">
        {stage === "video" ? (
          <motion.div
            key="video"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="h-screen-safe w-screen-safe"
          >
            <VideoIntro onFinished={handleVideoFinished} />
          </motion.div>
        ) : (
          <motion.div key="details" className="h-screen-safe w-screen-safe">
            <InvitationDetails />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
