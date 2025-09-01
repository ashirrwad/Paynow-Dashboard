/**
 * Basic test fixtures for core functionality
 */

export const mockDecision = {
  id: 'dec_001',
  decision: 'approved',
  reason: 'Low risk transaction',
  reasons: ['Low risk transaction', 'Customer verified'],
  amount: 100.50,
  payee: 'Test User',
  customerId: 'cust123456',
  timestamp: Date.now(),
  latency: 200,
  agentSteps: [
    {
      id: 'step_001',
      name: 'Validation',
      status: 'completed',
      duration: 100
    }
  ],
  agentTrace: [
    {
      id: 'step_001',
      name: 'Validation',
      status: 'completed',
      duration: 100
    }
  ]
};

export const mockFormData = {
  amount: '100.50',
  payee: 'John Doe',
  customerId: 'test123'
};

export const mockStore = {
  decisions: [mockDecision],
  isLoading: false,
  error: null,
  selectedDecision: null,
  isDrawerOpen: false,
  addDecision: jest.fn(),
  setLoading: jest.fn(),
  setError: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  clearError: jest.fn()
};