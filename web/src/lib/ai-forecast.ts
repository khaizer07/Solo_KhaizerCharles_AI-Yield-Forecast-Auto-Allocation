export interface StrategyYield {
  poolId: string;
  name: string;
  historicalApy: number[];
  predictedApy: number;
  suggestedAllocationPct?: number;
}

// Simple Exponential Smoothing model for yield prediction
export function forecastYield(historicalApy: number[], alpha = 0.35): number {
  if (!historicalApy || historicalApy.length === 0) return 0;
  
  let forecast = historicalApy[0];
  for (let i = 1; i < historicalApy.length; i++) {
    forecast = alpha * historicalApy[i] + (1 - alpha) * forecast;
  }
  return parseFloat(forecast.toFixed(2));
}

// Calculate target allocation across all strategies
export function calculateOptimalAllocation(strategies: StrategyYield[]): StrategyYield[] {
  const yields = strategies.map((s) => forecastYield(s.historicalApy));
  const totalPredictedYield = yields.reduce((a, b) => a + b, 0);

  return strategies.map((s, idx) => ({
    ...s,
    predictedApy: yields[idx],
    suggestedAllocationPct:
      totalPredictedYield > 0
        ? Math.round((yields[idx] / totalPredictedYield) * 100)
        : 0,
  }));
}
