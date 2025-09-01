// Server Component - Static dashboard header content
export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          Agent Decision Viewer
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitor and manage transaction decision workflows in real-time
        </p>
      </div>
    </div>
  );
}