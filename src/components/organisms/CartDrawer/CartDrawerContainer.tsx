"use client";

import { useCart } from "@/lib/cart/cart-context";
import { CartDrawer } from "./CartDrawer";

export function CartDrawerContainer() {
  const { items, subtotal, isOpen, close, updateQuantity, removeItem } = useCart();

  return (
    <CartDrawer
      open={isOpen}
      items={items}
      subtotal={subtotal}
      onClose={close}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
      onCheckout={close}
    />
  );
}
