"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import styles from "./SiteHeader.module.css";

export function SiteHeaderMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        className={styles.mobileNavToggle}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Բացել ընտրացանկը"
      >
        <Icon name={isOpen ? "close" : "menu"} size={22} />
      </button>
      {isOpen && (
        <div className={styles.mobileNavPanel}>
          <Link href="/catalog" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
            Անվադողեր
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
            Կապ մեզ հետ
          </Link>
        </div>
      )}
    </div>
  );
}
