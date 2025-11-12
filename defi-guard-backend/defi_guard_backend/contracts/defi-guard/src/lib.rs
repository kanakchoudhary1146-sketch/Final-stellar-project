#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Map, panic_with_error, Error};
use core::clone::Clone;
use core::default::Default;
use core::result::Result;

#[derive(Debug, Clone, Copy)]
pub enum DeFiGuardError {
    Unauthorized,
}

// ✅ Implement conversion to soroban_sdk::Error
impl From<DeFiGuardError> for Error {
    fn from(e: DeFiGuardError) -> Self {
        match e {
            DeFiGuardError::Unauthorized => Error::from_type_and_code(
                soroban_sdk::xdr::ScErrorType::Auth,
                soroban_sdk::xdr::ScErrorCode::InvalidAction,
            ),
        }
    }
}

#[contract]
pub struct DeFiGuard;

#[contractimpl]
impl DeFiGuard {
    // Initialize contract with admin
    pub fn initialize(env: Env, admin: Address) {
        env.storage().instance().set(&Symbol::new(&env, "admin"), &admin);
        env.storage().instance().set(&Symbol::new(&env, "pools"), &Map::<Address, i128>::new(&env));
    }

    // Add funds to insurance pool (investor)
    pub fn add_funds(env: Env, investor: Address, amount: i128) {
        let mut pools: Map<Address, i128> = env.storage().instance()
            .get(&Symbol::new(&env, "pools"))
            .unwrap_or(Map::new(&env));
        let prev = pools.get(investor.clone()).unwrap_or(0);
        pools.set(investor.clone(), prev + amount);
        env.storage().instance().set(&Symbol::new(&env, "pools"), &pools);
    }

    // User buys insurance
    pub fn buy_insurance(env: Env, user: Address, premium: i128) {
        let key = Symbol::new(&env, "insured");
        let mut insured: Map<Address, i128> = env.storage().instance().get(&key).unwrap_or(Map::new(&env));
        insured.set(user.clone(), premium);
        env.storage().instance().set(&key, &insured);
    }

    // Admin approves claim
    pub fn claim(env: Env, admin: Address, user: Address, payout: i128) {
        let stored_admin: Address = env.storage().instance().get(&Symbol::new(&env, "admin")).unwrap();
        if admin != stored_admin {
            panic_with_error!(&env, DeFiGuardError::Unauthorized);
        }
        let mut insured: Map<Address, i128> = env.storage().instance()
            .get(&Symbol::new(&env, "insured"))
            .unwrap_or(Map::new(&env));
        insured.set(user.clone(), 0);
        env.storage().instance().set(&Symbol::new(&env, "insured"), &insured);
    }

    // Get user insurance and investment details
    pub fn get_user(env: Env, user: Address) -> (i128, i128) {
        let insured: Map<Address, i128> = env.storage().instance()
            .get(&Symbol::new(&env, "insured"))
            .unwrap_or(Map::new(&env));
        let pools: Map<Address, i128> = env.storage().instance()
            .get(&Symbol::new(&env, "pools"))
            .unwrap_or(Map::new(&env));

        let insured_amount = insured.get(user.clone()).unwrap_or(0);
        let invested_amount = pools.get(user.clone()).unwrap_or(0);
        (insured_amount, invested_amount)
    }
}
