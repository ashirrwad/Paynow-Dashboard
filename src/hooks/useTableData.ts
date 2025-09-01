import { useState, useMemo, useEffect, useCallback } from "react";
import { DecisionResponse } from "@/types";
import { maskCustomerId } from "@/utils/formatting";
import { useDebounce } from "@/hooks/useDebounce";

export type SortField = "timestamp" | "amount" | "decision";
export type SortDirection = "asc" | "desc";

interface UseTableDataOptions {
  data: DecisionResponse[];
  itemsPerPage?: number;
  debounceMs?: number;
  initialSort?: {
    field: SortField;
    direction: SortDirection;
  };
}

export function useTableData({
  data,
  itemsPerPage = 10,
  debounceMs = 300,
  initialSort = { field: "timestamp", direction: "desc" },
}: UseTableDataOptions) {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>(initialSort.field);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSort.direction);

  // Debounced search
  const debouncedSetSearchTerm = useDebounce(setSearchTerm, debounceMs);

  useEffect(() => {
    debouncedSetSearchTerm(searchInput);
  }, [searchInput, debouncedSetSearchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Data processing
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (decision) =>
          decision.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
          maskCustomerId(decision.customerId)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          decision.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (decision) => decision.decision === statusFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "decision":
          aValue = a.decision;
          bValue = b.decision;
          break;
        default:
          aValue = a.timestamp;
          bValue = b.timestamp;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Safe current page - ensure it's always within bounds
  const safeCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);

  // Update state only if safeCurrentPage differs from currentPage
  useEffect(() => {
    if (safeCurrentPage !== currentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [safeCurrentPage, currentPage]);

  const paginatedData = useMemo(() => {
    return filteredAndSortedData.slice(
      (safeCurrentPage - 1) * itemsPerPage,
      safeCurrentPage * itemsPerPage
    );
  }, [filteredAndSortedData, safeCurrentPage, itemsPerPage]);

  // Handlers
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  }, [sortField, sortDirection]);

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [totalPages, currentPage]);

  const getSortIcon = useCallback((field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  }, [sortField, sortDirection]);

  // Reset functions
  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  }, []);

  const resetSort = useCallback(() => {
    setSortField(initialSort.field);
    setSortDirection(initialSort.direction);
    setCurrentPage(1);
  }, [initialSort]);

  return {
    // Processed data
    paginatedData,
    filteredAndSortedData,
    totalItems: filteredAndSortedData.length,

    // State
    currentPage: safeCurrentPage,
    totalPages,
    searchInput,
    searchTerm,
    statusFilter,
    sortField,
    sortDirection,

    // Handlers
    setSearchInput,
    handleStatusFilterChange,
    handleSort,
    handlePageChange,
    getSortIcon,

    // Utilities
    resetFilters,
    resetSort,
    
    // Computed properties
    isEmpty: data.length === 0,
    hasResults: filteredAndSortedData.length > 0,
    isFiltered: searchTerm !== "" || statusFilter !== "all",
    needsPagination: totalPages > 1,
  };
}