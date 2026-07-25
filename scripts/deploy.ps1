$ErrorActionPreference = "Stop"

Write-Host "Building Soroban contract..." -ForegroundColor Cyan
cargo build --target wasm32-unknown-unknown --release --manifest-path contracts/savings-goal/Cargo.toml

$WasmPath = "target/wasm32-unknown-unknown/release/savings_goal.wasm"

if (-not (Test-Path $WasmPath)) {
    Write-Error "WASM file not found at $WasmPath"
    exit 1
}

Write-Host "Deploying contract to Testnet..." -ForegroundColor Cyan
$ContractId = soroban contract deploy `
    --wasm $WasmPath `
    --source alice `
    --network testnet

Write-Host "Deployed Contract ID: $ContractId" -ForegroundColor Green

Write-Host "Initializing contract..." -ForegroundColor Cyan
try {
    soroban contract invoke `
        --id $ContractId `
        --source alice `
        --network testnet `
        -- `
        initialize `
        --admin $(soroban config identity address alice) `
        --target_amount 1000000000 `
        --deadline 1800000000
} catch {
    Write-Host "(init skipped - contract may already be initialized)" -ForegroundColor Yellow
}

$EnvFile = "web/.env.local"
if (-not (Test-Path $EnvFile)) {
    New-Item -ItemType File -Path $EnvFile | Out-Null
}

$EnvContent = Get-Content $EnvFile -ErrorAction SilentlyContinue | Where-Object { $_ -notmatch "^NEXT_PUBLIC_CONTRACT_ID=" }
$EnvContent += "NEXT_PUBLIC_CONTRACT_ID=$ContractId"
Set-Content $EnvFile $EnvContent

Write-Host ""
Write-Host "Wrote NEXT_PUBLIC_CONTRACT_ID to web/.env.local" -ForegroundColor Green
Write-Host "Restart 'npm run dev' to pick up the new contract ID." -ForegroundColor Cyan
