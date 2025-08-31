"use client";

import { useDecisionsStore } from "@/store/decisionsStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DecisionCard from "@/components/dashboard/DecisionCard";
import DecisionTable from "@/components/dashboard/DecisionTable";
import DecisionDrawer from "@/components/DecisionDrawer";
import ErrorMessage from "@/components/ErrorMessage";

export default function DashboardPage() {
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
