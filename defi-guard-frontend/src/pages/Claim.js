import React, { useState } from "react";
import { claimInsurance } from "../blockchain/soroban";
import "./dashboard.css";

export default function Claim() {
  const [policy, setPolicy] = useState("");
  const [desc, setDesc] = useState("");
  const adminPk = localStorage.getItem("DEFI_GUARD_FAKE_PK") || "";

  const submit = async (e) => {
    e.preventDefault();
    if (!adminPk) return alert("Admin wallet required. Use Login and enter admin public key.");
    const res = await claimInsurance(adminPk, policy, 150);
    if (res.success) alert("Claim submitted (simulated).");
    else alert("Failed: " + (res.error || "unknown"));
  };

  return (
    <div className="dashboard-wrap">
      <h2>Submit Claim</h2>
      <form onSubmit={submit} style={{ maxWidth:520 }}>
        <label>Policy ID</label>
        <input value={policy} onChange={(e)=>setPolicy(e.target.value)} placeholder="policy id" style={{ display:"block", padding:10, marginTop:8, width:"100%", borderRadius:8 }} />
        <label style={{ marginTop:12 }}>Reason</label>
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="reason" style={{ display:"block", padding:10, marginTop:8, width:"100%", height:120, borderRadius:8 }} />
        <button className="pill" style={{ marginTop:14 }} type="submit">Submit Claim</button>
      </form>
    </div>
  );
}
