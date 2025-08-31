"use client";

import { useState } from "react";
import { useDecisionsStore } from "@/store/decisionsStore";
import { DecisionRequest } from "@/app/api/decide/route";
import { useDebounce } from "@/hooks/useDebounce";
import { validateForm } from "./utils";
import FormField from "./components/FormField";
import SubmitButton from "./components/SubmitButton";
import CardHeader from "./components/CardHeader";
import type { FormData, FormErrors } from "./types";

export default function DecisionCard() {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    payee: "",
    customerId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { addDecision, setLoading, setError, clearError, isLoading } =
    useDecisionsStore();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    clearError();
  };

  const submitRequest = async (requestData: DecisionRequest) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch("/api/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit decision request");
      }

      const decision = await response.json();
      addDecision(decision);

      setFormData({ amount: "", payee: "", customerId: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const debouncedSubmit = useDebounce(submitRequest, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    const requestData: DecisionRequest = {
      amount: parseFloat(formData.amount),
      payee: formData.payee.trim(),
      customerId: formData.customerId.trim(),
    };

    debouncedSubmit(requestData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <CardHeader />

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="amount"
            name="amount"
            label="Transaction Amount"
            value={formData.amount}
            onChange={(value) => handleInputChange("amount", value)}
            error={errors.amount}
            disabled={isLoading}
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
            value={formData.customerId}
            onChange={(value) => handleInputChange("customerId", value)}
            error={errors.customerId}
            disabled={isLoading}
            placeholder="Enter customer identifier"
            required
          />
        </div>

        <FormField
          id="payee"
          name="payee"
          label="Payee Name"
          value={formData.payee}
          onChange={(value) => handleInputChange("payee", value)}
          error={errors.payee}
          disabled={isLoading}
          placeholder="Enter payee full name"
          required
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
