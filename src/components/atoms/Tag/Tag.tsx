import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import styles from "./Tag.module.css";

type TagVariant = "neutral" | "promo" | "success" | "muted" | "new" | "guarantee";

type TagProps = {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
};

export function Tag({ variant = "neutral", children, className }: TagProps) {
  const classes = [styles.tag, styles[variant], className].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      {variant === "guarantee" && <Icon name="check" size={14} className={styles.icon} />}
      {children}
    </span>
  );
}
