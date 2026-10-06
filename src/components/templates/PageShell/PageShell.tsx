import type { ReactNode } from "react";
import { CartDrawerContainer } from "@/components/organisms/CartDrawer";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { CartProvider } from "@/lib/cart/cart-context";
import styles from "./PageShell.module.css";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <CartDrawerContainer />
      <SiteFooter />
    </CartProvider>
  );
}
