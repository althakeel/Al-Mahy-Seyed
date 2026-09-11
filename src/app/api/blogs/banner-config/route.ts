import { NextResponse } from 'next/server';
import { BlogsBannerCard } from '@/lib/blogs';
import { loadBlogsPageBannerConfigFromMongo, saveBlogsPageBannerConfigToMongo } from '@/lib/blogs-server';

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

export async function GET() {
  try {
    const config = await loadBlogsPageBannerConfigFromMongo();
    return NextResponse.json({ success: true, config }, { headers: PUBLIC_CACHE_HEADERS });
  } catch (error) {
    console.error('Banner config GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load banner config.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json() as {
      bannerUrl?: string;
      card?: BlogsBannerCard;
      updatedBy?: string;
    };

    const config = await saveBlogsPageBannerConfigToMongo(payload);
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Banner config PUT error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save banner config.' }, { status: 500 });
  }
}