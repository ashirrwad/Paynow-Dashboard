/**
 * Decision-related type definitions
 */

export interface DecisionRequest {
  amount: number;
  payee: string;
  customerId: string;
}

export interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'failed' | 'skipped';
  duration: number;
  details?: string;
}

export interface DecisionResponse {
  id: string;
  decision: 'approved' | 'rejected' | 'pending';
  amount: number;
  payee: string;
  customerId: string;
  latency: number;
  timestamp: number;
  reasons: string[];
  agentTrace: AgentStep[];
}

export type DecisionStatus = 'approved' | 'rejected' | 'pending';

export type AgentStepStatus = 'completed' | 'failed' | 'skipped';