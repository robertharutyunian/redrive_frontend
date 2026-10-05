import type { ReactNode } from "react";
import { Text } from "@/components/atoms/Text";
import styles from "./FieldGroup.module.css";

type FieldGroupProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FieldGroup({ label, htmlFor, error, children, className }: FieldGroupProps) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(" ")}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <Text as="span" size="xs" className={styles.error}>
          {error}
        </Text>
      )}
    </div>
  );
}
