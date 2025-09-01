import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardContent from "@/components/dashboard/DashboardContent";

// Server Component - renders static content with client components
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Server-rendered static header */}
      {/* <DashboardHeader /> */}
      
      {/* Server-rendered static stats
      <DashboardStats /> */}
      
      {/* Client-rendered interactive content */}
      <DashboardContent />
    </div>
  );
}
