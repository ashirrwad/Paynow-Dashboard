import type { User } from '../types';

interface MenuButtonProps {
  user: User;
}

export default function MenuButton({ user }: MenuButtonProps) {
  return (
    <div className="flex items-center text-sm bg-gray-50 rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span className="hidden sm:block text-sm font-medium text-gray-700 mr-2">
        {user.username}
      </span>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}