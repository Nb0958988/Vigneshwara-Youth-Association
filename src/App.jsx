import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InvitationPage from "./pages/InvitationPage.jsx";
import QRGenerator from "./pages/QRGenerator.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitation" element={<InvitationPage />} />
      <Route path="/qr" element={<QRGenerator />} />
      {/* Anything unrecognised still lands the guest on the invitation itself. */}
      <Route path="*" element={<Navigate to="/invitation" replace />} />
    </Routes>
  );
}
