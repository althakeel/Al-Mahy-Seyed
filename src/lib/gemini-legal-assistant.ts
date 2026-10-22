import { Locale } from '@/lib/translations';
import { SearchResult } from '@/lib/search-index';

const DEFAULT_GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export interface WebSource {
  title: string;
  url: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    groundingMetadata?: {
      groundingChunks?: Array<{
        web?: { uri?: string; title?: string };
      }>;
    };
  }>;
  error?: { message?: string };
};

const buildSystemPrompt = (locale: Locale) =>
  locale === 'ar'
    ? `أنت مساعد قانوني ذكي لشركة المحي للخدمات القانونية في دبي والإمارات، بخبرة تزيد عن 15 عامًا.
قدّم معلومات قانونية عامة مفيدة حول القوانين والإجراءات في الإمارات.
استخدم نتائج البحث على الويب لتقديم معلومات محدثة عند الإمكان.
لا تقدّم استشارة قانونية ملزمة — أوضح دائمًا أن الإجابة للتوعية فقط.
اقترح خدمات المحي ذات الصلة عند الحاجة.
كن مختصرًا (120–200 كلمة)، واضحًا، وعمليًا.`
    : `You are the AI legal assistant for Almahy for Legal Services, a trusted UAE law firm in Dubai with 15+ years of experience.
Provide helpful general information about UAE laws, procedures, and legal topics.
Use web search results to include up-to-date information when available.
Do NOT give binding legal advice — always clarify this is general information only.
Suggest relevant Almahy services when appropriate.
Be concise (120–200 words), clear, and practical.`;

const buildUserPrompt = (query: string, locale: Locale, related: SearchResult[]) => {
  const context =
    related.length > 0
      ? related
          .slice(0, 5)
          .map((r) => `- ${r.title}: ${r.description}${r.isExternal ? ` (${r.href})` : ''}`)
          .join('\n')
      : locale === 'ar'
        ? 'لا توجد صفحات ذات صلة.'
        : 'No related pages found.';

  return locale === 'ar'
    ? `سؤال المستخدم: ${query}

نتائج ذات صلة:
${context}

أجب على السؤال بشكل مفيد مع الإشارة إلى المصادر الخارجية عند الحاجة. اذكر في النهاية التواصل مع المحي للاستشارة القانونية.`
    : `User question: ${query}

Related results:
${context}

Answer helpfully and reference external sources when relevant. End by inviting the user to contact Almahy for a professional legal consultation.`;
};

const parseWebSources = (data: GeminiResponse): WebSource[] => {
  const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const seen = new Set<string>();
  const sources: WebSource[] = [];

  for (const chunk of chunks) {
    const uri = chunk.web?.uri?.trim();
    const title = chunk.web?.title?.trim();
    if (!uri || !uri.startsWith('http') || seen.has(uri)) continue;
    seen.add(uri);
    sources.push({ title: title || uri, url: uri });
  }

  return sources.slice(0, 6);
};

export const getLegalAiAnswer = async (
  query: string,
  locale: Locale,
  relatedResults: SearchResult[] = []
): Promise<{ answer: string; disclaimer: string; webSources: WebSource[] } | null> => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || !query.trim()) return null;

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const url = `${GEMINI_API_BASE}/${model}:generateContent`;

  const disclaimer =
    locale === 'ar'
      ? 'هذه المعلومات للتوعية العامة فقط وليست استشارة قانونية. للحصول على مشورة قانونية متخصصة، يرجى التواصل مع فريق المحي.'
      : 'This information is for general guidance only and does not constitute legal advice. For professional legal advice, please contact Almahy Legal Services.';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildSystemPrompt(locale) }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: buildUserPrompt(query, locale, relatedResults) }],
          },
        ],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return null;
    }

    const data = (await response.json()) as GeminiResponse;
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const webSources = parseWebSources(data);

    if (!answer) return null;

    return { answer, disclaimer, webSources };
  } catch (error) {
    console.error('Gemini legal assistant error:', error);
    return null;
  }
};
