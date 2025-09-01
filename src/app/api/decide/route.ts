import { NextRequest, NextResponse } from "next/server";
import type { DecisionRequest, AgentStep, DecisionResponse } from "@/types";

// Re-export shared types for backward compatibility
export type { DecisionRequest, AgentStep, DecisionResponse } from "@/types";

// Mock agent steps for realistic processing trace
const getAgentStepsForScenario = (scenario: 'success' | 'high_risk' | 'compliance_fail' | 'account_issue' | 'system_error' | 'pending_review'): Omit<AgentStep, "duration" | "id">[] => {
  const baseSteps = [
    {
      name: "Initialize Request",
      description: "Validate incoming transaction request",
      status: "completed" as const,
      details: "Request validation passed. All required fields present.",
    },
  ];

  switch (scenario) {
    case 'success':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "completed" as const,
          details: "Fraud score: LOW (0.12). Customer has excellent transaction history with no suspicious patterns.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "completed" as const,
          details: "AML checks passed. Customer KYC status verified. No sanctions list matches found.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "completed" as const,
          details: "Account active and in good standing. Available balance: $45,230.50. No holds or restrictions.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "All checks passed. Transaction approved for immediate processing.",
        },
      ];

    case 'high_risk':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "failed" as const,
          details: "Fraud score: HIGH (0.87). Multiple risk factors detected: unusual transaction amount, new payee, off-hours timing.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "skipped" as const,
          details: "Skipped due to risk assessment failure.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "skipped" as const,
          details: "Skipped due to risk assessment failure.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "Transaction rejected due to high fraud risk. Manual review recommended.",
        },
      ];

    case 'compliance_fail':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "completed" as const,
          details: "Fraud score: MEDIUM (0.45). Some elevated risk indicators but within acceptable range.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "failed" as const,
          details: "AML alert triggered. Customer requires updated KYC documentation. Sanctions list check: PENDING verification.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "completed" as const,
          details: "Account status: ACTIVE. Balance verification passed.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "Transaction rejected due to compliance requirements. Customer must update documentation.",
        },
      ];

    case 'account_issue':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "completed" as const,
          details: "Fraud score: LOW (0.23). No significant risk indicators detected.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "completed" as const,
          details: "All compliance checks passed successfully.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "failed" as const,
          details: "Account verification failed. Insufficient funds: Available balance $1,250.30, required $2,500.00. Account has temporary hold.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "Transaction rejected due to insufficient funds and account restrictions.",
        },
      ];

    case 'system_error':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "completed" as const,
          details: "Fraud score: LOW (0.18). Standard risk profile confirmed.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "failed" as const,
          details: "External compliance service timeout. Unable to verify sanctions list status within required timeframe.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "completed" as const,
          details: "Account verification completed successfully.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "Transaction requires manual review due to system service unavailability.",
        },
      ];

    case 'pending_review':
      return [
        ...baseSteps,
        {
          name: "Risk Assessment",
          description: "Analyze transaction for potential fraud indicators",
          status: "completed" as const,
          details: "Fraud score: MEDIUM (0.62). Elevated risk due to transaction amount and frequency pattern.",
        },
        {
          name: "Compliance Check",
          description: "Verify regulatory compliance requirements",
          status: "completed" as const,
          details: "Basic compliance checks passed. Enhanced due diligence required for high-value transaction.",
        },
        {
          name: "Account Verification",
          description: "Confirm account status and balance",
          status: "completed" as const,
          details: "Account verified. Sufficient balance available. Customer tier: PREMIUM.",
        },
        {
          name: "Final Decision",
          description: "Apply decision rules and generate outcome",
          status: "completed" as const,
          details: "Transaction flagged for manual review. Amount exceeds automatic approval threshold for customer risk profile.",
        },
      ];

    default:
      return baseSteps;
  }
};

function generateMockResponse(request: DecisionRequest): DecisionResponse {
  // Enhanced decision logic with multiple error scenarios
  let decision: "approved" | "rejected" | "pending";
  let reasons: string[];
  let scenario: 'success' | 'high_risk' | 'compliance_fail' | 'account_issue' | 'system_error' | 'pending_review';

  // Determine scenario based on amount and additional factors
  const riskFactor = Math.random();
  const customerIdSeed = parseInt(request.customerId.slice(-2), 16) || 0;
  const payeeSeed = request.payee.length % 10;
  
  if (request.amount > 50000) {
    // Very high amounts - mostly rejected with various reasons
    if (riskFactor < 0.6) {
      scenario = 'high_risk';
      decision = "rejected";
      reasons = [
        "High fraud risk detected",
        "Unusual transaction amount for customer profile",
        "Multiple risk factors identified",
      ];
    } else if (riskFactor < 0.8) {
      scenario = 'compliance_fail';
      decision = "rejected";
      reasons = [
        "Compliance verification failed",
        "KYC documentation requires update",
        "Enhanced due diligence required",
      ];
    } else {
      scenario = 'pending_review';
      decision = "pending";
      reasons = [
        "Amount requires manual review",
        "Enhanced verification needed",
        "Senior approval required",
      ];
    }
  } else if (request.amount > 10000) {
    // High amounts - mixed outcomes with more errors
    if (customerIdSeed % 4 === 0) {
      scenario = 'account_issue';
      decision = "rejected";
      reasons = [
        "Insufficient account balance",
        "Account has temporary restrictions",
        "Payment limit exceeded",
      ];
    } else if (customerIdSeed % 4 === 1) {
      scenario = 'system_error';
      decision = "pending";
      reasons = [
        "External service temporarily unavailable",
        "Compliance check timeout",
        "Manual review required",
      ];
    } else if (riskFactor < 0.3) {
      scenario = 'high_risk';
      decision = "rejected";
      reasons = [
        "Risk assessment failed",
        "Suspicious transaction pattern",
        "Additional verification needed",
      ];
    } else {
      scenario = 'pending_review';
      decision = "pending";
      reasons = [
        "Transaction requires additional verification",
        "Amount above automatic approval threshold",
      ];
    }
  } else if (request.amount > 2500) {
    // Medium amounts - occasional errors
    if (payeeSeed === 0) {
      scenario = 'compliance_fail';
      decision = "rejected";
      reasons = [
        "Payee verification failed",
        "Sanctions list check required",
        "Compliance documentation needed",
      ];
    } else if (payeeSeed === 1 && riskFactor < 0.2) {
      scenario = 'account_issue';
      decision = "rejected";
      reasons = [
        "Account verification failed",
        "Temporary account hold in place",
      ];
    } else if (payeeSeed === 2 && riskFactor < 0.1) {
      scenario = 'system_error';
      decision = "pending";
      reasons = [
        "System timeout during processing",
        "Retry recommended",
      ];
    } else if (riskFactor < 0.1) {
      scenario = 'pending_review';
      decision = "pending";
      reasons = [
        "Random review selected",
        "Quality assurance check",
      ];
    } else {
      scenario = 'success';
      decision = "approved";
      reasons = [
        "All verification checks passed",
        "Transaction within normal limits",
        "Low risk profile confirmed",
      ];
    }
  } else {
    // Low amounts - mostly successful with rare errors
    if (riskFactor < 0.02) {
      scenario = 'system_error';
      decision = "pending";
      reasons = [
        "Temporary system issue",
        "Please retry in a few minutes",
      ];
    } else if (riskFactor < 0.05 && payeeSeed % 3 === 0) {
      scenario = 'account_issue';
      decision = "rejected";
      reasons = [
        "Account temporarily restricted",
        "Contact customer service",
      ];
    } else {
      scenario = 'success';
      decision = "approved";
      reasons = [
        "Transaction approved",
        "All checks completed successfully",
        "Low risk transaction",
      ];
    }
  }

  // Simulate processing time (longer for complex scenarios)
  const baseLatency = scenario === 'success' ? 150 : 400;
  const latency = Math.floor(Math.random() * 300) + baseLatency;

  const agentSteps = getAgentStepsForScenario(scenario);

  return {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    decision,
    amount: request.amount,
    payee: request.payee,
    customerId: request.customerId,
    latency,
    timestamp: Date.now(),
    reasons,
    agentTrace: agentSteps.map((step, index) => ({
      ...step,
      id: `step_${index + 1}`,
      duration: Math.floor(Math.random() * 200) + 50, // Random duration 50-250ms
    })),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: DecisionRequest = await request.json();

    // Validate required fields
    if (!body.amount || !body.payee || !body.customerId) {
      return NextResponse.json(
        { error: "Missing required fields: amount, payee, customerId" },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof body.amount !== "number" || body.amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 300 + 100)
    );

    const response = generateMockResponse(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
