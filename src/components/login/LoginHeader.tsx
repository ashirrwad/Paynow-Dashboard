// Server Component - Static header content for login page
export default function LoginHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-900">
        Agent Decision Viewer
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Sign in to access the dashboard
      </p>
    </div>
  );
}