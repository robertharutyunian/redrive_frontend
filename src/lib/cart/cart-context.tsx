"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  model: string;
  size: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const MOCK_ITEMS: CartItem[] = [
  { id: "1", model: "Michelin Pilot Sport 4", size: "225/45 R17", price: 45000, quantity: 1 },
  { id: "2", model: "Continental PremiumContact 6", size: "205/55 R16", price: 38000, quantity: 2 },
  { id: "3", model: "Bridgestone Turanza T005", size: "215/60 R16", price: 41000, quantity: 1 },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(MOCK_ITEMS);
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...item, quantity } : item)),
        ),
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    }),
    [items, subtotal, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
