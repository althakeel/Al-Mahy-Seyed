import { legalNewsResponse, readNewsBody, requireLegalNewsAccess } from '@/lib/legal-news-access';
import { listLegalNews, saveLegalNews } from '@/lib/legal-news-server';

export async function GET(request: Request) {
  return legalNewsResponse(async () => {
    const params = new URL(request.url).searchParams;
    const manage = params.get('manage') === '1';
    if (manage) await requireLegalNewsAccess(request);
    return listLegalNews({ manage, oldest: manage && params.get('sort') === 'oldest', limit: !manage && params.get('latest') === '1' ? 3 : undefined });
  });
}

export async function POST(request: Request) {
  return legalNewsResponse(async () => {
    await requireLegalNewsAccess(request);
    return saveLegalNews(await readNewsBody(request));
  }, 201);
}
