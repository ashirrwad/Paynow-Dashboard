import { NextRequest, NextResponse } from 'next/server';
import type { DecisionRequest, AgentStep, DecisionResponse } from '@/types';

// Re-export shared types for backward compatibility
export type { DecisionRequest, AgentStep, DecisionResponse } from '@/types';

// Mock agent steps for realistic processing trace
const mockAgentSteps: Omit<AgentStep, 'duration' | 'id'>[] = [
  {
    name: "Initialize Request",
    description: "Validate incoming transaction request",
    status: 'completed',
    details: "Request validation passed. All required fields present."
  },
  {
    name: "Risk Assessment",
    description: "Analyze transaction for potential fraud indicators",
    status: 'completed',
    details: "Fraud score calculated. Multiple data sources consulted including transaction history and behavioral patterns."
  },
  {
    name: "Compliance Check",
    description: "Verify regulatory compliance requirements",
    status: 'completed',
    details: "AML checks passed. Customer KYC status verified. No sanctions list matches found."
  },
  {
    name: "Account Verification", 
    description: "Confirm account status and balance",
    status: 'completed',
    details: "Account active and in good standing. Sufficient balance confirmed for transaction."
  },
  {
    name: "Final Decision",
    description: "Apply decision rules and generate outcome",
    status: 'completed',
    details: "Decision matrix applied based on risk score, amount, and compliance status."
  }
];

function generateMockResponse(request: DecisionRequest): DecisionResponse {
  
  // Simple decision logic based on amount
  let decision: 'approved' | 'rejected' | 'pending';
  let reasons: string[];
  
  if (request.amount > 10000) {
    decision = 'rejected';
    reasons = ['Transaction amount exceeds daily limit', 'Manual review required for high-value transactions'];
  } else if (request.amount > 5000) {
    decision = 'pending';
    reasons = ['Transaction requires additional verification', 'Amount above automatic approval threshold'];
  } else {
    decision = 'approved';
    reasons = ['Transaction within normal limits', 'Customer has good standing', 'Fraud risk assessment: Low'];
  }
  
  // Simulate processing time
  const latency = Math.floor(Math.random() * 500) + 200; // 200-700ms
  
  return {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    decision,
    amount: request.amount,
    payee: request.payee,
    customerId: request.customerId,
    latency,
    timestamp: Date.now(),
    reasons,
    agentTrace: mockAgentSteps.map((step, index) => ({
      ...step,
      id: `step_${index + 1}`,
      duration: Math.floor(Math.random() * 200) + 50 // Random duration 50-250ms
    }))
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: DecisionRequest = await request.json();
    
    // Validate required fields
    if (!body.amount || !body.payee || !body.customerId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, payee, customerId' },
        { status: 400 }
      );
    }
    
    // Validate amount
    if (typeof body.amount !== 'number' || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number' },
        { status: 400 }
      );
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
    
    const response = generateMockResponse(body);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}