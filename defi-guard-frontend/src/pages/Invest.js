import React, { useState } from "react";
import { addFunds } from "../blockchain/soroban";
import "./dashboard.css";

export default function Invest() {
  const [pool, setPool] = useState("A");
  const [amount, setAmount] = useState("");
  const pk = localStorage.getItem("DEFI_GUARD_FAKE_PK") || "";

  const onInvest = async (e) => {
    e.preventDefault();
    if (!pk) return alert("Connect wallet first");
    const res = await addFunds(pk, Number(amount || 0));
    if (res.success) alert("Invested (simulated).");
    else alert("Failed: " + (res.error || "unknown"));
  };

  return (
    <div className="dashboard-wrap">
      <h2>Invest in Insurance Pool</h2>
      <form onSubmit={onInvest} style={{ maxWidth:520 }}>
        <label>Select Pool</label>
        <select value={pool} onChange={(e)=>setPool(e.target.value)} style={{ display:"block", padding:10, marginTop:8, width:"100%", borderRadius:8 }}>
          <option value="A">Pool A</option>
          <option value="B">Pool B</option>
        </select>

        <label style={{ marginTop:12 }}>Amount (XLM)</label>
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="e.g. 1000" style={{ display:"block", padding:10, marginTop:8, width:"100%", borderRadius:8 }} />

        <button className="pill" style={{ marginTop:14 }} type="submit">Invest</button>
      </form>
    </div>
  );
}
