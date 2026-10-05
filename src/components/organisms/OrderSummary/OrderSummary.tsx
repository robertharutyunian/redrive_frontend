import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { Text } from "@/components/atoms/Text";
import styles from "./OrderSummary.module.css";

type SummaryLine = {
  label: string;
  value: string;
  accent?: boolean;
};

type OrderSummaryProps = {
  variant?: "full" | "compact";
  lines?: SummaryLine[];
  total: number;
  ctaLabel: string;
  onCta?: () => void;
};

export function OrderSummary({
  variant = "full",
  lines = [],
  total,
  ctaLabel,
  onCta,
}: OrderSummaryProps) {
  if (variant === "compact") {
    return (
      <div className={styles.compactCard}>
        <div className={styles.compactRow}>
          <Text as="span" size="xs" weight="bold" tone="muted" className={styles.compactLabel}>
            Ամփոփում
          </Text>
          <Price amount={total} size="sm" />
        </div>
        <Button variant="secondary" size="md" className={styles.cta} onClick={onCta}>
          {ctaLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <Text as="span" size="md" weight="bold">
        Պատվերի ամփոփում
      </Text>
      <div className={styles.lines}>
        {lines.map((line) => (
          <div key={line.label} className={styles.line}>
            <Text as="span" size="xs" tone="muted">
              {line.label}
            </Text>
            <Text as="span" size="xs" weight="semibold" tone={line.accent ? "accent" : "default"}>
              {line.value}
            </Text>
          </div>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.totalRow}>
        <Text as="span" size="xs" tone="muted">
          Ընդամենը
        </Text>
        <Price amount={total} size="lg" />
      </div>
      <Button variant="primary" size="md" className={styles.cta} onClick={onCta}>
        {ctaLabel}
      </Button>
    </div>
  );
}
