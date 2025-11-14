import React, { useState, useEffect } from "react";
import "./dashboard.css";
import {
  getUserData,
  addFunds,
  buyInsurance,
  claimInsurance,
  getBalance,
} from "../blockchain/soroban";

// Attach Freighter API globally
import * as freighterApi from "@stellar/freighter-api";
window.freighterApi = freighterApi;

export default function Dashboard() {
  const [publicKey, setPublicKey] = useState(null);
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------------------------------------------
  // AUTO-LOAD WALLET IF ALREADY CONNECTED
  // ------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("DEFI_GUARD_WALLET");
    if (saved) {
      setPublicKey(saved);
      fetchAll(saved);
    }
  }, []);

  // ------------------------------------------------
  // CONNECT FREIGHTER WALLET
  // ------------------------------------------------
  const handleConnect = async () => {
    try {
      setLoading(true);

      const access = await window.freighterApi.requestAccess();
      if (!access) {
        alert("Freighter access denied.");
        setLoading(false);
        return;
      }

      const pk = await window.freighterApi.getPublicKey();
      if (!pk) {
        alert("Failed to fetch public key from Freighter.");
        setLoading(false);
        return;
      }

      setPublicKey(pk);
      localStorage.setItem("DEFI_GUARD_WALLET", pk);

      await fetchAll(pk);

      alert("Wallet connected!");
    } catch (err) {
      alert("Freighter connection failed: " + err.message);
    }
    setLoading(false);
  };

  // ------------------------------------------------
  // FETCH BALANCE + USER DATA
  // ------------------------------------------------
  const fetchAll = async (pk) => {
    setLoading(true);

    const bal = await getBalance(pk);
    setBalance(bal);

    const data = await getUserData(pk);

    setUserData({
      invested: Number(data[0] || 0),
      insured: Number(data[1] || 0),
      pool: data[2] || "Not Selected",
    });

    setLoading(false);
  };

  // ------------------------------------------------
  // BUTTON HANDLERS
  // ------------------------------------------------
  const handleAddFunds = async () => {
    if (!publicKey) return alert("Connect wallet first");

    setLoading(true);
    const res = await addFunds(publicKey, 500);
    alert(res.success ? "Added 500 XLM (simulated)" : "Failed: " + res.error);

    await fetchAll(publicKey);
  };

  const handleBuyInsurance = async () => {
    if (!publicKey) return alert("Connect wallet first");

    setLoading(true);
    const res = await buyInsurance(publicKey, 200);

    alert(res.success ? "Insurance purchased (simulated)" : res.error);

    await fetchAll(publicKey);
  };

  const handleClaim = async () => {
    if (!publicKey) return alert("Connect wallet first");

    setLoading(true);
    const res = await claimInsurance(publicKey, publicKey, 150);

    alert(res.success ? "Claim processed (simulated)" : res.error);

    await fetchAll(publicKey);
  };

  // ------------------------------------------------
  // UI RENDER
  // ------------------------------------------------
  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <h2 className="heading">DeFi Guard Dashboard</h2>

        <button className="connect-btn" onClick={handleConnect} disabled={loading}>
          {publicKey
            ? loading
              ? "Refreshing..."
              : "Wallet Connected ✔"
            : loading
            ? "Connecting..."
            : "Connect Freighter"}
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Wallet Balance</h3>
          <p className="value">{balance !== null ? `${balance} XLM` : "—"}</p>
        </div>

        <div className="stat-card">
          <h3>Total Invested</h3>
          <p className="value">
            {userData ? `${userData.invested} XLM` : "—"}
          </p>
        </div>

        <div className="stat-card">
          <h3>Total Insured</h3>
          <p className="value">
            {userData ? `${userData.insured} XLM` : "—"}
          </p>
        </div>

        <div className="stat-card">
          <h3>Insurance Pool</h3>
          <p className="value">{userData ? userData.pool : "—"}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions-container">
        <button
          className="action-btn"
          disabled={!publicKey || loading}
          onClick={handleAddFunds}
        >
          Add Funds (500 XLM)
        </button>

        <button
          className="action-btn"
          disabled={!publicKey || loading}
          onClick={handleBuyInsurance}
        >
          Buy Insurance (200 XLM)
        </button>

        <button
          className="action-btn"
          disabled={!publicKey || loading}
          onClick={handleClaim}
        >
          Claim (150 XLM)
        </button>

        <button
          className="action-btn secondary-btn"
          disabled={loading}
          onClick={() => fetchAll(publicKey)}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
