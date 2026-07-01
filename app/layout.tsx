import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const siteName = "الدارات المنطقية";
const description =
  "منصة تعليمية عربية لشرح مقرر الدارات المنطقية بالكامل — من الأجهزة الرقمية وأنظمة العد إلى الجبر البولياني، المنطق التركيبي، والدارات التتابعية، مع أمثلة وأسئلة الدورات.";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | شرح مقرر الدارات المنطقية بالكامل`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "الدارات المنطقية",
    "التصميم الرقمي",
    "البوابات المنطقية",
    "الجبر البولياني",
    "خرائط كارنوف",
    "أنظمة العد",
    "digital logic",
  ],
  authors: [{ name: siteName }],
  openGraph: {
    title: `${siteName} | شرح مقرر الدارات المنطقية بالكامل`,
    description,
    type: "website",
    locale: "ar_AR",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
