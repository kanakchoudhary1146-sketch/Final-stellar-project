import React, { useState } from "react";
import "../styles/claim.css";

const Claim = () => {
  const [policyId, setPolicyId] = useState("");
  const [reason, setReason] = useState("");

  const handleClaim = (e) => {
    e.preventDefault();
    alert(`Claim request for Policy ${policyId} submitted!`);
  };

  return (
    <div className="claim-container">
      <div className="claim-card">
        <h2>Submit Claim</h2>
        <form onSubmit={handleClaim}>
          <label>Policy ID:</label>
          <input
            type="text"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            placeholder="Enter policy ID"
            required
          />

          <label>Reason for Claim:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your issue"
            required
          ></textarea>

          <button type="submit">Submit Claim</button>
        </form>
      </div>
    </div>
  );
};

export default Claim;
