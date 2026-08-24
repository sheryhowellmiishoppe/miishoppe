import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  title: "Mii Shoppe - Access Within Reach",
  description:
    "A neighborhood-first grocery retailer improving food access in underserved communities.",
     icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SmoothScroll>
      <body suppressHydrationWarning>{children}</body>
      </SmoothScroll>
    </html>
  );
}
