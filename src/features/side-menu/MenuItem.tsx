import { cva } from "class-variance-authority";

interface MenuItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
}

const MenuItemVariants = cva(
  ["block", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium"],
  {
    variants: {
      variant: {
        default: "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
        active: "text-gray-700 bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function MenuItem(props: MenuItemProps) {
  const { label, href = "", isActive = false } = props;
  const variant = isActive ? "active" : "default";
  const className = MenuItemVariants({ variant });

  return (
    <li>
      <a href={href} class={className}>
        {label}
      </a>
    </li>
  );
}
