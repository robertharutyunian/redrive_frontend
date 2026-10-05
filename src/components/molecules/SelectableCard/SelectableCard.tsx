import type { ReactNode } from "react";
import { Radio } from "@/components/atoms/Radio";
import { Tag } from "@/components/atoms/Tag";
import { Text } from "@/components/atoms/Text";
import styles from "./SelectableCard.module.css";

type SelectableCardProps = {
  id: string;
  name: string;
  title: string;
  description?: string;
  tagLabel?: string;
  selected: boolean;
  onSelect?: () => void;
  children?: ReactNode;
};

export function SelectableCard({
  id,
  name,
  title,
  description,
  tagLabel,
  selected,
  onSelect,
  children,
}: SelectableCardProps) {
  const classes = selected ? `${styles.card} ${styles.selected}` : styles.card;

  return (
    <div className={classes} onClick={() => onSelect?.()}>
      <Radio
        id={id}
        name={name}
        checked={selected}
        onChange={() => onSelect?.()}
        className={styles.radio}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <Text as="span" size="sm" weight="semibold">
            {title}
          </Text>
          {tagLabel && <Tag variant="neutral">{tagLabel}</Tag>}
        </div>
        {description && (
          <Text as="span" size="sm" tone="muted">
            {description}
          </Text>
        )}
        {children}
      </div>
    </div>
  );
}
