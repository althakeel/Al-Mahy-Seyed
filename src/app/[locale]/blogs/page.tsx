"use client";

import BlogsArticleGrid from '@/components/blogs/BlogsArticleGrid';
import BlogsExploreCard from '@/components/blogs/BlogsExploreCard';
import BlogsHero from '@/components/blogs/BlogsHero';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale } from '@/lib/translations';
import {
  BlogPost,
  loadBlogsFromServer,
  loadBlogsPageBannerConfigFromServer,
} from '@/lib/blogs';

const FEATURED_BLOG_SLUG =
  'understanding-the-latest-tax-law-changes-in-the-uae-what-residents-non-residents-and-businesses-should-know';

export default function BlogsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang: Locale = locale === 'ar' ? 'ar' : 'en';
  const isRTL = lang === 'ar';
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerCardTitle, setBannerCardTitle] = useState('');
  const [bannerCardSub, setBannerCardSub] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const fallbackBanner = '/assets/banner/blogs-background.webp';

  useEffect(() => {
    const loadServerData = async () => {
      setIsLoading(true);
      try {
        const [serverBlogs, bannerConfig] = await Promise.all([
          loadBlogsFromServer(),
          loadBlogsPageBannerConfigFromServer(),
        ]);

        setBlogs(serverBlogs);
        setBannerUrl(bannerConfig.bannerUrl);
        setBannerCardTitle(lang === 'ar' ? bannerConfig.card.titleAr : bannerConfig.card.titleEn);
        setBannerCardSub(lang === 'ar' ? bannerConfig.card.subAr : bannerConfig.card.subEn);
      } finally {
        setIsLoading(false);
      }
    };

    void loadServerData();
  }, [lang]);

  const tx = useMemo(
    () => ({
      label: lang === 'ar' ? 'رؤى قانونية' : 'Legal Insights',
      exploreTitle: lang === 'ar' ? 'استكشف المقالات' : 'Explore Articles',
      exploreSub:
        lang === 'ar'
          ? 'اطلع على أحدث المقالات القانونية والتحديثات التنظيمية في الإمارات.'
          : 'Browse expert legal articles, UAE updates, and practical guidance from our team.',
      articlesCount: lang === 'ar' ? 'مقال' : 'Articles',
      noBlogs: lang === 'ar' ? 'لا توجد مقالات منشورة بعد.' : 'No articles published yet.',
      readMore: lang === 'ar' ? 'اقرأ المزيد' : 'Read more',
      bannerTitle: lang === 'ar' ? 'المدونة القانونية' : 'Legal Insights & Updates',
      bannerSub:
        lang === 'ar'
          ? 'مقالات قانونية حديثة من فريقنا.'
          : 'Stay informed with expert legal articles, UAE regulatory updates, court decisions, and practical guidance for individuals, businesses, and investors.',
      viewAll: lang === 'ar' ? 'عرض الكل' : 'View All',
    }),
    [lang],
  );

  const effectiveBanner = bannerUrl || fallbackBanner;
  const orderedBlogs = useMemo(
    () =>
      [...blogs].sort((first, second) => {
        if (first.slug === FEATURED_BLOG_SLUG) return -1;
        if (second.slug === FEATURED_BLOG_SLUG) return 1;
        return second.createdAt - first.createdAt;
      }),
    [blogs],
  );

  return (
    <main className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <BlogsHero
        isRTL={isRTL}
        bannerUrl={effectiveBanner}
        bannerAlt={bannerCardTitle || tx.bannerTitle}
        eyebrow={tx.label}
        title={bannerCardTitle || tx.bannerTitle}
        subtitle={bannerCardSub || tx.bannerSub}
      />

      <section className="border-t border-[#B38D42]/10 bg-[#F1EFF0]">
        <div className="mx-auto max-w-[1250px] px-4 pb-20 pt-10 md:px-8 md:pb-24 md:pt-12">
        {!isLoading && blogs.length > 0 ? (
          <BlogsExploreCard
            isRTL={isRTL}
            eyebrow={tx.label}
            title={tx.exploreTitle}
            description={tx.exploreSub}
            articleCount={blogs.length}
            articlesCountLabel={tx.articlesCount}
            viewAllLabel={tx.viewAll}
          />
        ) : null}

        {!isLoading && blogs.length === 0 ? (
          <p className={`text-sm text-[#160A0A]/50 ${isRTL ? 'text-right' : 'text-left'}`}>{tx.noBlogs}</p>
        ) : null}

        <BlogsArticleGrid
          blogs={orderedBlogs}
          locale={locale}
          lang={lang}
          isRTL={isRTL}
          readMoreLabel={tx.readMore}
          isLoading={isLoading}
        />
        </div>
      </section>
    </main>
  );
}
