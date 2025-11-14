import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BuyInsurance from "./pages/BuyInsurance";
import Claim from "./pages/Claim";
import Invest from "./pages/Invest";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<BuyInsurance />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
