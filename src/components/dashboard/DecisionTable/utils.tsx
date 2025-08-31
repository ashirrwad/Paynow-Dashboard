import React from "react";

export const getDecisionStyle = (
  decisionType: string
): {
  badge: string;
  row: string;
  icon: React.ReactNode;
} => {
  switch (decisionType) {
    case "approved":
      return {
        badge: "bg-green-100 ̰ text-green-800 border-green-200",
        row: "hover:bg-green-50",
        icon: (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    case "rejected":
      return {
        badge: "bg-red-100 text-red-800 border-red-200",
        row: "hover:bg-red-50",
        icon: (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    case "pending":
      return {
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        row: "hover:bg-yellow-50",
        icon: (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-800 border-gray-200",
        row: "hover:bg-gray-50",
        icon: null,
      };
  }
};
