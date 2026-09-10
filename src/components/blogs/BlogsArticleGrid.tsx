import BlogArticleCard from '@/components/blogs/BlogArticleCard';
import { BlogPost } from '@/lib/blogs';
import { Locale } from '@/lib/translations';

const GRID_COLS_LG = 3;

interface BlogsArticleGridProps {
  blogs: BlogPost[];
  locale: string;
  lang: Locale;
  isRTL: boolean;
  readMoreLabel: string;
  isLoading: boolean;
}

function BlogCardSkeleton({ index }: { index: number }) {
  return (
    <article
      key={`skeleton-${index}`}
      className="flex animate-pulse flex-col overflow-hidden rounded-[16px] border border-[#B38D42]/15 bg-white"
    >
      <div className="aspect-[16/10] w-full bg-[#E8E4E0]" />
      <div className="px-5 pb-5 pt-4">
        <div className="mb-2 h-5 w-[88%] rounded bg-[#E8E4E0]" />
        <div className="mb-4 h-5 w-[70%] rounded bg-[#E8E4E0]" />
        <div className="mb-3 h-3 w-24 rounded bg-[#E8E4E0]" />
        <div className="mb-4 h-px w-8 bg-[#E8E4E0]" />
        <div className="mb-2 h-3 w-full rounded bg-[#E8E4E0]" />
        <div className="mb-2 h-3 w-[95%] rounded bg-[#E8E4E0]" />
        <div className="mb-5 h-3 w-[80%] rounded bg-[#E8E4E0]" />
        <div className="h-3 w-28 rounded bg-[#E8E4E0]" />
      </div>
    </article>
  );
}

export default function BlogsArticleGrid({
  blogs,
  locale,
  lang,
  isRTL,
  readMoreLabel,
  isLoading,
}: BlogsArticleGridProps) {
  const remainder = blogs.length % GRID_COLS_LG;
  const splitIndex = remainder === 0 ? blogs.length : blogs.length - remainder;
  const primaryBlogs = blogs.slice(0, splitIndex);
  const trailingBlogs = blogs.slice(splitIndex);

  return (
    <div id="articles" className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => <BlogCardSkeleton key={`skeleton-${index}`} index={index} />)}

        {!isLoading &&
          primaryBlogs.map((blog) => (
            <BlogArticleCard
              key={blog.id}
              blog={blog}
              locale={locale}
              lang={lang}
              readMoreLabel={readMoreLabel}
              isRTL={isRTL}
            />
          ))}
      </div>

      {!isLoading && trailingBlogs.length > 0 ? (
        <div className="mt-8 flex flex-wrap justify-center gap-8 lg:mt-10">
          {trailingBlogs.map((blog) => (
            <BlogArticleCard
              key={blog.id}
              blog={blog}
              locale={locale}
              lang={lang}
              readMoreLabel={readMoreLabel}
              isRTL={isRTL}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] lg:max-w-none"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
