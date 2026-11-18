import { legalNewsResponse, setLegalNewsAccess } from '@/lib/legal-news-access';

export async function PATCH(request: Request) {
  return legalNewsResponse(async () => {
    await setLegalNewsAccess(request);
    return null;
  });
}
