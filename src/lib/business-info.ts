import { getSiteUrl } from '@/lib/site-metadata';

export const BUSINESS_INFO = {
  name: 'Almahy for Legal Services',
  nameAr: 'المحي للخدمات القانونية',
  telephone: '+971-4-264-8831',
  email: 'info@almahy.com',
  streetAddress: '2nd Floor, Al Saqr Business Tower, Sheikh Zayed Rd, DIFC',
  addressLocality: 'Dubai',
  addressRegion: 'Dubai',
  addressCountry: 'AE',
  postalCode: '',
  geo: {
    latitude: 25.2138,
    longitude: 55.2824,
  },
  url: getSiteUrl(),
  priceRange: '$$',
  areaServed: ['Dubai', 'United Arab Emirates'],
} as const;
