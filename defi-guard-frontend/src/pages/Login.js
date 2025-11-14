import React, { useState } from "react";

export default function Login() {
  const [pk, setPk] = useState(localStorage.getItem("DEFI_GUARD_FAKE_PK") || "");

  const save = (e) => {
    e.preventDefault();
    if (!pk) return alert("Enter public key to simulate logged in user.");
    localStorage.setItem("DEFI_GUARD_FAKE_PK", pk);
    alert("Saved public key for local testing.");
  };

  const logout = () => {
    localStorage.removeItem("DEFI_GUARD_FAKE_PK");
    setPk("");
    alert("Logged out (local).");
  };

  return (
    <div style={{ padding:40 }}>
      <h2>Login (dev)</h2>
      <form onSubmit={save} style={{ maxWidth:420 }}>
        <label>Public Key (Freighter or test)</label>
        <input value={pk} onChange={(e)=>setPk(e.target.value)} style={{ width:"100%", padding:10, marginTop:8, borderRadius:8 }} placeholder="G..." />
        <div style={{ marginTop:12 }}>
          <button className="pill" style={{ marginRight:8 }} type="submit">Save</button>
          <button className="pill" onClick={logout} type="button">Logout</button>
        </div>
      </form>
    </div>
  );
}
