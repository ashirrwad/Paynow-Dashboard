/**
 * DecisionDrawer component type definitions
 */

import type { AgentStep } from '@/types';

export interface AgentStepProps {
  step: AgentStep;
  isExpanded: boolean;
  onToggle: () => void;
}