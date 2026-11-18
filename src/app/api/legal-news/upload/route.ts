import { legalNewsResponse, requireLegalNewsAccess } from '@/lib/legal-news-access';
import { uploadImageKitFile } from '@/lib/imagekit-upload';

export async function POST(request: Request) {
  try {
    await requireLegalNewsAccess(request);
  } catch (error) {
    return legalNewsResponse(() => Promise.reject(error));
  }
  return uploadImageKitFile(request, '/almahy/legal-news');
}
