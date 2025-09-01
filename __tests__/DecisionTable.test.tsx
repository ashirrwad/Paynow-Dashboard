import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DecisionTable from '@/components/dashboard/DecisionTable/DecisionTable';
import { mockDecision, mockStore } from '../fixtures/basic';

// Mock the hooks
const mockUseTableData = {
  paginatedData: [mockDecision],
  totalItems: 1,
  currentPage: 1,
  totalPages: 1,
  searchInput: '',
  statusFilter: 'all',
  sortField: null,
  sortDirection: 'asc',
  setSearchInput: mockStore.setLoading,
  handleStatusFilterChange: mockStore.setError,
  handleSort: jest.fn(),
  handlePageChange: jest.fn(),
  getSortIcon: jest.fn(),
  isEmpty: false,
  needsPagination: false,
};

jest.mock('@/store/decisionsStore', () => ({
  useDecisionsStore: () => ({
    decisions: mockStore.decisions,
    openDrawer: mockStore.openDrawer
  })
}));

jest.mock('@/hooks/useTableData', () => ({
  useTableData: () => mockUseTableData
}));

describe('DecisionTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTableData.isEmpty = false;
    mockUseTableData.paginatedData = [mockDecision];
    mockUseTableData.totalItems = 1;
  });

  it('renders the table with data', () => {
    render(<DecisionTable />);
    
    expect(screen.getByText('Transaction History (1)')).toBeInTheDocument();
  });

  it('shows empty state when no decisions', () => {
    mockUseTableData.isEmpty = true;
    
    render(<DecisionTable />);
    
    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
  });
});