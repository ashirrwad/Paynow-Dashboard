"use client";

import { useDecisionForm } from "@/hooks/useDecisionForm";

export default function DecisionForm() {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    getFieldProps,
  } = useDecisionForm();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Submit Decision Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            {...getFieldProps("amount")}
            onChange={(e) => getFieldProps("amount").onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
              getFieldProps("amount").error ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter amount (e.g., 1000.00)"
            step="0.01"
            min="0.01"
            aria-describedby={getFieldProps("amount").error ? "amount-error" : undefined}
            aria-invalid={getFieldProps("amount").error ? "true" : "false"}
          />
          {getFieldProps("amount").error && (
            <p
              id="amount-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {getFieldProps("amount").error}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="payee"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Payee *
          </label>
          <input
            type="text"
            id="payee"
            name="payee"
            {...getFieldProps("payee")}
            onChange={(e) => getFieldProps("payee").onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
              getFieldProps("payee").error ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter payee name"
            aria-describedby={getFieldProps("payee").error ? "payee-error" : undefined}
            aria-invalid={getFieldProps("payee").error ? "true" : "false"}
          />
          {getFieldProps("payee").error && (
            <p
              id="payee-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {getFieldProps("payee").error}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customerId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Customer ID *
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            {...getFieldProps("customerId")}
            onChange={(e) => getFieldProps("customerId").onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
              getFieldProps("customerId").error ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter customer ID"
            aria-describedby={
              getFieldProps("customerId").error ? "customerId-error" : undefined
            }
            aria-invalid={getFieldProps("customerId").error ? "true" : "false"}
          />
          {getFieldProps("customerId").error && (
            <p
              id="customerId-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {getFieldProps("customerId").error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  );
}
