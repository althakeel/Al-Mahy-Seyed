import { uploadImageKitFile } from '@/lib/imagekit-upload';

export async function POST(request: Request) {
  return uploadImageKitFile(request, '/almahy/blogs');
}
