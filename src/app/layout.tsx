import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import favicon from "./Favicon.png";
import WhatsappBottomChat from "@/components/WhatsappBottomChat";
import AnalyticsClickTracking from "@/components/AnalyticsClickTracking";
import { Locale } from "@/lib/translations";
import { PAGE_SEO, getSiteUrl } from "@/lib/site-metadata";
import { getLocaleDirection, isValidLocale } from "@/lib/utils";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: PAGE_SEO.home.en.title,
  description: PAGE_SEO.home.en.description,
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale");
  const locale: Locale =
    localeHeader && isValidLocale(localeHeader) ? localeHeader : "en";
  const dir = getLocaleDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      translate="no"
      className="notranslate"
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        {gtmId ? (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        ) : null}
      </head>
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased`}
        suppressHydrationWarning
      >
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
        <AnalyticsClickTracking />
        <WhatsappBottomChat />
      </body>
    </html>
  );
}
