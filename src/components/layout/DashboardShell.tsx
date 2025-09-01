import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

// Server Component - Static dashboard layout shell
export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Static sidebar placeholder - will contain client component */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
            {/* Sidebar content will be inserted here by client component */}
            <div id="sidebar-content" />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          {/* Static header placeholder */}
          <div className="relative z-10 flex h-16 flex-shrink-0 bg-white shadow-sm border-b border-gray-200">
            {/* Header content will be inserted here by client component */}
            <div id="header-content" className="flex flex-1" />
          </div>

          {/* Dynamic content area */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}