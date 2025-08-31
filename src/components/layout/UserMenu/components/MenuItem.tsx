import { Menu } from "@headlessui/react";
import type { MenuItemProps } from "../types";

export default function MenuItem({
  icon,
  label,
  onClick,
  disabled = false,
  variant = "default",
  badge,
}: MenuItemProps) {
  const getVariantClasses = (active: boolean) => {
    if (variant === "danger") {
      return active ? "bg-red-50 text-red-600" : "text-gray-700";
    }
    return active ? "bg-gray-100" : "";
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${getVariantClasses(
            active
          )} group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
        >
          <span className="w-4 h-4 mr-3">{icon}</span>
          {label}
          {badge && (
            <span className="ml-auto text-xs text-gray-400">{badge}</span>
          )}
        </button>
      )}
    </Menu.Item>
  );
}
