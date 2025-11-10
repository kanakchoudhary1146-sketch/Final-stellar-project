import React, { useState } from "react";
import "../styles/invest.css";

const Invest = () => {
  const [pool, setPool] = useState("A");
  const [amount, setAmount] = useState("");

  const handleInvest = (e) => {
    e.preventDefault();
    alert(`You invested ${amount} XLM in Pool ${pool}!`);
  };

  return (
    <div className="invest-container">
      <div className="invest-card">
        <h2>Invest in Insurance Pool</h2>
        <form onSubmit={handleInvest}>
          <label>Select Pool:</label>
          <select value={pool} onChange={(e) => setPool(e.target.value)}>
            <option value="A">Pool A</option>
            <option value="B">Pool B</option>
            <option value="C">Pool C</option>
          </select>

          <label>Investment Amount (XLM):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          <button type="submit">Invest</button>
        </form>
      </div>
    </div>
  );
};

export default Invest;
