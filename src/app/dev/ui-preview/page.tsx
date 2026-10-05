"use client";

// Living component gallery — add new components/variants here as they're built.
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Heading } from "@/components/atoms/Heading";
import { Input } from "@/components/atoms/Input";
import { Price } from "@/components/atoms/Price";
import { Radio } from "@/components/atoms/Radio";
import { Select } from "@/components/atoms/Select";
import { Tag } from "@/components/atoms/Tag";
import { Text } from "@/components/atoms/Text";
import { Textarea } from "@/components/atoms/Textarea";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import { SegmentedPillSelector } from "@/components/molecules/SegmentedPillSelector";
import { SelectableCard } from "@/components/molecules/SelectableCard";
import { CartDrawer, type CartItem } from "@/components/organisms/CartDrawer";
import { OrderSummary } from "@/components/organisms/OrderSummary";
import { ProductCard } from "@/components/organisms/ProductCard";
import styles from "./page.module.css";

const INITIAL_CART: CartItem[] = [
  { id: "1", model: "Michelin Pilot Sport 4", size: "225/50R17", price: 86000, quantity: 4 },
  { id: "2", model: "Continental PremiumContact 6", size: "245/40R19", price: 98000, quantity: 2 },
];

export default function UiPreviewPage() {
  const [quantity, setQuantity] = useState("4");
  const [width, setWidth] = useState("205");
  const [selectedCard, setSelectedCard] = useState("courier");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className={styles.page}>
      <Heading as="h1">Բաղադրիչների ցուցադրություն</Heading>
      <Text as="p" tone="muted">
        Բաղադրիչների կատալոգ ներքին օգտագործման համար։
      </Text>

      <section className={styles.section}>
        <Heading as="h2">Կոճակներ</Heading>
        <div className={styles.row}>
          <Button variant="primary">Հիմնական</Button>
          <Button variant="secondary">Երկրորդային</Button>
          <Button variant="outline">Եզրագծով</Button>
          <Button variant="primary" size="sm">
            Փոքր
          </Button>
          <Button variant="primary" size="lg" icon="arrow-right">
            Մեծ
          </Button>
          <Button variant="primary" disabled>
            Անգործուն
          </Button>
        </div>
        <div className={`${styles.row} ${styles.darkPanel}`}>
          <Button variant="ghostOnDark">Մուգ ֆոնի վրա</Button>
          <Button variant="ghostOnDark" icon="cart">
            Զամբյուղ
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Մուտքագրման դաշտեր</Heading>
        <div className={styles.grid}>
          <FieldGroup label="Անուն" htmlFor="name">
            <Input id="name" placeholder="Ձեր անունը" />
          </FieldGroup>
          <FieldGroup label="Հեռախոս" htmlFor="phone" error="Պարտադիր դաշտ է">
            <Input id="phone" icon="search" placeholder="+374" />
          </FieldGroup>
          <FieldGroup label="Անգործուն" htmlFor="disabled-input">
            <Input id="disabled-input" placeholder="Անգործուն" disabled />
          </FieldGroup>
          <FieldGroup label="Մեկնաբանություն" htmlFor="comment">
            <Textarea id="comment" placeholder="Ավելացրեք մեկնաբանություն" />
          </FieldGroup>
          <FieldGroup label="Մարզ" htmlFor="region">
            <Select id="region">
              <option>Երևան</option>
              <option>Գյումրի</option>
            </Select>
          </FieldGroup>
          <FieldGroup label="Համակարգ (կոմպակտ)" htmlFor="region-compact">
            <Select id="region-compact" compact>
              <option>Երևան</option>
              <option>Գյումրի</option>
            </Select>
          </FieldGroup>
        </div>
        <div className={styles.row}>
          <Checkbox id="agree" label="Համաձայն եմ պայմաններին" defaultChecked />
          <Radio id="r1" name="demo-radio" label="Առաքում" defaultChecked />
          <Radio id="r2" name="demo-radio" label="Ինքնանտրանք" />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Պիտակներ</Heading>
        <div className={styles.row}>
          <Tag variant="neutral">205/55R16</Tag>
          <Tag variant="promo">Ակցիա</Tag>
          <Tag variant="success">Առկա է</Tag>
          <Tag variant="muted">Առկա չէ</Tag>
          <Tag variant="new">Նոր</Tag>
          <Tag variant="guarantee">Համապատասխանության երաշխիք</Tag>
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Վերնագրեր, տեքստ, գին</Heading>
        <div className={styles.row}>
          <Price amount={86000} size="lg" />
          <Price amount={25500} size="md" tone="accent" />
        </div>
        <div className={`${styles.row} ${styles.darkPanel}`}>
          <Heading as="h3" tone="inverse">
            Մուգ ֆոնի վերնագիր
          </Heading>
          <Text tone="inverse">Մուգ ֆոնի տեքստ</Text>
          <Price amount={86000} size="md" tone="inverse" />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Քանակ և ընտրություն</Heading>
        <SegmentedPillSelector
          label="Ընտրեք քանակը"
          value={quantity}
          onChange={setQuantity}
          options={[
            { value: "1", label: "1 Ակ" },
            { value: "2", label: "2 Ակ (Զույգ)" },
            { value: "4", label: "4 Ակ (Հավաքածու)" },
          ]}
        />
        <SegmentedPillSelector
          label="Լայնություն"
          valueLabel={`${width} մմ`}
          value={width}
          onChange={setWidth}
          options={[
            { value: "195", label: "195" },
            { value: "205", label: "205" },
            { value: "215", label: "215" },
          ]}
        />
        <div className={styles.grid}>
          <SelectableCard
            id="courier"
            name="fulfillment"
            title="Առաքում"
            description="1-2 աշխատանքային օր"
            tagLabel="Անվճար"
            selected={selectedCard === "courier"}
            onSelect={() => setSelectedCard("courier")}
          />
          <SelectableCard
            id="pickup"
            name="fulfillment"
            title="Ինքնանտրանք"
            description="Երևան, Կենտրոնական մասնաճյուղ"
            selected={selectedCard === "pickup"}
            onSelect={() => setSelectedCard("pickup")}
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Ապրանքի քարտ</Heading>
        <div className={styles.grid}>
          <ProductCard
            brand="Michelin"
            model="Pilot Sport 4"
            size="225/50R17"
            price={86000}
            inStock
          />
          <ProductCard
            brand="Continental"
            model="PremiumContact 6"
            size="245/40R19"
            price={98000}
            inStock={false}
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Պատվերի ամփոփում</Heading>
        <div className={styles.grid}>
          <OrderSummary
            lines={[
              { label: "Ենթագումար (4 ապրանք)", value: "336,000 ֏" },
              { label: "Առաքում", value: "ԱՆՎՃԱՐ", accent: true },
            ]}
            total={363200}
            ctaLabel="Պատվիրել"
          />
          <OrderSummary variant="compact" total={363200} ctaLabel="Շարունակել" />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">Զամբյուղ</Heading>
        <Button variant="primary" onClick={() => setCartOpen(true)}>
          Բացել զամբյուղը
        </Button>
        <CartDrawer
          open={cartOpen}
          items={cartItems}
          subtotal={subtotal}
          onClose={() => setCartOpen(false)}
          onQuantityChange={(id, nextQuantity) =>
            setCartItems((items) =>
              items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)),
            )
          }
          onRemove={(id) => setCartItems((items) => items.filter((item) => item.id !== id))}
          onCheckout={() => setCartOpen(false)}
        />
      </section>
    </main>
  );
}
