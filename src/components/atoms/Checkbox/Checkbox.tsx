import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label className={[styles.wrapper, className].filter(Boolean).join(" ")} htmlFor={id}>
      <input type="checkbox" id={id} className={styles.input} {...props} />
      <span className={styles.box} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
