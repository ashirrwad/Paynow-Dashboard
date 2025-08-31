import { memo } from "react";
import {
  formatAmount,
  formatTimestamp,
  maskCustomerId,
} from "@/utils/formatting";
import { getDecisionStyle } from "../utils";
import type { DecisionRowProps } from "../types";

const DecisionRow = memo(function DecisionRow({
  decision,
  onRowClick,
}: DecisionRowProps) {
  const style = getDecisionStyle(decision.decision);

  return (
    <tr
      onClick={() => onRowClick(decision)}
      className={`cursor-pointer transition-colors ${style.row} border-b border-gray-100 last:border-b-0`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRowClick(decision);
        }
      }}
    >
      <td className="px-6 py-4">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${style.badge}`}
        >
          {style.icon && <span className="mr-1.5">{style.icon}</span>}
          {decision.decision.toUpperCase()}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-gray-900">
          {formatAmount(decision.amount)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 font-medium">
          {decision.payee}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
          {maskCustomerId(decision.customerId)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              decision.latency < 200
                ? "bg-green-400"
                : decision.latency < 400
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">{decision.latency}ms</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">
          {formatTimestamp(decision.timestamp, navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </td>
      <td className="px-6 py-4">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </td>
    </tr>
  );
});

export default DecisionRow;
