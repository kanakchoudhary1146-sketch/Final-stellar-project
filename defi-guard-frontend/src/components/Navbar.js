import React, { useState } from "react";
import { connectFreighter, logoutFreighter } from "../blockchain/soroban";
import "./navbar.css"; // optional if you have CSS

export default function Navbar() {
  const [publicKey, setPublicKey] = useState(
    sessionStorage.getItem("USER_PUBLIC_KEY") || null
  );

  async function handleLogin() {
    const pk = await connectFreighter();
    if (pk) setPublicKey(pk);
  }

  function handleLogout() {
    logoutFreighter();
    setPublicKey(null);
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">DeFi Guard</h2>
      </div>

      <div className="nav-right">
        {!publicKey && (
          <button className="login-btn" onClick={handleLogin}>
            Connect Freighter
          </button>
        )}

        {publicKey && (
          <div className="profile-container">
            <span className="wallet-short">
              {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
