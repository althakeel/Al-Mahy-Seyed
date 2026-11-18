import { legalNewsResponse } from '@/lib/legal-news-access';
import { getPublishedLegalNews, NewsError } from '@/lib/legal-news-server';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return legalNewsResponse(async () => {
    const news = await getPublishedLegalNews((await params).slug);
    if (!news) throw new NewsError('Article not found.', 404);
    return news;
  });
}
