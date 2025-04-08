import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./assets/dashboard.jsx";
import MentorProfile from "./assets/MentorProfile.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mentor/:id" element={<MentorProfile />} />
        </Routes>
    </Router>
  );
}
