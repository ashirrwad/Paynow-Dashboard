import { useState, useCallback } from "react";
import { useDecisionsStore } from "@/store/decisionsStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useDecisionSubmission } from "@/hooks/useDecisionSubmission";
import {
  DecisionFormData,
  FormErrors,
  validateDecisionForm,
  hasValidationErrors,
  transformToDecisionRequest,
} from "@/utils/validation";

interface UseDecisionFormOptions {
  debounceMs?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useDecisionForm(options: UseDecisionFormOptions = {}) {
  const { debounceMs = 300, onSuccess, onError } = options;
  
  // Form state
  const [formData, setFormData] = useState<DecisionFormData>({
    amount: "",
    payee: "",
    customerId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Store and submission
  const { clearError, isLoading } = useDecisionsStore();
  const { submitRequest } = useDecisionSubmission({
    onSuccess: () => {
      resetForm();
      onSuccess?.();
    },
    onError,
  });

  // Debounced submission
  const debouncedSubmit = useDebounce(submitRequest, debounceMs);

  // Form handlers
  const handleInputChange = useCallback(
    (field: keyof DecisionFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }

      // Clear global error
      clearError();
    },
    [errors, clearError]
  );

  const resetForm = useCallback(() => {
    setFormData({
      amount: "",
      payee: "",
      customerId: "",
    });
    setErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const formErrors = validateDecisionForm(formData);
    setErrors(formErrors);
    return !hasValidationErrors(formErrors);
  }, [formData]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Validate form
      if (!validateForm()) {
        return false;
      }

      try {
        // Transform and submit data
        const requestData = transformToDecisionRequest(formData);
        await debouncedSubmit(requestData);
        return true;
      } catch (error) {
        return false;
      }
    },
    [formData, validateForm, debouncedSubmit]
  );

  // Helper function to get field props for form inputs
  const getFieldProps = (field: keyof DecisionFormData) => ({
    value: formData[field],
    onChange: (value: string) => handleInputChange(field, value),
    error: errors[field],
    disabled: isLoading,
  });

  return {
    // Form state
    formData,
    errors,
    isLoading,

    // Form handlers
    handleInputChange,
    handleSubmit,
    resetForm,
    validateForm,

    // Helper utilities
    getFieldProps,
    isValid: !hasValidationErrors(errors),
    isDirty: Object.values(formData).some(value => value.trim() !== ""),
  };
}