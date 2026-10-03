import type { Metadata } from "next";
import { googleSans, notoSansArmenian } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReDrive",
  description: "Պարզ սպասարկում։ Հստակ աշխատանք։ Վստահ ճանապարհ։",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hy" className={`${googleSans.variable} ${notoSansArmenian.variable}`}>
      <body>{children}</body>
    </html>
  );
}
