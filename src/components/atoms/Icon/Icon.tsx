import styles from "./Icon.module.css";

export type IconName =
  | "arrow-right"
  | "cart"
  | "trash"
  | "search"
  | "chevron-down"
  | "close"
  | "check"
  | "plus"
  | "minus";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const PATHS: Record<IconName, string> = {
  "arrow-right": "M14 5l7 7m0 0l-7 7m7-7H3",
  cart: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  trash:
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  "chevron-down": "M19 9l-7 7-7-7",
  close: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  plus: "M12 4v16m8-8H4",
  minus: "M4 12h16",
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      className={className ? `${styles.icon} ${className}` : styles.icon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
