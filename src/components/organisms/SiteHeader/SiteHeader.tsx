import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import styles from "./SiteHeader.module.css";
import { SiteHeaderCartButton } from "./SiteHeaderCartButton";
import { SiteHeaderMobileNav } from "./SiteHeaderMobileNav";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <span className={styles.topBarItem}>
          <Icon name="map-pin" size={14} />
          Գյումրի
        </span>
        <a href="tel:+37495119699" className={styles.topBarItem}>
          <Icon name="phone" size={14} />
          095 119 699
        </a>
      </div>
      <div className={styles.mainRow}>
        <Link href="/" className={styles.logoLink} aria-label="ReDrive՝ գլխավոր էջ">
          <Logo />
        </Link>
        <nav className={styles.nav}>
          <Link href="/catalog" className={styles.navLink}>
            Անվադողեր
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Կապ մեզ հետ
          </Link>
        </nav>
        <div className={styles.actions}>
          <SiteHeaderCartButton />
          <SiteHeaderMobileNav />
        </div>
      </div>
    </header>
  );
}
