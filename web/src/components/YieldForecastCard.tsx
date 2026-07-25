// web/src/components/YieldForecastCard.tsx
"use client";

import { useState } from "react";
import { calculateOptimalAllocation, StrategyYield } from "@/lib/ai-forecast";

const MOCK_STRATEGIES: StrategyYield[] = [
  { poolId: "1", name: "XLM/USDC Pool", historicalApy: [4.2, 4.8, 5.1, 5.5], predictedApy: 0, confidenceScore: 0.88 },
  { poolId: "2", name: "XLM/EURC Pool", historicalApy: [3.1, 3.2, 3.4, 3.6], predictedApy: 0, confidenceScore: 0.92 },
  { poolId: "3", name: "USDC Savings Vault", historicalApy: [7.0, 6.8, 6.5, 6.2], predictedApy: 0, confidenceScore: 0.81 },
];

export function YieldForecastCard() {
  const [predictions] = useState(calculateOptimalAllocation(MOCK_STRATEGIES));
  const [isExecuting, setIsExecuting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExecuteRebalance = async () => {
    setIsExecuting(true);
    setStatusMessage("Executing AI rebalance strategy on-chain...");

    try {
      // Simulate on-chain transaction execution / Soroban contract call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatusMessage("✅ Portfolio successfully rebalanced across yield pools!");
    } catch (error) {
      console.error("Rebalance failed:", error);
      setStatusMessage("❌ Failed to execute rebalance strategy.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800">
      <h2 className="text-xl font-bold mb-4">🤖 AI Yield Forecast & Auto-Allocation</h2>
      <div className="space-y-4">
        {predictions.map((strat) => (
          <div key={strat.poolId} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
            <div>
              <p className="font-semibold">{strat.name}</p>
              <p className="text-sm text-slate-400">
                Predicted APY: <span className="text-green-400 font-bold">{strat.predictedApy}%</span>
              </p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-indigo-600 text-xs font-bold rounded-full">
                {strat.suggestedAllocationPct}% Allocation
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleExecuteRebalance}
        disabled={isExecuting}
        className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-800 font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed"
      >
        {isExecuting ? "Executing Strategy..." : "Execute Rebalance Strategy"}
      </button>

      {statusMessage && (
        <p className="mt-3 text-center text-sm text-indigo-300 transition-all">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
