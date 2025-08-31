import { DecisionResponse } from '@/types';

export interface DecisionRowProps {
  decision: DecisionResponse;
  onRowClick: (decision: DecisionResponse) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export interface DecisionTableFiltersProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalResults: number;
}

export interface DecisionTableHeaderProps {
  sortField: 'timestamp' | 'amount' | 'decision';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'timestamp' | 'amount' | 'decision') => void;
  getSortIcon: (field: string) => string | null;
}

export type SortField = 'timestamp' | 'amount' | 'decision';
export type SortDirection = 'asc' | 'desc';