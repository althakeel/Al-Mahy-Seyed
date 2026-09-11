import { WithId } from 'mongodb';
import {
  applyArabicTranslationToBlog,
  blogNeedsArabicBackfill,
  translateBlogFieldsToArabic,
} from '@/lib/blog-arabic-backfill';
import {
  BlogPost,
  BlogsBannerCard,
  BlogsPageBannerConfig,
  hasMeaningfulLocalizedText,
  slugify,
} from '@/lib/blogs';
import { getMongoDb } from '@/lib/mongodb';

const BLOGS_COLLECTION = 'blogs';
const SITE_CONTENT_COLLECTION = 'siteContent';
const BLOGS_BANNER_KEY = 'blogsPageBanner';
const BLOGS_CACHE_TTL_MS = 60_000;

const BLOG_SUMMARY_PROJECTION = {
  _id: 0,
  id: 1,
  slug: 1,
  title: 1,
  titleAr: 1,
  shortDescription: 1,
  shortDescriptionAr: 1,
  date: 1,
  image: 1,
  imageAr: 1,
  createdAt: 1,
} as const;

type BlogsCacheEntry = {
  expiresAt: number;
  blogs: BlogPost[];
};

type BannerCacheEntry = {
  expiresAt: number;
  config: BlogsPageBannerConfig;
};

let blogSummariesCache: BlogsCacheEntry | null = null;
let blogFullCache: BlogsCacheEntry | null = null;
let bannerConfigCache: BannerCacheEntry | null = null;
let indexesEnsured = false;

interface BlogDocument extends BlogPost {
  updatedAt?: number;
  updatedBy?: string | null;
}

interface BlogsBannerDocument {
  key: string;
  bannerUrl: string;
  card: BlogsBannerCard;
  updatedAt?: number;
  updatedBy?: string | null;
}

const emptyBannerCard = (): BlogsBannerCard => ({
  titleEn: '',
  titleAr: '',
  subEn: '',
  subAr: '',
});

export const normalizeBlogPost = (blog: BlogPost): BlogPost => ({
  ...blog,
  slug: slugify(blog.slug || blog.title || blog.id),
  title: blog.title.trim(),
  titleAr: hasMeaningfulLocalizedText(blog.titleAr) ? blog.titleAr.trim() : undefined,
  shortDescription: blog.shortDescription.trim(),
  shortDescriptionAr: hasMeaningfulLocalizedText(blog.shortDescriptionAr)
    ? blog.shortDescriptionAr.trim()
    : undefined,
  content: blog.content.trim(),
  contentAr: hasMeaningfulLocalizedText(blog.contentAr) ? blog.contentAr.trim() : undefined,
  image: blog.image.trim(),
  imageAr: blog.imageAr?.trim() || undefined,
  bannerImage: blog.bannerImage?.trim() || undefined,
  bannerImageAr: blog.bannerImageAr?.trim() || undefined,
});

const normalizeBannerCard = (card?: Partial<BlogsBannerCard>): BlogsBannerCard => ({
  titleEn: card?.titleEn?.trim() || '',
  titleAr: card?.titleAr?.trim() || '',
  subEn: card?.subEn?.trim() || '',
  subAr: card?.subAr?.trim() || '',
});

const toBlogPost = (blog: WithId<BlogDocument> | BlogDocument): BlogPost => normalizeBlogPost({
  id: blog.id,
  slug: blog.slug,
  title: blog.title,
  titleAr: blog.titleAr,
  shortDescription: blog.shortDescription,
  shortDescriptionAr: blog.shortDescriptionAr,
  content: blog.content,
  contentAr: blog.contentAr,
  date: blog.date,
  image: blog.image,
  imageAr: blog.imageAr,
  bannerImage: blog.bannerImage,
  bannerImageAr: blog.bannerImageAr,
  createdAt: blog.createdAt,
});

export const invalidateBlogsCache = () => {
  blogSummariesCache = null;
  blogFullCache = null;
  bannerConfigCache = null;
};

const ensureBlogIndexes = async (db: Awaited<ReturnType<typeof getMongoDb>>) => {
  if (indexesEnsured) {
    return;
  }

  indexesEnsured = true;
  const collection = db.collection<BlogDocument>(BLOGS_COLLECTION);

  try {
    await Promise.all([
      collection.createIndex({ slug: 1 }),
      collection.createIndex({ createdAt: -1 }),
      collection.createIndex({ id: 1 }),
    ]);
  } catch (error) {
    indexesEnsured = false;
    console.warn('Failed to ensure blog indexes:', error);
  }
};

const buildUniqueSlug = async (slug: string, blogId: string) => {
  const db = await getMongoDb();
  const collection = db.collection<BlogDocument>(BLOGS_COLLECTION);
  const baseSlug = slugify(slug || blogId);
  let candidate = baseSlug;
  let counter = 1;

  while (await collection.findOne({ slug: candidate, id: { $ne: blogId } as unknown as string })) {
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }

  return candidate;
};

const readCachedBlogs = (cache: BlogsCacheEntry | null): BlogPost[] | null => {
  if (!cache || cache.expiresAt <= Date.now()) {
    return null;
  }

  return cache.blogs;
};

export const listBlogSummariesFromMongo = async (): Promise<BlogPost[]> => {
  const cached = readCachedBlogs(blogSummariesCache);
  if (cached) {
    return cached;
  }

  const db = await getMongoDb();
  await ensureBlogIndexes(db);

  const blogs = await db
    .collection<BlogDocument>(BLOGS_COLLECTION)
    .find({}, { projection: BLOG_SUMMARY_PROJECTION })
    .sort({ createdAt: -1 })
    .toArray();

  const normalized = blogs.map((blog) =>
    toBlogPost({
      ...blog,
      content: '',
      contentAr: undefined,
      bannerImage: undefined,
      bannerImageAr: undefined,
    }),
  );

  blogSummariesCache = {
    blogs: normalized,
    expiresAt: Date.now() + BLOGS_CACHE_TTL_MS,
  };

  return normalized;
};

export const listRecentBlogSummariesFromMongo = async (
  excludeSlug?: string,
  limit = 4,
): Promise<BlogPost[]> => {
  const summaries = await listBlogSummariesFromMongo();
  return summaries.filter((blog) => blog.slug !== excludeSlug).slice(0, limit);
};

export const listBlogsFromMongo = async (): Promise<BlogPost[]> => {
  const cached = readCachedBlogs(blogFullCache);
  if (cached) {
    return cached;
  }

  const db = await getMongoDb();
  await ensureBlogIndexes(db);

  const blogs = await db
    .collection<BlogDocument>(BLOGS_COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const normalized = blogs.map(toBlogPost);
  blogFullCache = {
    blogs: normalized,
    expiresAt: Date.now() + BLOGS_CACHE_TTL_MS,
  };

  return normalized;
};

export const backfillBlogArabicIfNeeded = async (blog: BlogPost): Promise<BlogPost> => {
  if (!blogNeedsArabicBackfill(blog)) {
    return blog;
  }

  const translation = await translateBlogFieldsToArabic(blog);
  if (!translation) {
    return blog;
  }

  const updatedBlog = applyArabicTranslationToBlog(blog, translation);
  if (!blogNeedsArabicBackfill(updatedBlog)) {
    return saveBlogToMongo(updatedBlog, 'arabic-backfill');
  }

  return updatedBlog;
};

export const getBlogBySlugFromMongo = async (slug: string): Promise<BlogPost | null> => {
  const db = await getMongoDb();
  await ensureBlogIndexes(db);

  const blog = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOne({ slug });
  if (!blog) {
    return null;
  }

  const normalizedBlog = toBlogPost(blog);
  if (blogNeedsArabicBackfill(normalizedBlog)) {
    void backfillBlogArabicIfNeeded(normalizedBlog)
      .then(() => invalidateBlogsCache())
      .catch((error) => {
        console.error(`Arabic backfill failed for blog "${slug}":`, error);
      });
  }

  return normalizedBlog;
};

export const getBlogByIdFromMongo = async (id: string): Promise<BlogPost | null> => {
  const db = await getMongoDb();
  const blog = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOne({ id });
  return blog ? toBlogPost(blog) : null;
};

export const saveBlogToMongo = async (blog: BlogPost, updatedBy?: string): Promise<BlogPost> => {
  const db = await getMongoDb();
  const collection = db.collection<BlogDocument>(BLOGS_COLLECTION);
  const normalizedBlog = normalizeBlogPost(blog);
  const uniqueSlug = await buildUniqueSlug(normalizedBlog.slug, normalizedBlog.id);
  const savedBlog: BlogPost = {
    ...normalizedBlog,
    slug: uniqueSlug,
    createdAt: normalizedBlog.createdAt || Date.now(),
  };

  await collection.updateOne(
    { id: savedBlog.id },
    {
      $set: {
        ...savedBlog,
        updatedAt: Date.now(),
        updatedBy: updatedBy || null,
      },
    },
    { upsert: true }
  );

  invalidateBlogsCache();
  return savedBlog;
};

export const deleteBlogFromMongo = async (blogId: string) => {
  const db = await getMongoDb();
  await db.collection<BlogDocument>(BLOGS_COLLECTION).deleteOne({ id: blogId });
  invalidateBlogsCache();
};

export const loadBlogsPageBannerConfigFromMongo = async (): Promise<BlogsPageBannerConfig> => {
  if (bannerConfigCache && bannerConfigCache.expiresAt > Date.now()) {
    return bannerConfigCache.config;
  }

  const db = await getMongoDb();
  const document = await db.collection<BlogsBannerDocument>(SITE_CONTENT_COLLECTION).findOne({ key: BLOGS_BANNER_KEY });

  const config: BlogsPageBannerConfig = !document
    ? {
        bannerUrl: '',
        card: emptyBannerCard(),
      }
    : {
        bannerUrl: document.bannerUrl || '',
        card: normalizeBannerCard(document.card),
      };

  bannerConfigCache = {
    config,
    expiresAt: Date.now() + BLOGS_CACHE_TTL_MS,
  };

  return config;
};

export const saveBlogsPageBannerConfigToMongo = async (payload: {
  bannerUrl?: string;
  card?: BlogsBannerCard;
  updatedBy?: string;
}): Promise<BlogsPageBannerConfig> => {
  const db = await getMongoDb();
  const current = await loadBlogsPageBannerConfigFromMongo();
  const nextConfig: BlogsPageBannerConfig = {
    bannerUrl: payload.bannerUrl ?? current.bannerUrl,
    card: normalizeBannerCard(payload.card || current.card),
  };

  await db.collection<BlogsBannerDocument>(SITE_CONTENT_COLLECTION).updateOne(
    { key: BLOGS_BANNER_KEY },
    {
      $set: {
        key: BLOGS_BANNER_KEY,
        bannerUrl: nextConfig.bannerUrl,
        card: nextConfig.card,
        updatedAt: Date.now(),
        updatedBy: payload.updatedBy || null,
      },
    },
    { upsert: true }
  );

  invalidateBlogsCache();
  return nextConfig;
};