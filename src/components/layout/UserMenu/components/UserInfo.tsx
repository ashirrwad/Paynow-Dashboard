import type { User } from "../types";

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="px-1 py-1">
      <div className="px-3 py-2 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
