import { MongoServerError } from 'mongodb';
import { cache } from 'react';
import { randomUUID } from 'node:crypto';
import { getMongoDb } from '@/lib/mongodb';
import { hasMeaningfulLocalizedText } from '@/lib/blogs';
import { newsImageFields, newsTextFields, type LegalNews, type NewsInput } from '@/lib/legal-news-data';

export class NewsError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

const collection = async () => (await getMongoDb()).collection<LegalNews>('legal_news');
const published = { status: 'published' } as const;

export async function listLegalNews({ manage = false, limit, oldest = false }: {
  manage?: boolean; limit?: number; oldest?: boolean;
} = {}) {
  const direction = oldest ? 1 : -1;
  const cursor = (await collection()).find(manage ? {} : published, {
    projection: manage ? { _id: 0 } : { _id: 0, content: 0, contentAr: 0 },
  }).sort({ date: direction, createdAt: direction, id: direction });
  return limit ? cursor.limit(limit).toArray() : cursor.toArray();
}

export const getPublishedLegalNews = cache(async (slug: string) =>
  (await collection()).findOne({ ...published, slug }, { projection: { _id: 0 } }),
);

function validateNews(body: unknown, current?: LegalNews): NewsInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new NewsError('Invalid article.');
  const input = body as Record<string, unknown>;
  const value = (key: keyof NewsInput, max: number) => {
    const field = Object.hasOwn(input, key) ? input[key] : current?.[key] ?? '';
    if (typeof field !== 'string' || field.length > max) throw new NewsError(`Invalid field: ${key}.`);
    return field.trim();
  };
  const slug = value('slug', 160).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new NewsError('Use letters, digits and hyphens for the slug.');
  const date = value('date', 10);
  const parsedDate = new Date(date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(+parsedDate) || parsedDate.toISOString().slice(0, 10) !== date) {
    throw new NewsError('Enter a valid publication date.');
  }
  const status = value('status', 9);
  if (status !== 'draft' && status !== 'published') throw new NewsError('Invalid publication status.');

  const text = Object.fromEntries(newsTextFields.map((key) => [
    key, value(key, key.startsWith('content') ? 300_000 : key.startsWith('shortDescription') ? 10_000 : 250),
  ])) as Pick<NewsInput, (typeof newsTextFields)[number]>;
  if (!text.title || (status === 'published' && newsTextFields.some((key) => !hasMeaningfulLocalizedText(text[key])))) {
    throw new NewsError('Enter an English title for drafts and complete all bilingual text fields before publishing.');
  }
  const images = Object.fromEntries(newsImageFields.map((key) => {
    const url = value(key, 2048);
    if (url && (!URL.canParse(url) || new URL(url).protocol !== 'https:')) throw new NewsError(`Invalid image URL: ${key}.`);
    return [key, url];
  })) as Pick<NewsInput, (typeof newsImageFields)[number]>;

  return { ...text, ...images, slug, date, status };
}

let indexes: Promise<unknown> | undefined;

export async function saveLegalNews(body: unknown, id?: string) {
  const news = await collection();
  const current = id ? await news.findOne({ id }, { projection: { _id: 0 } }) : null;
  if (id && !current) throw new NewsError('Article not found.', 404);
  if (current && body && typeof body === 'object' && 'updatedAt' in body && body.updatedAt !== current.updatedAt) {
    throw new NewsError('The article changed. Refresh the list and try again.', 409);
  }
  const fields = validateNews(body, current ?? undefined);
  const now = Date.now();
  const article = {
    ...fields,
    id: current?.id ?? randomUUID(),
    createdAt: current?.createdAt ?? now,
    updatedAt: current ? Math.max(now, current.updatedAt + 1) : now,
  };

  indexes ??= Promise.all([
    news.createIndex({ slug: 1 }, { unique: true }),
    news.createIndex({ id: 1 }, { unique: true }),
    news.createIndex({ status: 1, date: -1, createdAt: -1, id: -1 }),
  ]).catch((error: unknown) => {
    indexes = undefined;
    throw error;
  });

  try {
    await indexes;
    if (!current) {
      await news.insertOne({ ...article });
    } else {
      const result = await news.updateOne({ id: current.id, updatedAt: current.updatedAt }, { $set: article });
      if (!result.matchedCount) throw new NewsError('The article changed. Refresh the list and try again.', 409);
    }
    return article;
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) throw new NewsError('This slug is already in use.', 409);
    throw error;
  }
}

export async function deleteLegalNews(id: string) {
  const result = await (await collection()).deleteOne({ id });
  if (!result.deletedCount) throw new NewsError('Article not found.', 404);
}
