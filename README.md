# StellarX Workshop Starter

A ready-to-run scaffold for a **StellarX workshop**. It gives you a
working Stellar app on **testnet** so you can spend the workshop bending it toward
your own idea instead of fighting setup.

It covers **both** workshop tracks:

- **Fullstack payments** — a Next.js app: connect Freighter → fund via Friendbot →
  view XLM/USDC balances → send a payment → confirm on-chain.
- **Soroban smart contract** — a small Rust contract (a *Savings Goal* tracker)
  you build, test, deploy with the Stellar CLI, and call from the same frontend.

```
.
├── web/                      # Next.js 16 + TypeScript + Tailwind frontend
├── contracts/savings-goal/   # Rust Soroban contract (init / contribute / get_state)
├── scripts/                  # deploy.ps1 (Windows) / deploy.sh
├── Cargo.toml                # Rust workspace
└── CLAUDE.md                 # stack notes + Stellar gotchas (read this!)
```

## Prerequisites

- **Node.js 20+** and **npm** — for the frontend.
- **Freighter** browser extension — create a wallet, switch it to **Test Net**.
- For the contract track: **Rust**, the `wasm32v1-none` target, and the **Stellar CLI**.

You can run the **payments demo with just Node + Freighter** — Rust/CLI are only
needed to deploy the Soroban contract.

### Install the contract toolchain (Windows)

Install Rust and the Stellar CLI:

```powershell
winget install --id Rustlang.Rustup -e --accept-source-agreements --accept-package-agreements
winget install --id Stellar.StellarCLI -e --accept-source-agreements --accept-package-agreements
```

Then **open a new terminal** (so `cargo`/`stellar` land on PATH) and give Rust a
working linker — pick one:

**Easiest — GNU toolchain** (no admin, no large download):

```powershell
rustup default stable-x86_64-pc-windows-gnu
rustup target add wasm32v1-none
```

**Or MSVC** (matches Stellar's docs): install the **Visual C++ Build Tools** (the
"Desktop development with C++" workload), then:

```powershell
rustup target add wasm32v1-none
```

> If `cargo` fails with *"linker `link.exe` not found"*, you skipped the step
> above — use the GNU toolchain or install the Build Tools.

On macOS/Linux: install Rust from <https://rustup.rs>, run
`rustup target add wasm32v1-none`, and install the Stellar CLI
(`brew install stellar-cli`).

## 1. Run the frontend (the part that demos immediately)

```powershell
cd web
npm install        # already run if you scaffolded via this repo
npm run dev
```

Open <http://localhost:3000>, then:

1. **Connect Freighter** (approve in the extension; make sure it's on Test Net).
2. **Fund with Friendbot** — your XLM balance jumps to ~10,000.
3. **Send a payment** to another *existing, funded* testnet account
   (create one at <https://laboratory.stellar.org/#account-creator?network=test>).
4. Watch the status go Building → Signing → Submitting → Confirming → Success,
   then open the **Stellar Expert** link to see it on-chain.

`web/.env.local` is pre-filled with testnet config. `NEXT_PUBLIC_CONTRACT_ID` is
left empty — the Savings Goal panel shows deploy instructions until you set it.

## 2. Build, test & deploy the Soroban contract

```powershell
# from the repo root
cargo test                 # runs the contract unit tests (no network needed)

# deploy to testnet + auto-wire the contract ID into web/.env.local
.\scripts\deploy.ps1       # macOS/Linux:  ./scripts/deploy.sh
```

The deploy script will: create+fund a testnet identity (if needed), run
`stellar contract build`, deploy, initialise the goal (target `1000`), and write
`NEXT_PUBLIC_CONTRACT_ID` into `web/.env.local`. **Restart `npm run dev`** and the
**Savings Goal** panel goes live: it reads on-chain progress and lets a connected
wallet `contribute` (a real signed Soroban transaction).

### The contract (`contracts/savings-goal/src/lib.rs`)

| Function | Purpose |
|---|---|
| `init(target: i128)` | Set the savings target (once). |
| `contribute(amount: i128) -> i128` | Add to the saved total; returns the new total. |
| `get_state() -> State` | Read `{ saved, target }`. |

It uses plain integer state (no token transfers) so it's bulletproof in a live
demo. To make it move real money, swap `contribute` to call the XLM/USDC SAC
`transfer` and store per-user contributions — see CLAUDE.md for the SAC addresses.

## 3. Make it your idea

This is your *starting point*, not the answer. Pick an idea + track from the
workshop's 300-ideas list (Philippines remittance / payments / financial
inclusion themes score well), then reshape the components and the contract.
Good extension paths: transaction history from Horizon, USDC trustline + send,
a swap via Soroswap, a price feed via Reflector.

For a fully worked example built on this scaffold, see the **Paluwagan** app in
`..\Stellar-Workshop-PUP-May-2026-EXAMPLE`.

## Troubleshooting

- **Freighter "not detected"** — install it, reload the page, and confirm it's unlocked.
- **Payment fails `op_no_destination`** — fund the destination account first.
- **`tx_bad_auth`** — wrong network passphrase; this app uses `Networks.TESTNET`.
- **Contract panel can't read state** — make sure you deployed *and* ran `init`,
  and that `NEXT_PUBLIC_CONTRACT_ID` is set, then restart the dev server.

See **CLAUDE.md** for the full list of Stellar gotchas.

Project Name
StellarX Auto-Yield & Smart Savings

One-Line Description
A Stellar-powered DeFi dashboard that automates yield optimization across liquidity pools using AI forecasting alongside Soroban-managed savings goals.

Track
Track 4 AI-Powered Stellar Apps

Problem It Solves
Managing DeFi assets efficiently requires constant monitoring of changing interest rates and manual pool rebalancing, which can be overwhelming for everyday users. Existing savings tools often lack automated strategies or transparent on-chain goal tracking. This platform addresses these pain points for crypto users by delivering predictive APY analytics for automatic portfolio optimization while offering structured on-chain savings goals.

How It Uses Stellar
Soroban Smart Contracts: Deploys WASM-based smart contracts (savings_goal.wasm) to track goal targets, deposits, and on-chain state safely on Testnet.

Freighter Wallet Integration: Leverages the @stellar/freighter-api to authenticate users and sign Soroban contract invocations and payment transactions.

Horizon API & Stellar SDK: Interacts with the Stellar Testnet Horizon server to check real-time account balances (XLM/USDC) and submit signed transaction envelopes (XDR).

Friendbot Anchor: Integrates Testnet Friendbot funding calls directly within the UI onboarding flow.

GitHub Repository
https://github.com/khaizer07/Solo_KhaizerCharles_AI-Yield-Forecast-Auto-Allocation/tree/main

Network & Deployment
Network: testnet

Live app URL: runs locally — see README (http://localhost:3000)

Contract IDs / asset issuers:

NEXT_PUBLIC_CONTRACT_ID: CCH3FOSFZYPHNV72RSWJDI6XF7OFURKZAM2DR4TDOKNG4SFZE5E4PKNU

NEXT_PUBLIC_USDC_ISSUER: GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5

Team
Khaizer Charles T. Labong — @khaizer07

Novelty Note (optional, for bonus points)
Unlike static DeFi dashboards on Stellar, this project combines off-chain AI prediction algorithms (exponential smoothing for APY trends) with Soroban smart contract state execution. It offers users a single interactive interface that predicts ideal asset allocation percentages while managing programmable savings accounts directly on Testnet.

Anything Else
Known Limitations: Currently uses simulated testnet APY market data for the forecasting engine and client-side contract state fallback handling when Testnet resets occur.

Next Steps: Implement full multi-sig auto-rebalancing execution via Soroban state updates and expand USDC liquidity pool options.
