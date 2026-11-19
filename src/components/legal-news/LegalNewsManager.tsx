
'use client';

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import type { User } from 'firebase/auth';
import Link from 'next/link';

import BoldTextField, {
  FormattedText,
} from '@/components/BoldTextField';

import NewsArticle from '@/components/legal-news/NewsArticle';

import {
  getBlogLocalizedField,
  getBlogLocalizedImage,
} from '@/lib/blogs';

import {
  newsImageFields,
  newsTextFields,
  type LegalNews,
  type NewsInput,
} from '@/lib/legal-news-data';

import type { Locale } from '@/lib/translations';

const panel = 'rounded-2xl bg-white p-6 md:p-8 shadow-sm';

const inputBase =
  'w-full rounded-xl border border-[#CECDCB] bg-white px-4 text-slate-900 outline-none focus:border-[#DE3B34]';

const input = inputBase + ' py-3';

const fileInput =
  inputBase + ' py-2.5 disabled:opacity-60';

const button =
  'rounded-lg border border-[#CECDCB] px-3 py-2 text-xs font-semibold text-[#160A0A] hover:bg-[#F1EFF0] transition-colors disabled:opacity-60';

const danger =
  'rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors disabled:opacity-60';

const primary =
  'rounded-xl bg-[#DE3B34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9B0F09] transition-colors disabled:opacity-60';

const sortSelect =
  'rounded-lg border border-[#CECDCB] bg-white px-3 py-2 text-xs font-semibold text-[#160A0A] outline-none focus:border-[#DE3B34]';

const emptyArticle = (): LegalNews => ({
  id: '',
  slug: '',
  date: '',
  status: 'draft',
  createdAt: 0,
  updatedAt: 0,
  title: '',
  titleAr: '',
  shortDescription: '',
  shortDescriptionAr: '',
  content: '',
  contentAr: '',
  category: '',
  categoryAr: '',
  image: '',
  imageAr: '',
  bannerImage: '',
  bannerImageAr: '',
});

export default function LegalNewsManager({
  user,
  locale,
}: {
  user: User;
  locale: Locale;
}) {
  const ar = locale === 'ar';

  const t = useCallback(
    (en: string, arabic: string) =>
      ar ? arabic : en,
    [ar]
  );

  const [news, setNews] = useState<LegalNews[]>([]);
  const [sort, setSort] = useState('newest');
  const [form, setForm] = useState<LegalNews | null>(null);
  const [preview, setPreview] = useState<LegalNews | null>(null);
  const [previewLang, setPreviewLang] = useState<Locale>(locale);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [feedback, setFeedback] = useState<{
    text: string;
    error?: boolean;
  } | null>(null);

  const [upload, setUpload] = useState<string | null>(null);

  const disabled = busy || loading || Boolean(upload);

  const labels: Record<
    (typeof newsTextFields)[number] |
    (typeof newsImageFields)[number],
    string
  > = {
    title: t('English title', 'العنوان بالإنجليزية'),
    titleAr: t('Arabic title', 'العنوان بالعربية'),

    shortDescription: t(
      'English short description',
      'الوصف المختصر بالإنجليزية'
    ),

    shortDescriptionAr: t(
      'Arabic short description',
      'الوصف المختصر بالعربية'
    ),

    content: t(
      'English full content',
      'المحتوى الكامل بالإنجليزية'
    ),

    contentAr: t(
      'Arabic full content',
      'المحتوى الكامل بالعربية'
    ),

    // Kept for compatibility with the LegalNews type.
    // These fields are not displayed in the form.
    category: t('English category', 'التصنيف بالإنجليزية'),
    categoryAr: t('Arabic category', 'التصنيف بالعربية'),

    image: t(
      'English card image',
      'صورة البطاقة الإنجليزية'
    ),

    imageAr: t(
      'Arabic card image',
      'صورة البطاقة العربية'
    ),

    bannerImage: t(
      'English banner image',
      'صورة البانر الإنجليزية'
    ),

    bannerImageAr: t(
      'Arabic banner image',
      'صورة البانر العربية'
    ),
  };

  const request = useCallback(
    async (path: string, options?: RequestInit) => {
      const headers = new Headers(options?.headers);

      headers.set(
        'Authorization',
        `Bearer ${await user.getIdToken()}`
      );

      if (typeof options?.body === 'string') {
        headers.set('Content-Type', 'application/json');
      }

      const response = await fetch(
        `/api/legal-news${path}`,
        {
          ...options,
          headers,
          cache: 'no-store',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            t(
              'Request failed.',
              'تعذر إكمال الطلب.'
            )
        );
      }

      return result;
    },
    [user, t]
  );

  const reportError = useCallback(
    (error: unknown) => {
      setFeedback({
        text:
          error instanceof Error
            ? error.message
            : t(
                'Request failed.',
                'تعذر إكمال الطلب.'
              ),
        error: true,
      });
    },
    [t]
  );

  const load = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);

      try {
        const result = await request(
          '?manage=1',
          { signal }
        );

        if (!signal?.aborted) {
          setNews(result.data);
        }
      } catch (error) {
        if (!signal?.aborted) {
          reportError(error);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [request, reportError]
  );

  useEffect(() => {
    const controller = new AbortController();

    void load(controller.signal);

    return () => controller.abort();
  }, [load]);

  const update = <K extends keyof NewsInput>(
    key: K,
    value: NewsInput[K]
  ) => {
    setForm(
      (current) =>
        current && {
          ...current,
          [key]: value,
        }
    );
  };

  function showForm(article: LegalNews | null) {
    setForm(article ? { ...article } : null);
    setPreview(null);
    setFeedback(null);
  }

  async function run(
    action: () => Promise<void>
  ) {
    setBusy(true);
    setFeedback(null);

    try {
      await action();
    } catch (error) {
      reportError(error);
    } finally {
      setBusy(false);
    }
  }

  async function save(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form) return;

    await run(async () => {
      const { id } = form;

      // The backend generates the slug automatically.
      // Existing article slugs are preserved.
      const body = {
        ...form,
      };

      const result = await request(
        id ? `/${id}` : '',
        {
          method: id ? 'PATCH' : 'POST',
          body: JSON.stringify(body),
        }
      );

      const saved: LegalNews = result.data;

      setNews((current) => [
        saved,
        ...current.filter(
          (item) => item.id !== saved.id
        ),
      ]);

      setForm(null);
      setPreview(null);

      setFeedback({
        text: t(
          'Article saved successfully.',
          'تم حفظ الخبر بنجاح.'
        ),
      });
    });
  }

  async function uploadImage(
    key: (typeof newsImageFields)[number],
    file: File
  ) {
    setUpload(key);
    setFeedback(null);

    try {
      const body = new FormData();

      body.append('file', file);

      const result = await request(
        '/upload',
        {
          method: 'POST',
          body,
        }
      );

      update(key, result.url);
    } catch (error) {
      reportError(error);
    } finally {
      setUpload(null);
    }
  }

  function toggleStatus(item: LegalNews) {
    return run(async () => {
      const status =
        item.status === 'published'
          ? 'draft'
          : 'published';

      const result = await request(
        `/${item.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            status,
            updatedAt: item.updatedAt,
          }),
        }
      );

      const updated: LegalNews = result.data;

      setNews((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? updated
            : entry
        )
      );

      if (form?.id === item.id) {
        setForm((current) =>
          current && {
            ...updated,
          }
        );
      }

      setFeedback({
        text:
          status === 'published'
            ? t(
                'Article published.',
                'تم نشر الخبر.'
              )
            : t(
                'Article unpublished.',
                'تم إلغاء نشر الخبر.'
              ),
      });
    });
  }

  function remove(item: LegalNews) {
    if (
      !window.confirm(
        t(
          'Delete this legal news article?',
          'هل تريد حذف هذا الخبر القانوني؟'
        )
      )
    ) {
      return;
    }

    void run(async () => {
      await request(
        `/${item.id}`,
        { method: 'DELETE' }
      );

      setNews((current) =>
        current.filter(
          (entry) => entry.id !== item.id
        )
      );

      if (form?.id === item.id) {
        setForm(null);
      }

      if (preview?.id === item.id) {
        setPreview(null);
      }

      setFeedback({
        text: t(
          'Article deleted.',
          'تم حذف الخبر.'
        ),
      });
    });
  }

  const ordered = [...news].sort(
    (a, b) =>
      (sort === 'oldest' ? 1 : -1) *
      (
        a.date.localeCompare(b.date) ||
        a.createdAt - b.createdAt ||
        a.id.localeCompare(b.id)
      )
  );

  return (
    <div
      className="space-y-6"
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* Create / Edit */}
      <section className={panel}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#160A0A] md:text-3xl">
            {form?.id
              ? t('Edit News Article', 'تعديل الخبر')
              : t('Create News Article', 'إضافة خبر جديد')}
          </h2>

          <button
            className={form ? button : primary}
            type="button"
            disabled={disabled}
            onClick={() =>
              showForm(
                form ? null : emptyArticle()
              )
            }
          >
            {form?.id
              ? t('Cancel', 'إلغاء')
              : form
                ? t('Close', 'إغلاق')
                : t(
                    'Open Create News Form',
                    'فتح نموذج إنشاء الخبر'
                  )}
          </button>
        </div>

        {feedback && (
          <p
            role={
              feedback.error
                ? 'alert'
                : 'status'
            }
            className={`mb-4 text-sm ${
              feedback.error
                ? 'text-red-600'
                : 'text-emerald-600'
            }`}
          >
            {feedback.text}
          </p>
        )}

        {form ? (
          <form
            onSubmit={save}
            className="space-y-4"
            key={form.id || 'new'}
          >
            <fieldset
              disabled={disabled}
              className="space-y-4"
            >
              {/* Titles */}
              {(['title', 'titleAr'] as const).map(
                (key) => (
                  <input
                    key={key}
                    type="text"
                    className={input}
                    dir={
                      key === 'titleAr'
                        ? 'rtl'
                        : 'ltr'
                    }
                    aria-label={labels[key]}
                    placeholder={labels[key]}
                    required={
                      key === 'title'
                    }
                    maxLength={250}
                    value={form[key]}
                    onChange={(event) =>
                      update(
                        key,
                        event.target.value
                      )
                    }
                  />
                )
              )}

              {/* Date and images */}
              <div className="grid gap-4 md:grid-cols-3">
                <label className="block text-xs font-semibold text-slate-600">
                  {t(
                    'Publication date',
                    'تاريخ النشر'
                  )}

                  <input
                    className={input}
                    type="date"
                    required
                    value={form.date}
                    onChange={(event) =>
                      update(
                        'date',
                        event.target.value
                      )
                    }
                  />
                </label>

                {newsImageFields.map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-slate-600">
                      <span className="mb-1 block">
                        {labels[key]}
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className={fileInput}
                        onChange={(event) => {
                          const file =
                            event.target.files?.[0];

                          event.target.value = '';

                          if (file) {
                            void uploadImage(
                              key,
                              file
                            );
                          }
                        }}
                      />
                    </label>

                    {upload === key && (
                      <p
                        role="status"
                        className="mt-1 text-xs text-slate-600"
                      >
                        {t(
                          'Uploading…',
                          'جارٍ الرفع…'
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Image previews and removal */}
              {newsImageFields.some(
                (key) => form[key]
              ) && (
                <div className="flex flex-wrap gap-4">
                  {newsImageFields
                    .filter((key) => form[key])
                    .map((key) => (
                      <div
                        key={key}
                        className="w-fit rounded-xl border border-[#CECDCB] p-2"
                      >
                        <p className="mb-1 text-xs text-slate-500">
                          {labels[key]}
                        </p>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form[key]}
                          alt={labels[key]}
                          className={`h-[140px] rounded-lg object-cover ${
                            key.startsWith('banner')
                              ? 'w-[260px]'
                              : 'w-[220px]'
                          }`}
                        />

                        <button
                          type="button"
                          className={
                            danger + ' mt-2'
                          }
                          onClick={() =>
                            update(key, '')
                          }
                        >
                          {t(
                            'Remove Image',
                            'إزالة الصورة'
                          )}
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* Bilingual descriptions and content */}
              {(
                [
                  'shortDescription',
                  'shortDescriptionAr',
                  'content',
                  'contentAr',
                ] as const
              ).map((key) => (
                <BoldTextField
                  key={key}
                  label={labels[key]}
                  placeholder={labels[key]}
                  value={form[key]}
                  dir={
                    key.endsWith('Ar')
                      ? 'rtl'
                      : undefined
                  }
                  rows={
                    key.startsWith('content')
                      ? 14
                      : 3
                  }
                  onChange={(value) =>
                    update(key, value)
                  }
                />
              ))}

              {/* Publishing status */}
              <label className="block max-w-xs space-y-1 text-sm font-medium">
                {t('Status', 'الحالة')}

                <select
                  className={input}
                  value={form.status}
                  onChange={(event) =>
                    update(
                      'status',
                      event.target.value ===
                        'published'
                        ? 'published'
                        : 'draft'
                    )
                  }
                >
                  <option value="draft">
                    {t('Draft', 'مسودة')}
                  </option>

                  <option value="published">
                    {t('Published', 'منشور')}
                  </option>
                </select>
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  className={primary}
                  type="submit"
                >
                  {form.status === 'draft'
                    ? t(
                        'Save Draft',
                        'حفظ المسودة'
                      )
                    : t(
                        'Save and Publish',
                        'الحفظ والنشر'
                      )}
                </button>

                <button
                  className={button}
                  type="button"
                  onClick={() =>
                    setPreview({
                      ...form,
                    })
                  }
                >
                  {t('Preview', 'معاينة')}
                </button>

                <button
                  className={button}
                  type="button"
                  onClick={() =>
                    showForm(null)
                  }
                >
                  {t('Cancel', 'إلغاء')}
                </button>
              </div>
            </fieldset>
          </form>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CECDCB] bg-[#F8F7F7] p-6">
            <button
              className={primary}
              type="button"
              disabled={disabled}
              onClick={() =>
                showForm(emptyArticle())
              }
            >
              {t(
                'Open Form',
                'فتح النموذج'
              )}
            </button>
          </div>
        )}
      </section>

      {/* Article Preview */}
      {preview && (
        <section
          className={panel}
          aria-label={t(
            'Article preview',
            'معاينة الخبر'
          )}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="font-semibold">
              {t(
                'Article Preview',
                'معاينة الخبر'
              )}
            </h3>

            <select
              className={button}
              value={previewLang}
              onChange={(event) =>
                setPreviewLang(
                  event.target.value === 'ar'
                    ? 'ar'
                    : 'en'
                )
              }
              aria-label={t(
                'Preview language',
                'لغة المعاينة'
              )}
            >
              <option value="en">
                English
              </option>
              <option value="ar">
                العربية
              </option>
            </select>

            <button
              className={button}
              type="button"
              onClick={() =>
                setPreview(null)
              }
            >
              {t(
                'Close Preview',
                'إغلاق المعاينة'
              )}
            </button>
          </div>

          <div className="max-h-[650px] overflow-y-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-4">
            <div className="mx-auto w-full max-w-3xl">
              <NewsArticle
                news={preview}
                lang={previewLang}
              />
            </div>
          </div>
        </section>
      )}

      {/* News List */}
      <section className={panel}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-[#160A0A]">
            {t(
              'Drafts and Published News',
              'المسودات والأخبار المنشورة'
            )}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className={sortSelect}
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              aria-label={t(
                'Sort news',
                'ترتيب الأخبار'
              )}
            >
              <option value="newest">
                {t(
                  'Newest First',
                  'الأحدث أولاً'
                )}
              </option>

              <option value="oldest">
                {t(
                  'Oldest First',
                  'الأقدم أولاً'
                )}
              </option>
            </select>

            <button
              type="button"
              className={button}
              disabled={disabled}
              onClick={() => {
                setFeedback(null);
                void load();
              }}
            >
              {t(
                'Refresh News List',
                'تحديث قائمة الأخبار'
              )}
            </button>

            <Link
              href={`/${locale}/legal-news`}
              className="text-sm font-semibold text-[#DE3B34] hover:text-[#9B0F09]"
            >
              {t(
                'View News Page',
                'عرض صفحة الأخبار'
              )}
            </Link>
          </div>
        </div>

        {loading ? (
          <p
            role="status"
            className="text-sm"
          >
            {t(
              'Loading…',
              'جارٍ التحميل…'
            )}
          </p>
        ) : !ordered.length &&
          !feedback?.error ? (
          <p className="text-sm text-slate-600">
            {t(
              'No news yet.',
              'لا توجد أخبار بعد.'
            )}
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {ordered.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-[#CECDCB] p-4"
            >
              <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  {
                    label: t(
                      'Banner',
                      'بانر'
                    ),
                    url:
                      (ar &&
                        item.bannerImageAr) ||
                      item.bannerImage,
                  },
                  {
                    label: t(
                      'Card',
                      'البطاقة'
                    ),
                    url:
                      getBlogLocalizedImage(
                        item,
                        locale
                      ),
                  },
                ].map(
                  ({ label, url }) => (
                    <div
                      key={label}
                      className="overflow-hidden rounded-lg border border-[#CECDCB]"
                    >
                      <p className="bg-[#F1EFF0] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        {label}
                      </p>

                      {url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={url}
                          alt={label}
                          className="h-28 w-full object-cover"
                        />
                      ) : (
                        <p className="px-2 py-1 text-xs text-slate-600">
                          {t(
                            'No image',
                            'لا توجد صورة'
                          )}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>

              <p className="mb-1 text-xs text-slate-500">
                {item.date}
                {' · '}
                {item.status === 'draft'
                  ? t('Draft', 'مسودة')
                  : t(
                      'Published',
                      'منشور'
                    )}
              </p>

              <h4 className="mb-2 line-clamp-2 text-lg font-semibold text-[#160A0A]">
                {getBlogLocalizedField(
                  item,
                  'title',
                  locale
                )}
              </h4>

              <div className="line-clamp-2 text-sm text-slate-600">
                <FormattedText
                  compact
                  text={getBlogLocalizedField(
                    item,
                    'shortDescription',
                    locale
                  )}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  className={button}
                  disabled={disabled}
                  type="button"
                  onClick={() =>
                    showForm(item)
                  }
                >
                  {t('Edit', 'تعديل')}
                </button>

                <button
                  className={button}
                  type="button"
                  onClick={() =>
                    setPreview(item)
                  }
                >
                  {t('Preview', 'معاينة')}
                </button>

                <button
                  className={button}
                  disabled={disabled}
                  type="button"
                  onClick={() =>
                    void toggleStatus(item)
                  }
                >
                  {item.status === 'published'
                    ? t(
                        'Unpublish',
                        'إلغاء النشر'
                      )
                    : t(
                        'Publish',
                        'نشر'
                      )}
                </button>

                <button
                  className={danger}
                  disabled={disabled}
                  type="button"
                  onClick={() =>
                    remove(item)
                  }
                >
                  {t(
                    'Delete',
                    'حذف'
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
