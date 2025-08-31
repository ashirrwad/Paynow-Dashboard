export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserMenuProps {
  className?: string;
}

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
  badge?: string;
}