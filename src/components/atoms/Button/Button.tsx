import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghostOnDark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "leading" | "trailing";
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "trailing",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
  const iconSize = size === "lg" ? 18 : 16;

  return (
    <button type={type} className={classes} {...props}>
      {icon && iconPosition === "leading" && <Icon name={icon} size={iconSize} />}
      {children && <span>{children}</span>}
      {icon && iconPosition === "trailing" && <Icon name={icon} size={iconSize} />}
    </button>
  );
}
