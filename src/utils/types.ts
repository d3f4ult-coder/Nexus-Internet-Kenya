export type ApiName =
  | 'hubspot'
  | 'slack'
  | 'gcpBigQuery'
  | 'airtable'
  | 'salesforce'
  | 'awsS3'
  | 'twillio'
  | 'stripe';

export interface ApiLimitSpec {
  name: string;
  rateLimit: Record<string, any>;
  recommendedBatchSize: number;
  documentation: string;
  costModel?: string;
  costPer1000Calls?: number;
  costPer1TBScanned?: number;
  costPer1000Records?: number;
  costPerMillionRequests?: number;
  costPercentage?: number;
}

export interface ApiSpecs {
  apis: Record<string, ApiLimitSpec>;
}

export interface WorkflowIssue {
  severity: 'low' | 'medium' | 'high';
  message: string;
  path?: string;
  suggestion?: string;
}

export interface RetryConfig {
  strategy: 'exponential' | 'linear';
  baseDelayMs: number;
  maxAttempts: number;
  jitter: boolean;
}

export interface WorkflowValidationResult {
  isValid: boolean;
  issues: WorkflowIssue[];
  score: number;
}
