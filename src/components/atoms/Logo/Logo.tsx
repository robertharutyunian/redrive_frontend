import Image from "next/image";
import styles from "./Logo.module.css";

const ASPECT_RATIO = 945 / 275;

const SOURCES = {
  default: "/brand/redrive-logo-horizontal.svg",
  reverse: "/brand/redrive-logo-primary-reverse.svg",
};

type LogoProps = {
  height?: number;
  className?: string;
  variant?: keyof typeof SOURCES;
};

export function Logo({ height = 36, className, variant = "default" }: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt="ReDrive խանութի լոգո"
      width={Math.round(height * ASPECT_RATIO)}
      height={height}
      className={className ? `${styles.logo} ${className}` : styles.logo}
      priority
    />
  );
}
