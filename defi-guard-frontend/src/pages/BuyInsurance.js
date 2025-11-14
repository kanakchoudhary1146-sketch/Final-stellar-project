import React, { useState, useEffect } from "react";
import { buyInsurance } from "../blockchain/soroban";
import "./dashboard.css"; // Uses your existing styles

export default function BuyInsurance() {
  const [amount, setAmount] = useState("");
  const [pool, setPool] = useState("Pool A");
  const [publicKey, setPublicKey] = useState("");

  // Auto-load wallet
  useEffect(() => {
    const saved = localStorage.getItem("DEFI_GUARD_WALLET");
    if (saved) setPublicKey(saved);
  }, []);

  async function handleBuy(e) {
    e.preventDefault();

    if (!publicKey) {
      return alert("Please connect wallet first using the Login page.");
    }

    if (!amount || Number(amount) <= 0) {
      return alert("Enter a valid insurance amount.");
    }

    const res = await buyInsurance(publicKey, Number(amount), pool);

    if (res.success) {
      alert(
        `Insurance Purchased Successfully!\n\nPool: ${pool}\nAmount: ${amount} XLM`
      );
      setAmount("");
    } else {
      alert("Transaction Failed: " + (res.error || "Unknown Error"));
    }
  }

  return (
    <div className="dashboard-wrap fadeIn">
      <h2 className="heading">Buy Insurance</h2>

      <div className="card smooth-card">
        {/* Display Wallet */}
        <p className="wallet-display">
          <strong>Wallet:</strong>{" "}
          {publicKey ? (
            <span className="wallet-key">{publicKey}</span>
          ) : (
            <span className="wallet-warning">Not Connected</span>
          )}
        </p>

        <form onSubmit={handleBuy} className="form-column">

          {/* Pool Selection */}
          <label className="form-label">Choose Insurance Pool</label>
          <select
            value={pool}
            onChange={(e) => setPool(e.target.value)}
            className="input-box"
          >
            <option value="Pool A">Pool A — Low Risk</option>
            <option value="Pool B">Pool B — Moderate Risk</option>
            <option value="Pool C">Pool C — High Risk</option>
          </select>

          {/* Amount Input */}
          <label className="form-label">Insurance Amount (XLM)</label>
          <input
            className="input-box"
            placeholder="Example: 150"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="1"
          />

          {/* Submit Button */}
          <button className="action-btn" style={{ marginTop: 20 }}>
            Purchase Insurance
          </button>
        </form>
      </div>
    </div>
  );
}
