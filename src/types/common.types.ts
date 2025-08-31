/**
 * Common/shared type definitions
 */

export interface BaseProps {
  className?: string;
}

export interface WithChildren {
  children?: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  value: string | number | boolean;
  operator?: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte';
}