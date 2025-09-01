import { useCallback } from "react";
import { useDecisionsStore } from "@/store/decisionsStore";
import { DecisionRequest } from "@/app/api/decide/route";

interface UseDecisionSubmissionOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useDecisionSubmission(options: UseDecisionSubmissionOptions = {}) {
  const { addDecision, setLoading, setError, clearError } = useDecisionsStore();
  const { onSuccess, onError } = options;

  const submitRequest = useCallback(
    async (requestData: DecisionRequest) => {
      setLoading(true);
      clearError();

      try {
        const response = await fetch("/api/decide", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to submit decision request"
          );
        }

        const decision = await response.json();
        addDecision(decision);

        // Call success callback if provided
        onSuccess?.();

        return decision;
      } catch (error) {
        console.error("Submission error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        
        setError(errorMessage);
        
        // Call error callback if provided
        onError?.(errorMessage);
        
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addDecision, setLoading, setError, clearError, onSuccess, onError]
  );

  return {
    submitRequest,
  };
}