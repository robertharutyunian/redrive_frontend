import styles from "./Price.module.css";

type PriceSize = "sm" | "md" | "lg";
type Tone = "default" | "accent" | "inverse";

type PriceProps = {
  amount: number;
  size?: PriceSize;
  tone?: Tone;
  className?: string;
};

const formatter = new Intl.NumberFormat("hy-AM", {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return `${formatter.format(amount)} ֏`;
}

export function Price({ amount, size = "md", tone = "default", className }: PriceProps) {
  const classes = [styles.price, styles[size], styles[tone], className].filter(Boolean).join(" ");
  return <span className={classes}>{formatPrice(amount)}</span>;
}
