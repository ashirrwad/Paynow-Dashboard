import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DecisionDrawer from '@/components/DecisionDrawer';
import { useDecisionsStore } from '@/store/decisionsStore';
import { DecisionResponse } from '@/app/api/decide/route';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock the store
jest.mock('@/store/decisionsStore');
const mockUseDecisionsStore = useDecisionsStore as jest.MockedFunction<typeof useDecisionsStore>;

// Helper function to render component
const renderComponent = (component: React.ReactElement) => {
  return act(() => render(component));
};

const mockDecision: DecisionResponse = {
  id: 'test-123',
  decision: 'approved',
  amount: 1000,
  payee: 'Test Payee',
  customerId: 'cust123456',
  latency: 250,
  timestamp: Date.now(),
  reasons: ['Transaction within normal limits', 'Customer has good standing'],
  agentTrace: [
    {
      id: 'risk_analysis',
      name: 'Risk Analysis',
      description: 'Analyzing transaction risk factors',
      duration: 150,
      status: 'completed',
      details: 'Checked customer history and patterns'
    },
    {
      id: 'fraud_check',
      name: 'Fraud Detection',
      description: 'Running fraud detection algorithms',
      duration: 100,
      status: 'completed',
      details: 'No fraud indicators detected'
    }
  ]
};

describe('DecisionDrawer', () => {
  const mockCloseDrawer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when drawer is closed', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: null,
      isDrawerOpen: false,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render drawer when open', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    // Verify drawer opens by checking for dialog presence
    expect(screen.getAllByRole('dialog')).toHaveLength(2); // Headless UI creates nested dialogs
    
    // The drawer title should be present in DOM (even if not visually rendered due to animations)
    expect(screen.getByText('Transaction Decision Details')).toBeInTheDocument();
  });

  it('should close drawer when close button is clicked', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    const closeButton = screen.getByRole('button', { name: /close drawer/i });
    fireEvent.click(closeButton);
    
    expect(mockCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it('should close drawer when escape key is pressed', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(mockCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it('should expand and show agent step details when step is clicked', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    // Initially, step details should not be visible
    expect(screen.queryByText('Checked customer history and patterns')).not.toBeInTheDocument();
    
    // Click on the first agent step
    const stepButton = screen.getByRole('button', { name: /risk analysis/i });
    fireEvent.click(stepButton);
    
    // Step details should now be visible
    expect(screen.getByText('Checked customer history and patterns')).toBeInTheDocument();
  });

  it('should display decision reasons', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    expect(screen.getByText('Transaction within normal limits')).toBeInTheDocument();
    expect(screen.getByText('Customer has good standing')).toBeInTheDocument();
  });

  it('should be keyboard accessible', () => {
    mockUseDecisionsStore.mockReturnValue({
      selectedDecision: mockDecision,
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
      decisions: [],
      isLoading: false,
      error: null,
      addDecision: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      openDrawer: jest.fn(),
      clearError: jest.fn(),
    });

    renderComponent(<DecisionDrawer />);
    
    // Check that drawer has proper ARIA attributes
    const dialogs = screen.getAllByRole('dialog');
    expect(dialogs[0]).toHaveAttribute('aria-modal', 'true');
    expect(dialogs[1]).toHaveAttribute('aria-labelledby', 'drawer-title');
    
    // Check that agent step buttons have proper ARIA attributes
    const stepButton = screen.getByRole('button', { name: /risk analysis/i });
    expect(stepButton).toHaveAttribute('aria-expanded', 'false');
  });
});