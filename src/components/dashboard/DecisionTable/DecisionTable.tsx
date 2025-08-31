'use client';

import { useState, useMemo, useEffect } from 'react';
import { useDecisionsStore } from '@/store/decisionsStore';
import { maskCustomerId } from '@/utils/formatting';
import { useDebounce } from '@/hooks/useDebounce';
import DecisionRow from './components/DecisionRow';
import Pagination from './components/Pagination';
import DecisionTableFilters from './components/DecisionTableFilters';
import DecisionTableHeader from './components/DecisionTableHeader';
import EmptyState from './components/EmptyState';
import type { SortField, SortDirection } from './types';

export default function DecisionTable() {
  const { decisions, openDrawer } = useDecisionsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const debouncedSetSearchTerm = useDebounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  useEffect(() => {
    debouncedSetSearchTerm(searchInput);
  }, [searchInput, debouncedSetSearchTerm]);

  const filteredAndSortedDecisions = useMemo(() => {
    let filtered = [...decisions];

    if (searchTerm) {
      filtered = filtered.filter(decision => 
        decision.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maskCustomerId(decision.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        decision.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(decision => decision.decision === statusFilter);
    }

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'decision':
          aValue = a.decision;
          bValue = b.decision;
          break;
        default:
          aValue = a.timestamp;
          bValue = b.timestamp;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [decisions, searchTerm, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedDecisions.length / itemsPerPage);
  const paginatedDecisions = filteredAndSortedDecisions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  if (decisions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <DecisionTableFilters
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        totalResults={filteredAndSortedDecisions.length}
      />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <DecisionTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            getSortIcon={getSortIcon}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDecisions.map((decision) => (
              <DecisionRow 
                key={decision.id} 
                decision={decision} 
                onRowClick={openDrawer}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredAndSortedDecisions.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}