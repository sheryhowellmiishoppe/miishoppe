import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const siteUrl = "https://www.miishoppe.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mii Shoppe - Access Within Reach",
    template: "%s | Mii Shoppe",
  },
  description:
    "A neighborhood-first grocery retailer improving food access in underserved communities.",
  keywords: [
    "Mii Shoppe",
    "neighborhood grocery",
    "food access",
    "Cleveland grocery",
    "underserved communities grocery",
  ],
  authors: [{ name: "Mii Shoppe" }],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mii Shoppe",
    title: "Mii Shoppe - Access Within Reach",
    description:
      "A neighborhood-first grocery retailer improving food access in underserved communities.",
    images: [
      {
        url: "/images/logo.png", // add a real 1200x630 image here
        width: 1200,
        height: 630,
        alt: "Mii Shoppe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mii Shoppe - Access Within Reach",
    description:
      "A neighborhood-first grocery retailer improving food access in underserved communities.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}