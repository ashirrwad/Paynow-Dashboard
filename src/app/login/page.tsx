import LoginHeader from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";

// Server Component - static layout with client components for interactivity
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Server-rendered static header */}
        <LoginHeader />

        {/* Client-rendered interactive form with demo info */}
        <LoginForm />
      </div>
    </div>
  );
}
