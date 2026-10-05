import type { InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Radio({ label, className, id, ...props }: RadioProps) {
  return (
    <label className={[styles.wrapper, className].filter(Boolean).join(" ")} htmlFor={id}>
      <input type="radio" id={id} className={styles.input} {...props} />
      <span className={styles.circle} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
