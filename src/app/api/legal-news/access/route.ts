
import {
  getLegalNewsAccess,
  legalNewsResponse,
  setLegalNewsAccess,
} from '@/lib/legal-news-access';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return legalNewsResponse(async () => {
    const canManage = await getLegalNewsAccess(request);

    return {
      canManage,
    };
  });
}

export async function PATCH(request: Request) {
  return legalNewsResponse(async () => {
    await setLegalNewsAccess(request);

    return null;
  });
}
