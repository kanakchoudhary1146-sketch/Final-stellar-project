import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BuyInsurance from "./pages/BuyInsurance";
import Claim from "./pages/Claim";
import Invest from "./pages/Invest";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<BuyInsurance />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/invest" element={<Invest />} />
      </Routes>
    </Router>
  );
}

export default App;
