/* global BigInt */
/*
  SAFE SOROBAN CONNECTOR FOR REACT
  --------------------------------
  - Never crashes the app
  - Works even without Freighter
  - Returns REAL XLM balance using Horizon v11 syntax
  - addFunds / buyInsurance / claimInsurance are mock-safe
*/

import {
  Horizon,
  rpc,
  xdr,
  TransactionBuilder,
  Networks,
  Operation,
  Account,
} from "@stellar/stellar-sdk";

// Constants
const RPC_URL = "https://soroban-testnet.stellar.org";
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const CONTRACT_ID = "CDGPEQX442TVKAPKBOI5HS2RYAEOJW72W5BSVU7AM7C5QSKCLHQDMYWF";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

// ----------------------------------------------------------------------------
// LOAD FREIGHTER (SAFE)
// ----------------------------------------------------------------------------
let freighter = null;

async function loadFreighter() {
  try {
    freighter = await import("@stellar/freighter-api");
    return freighter;
  } catch (e) {
    console.warn("Freighter not available:", e.message);
    freighter = null;
    return null;
  }
}

// ----------------------------------------------------------------------------
// CONNECT WALLET
// ----------------------------------------------------------------------------
export async function connectFreighter() {
  try {
    const freighter = await import("@stellar/freighter-api");

    const isInstalled = await freighter.isConnected();
    if (!isInstalled) {
      alert("Freighter is not installed. Please install Freighter Wallet.");
      return null;
    }

    const publicKey = await freighter.getPublicKey();

    // Save session
    sessionStorage.setItem("USER_PUBLIC_KEY", publicKey);

    return publicKey;
  } catch (err) {
    console.error("Freighter Login Error:", err);
    return null;
  }
}


// ----------------------------------------------------------------------------
// GET BALANCE (REAL)
// ----------------------------------------------------------------------------
export async function getBalance(publicKey) {
  try {
    const server = new Horizon.Server(HORIZON_URL);

    const account = await server.loadAccount(publicKey);

    const native = account.balances.find((b) => b.asset_type === "native");

    return native ? native.balance : "0";
  } catch (err) {
    console.error("Balance fetch error:", err);
    return "0";
  }
}

// ----------------------------------------------------------------------------
// GET USER DATA (TEMP MOCK UNTIL CONTRACT BINDINGS)
// ----------------------------------------------------------------------------
export async function getUserData(publicKey) {
  try {
    if (!publicKey) return { invested: 0, insured: 0, pool: "—" };

    // TODO: Replace with real Soroban contract call
    return {
      invested: 500,
      insured: 200,
      pool: "Pool A",
    };
  } catch (err) {
    console.error("getUserData error:", err);
    return { invested: 0, insured: 0, pool: "—" };
  }
}

// ----------------------------------------------------------------------------
// MOCK SAFE TRANSACTIONS (Until real contract calls are added)
// ----------------------------------------------------------------------------
export async function addFunds(publicKey, amount) {
  console.log("addFunds:", publicKey, amount);

  await new Promise((res) => setTimeout(res, 500));

  return { success: true, hash: "mock-addfunds-hash" };
}

export async function buyInsurance(publicKey, premium, pool) {
  console.log("buyInsurance:", publicKey, premium, pool);

  await new Promise((res) => setTimeout(res, 500));

  return { success: true, hash: "mock-buyins-hash" };
}

export async function claimInsurance(admin, user, payout) {
  console.log("claimInsurance:", admin, user, payout);

  await new Promise((res) => setTimeout(res, 500));

  return { success: true, hash: "mock-claim-hash" };
}

// ----------------------------------------------------------------------------
// DEFAULT EXPORT
// ----------------------------------------------------------------------------
export default {
  connectFreighter,
  getBalance,
  getUserData,
  addFunds,
  buyInsurance,
  claimInsurance,
};
export function logoutFreighter() {
  sessionStorage.removeItem("USER_PUBLIC_KEY");
}
