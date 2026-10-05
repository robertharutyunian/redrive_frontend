"use client";

import styles from "./SegmentedPillSelector.module.css";

type Option = {
  value: string;
  label: string;
};

type SegmentedPillSelectorProps = {
  label: string;
  valueLabel?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedPillSelector({
  label,
  valueLabel,
  options,
  value,
  onChange,
}: SegmentedPillSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {valueLabel && <span className={styles.valueLabel}>{valueLabel}</span>}
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
