import localFont from "next/font/local";
import { Noto_Sans_Armenian } from "next/font/google";

export const googleSans = localFont({
  src: [
    {
      path: "../fonts/google-sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../fonts/google-sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  weight: "100 900",
});

export const notoSansArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-sans-armenian",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
});
