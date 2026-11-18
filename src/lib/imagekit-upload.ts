import { NextResponse } from 'next/server';
import { ImageKit, toFile } from '@imagekit/nodejs';

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const imagekitOptions = privateKey && urlEndpoint
  ? { privateKey, publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '', urlEndpoint }
  : null;
const imagekit = imagekitOptions ? new ImageKit(imagekitOptions) : null;

export async function uploadImageKitFile(request: Request, folder: string) {
  if (!imagekit) {
    return NextResponse.json(
      { success: false, message: 'ImageKit is not configured. Please set IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'Only image files are allowed.' }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Image is too large. Maximum allowed size is 10MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadable = await toFile(buffer, fileName, { type: file.type });

    const uploadPromise = imagekit.files.upload({
      file: uploadable,
      fileName,
      folder,
      useUniqueFileName: true,
    });

    const uploaded = await Promise.race([
      uploadPromise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Image upload timed out. Please try again.')), 15000);
      }),
    ]);

    return NextResponse.json({
      success: true,
      url: uploaded.url,
      fileId: uploaded.fileId,
      name: uploaded.name,
    });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
