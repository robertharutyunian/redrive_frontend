import type { ElementType, ReactNode } from "react";
import styles from "./Heading.module.css";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Tone = "default" | "muted" | "accent" | "inverse";

type HeadingProps = {
  as?: HeadingLevel;
  tone?: Tone;
  children: ReactNode;
  className?: string;
};

export function Heading({ as = "h2", tone = "default", children, className }: HeadingProps) {
  const Tag = as as ElementType;
  const classes = [styles.heading, styles[as], styles[tone], className].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
