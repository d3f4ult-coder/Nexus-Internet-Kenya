import { WorkflowIssue } from './types';

export function validateWorkflowStructure(workflow: any): WorkflowIssue[] {
  const issues: WorkflowIssue[] = [];

  // Check if workflow has required structure
  if (!workflow || typeof workflow !== 'object') {
    issues.push({
      severity: 'high',
      message: 'Workflow must be a valid JSON object',
    });
    return issues;
  }

  // Validate nodes
  const nodes = Array.isArray(workflow.nodes) ? workflow.nodes : [];
  if (nodes.length === 0) {
    issues.push({
      severity: 'high',
      message: 'Workflow has no nodes defined',
      suggestion: 'Add at least one node to your workflow'
    });
  }

  // Check for error handling
  const hasErrorHandler = nodes.some((node: any) =>
    /error|catch|fallback|retry|dead|dlq/i.test(node.name || node.type || '')
  );

  if (!hasErrorHandler && nodes.length > 0) {
    issues.push({
      severity: 'high',
      message: 'No error-handling node detected',
      suggestion: 'Add a dead-letter queue, error handler, or fallback node'
    });
  }

  // Check for retry logic
  const hasRetry = nodes.some((node: any) =>
    /retry|backoff|exponential|linear/i.test(node.name || node.type || '')
  );

  if (!hasRetry && nodes.length > 0) {
    issues.push({
      severity: 'medium',
      message: 'No explicit retry logic configured',
      suggestion: 'Implement exponential backoff with jitter for API resilience'
    });
  }

  // Check for timeout configuration
  const hasTimeout = nodes.some((node: any) => {
    const params = node.parameters || {};
    return params.timeout || params.requestTimeout || params.timeoutMs;
  });

  if (!hasTimeout && nodes.length > 0) {
    issues.push({
      severity: 'medium',
      message: 'No timeout configuration detected for external calls',
      suggestion: 'Add timeout values (e.g., 5000ms) to all HTTP and API nodes'
    });
  }

  // Check webhook authentication
  const webhookNodes = nodes.filter((node: any) =>
    /webhook/i.test(node.type || node.name || '')
  );

  webhookNodes.forEach((node: any, index: number) => {
    const params = node.parameters || {};
    const hasAuth = params.authentication || params.auth || params.secret || params.token;

    if (!hasAuth) {
      issues.push({
        severity: 'high',
        message: `Webhook node "${node.name || `Webhook ${index + 1}`}" lacks authentication`,
        suggestion: 'Add authentication headers, API keys, or token validation'
      });
    }
  });

  // Check for rate limiting consideration
  const hasRateLimitLogic = nodes.some((node: any) =>
    /rate|limit|throttle|batch|queue/i.test(node.name || node.type || '')
  );

  if (!hasRateLimitLogic && nodes.length > 3) {
    issues.push({
      severity: 'low',
      message: 'Large workflow may benefit from rate-limiting or batching logic',
      suggestion: 'Consider implementing throttling or batch processing for high-volume workflows'
    });
  }

  // Check edges/connections
  const edges = Array.isArray(workflow.edges) ? workflow.edges : [];
  if (edges.length === 0 && nodes.length > 1) {
    issues.push({
      severity: 'low',
      message: 'Workflow has multiple nodes but no edges defined',
      suggestion: 'Ensure all nodes are properly connected'
    });
  }

  return issues;
}

export function calculateWorkflowScore(issues: WorkflowIssue[]): number {
  const highSeverityCount = issues.filter(i => i.severity === 'high').length;
  const mediumSeverityCount = issues.filter(i => i.severity === 'medium').length;
  const lowSeverityCount = issues.filter(i => i.severity === 'low').length;

  const score = Math.max(
    0,
    100 - (highSeverityCount * 20 + mediumSeverityCount * 10 + lowSeverityCount * 5)
  );

  return Math.round(score);
}
