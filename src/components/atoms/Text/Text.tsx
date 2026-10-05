import type { ElementType, ReactNode } from "react";
import styles from "./Text.module.css";

type TextAs = "p" | "span" | "div";
type TextSize = "xs" | "sm" | "md" | "lg";
type Tone = "default" | "muted" | "accent" | "inverse";
type Weight = "regular" | "medium" | "semibold" | "bold";

type TextProps = {
  as?: TextAs;
  size?: TextSize;
  tone?: Tone;
  weight?: Weight;
  children: ReactNode;
  className?: string;
};

export function Text({
  as = "p",
  size = "md",
  tone = "default",
  weight = "regular",
  children,
  className,
}: TextProps) {
  const Tag = as as ElementType;
  const classes = [styles.text, styles[size], styles[tone], styles[weight], className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
