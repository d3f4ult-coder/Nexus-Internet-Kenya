export interface CostBreakdown {
  apiCost: number;
  computeCost: number;
  storageCost: number;
  totalMonthlyCost: number;
  optimizationSuggestions: string[];
}

export function calculateWorkflowCost(workflow: any, monthlyExecutions: number): CostBreakdown {
  const nodes = Array.isArray(workflow.nodes) ? workflow.nodes : [];
  const nodeCount = nodes.length;

  // Estimate API calls (3 per node on average)
  const apiCallsPerRun = Math.max(10, nodeCount * 3);
  const estimatedApiCalls = monthlyExecutions * apiCallsPerRun;

  // Base costs (simplified model)
  const storageCost = monthlyExecutions * 0.0003; // $0.0003 per execution
  const computeCost = monthlyExecutions * 0.0015; // $0.0015 per execution
  const apiCost = estimatedApiCalls * 0.00002; // $0.00002 per API call

  const totalMonthlyCost = apiCost + computeCost + storageCost;

  const optimizationSuggestions: string[] = [];

  if (apiCallsPerRun > 50) {
    optimizationSuggestions.push('High number of API calls detected - consider batching operations');
  }

  if (nodeCount > 10) {
    optimizationSuggestions.push('Complex workflow detected - consider breaking into sub-workflows');
  }

  optimizationSuggestions.push('Implement caching for repeated data fetches');
  optimizationSuggestions.push('Optimize database queries and filter early');
  optimizationSuggestions.push('Use conditional logic to skip unnecessary API calls');

  return {
    apiCost,
    computeCost,
    storageCost,
    totalMonthlyCost,
    optimizationSuggestions
  };
}
