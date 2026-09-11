import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import { contact } from "@/lib/spa";
import "./globals.css";
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Martha's Healing Touch | Medical Wellness · Pembroke Pines",
  description:
    "A personal approach to facial care, massage, lymphatic drainage, wood therapy and weight-loss consultations in Pembroke Pines. Reserve your moment with Martha’s Healing Touch.",
  openGraph: {
    title: "Martha's Healing Touch",
    description: "Come back to yourself. Medical wellness in Pembroke Pines.",
    type: "website",
    locale: "en_US",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${raleway.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              name: "Martha's Healing Touch",
              url: "https://marthashealingtouch.com",
              telephone: contact.phone,
              email: contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: contact.address,
                addressLocality: "Pembroke Pines",
                addressRegion: "FL",
                postalCode: "33028",
                addressCountry: "US",
              },
              sameAs: [contact.instagram, contact.facebook, contact.tiktok],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
