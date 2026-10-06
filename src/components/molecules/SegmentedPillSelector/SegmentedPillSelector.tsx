"use client";

import styles from "./SegmentedPillSelector.module.css";

type Option = {
  value: string;
  label: string;
};

type SegmentedPillSelectorProps = {
  label: string;
  labelSize?: "sm" | "md";
  valueLabel?: string;
  valueTone?: "accent" | "default";
  valueSize?: "sm" | "md";
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedPillSelector({
  label,
  labelSize = "md",
  valueLabel,
  valueTone = "accent",
  valueSize = "sm",
  options,
  value,
  onChange,
}: SegmentedPillSelectorProps) {
  const labelClasses = labelSize === "sm" ? `${styles.label} ${styles.labelSm}` : styles.label;
  const valueLabelClasses = [
    styles.valueLabel,
    valueTone === "default" && styles.valueDefault,
    valueSize === "md" && styles.valueMd,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={labelClasses}>{label}</span>
        {valueLabel && <span className={valueLabelClasses}>{valueLabel}</span>}
      </div>
      <div className={styles.row} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={selected ? `${styles.pill} ${styles.selected}` : styles.pill}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
