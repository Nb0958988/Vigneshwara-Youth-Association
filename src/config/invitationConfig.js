// Central config for the invitation. Event details, the Maps link, and the
// UPI details below are FINAL per the brief - do not alter them here without
// an explicit request, since every component that displays or links to
// this information reads it from this one file.

export const ORGANIZER = "Vigneshwara Youth Association";

export const EVENT_TITLE_TELUGU = "9వ వార్షిక వినాయక చవితి ఉత్సవాలు";
export const EVENT_TITLE_ENGLISH = "9th Year Vinayaka Chavithi Celebrations";

export const EVENT_DATE = "14 September 2026";
export const PUJA_TIME = "Puja – Morning 10:30 AM";

export const VENUE_LINES = [
  "Inside VMC Park,",
  "Labour Colony,",
  "Vidyadharapuram,",
  "Vijayawada",
];

export const CONTACT_PHONE = "9346812409";

// Exact Google Maps place link - never replaced with a preview image/embed.
export const MAPS_LINK =
  "https://www.google.com/maps/place/2-8-172,+Bharathi+Teertha+Nagar,+V+D+Puram,+Vijayawada,+Andhra+Pradesh+520012/@16.5326656,80.6041391,17.92z/data=!4m6!3m5!1s0x3a35efc0cbb56e3b:0x744b0baa71fd18c0!8m2!3d16.533118!4d80.605194!16s%2Fg%2F11jgdv7_33?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D";

// UPI - exact values as provided. The deep link is reproduced verbatim
// (including the intentional double space encoded as repeated %20 in the
// payee name) rather than rebuilt, so nothing about it drifts by accident.
export const UPI_ID = "7569115435@ybl";
export const UPI_PAYEE_NAME = "BOLLABOYINA NAVEEN";
export const UPI_DEEP_LINK =
  "upi://pay?pa=7569115435@ybl&pn=BOLLABOYINA%20%20NAVEEN&mc=0000&mode=02&purpose=00";

// Swap this file for the real PhonePe QR screenshot before deploying -
// see README "UPI QR image" section.
export const UPI_QR_IMAGE = "/images/upi-qr.png";

export const VIDEO_SRC = "/videos/vinayaka-invitation.mp4";
export const MUSIC_SRC = "/audio/agajanana-padmarkam.mp3";

// Devotional text blocks, in display order on the final screen.
export const DEVOTIONAL_HEADING = "🕉️ శ్రీ విఘ్నేశ్వరాయ నమః 🕉️";

export const INVITATION_MESSAGE_TELUGU =
  "🙏 శ్రీ వినాయక స్వామి వారి ఆశీస్సులతో\nఈ పవిత్రమైన వేడుకలకు మీరు, మీ కుటుంబ సభ్యులు\nసాదరంగా ఆహ్వానితులు. 🙏";

export const CLOSING_MESSAGE_TELUGU =
  "🙏 మీ రాకతో ఈ వేడుక మరింత ప్రత్యేకం అవుతుంది 🙏";

export const BAPPA_MORIYA = "🙏 గణపతి బప్పా మోరియా! 🙏";
export const JAI_GANESHA = "🪔 జై శ్రీ గణేశా! 🪔";

export const THANK_YOU_MESSAGE =
  "🙏 Thank You for Supporting the Vinayaka Celebrations 🙏";

// Built from window.location.origin at render time so this always points at
// wherever the app is actually deployed, in dev and in production alike.
export function getInvitationUrl() {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/invitation`;
}

export function buildWhatsAppMessage(invitationUrl) {
  return (
    "🙏 శ్రీ విఘ్నేశ్వరాయ నమః 🙏\n\n" +
    `${ORGANIZER}\n\n` +
    `🌺 ${EVENT_TITLE_TELUGU} 🌺\n\n` +
    `📅 ${EVENT_DATE}\n` +
    `🕉️ ${PUJA_TIME}\n\n` +
    `📍 ${VENUE_LINES.join(" ")}\n\n` +
    `🎬 View our Digital Invitation:\n${invitationUrl}\n\n` +
    "🙏 గణపతి బప్పా మోరియా!\n" +
    "🪔 జై శ్రీ గణేశా!"
  );
}
