import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { Tag } from "@/components/atoms/Tag";
import { Text } from "@/components/atoms/Text";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  brand: string;
  model: string;
  size: string;
  price: number;
  inStock: boolean;
  imageUrl?: string;
  imageAlt?: string;
  onAddToCart?: () => void;
};

export function ProductCard({
  brand,
  model,
  size,
  price,
  inStock,
  imageUrl,
  imageAlt,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? model}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className={styles.imageEl}
          />
        ) : (
          <Text as="span" size="xs" tone="muted">
            Նկար
          </Text>
        )}
      </div>
      <div className={styles.info}>
        <Text as="span" size="xs" weight="bold" tone="muted" className={styles.brand}>
          {brand}
        </Text>
        <Text as="span" size="sm" weight="bold">
          {model}
        </Text>
        <Text as="span" size="sm" tone="muted">
          {size}
        </Text>
      </div>
      <div className={styles.statusRow}>
        <Tag variant={inStock ? "success" : "muted"}>{inStock ? "Առկա է" : "Առկա չէ"}</Tag>
        <Price amount={price} size="sm" />
      </div>
      <Button
        variant={inStock ? "primary" : "secondary"}
        size="md"
        className={styles.cta}
        onClick={onAddToCart}
      >
        {inStock ? "Ավելացնել զամբյուղ" : "Զանգահարել"}
      </Button>
    </div>
  );
}
