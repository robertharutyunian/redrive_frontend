import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/components/atoms/Icon";
import styles from "./Select.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  compact?: boolean;
};

export function Select({ compact = false, className, children, ...props }: SelectProps) {
  const classes = [styles.select, compact && styles.compact, className].filter(Boolean).join(" ");

  return (
    <div className={styles.wrapper}>
      <select className={classes} {...props}>
        {children}
      </select>
      <Icon name="chevron-down" size={compact ? 14 : 16} className={styles.chevron} />
    </div>
  );
}
