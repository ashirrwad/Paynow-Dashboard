import type { DecisionTableHeaderProps } from '../types';

export default function DecisionTableHeader({
  sortField,
  sortDirection,
  onSort,
  getSortIcon
}: DecisionTableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => onSort('decision')}
        >
          Status {getSortIcon('decision')}
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => onSort('amount')}
        >
          Amount {getSortIcon('amount')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Payee
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Customer ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Latency
        </th>
        <th 
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => onSort('timestamp')}
        >
          Time {getSortIcon('timestamp')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}