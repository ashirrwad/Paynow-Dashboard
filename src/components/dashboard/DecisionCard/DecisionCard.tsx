"use client";

import { useDecisionForm } from "@/hooks/useDecisionForm";
import FormField from "./components/FormField";
import SubmitButton from "./components/SubmitButton";
import CardHeader from "./components/CardHeader";

export default function DecisionCard() {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    getFieldProps,
  } = useDecisionForm();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <CardHeader />

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="amount"
            name="amount"
            label="Transaction Amount"
            {...getFieldProps("amount")}
            type="number"
            placeholder="0.00"
            required
            step="0.01"
            min="0.01"
            icon={<span className="text-gray-500 sm:text-sm">$</span>}
          />

          <FormField
            id="customerId"
            name="customerId"
            label="Customer ID"
            {...getFieldProps("customerId")}
            placeholder="Enter customer identifier"
            required
          />
        </div>

        <FormField
          id="payee"
          name="payee"
          label="Payee Name"
          {...getFieldProps("payee")}
          placeholder="Enter payee full name"
          required
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
