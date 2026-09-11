import { BlogPost, hasMeaningfulLocalizedText } from '@/lib/blogs';

interface ArabicTranslationPayload {
  titleAr?: string;
  shortDescriptionAr?: string;
  contentAr?: string;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

const getOpenAiApiKey = (): string | undefined =>
  process.env.OPENAI_API_KEY?.trim() || process.env['\u00a0OPENAI_API_KEY']?.trim();

const parseTranslationPayload = (raw: string): ArabicTranslationPayload => {
  try {
    return JSON.parse(raw) as ArabicTranslationPayload;
  } catch {
    return {};
  }
};

export const blogNeedsArabicBackfill = (blog: BlogPost): boolean => {
  const needsContent = !hasMeaningfulLocalizedText(blog.contentAr) && hasMeaningfulLocalizedText(blog.content);
  const needsTitle = !hasMeaningfulLocalizedText(blog.titleAr) && hasMeaningfulLocalizedText(blog.title);
  const needsShort =
    !hasMeaningfulLocalizedText(blog.shortDescriptionAr) && hasMeaningfulLocalizedText(blog.shortDescription);

  return needsContent || needsTitle || needsShort;
};

export const translateBlogFieldsToArabic = async (blog: BlogPost): Promise<ArabicTranslationPayload | null> => {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    return null;
  }

  const fieldsToTranslate: Record<string, string> = {};

  if (!hasMeaningfulLocalizedText(blog.titleAr) && blog.title?.trim()) {
    fieldsToTranslate.title = blog.title.trim();
  }
  if (!hasMeaningfulLocalizedText(blog.shortDescriptionAr) && blog.shortDescription?.trim()) {
    fieldsToTranslate.shortDescription = blog.shortDescription.trim();
  }
  if (!hasMeaningfulLocalizedText(blog.contentAr) && blog.content?.trim()) {
    fieldsToTranslate.content = blog.content.trim();
  }

  if (Object.keys(fieldsToTranslate).length === 0) {
    return null;
  }

  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = process.env.OPENAI_PRODUCT_AUTOFILL_MODEL || 'gpt-4.1-mini';

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            'You translate legal blog content into Modern Standard Arabic for a UAE law firm website. Return only valid JSON.',
        },
        {
          role: 'user',
          content: [
            'Translate the provided English blog fields to Arabic.',
            'Return JSON keys only for translated fields: titleAr, shortDescriptionAr, contentAr.',
            'Preserve HTML tags, links, lists, and structure in content exactly; translate visible text only.',
            'Do not add markdown wrappers around HTML content.',
            JSON.stringify(fieldsToTranslate),
          ].join('\n'),
        },
      ],
      response_format: { type: 'json_object' },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Arabic blog translation failed: ${errorText}`);
  }

  const data = (await response.json()) as OpenAIResponse;
  const raw = data.choices?.[0]?.message?.content || '{}';
  const payload = parseTranslationPayload(raw);

  return {
    titleAr: payload.titleAr?.trim() || undefined,
    shortDescriptionAr: payload.shortDescriptionAr?.trim() || undefined,
    contentAr: payload.contentAr?.trim() || undefined,
  };
};

export const applyArabicTranslationToBlog = (
  blog: BlogPost,
  translation: ArabicTranslationPayload,
): BlogPost => ({
  ...blog,
  titleAr: hasMeaningfulLocalizedText(translation.titleAr) ? translation.titleAr!.trim() : blog.titleAr,
  shortDescriptionAr: hasMeaningfulLocalizedText(translation.shortDescriptionAr)
    ? translation.shortDescriptionAr!.trim()
    : blog.shortDescriptionAr,
  contentAr: hasMeaningfulLocalizedText(translation.contentAr) ? translation.contentAr!.trim() : blog.contentAr,
});
