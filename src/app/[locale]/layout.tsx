import { Suspense } from "react";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchStructuredData from "@/components/SearchStructuredData";
import { Locale } from "@/lib/translations";
import { isValidLocale } from "@/lib/utils";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isValidLoc = isValidLocale(locale);
  const resolvedLocale: Locale = isValidLoc ? locale : "en";

  return (
    <>
      <SearchStructuredData locale={resolvedLocale} />
      <Suspense fallback={<Navbar locale={resolvedLocale} />}>
        <Navbar key={resolvedLocale} locale={resolvedLocale} />
      </Suspense>
      {children}
      <Footer locale={resolvedLocale} />
    </>
  );
}
