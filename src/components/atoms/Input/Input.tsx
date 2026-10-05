import type { InputHTMLAttributes } from "react";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconName;
};

export function Input({ icon, className, ...props }: InputProps) {
  const inputClasses = [styles.input, icon && styles.withIcon, className].filter(Boolean).join(" ");

  if (!icon) {
    return <input className={inputClasses} {...props} />;
  }

  return (
    <div className={styles.wrapper}>
      <Icon name={icon} size={16} className={styles.icon} />
      <input className={inputClasses} {...props} />
    </div>
  );
}
