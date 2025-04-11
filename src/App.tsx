import Landingpage from "./pages/Landingpage";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/app";
import Daten from "./pages/AccountDetails/AccountDetails";
import Eingabe from "@/pages/Eingabe/Eingabe.tsx";
import ResultDetailPage from "./pages/ResultDetailPage/ResultDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* TODO: Register Page/ ((Tutorial Page))/ Dynamic Ergebnis Detail Page */}
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Landingpage />} />
        <Route path="/account-details" element={<Daten />} />
        <Route path="/input" element={<Eingabe />} />
        <Route path="/results/:id" element={<ResultDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
