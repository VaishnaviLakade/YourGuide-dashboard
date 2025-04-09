import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenteeDashboard from "./assets/MenteeDashboard.jsx";
import MentorProfile from "./assets/MentorProfile.jsx";
import MentorDashboard from "./assets/MentorDashborad.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenteeDashboard />} />
        <Route path="/mentor/:id" element={<MentorProfile />} />
        <Route path="/MentorDashboard" element={<MentorDashboard />} />
        </Routes>
    </Router>
  );
}
