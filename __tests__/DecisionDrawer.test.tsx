import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DecisionDrawer from '@/components/DecisionDrawer/DecisionDrawer';
import { mockDecision } from '../fixtures/basic';

// Control the mocked store state per test
const mockCloseDrawer = jest.fn();
const mockStoreState = {
  selectedDecision: mockDecision,
  isDrawerOpen: true,
  closeDrawer: mockCloseDrawer,
};

jest.mock('@/store/decisionsStore', () => ({
  useDecisionsStore: () => mockStoreState,
}));

describe('DecisionDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // reset the store state defaults
    mockStoreState.selectedDecision = mockDecision;
    mockStoreState.isDrawerOpen = true;
    mockStoreState.closeDrawer = mockCloseDrawer;
  });

  it('opens drawer, shows agent steps from agentTrace, and toggles step expansion', async () => {
    const user = userEvent.setup();

    render(<DecisionDrawer />);

    // Headless UI may render multiple elements with role="dialog"; pick the inner panel
    const dialogs = screen.getAllByRole('dialog');
    const dialog = dialogs[dialogs.length - 1];

    expect(
      within(dialog).getByRole('heading', { name: /transaction decision details/i })
    ).toBeInTheDocument();

    // Step content from agentTrace is visible
    expect(within(dialog).getByText(/validation/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/100ms/i)).toBeInTheDocument();

    // Toggle expand on the step button
    const stepButton = within(dialog).getByRole('button', { name: /validation/i });
    expect(stepButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(stepButton);
    expect(stepButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not render when drawer is closed', () => {
    mockStoreState.isDrawerOpen = false;

    render(<DecisionDrawer />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});