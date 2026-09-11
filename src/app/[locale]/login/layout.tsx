import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/site-metadata';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildNoIndexMetadata(lang, '/login', 'Login | Almahy');
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
