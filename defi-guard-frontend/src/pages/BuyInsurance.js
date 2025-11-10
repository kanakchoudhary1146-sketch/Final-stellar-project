import React, { useState } from "react";
import "../styles/buy.css";

const BuyInsurance = () => {
  const [plan, setPlan] = useState("health");
  const [amount, setAmount] = useState("");

  const handleBuy = (e) => {
    e.preventDefault();
    alert(`Insurance for ${plan} purchased successfully with ${amount} XLM!`);
  };

  return (
    <div className="buy-container">
      <div className="buy-card">
        <h2>Buy Insurance</h2>
        <form onSubmit={handleBuy}>
          <label>Select Plan:</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="health">Health Insurance</option>
            <option value="vehicle">Vehicle Insurance</option>
            <option value="travel">Travel Insurance</option>
          </select>

          <label>Amount (XLM):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          <button type="submit">Buy Now</button>
        </form>
      </div>
    </div>
  );
};

export default BuyInsurance;
