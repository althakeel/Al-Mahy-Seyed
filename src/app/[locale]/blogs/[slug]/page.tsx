"use client";

import BlogArticleBackLink from '@/components/blogs/BlogArticleBackLink';
import BlogArticleHeader from '@/components/blogs/BlogArticleHeader';
import BlogArticleSidebar from '@/components/blogs/BlogArticleSidebar';
import { FormattedText } from '@/components/BoldTextField';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale } from '@/lib/translations';
import {
  BlogPost,
  getBlogLocalizedField,
  isBlogFieldAvailableInArabic,
  loadBlogBySlugFromServer,
  loadRecentBlogsFromServer,
} from '@/lib/blogs';

export default function BlogDetailsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = (params?.slug as string) || '';
  const lang: Locale = locale === 'ar' ? 'ar' : 'en';
  const isRTL = lang === 'ar';
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      setBlog(null);
      try {
        const [post, recent] = await Promise.all([
          loadBlogBySlugFromServer(slug),
          loadRecentBlogsFromServer(slug, 4),
        ]);
        setBlog(post);
        setRecentBlogs(recent);
      } finally {
        setIsLoading(false);
      }
    };
    void loadPage();
  }, [slug]);

  const text = useMemo(
    () => ({
      back: lang === 'ar' ? 'الرجوع إلى المدونة' : 'Back to Blogs',
      loading: lang === 'ar' ? 'جاري تحميل المقالة...' : 'Loading article...',
      notFound: lang === 'ar' ? 'المقالة غير موجودة.' : 'Blog not found.',
      label: lang === 'ar' ? 'رؤى قانونية' : 'Legal Insights',
      published: lang === 'ar' ? 'تاريخ النشر' : 'Published',
      recent: lang === 'ar' ? 'أحدث المقالات' : 'Recent Posts',
      guidance: lang === 'ar' ? 'إرشادات قانونية' : 'Legal Guidance',
      guidanceText:
        lang === 'ar'
          ? 'للحصول على إرشاد مخصص، تواصل مع فريقنا القانوني.'
          : 'For advice tailored to your circumstances, speak with our legal team.',
      contact: lang === 'ar' ? 'تواصل معنا' : 'Contact us',
    }),
    [lang],
  );

  const bannerImage =
    lang === 'ar'
      ? blog?.bannerImageAr || blog?.bannerImage || blog?.imageAr || blog?.image || ''
      : blog?.bannerImage || blog?.image || '';
  const title = blog ? getBlogLocalizedField(blog, 'title', lang) : '';
  const shortDescription = blog ? getBlogLocalizedField(blog, 'shortDescription', lang) : '';
  const content = blog ? getBlogLocalizedField(blog, 'content', lang) : '';
  const contentUsesArabic = blog ? isBlogFieldAvailableInArabic(blog, 'content') : true;
  const shortDescriptionUsesArabic = blog ? isBlogFieldAvailableInArabic(blog, 'shortDescription') : true;

  return (
    <main className="min-h-screen bg-[#F1EFF0]" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="mx-auto max-w-[1250px] px-4 pb-28 pt-28 max-lg:pb-28 md:px-8 md:pt-32 lg:pb-20">
        {isLoading ? (
          <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center gap-4 text-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-[#B38D42]/25 border-t-[#B38D42]"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#B38D42]">{text.loading}</p>
          </div>
        ) : !blog ? (
          <>
            <BlogArticleBackLink href={`/${locale}/blogs`} label={text.back} isRTL={isRTL} />
            <p className={`mt-12 text-[#160A0A]/60 ${isRTL ? 'text-right' : 'text-left'}`}>{text.notFound}</p>
          </>
        ) : (
          <article className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <BlogArticleBackLink href={`/${locale}/blogs`} label={text.back} isRTL={isRTL} />

              <div className="mt-8">
                <BlogArticleHeader
                  isRTL={isRTL}
                  categoryLabel={text.label}
                  date={blog.date}
                  title={title}
                  shortDescription={shortDescription}
                  shortDescriptionUsesArabic={shortDescriptionUsesArabic}
                  bannerImage={bannerImage}
                />

                <div
                  dir={contentUsesArabic ? (isRTL ? 'rtl' : 'ltr') : 'ltr'}
                  className={`blog-article-prose mt-10 md:mt-12 ${contentUsesArabic && isRTL ? 'text-right' : 'text-left'}`}
                >
                  <FormattedText text={content} className="max-w-[680px] text-[16px] leading-[1.85] text-[#160A0A]/85" />
                </div>
              </div>
            </div>

            <BlogArticleSidebar
              isRTL={isRTL}
              lang={lang}
              locale={locale}
              publishedLabel={text.published}
              date={blog.date}
              recentLabel={text.recent}
              recentBlogs={recentBlogs}
              guidanceTitle={text.guidance}
              guidanceText={text.guidanceText}
              contactLabel={text.contact}
            />
          </article>
        )}
      </section>
    </main>
  );
}
