import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import { Text } from "@/components/atoms/Text";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandColumn}>
          <Logo height={28} variant="reverse" />
          <Text as="p" size="sm" tone="inverse" className={styles.tagline}>
            Պարզ սպասարկում։ Հստակ աշխատանք։ Վստահ ճանապարհ։
          </Text>
        </div>
        <div className={styles.contactColumn}>
          <Text as="span" size="sm" weight="bold" tone="inverse">
            Հաճախորդների սպասարկում
          </Text>
          <a href="tel:+37495119699" className={styles.phoneLink}>
            <Icon name="phone" size={16} />
            095 119 699
          </a>
          <Text as="p" size="xs" tone="inverse" className={styles.contactBlurb}>
            Հարցեր ունեք ապրանքների կամ պատվերի մասին։ Զանգահարեք մեզ, պատասխանում ենք արագ։
          </Text>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Text as="span" size="xs" tone="inverse">
          © 2026 ReDrive. Բոլոր իրավունքները պաշտպանված են։
        </Text>
        <div className={styles.legalLinks}>
          <Link href="/privacy" className={styles.legalLink}>
            Գաղտնիության քաղաքականություն
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Օգտագործման պայմաններ
          </Link>
        </div>
      </div>
    </footer>
  );
}
