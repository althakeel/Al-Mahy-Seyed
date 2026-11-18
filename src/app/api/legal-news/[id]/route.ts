import { legalNewsResponse, readNewsBody, requireLegalNewsAccess } from '@/lib/legal-news-access';
import { deleteLegalNews, saveLegalNews } from '@/lib/legal-news-server';

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  return legalNewsResponse(async () => {
    await requireLegalNewsAccess(request);
    return saveLegalNews(await readNewsBody(request), (await params).id);
  });
}

export async function DELETE(request: Request, { params }: Context) {
  return legalNewsResponse(async () => {
    await requireLegalNewsAccess(request);
    await deleteLegalNews((await params).id);
    return null;
  });
}
