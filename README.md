# వినాయక చవితి ఆహ్వానం — QR Invitation

Mobile-first, QR-triggered animated invitation for Vigneshwara Youth
Association's 9వ వార్షిక వినాయక చవితి ఉత్సవాలు.

## 1. Assets already included

| Asset | Path | Notes |
|---|---|---|
| Invitation video | `public/videos/vinayaka-invitation.mp4` | H.264 MP4, portrait. Video visuals are unchanged — only *how it's fitted on screen* was fixed (see below). |
| Devotional music | `public/audio/agajanana-padmarkam.mp3` | Plays alongside the video as a separate track; the video's own embedded audio stays muted so the two never overlap. |
| UPI QR | `public/images/upi-qr.png` | The real, uploaded PhonePe QR — used byte-for-byte, never regenerated, recolored, or overlaid with anything. |

To swap any of these later, replace the file at the same path — no code
changes needed elsewhere, since every component reads these paths from
`src/config/invitationConfig.js`.

## 2. The video-cropping fix

Earlier builds used `object-fit: cover`, which crops a portrait video to
fill the screen — on many phone aspect ratios that cut off the date, puja
time, venue, or contact number near the bottom of the frame.

`src/components/VideoIntro.jsx` now uses `object-fit: contain` instead:
the complete video frame is always visible, letterboxed on a maroon/purple
gradient background (matching the rest of the invitation) when the
screen's aspect ratio doesn't exactly match the video's. Nothing in the
video itself was redesigned — only the fitting behavior changed.

## 3. Install & run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, then visit `/invitation` (e.g.
`http://localhost:5173/invitation`) or `/qr` to preview the QR generator.

## 4. Deploy to Vercel

```bash
npm install -g vercel   # if you don't have it
vercel                  # first deploy, follow the prompts
vercel --prod           # promote to your production domain
```

Or connect the GitHub repo in the Vercel dashboard — Vercel auto-detects
Vite. `vercel.json` is already included so `/invitation`, `/qr`, and any
other path resolve correctly on a direct load or a page refresh.

## 5. Generate the pamphlet QR code

Visit `/qr` on your deployed site (or `http://localhost:5173/qr` locally).
It shows the invitation URL in an editable field (defaults to
`<your-domain>/invitation`), renders a high-contrast, high-error-correction
QR code, and gives you PNG and SVG download buttons for print. The QR only
ever encodes that one URL — never the video, the music, the UPI QR, or any
other data.

## Routes

| Route | Purpose |
|---|---|
| `/invitation` | The guest-facing experience — this is what the pamphlet QR points at. |
| `/qr` | Generates/downloads the QR code that goes on the pamphlet. |
| `/` | A small dev-only preview page with links to the two routes above; guests never land here. |

## How the experience works

1. **`/invitation` loads** → `InvitationPage` renders `VideoIntro`
   immediately. No spinner, no loading screen — the video element itself
   is the first thing painted, with a matching dark background color set
   in `index.html` so there's no white flash while it buffers.
2. **Video plays edge-to-edge** using `100dvh`/`100svh`/`100vw` with
   `object-fit: contain` (see the cropping fix above) and
   `viewport-fit=cover` for notch/home-indicator safe areas. The
   devotional MP3 starts muted alongside it (autoplay policy), and the
   video's own audio track stays muted permanently.
3. **First tap** hides the "Tap to Enter Fullscreen ✨" hint, calls
   `element.requestFullscreen()` (vendor-prefix fallbacks in
   `src/hooks/useFullscreen.js`), and — because this is a real user
   gesture — unmutes the devotional music so it plays in sync with the
   video. A small music/fullscreen control pair appears, then fades out
   after a few seconds of inactivity and reappears on tap. Nothing here
   ever restarts the video, resets its `currentTime`, or reloads it —
   entering/exiting fullscreen just changes how it's displayed.
4. **Video ends** → the devotional music fades out with it, and the page
   cross-fades (Framer Motion) into `InvitationDetails`: a noticeably more
   colourful festival page (deep maroon, royal purple, antique gold,
   saffron/marigold gradients, a marigold-and-mango-leaf garland, and soft
   divine light rays behind the Ganesha motif) with the event details
   card, and the Maps / UPI / Share / Contact buttons. None of these
   render until the video's `onEnded` fires.
5. **UPI button** opens a modal showing the real uploaded QR alongside the
   payee name and UPI ID, plus an "Open UPI App" button that launches the
   exact `upi://pay?...` deep link from `invitationConfig.js`. It never
   collects card details and never claims a payment succeeded. If the
   browser tab becomes visible again afterwards (the user returned from
   their UPI app), a quiet "🙏 Thank You for Supporting the Vinayaka
   Celebrations 🙏" note fades in — an acknowledgement of the attempt, not
   a receipt.
6. **Share button** opens a modal with WhatsApp (pre-filled message via
   `wa.me`), Instagram (copy-link-then-open-app flow — there's no public
   API for posting to Instagram on someone's behalf, so this never
   pretends otherwise), and Copy Link, each with its own small component.

## Single source of truth

`src/config/invitationConfig.js` holds every piece of event data —
organizer, date, puja time, venue, contact, the Maps URL, the UPI ID/payee/
deep link, and the devotional text blocks — so nothing is duplicated
across components. Update the event once here rather than hunting through
JSX.

## Component structure

```
src/
  config/
    invitationConfig.js       single source of truth for all event data
  hooks/
    useFullscreen.js          request/exit fullscreen + fullscreenchange sync
  components/
    VideoIntro.jsx            video + music playback, tap-to-fullscreen, controls
    MusicButton.jsx           mute/unmute toggle
    FullscreenButton.jsx      enter/exit fullscreen toggle
    InvitationDetails.jsx     the post-video festival page
    EventDetailsCard.jsx      date / puja time / venue card
    LocationButton.jsx        Google Maps link
    UPIButton.jsx / UPIModal.jsx        UPI support flow
    ShareButton.jsx / ShareModal.jsx    share flow
    WhatsAppShare.jsx / InstagramShare.jsx / CopyLinkButton.jsx
    ContactButton.jsx         tel: link
    GaneshaMotif.jsx / Diya.jsx / FloatingPetals.jsx / MarigoldGarland.jsx
  pages/
    Home.jsx                  dev-only preview page
    InvitationPage.jsx        orchestrates VideoIntro → InvitationDetails
    QRGenerator.jsx           /qr - generates the pamphlet QR
```

## Tech

React 19 · Vite · Tailwind CSS · Framer Motion · React Router · qrcode.react
(for the `/qr` page) — all free/open-source, no paid services anywhere.

## Design tokens

| Role | Value |
|---|---|
| Deep purple (bg) | `#2A0E45` |
| Maroon (bg) | `#4A0E12` / `#2E0A0E` |
| Antique gold | `#C9A227` |
| Bright gold | `#E8C766` |
| Marigold | `#E8801A` |
| Saffron | `#F2994A` |
| Magenta accent | `#D8407A` |
| Ivory (text) | `#FBF2DD` |
| Display face | Cinzel Decorative |
| Telugu face | Baloo Tammudu 2 |
| Body face | Poppins |

The signature element is the glowing gold mandala-framed Ganesha motif
(`src/components/GaneshaMotif.jsx`) — an original stylized silhouette, not
a reproduction of existing artwork.

## PWA

`public/manifest.json` sets `display: standalone` with theme/background
colors and two generated icon sizes (192/512px), linked from
`index.html`. Adding the invitation to a phone's home screen opens it
without browser chrome. The two icon files (`public/icon-192.png`,
`public/icon-512.png`) are simple placeholder gold-ring artwork — swap
them for real branding whenever you like, same filenames, no code changes
needed.
