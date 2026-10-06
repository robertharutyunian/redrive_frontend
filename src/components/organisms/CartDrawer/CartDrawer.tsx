"use client";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { formatPrice, Price } from "@/components/atoms/Price";
import { Text } from "@/components/atoms/Text";
import { SegmentedPillSelector } from "@/components/molecules/SegmentedPillSelector";
import styles from "./CartDrawer.module.css";

export type CartItem = {
  id: string;
  model: string;
  size: string;
  price: number;
  quantity: number;
};

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export function CartDrawer({
  open,
  items,
  subtotal,
  onClose,
  onQuantityChange,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const overlayClasses = open ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay;
  const drawerClasses = open ? `${styles.drawer} ${styles.drawerOpen}` : styles.drawer;

  return (
    <div className={overlayClasses} role="presentation" aria-hidden={!open} onClick={onClose}>
      <div
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Զամբյուղ"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Text as="span" size="sm" weight="bold">
              Զամբյուղ
            </Text>
            <span className={styles.count}>{items.length}</span>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Փակել">
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <div className={styles.itemImage}>
                  <Text as="span" size="xs" tone="muted">
                    Նկար
                  </Text>
                </div>
                <div className={styles.itemInfo}>
                  <Text as="span" size="xs" weight="bold">
                    {item.model}
                  </Text>
                  <span className={styles.sizeBadge}>{item.size}</span>
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => onRemove(item.id)}
                  aria-label="Հեռացնել ապրանքը"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>

              <SegmentedPillSelector
                label="Ընտրել քանակը"
                labelSize="sm"
                valueLabel={formatPrice(item.price * item.quantity)}
                valueTone="default"
                valueSize="md"
                value={String(item.quantity)}
                onChange={(value) => onQuantityChange(item.id, Number(value))}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "4", label: "4" },
                ]}
              />

              <div className={styles.divider} />

              <Text as="p" size="xs" tone="muted" className={styles.placeholder}>
                Լրացուցիչ տեղեկություն կհայտնվի այստեղ։
              </Text>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.subtotalRow}>
            <Text as="span" size="xs" tone="muted">
              Գումար
            </Text>
            <Price amount={subtotal} size="md" />
          </div>
          <Button
            variant="primary"
            size="md"
            icon="arrow-right"
            className={styles.checkoutButton}
            onClick={onCheckout}
          >
            Պատվիրել
          </Button>
        </div>
      </div>
    </div>
  );
}
