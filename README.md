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
