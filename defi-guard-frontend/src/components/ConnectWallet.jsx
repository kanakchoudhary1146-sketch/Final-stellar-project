import React from "react";
import { connectFreighter } from "../blockchain/soroban";

export default function ConnectWallet({ onConnected }) {
  const handleConnect = async () => {
    const pk = await connectFreighter();
    if (pk && onConnected) onConnected(pk);
  };

  return (
    <button className="wallet-cta" onClick={handleConnect}>
      Connect Wallet
    </button>
  );
}
