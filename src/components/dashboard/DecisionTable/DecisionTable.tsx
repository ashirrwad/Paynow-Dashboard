"use client";

import { useDecisionsStore } from "@/store/decisionsStore";
import { useTableData } from "@/hooks/useTableData";
import DecisionRow from "./components/DecisionRow";
import Pagination from "./components/Pagination";
import DecisionTableFilters from "./components/DecisionTableFilters";
import DecisionTableHeader from "./components/DecisionTableHeader";
import EmptyState from "./components/EmptyState";

export default function DecisionTable() {
  const { decisions, openDrawer } = useDecisionsStore();
  
  const {
    paginatedData,
    totalItems,
    currentPage,
    totalPages,
    searchInput,
    statusFilter,
    sortField,
    sortDirection,
    setSearchInput,
    handleStatusFilterChange,
    handleSort,
    handlePageChange,
    getSortIcon,
    isEmpty,
    needsPagination,
  } = useTableData({
    data: decisions,
    itemsPerPage: 10,
  });

  if (isEmpty) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <DecisionTableFilters
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        totalResults={totalItems}
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
            {paginatedData.map((decision) => (
              <DecisionRow
                key={decision.id}
                decision={decision}
                onRowClick={openDrawer}
              />
            ))}
          </tbody>
        </table>
      </div>

      {needsPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}
