/**
 * DecisionDrawer utility functions
 */

export const getDecisionBadge = (decision: string): string => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  switch (decision) {
    case 'approved':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'rejected':
      return `${baseClasses} bg-red-100 text-red-800`;
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};