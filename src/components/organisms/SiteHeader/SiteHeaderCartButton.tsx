"use client";

import { Icon } from "@/components/atoms/Icon";
import { useCart } from "@/lib/cart/cart-context";
import styles from "./SiteHeader.module.css";

export function SiteHeaderCartButton() {
  const { items, open } = useCart();
  const count = items.length;

  return (
    <button type="button" className={styles.cartButton} onClick={open} aria-label="Բացել զամբյուղը">
      <Icon name="cart" size={22} />
      {count > 0 && <span className={styles.cartBadge}>{count}</span>}
    </button>
  );
}
