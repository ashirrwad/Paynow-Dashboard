"use client";

import { useDecisionsStore } from "@/store/decisionsStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DecisionCard from "./DecisionCard";
import DecisionTable from "./DecisionTable";
import DecisionDrawer from "@/components/DecisionDrawer";
import ErrorMessage from "@/components/ErrorMessage";

// Client Component - handles all interactive dashboard functionality
export default function DashboardContent() {
  const { error, clearError } = useDecisionsStore();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          <div className="grid gap-6">
            <DecisionCard />
            <DecisionTable />
          </div>

          <DecisionDrawer />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}