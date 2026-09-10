'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  dir?: 'ltr' | 'rtl';
  label?: string;
  className?: string;
};

const btnBase =
  'inline-flex h-8 items-center justify-center rounded-md border px-2.5 text-xs font-semibold transition-colors disabled:opacity-40';
const btnDefault = `${btnBase} border-[#d4d4d4] bg-[#f3f3f3] text-[#222] hover:bg-white`;
const btnActive = `${btnBase} border-[#DE3B34] bg-[#DE3B34] text-white`;
const btnBlue = `${btnBase} min-w-8 border-[#3b82f6] bg-[#3b82f6] text-white hover:bg-[#2563eb]`;
const btnGreen = `${btnBase} border-[#22c55e] bg-[#22c55e] text-white hover:bg-[#16a34a]`;
const btnPurple = `${btnBase} border-[#c084fc] bg-[#d8b4fe] text-[#4c1d95] hover:bg-[#c084fc]`;
const btnTable = `${btnBase} border-[#94a3b8] bg-white text-[#0f172a] hover:bg-[#f8fafc]`;

const looksLikeHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value.trim());

const toEditorHtml = (value: string) => {
  if (!value?.trim()) return '';
  if (looksLikeHtml(value)) return value;
  return marked.parse(value, { async: false, breaks: true }) as string;
};

const sanitizeHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'target', 'rel'],
  });

const emptyParagraph = '<p></p>';

export default function RichTextField({
  value,
  onChange,
  placeholder = 'Start writing...',
  rows = 8,
  dir,
  label,
  className = '',
}: RichTextFieldProps) {
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const minHeight = Math.max(140, rows * 22);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'text-[#DE3B34] underline font-semibold',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-sm max-w-full h-auto my-3',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'rounded-lg overflow-hidden my-4 w-full aspect-video',
        },
      }),
      Placeholder.configure({ placeholder }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'blog-editor-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    [placeholder]
  );

  const editor = useEditor({
    extensions,
    content: toEditorHtml(value) || emptyParagraph,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `blog-rich-editor focus:outline-none px-4 py-3 text-[15px] leading-7 text-slate-900 ${className}`,
        dir: dir || 'ltr',
        style: `min-height:${minHeight}px`,
      },
    },
    onUpdate: ({ editor: current }) => {
      const html = current.getHTML();
      onChange(html === emptyParagraph ? '' : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const incoming = toEditorHtml(value) || emptyParagraph;
    const current = editor.getHTML();
    if (incoming === current) return;
    // Avoid resetting while user is typing the same logical content.
    if (editor.isFocused) return;
    editor.commands.setContent(incoming, { emitUpdate: false });
  }, [editor, value]);

  const toolClass = useCallback(
    (active?: boolean) => (active ? btnActive : btnDefault),
    []
  );

  if (!editor) {
    return (
      <div className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-6 text-sm text-slate-500">
        Loading editor...
      </div>
    );
  }

  const inTable = editor.isActive('table');

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: Math.max(2, Math.min(10, tableRows)),
        cols: Math.max(2, Math.min(8, tableCols)),
        withHeaderRow: true,
      })
      .run();
    setShowTablePicker(false);
  };

  return (
    <div className="w-full">
      {label ? <p className="mb-2 text-xs font-semibold text-slate-600">{label}</p> : null}

      <div className="overflow-hidden rounded-xl border border-[#CECDCB] bg-white">
        <div className="space-y-2 border-b border-[#ECECEC] bg-[#fafafa] p-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" className={toolClass(editor.isActive('bold'))} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
              <span className="font-extrabold">B</span>
            </button>
            <button type="button" className={toolClass(editor.isActive('italic'))} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
              <span className="italic">I</span>
            </button>
            <button type="button" className={toolClass(editor.isActive('strike'))} title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}>
              <span className="line-through">S</span>
            </button>
            <button type="button" className={toolClass(editor.isActive('heading', { level: 1 }))} title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              H1
            </button>
            <button type="button" className={toolClass(editor.isActive('heading', { level: 2 }))} title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              H2
            </button>
            <button type="button" className={toolClass(editor.isActive('heading', { level: 3 }))} title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              H3
            </button>
            <button type="button" className={toolClass(editor.isActive('bulletList'))} title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
              • List
            </button>
            <button type="button" className={toolClass(editor.isActive('orderedList'))} title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              1. List
            </button>
            <button type="button" className={btnDefault} title="Undo" onClick={() => editor.chain().focus().undo().run()}>
              ←
            </button>
            <button type="button" className={btnBlue} title="Redo" onClick={() => editor.chain().focus().redo().run()}>
              →
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" className={btnDefault} title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              ↔
            </button>
            <button
              type="button"
              className={btnGreen}
              title="Image"
              onClick={() => {
                const url = window.prompt('Image URL');
                if (!url?.trim()) return;
                editor.chain().focus().setImage({ src: url.trim() }).run();
              }}
            >
              🖼 Image
            </button>
            <button
              type="button"
              className={btnPurple}
              title="Video"
              onClick={() => {
                const url = window.prompt('YouTube or Vimeo URL');
                if (!url?.trim()) return;
                editor.commands.setYoutubeVideo({ src: url.trim() });
              }}
            >
              🎥 Video
            </button>
            <button
              type="button"
              className={toolClass(editor.isActive('link'))}
              title="Link"
              onClick={() => {
                if (editor.isActive('link')) {
                  editor.chain().focus().unsetLink().run();
                  return;
                }
                const url = window.prompt('Link URL');
                if (!url?.trim()) return;
                editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
              }}
            >
              🔗 Link
            </button>
            <button type="button" className={toolClass(editor.isActive('blockquote'))} title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              ▬
            </button>

            <div className="relative">
              <button
                type="button"
                className={inTable ? btnActive : btnDefault}
                title="Insert table"
                onClick={() => setShowTablePicker((open) => !open)}
              >
                ▦ Table
              </button>
              {showTablePicker ? (
                <div className="absolute left-0 z-20 mt-2 w-64 rounded-xl border border-[#CECDCB] bg-white p-3 shadow-xl">
                  <p className="mb-2 text-xs font-semibold text-slate-700">Insert table</p>
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <label className="text-[11px] text-slate-500">
                      Rows
                      <input
                        type="number"
                        min={2}
                        max={10}
                        value={tableRows}
                        onChange={(event) => setTableRows(Number(event.target.value) || 2)}
                        className="mt-1 w-full rounded-lg border border-[#CECDCB] px-2 py-1.5 text-sm"
                      />
                    </label>
                    <label className="text-[11px] text-slate-500">
                      Columns
                      <input
                        type="number"
                        min={2}
                        max={8}
                        value={tableCols}
                        onChange={(event) => setTableCols(Number(event.target.value) || 2)}
                        className="mt-1 w-full rounded-lg border border-[#CECDCB] px-2 py-1.5 text-sm"
                      />
                    </label>
                  </div>
                  <div className="mb-3 grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(tableCols, 8)}, minmax(0, 1fr))` }}>
                    {Array.from({ length: Math.min(tableRows, 10) * Math.min(tableCols, 8) }).map((_, index) => (
                      <div key={index} className="h-4 rounded-sm border border-[#DE3B34]/40 bg-[#fff5f4]" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className={`${btnDefault} flex-1`} onClick={() => setShowTablePicker(false)}>
                      Cancel
                    </button>
                    <button type="button" className={`${btnActive} flex-1`} onClick={insertTable}>
                      Insert
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {inTable ? (
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-2">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Table tools</span>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().addColumnBefore().run()}>+ Col left</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col right</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().deleteColumn().run()}>Del col</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().addRowBefore().run()}>+ Row above</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row below</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().deleteRow().run()}>Del row</button>
              <button type="button" className={btnTable} onClick={() => editor.chain().focus().toggleHeaderRow().run()}>Header row</button>
              <button type="button" className={`${btnTable} text-red-600`} onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
            </div>
          ) : null}
        </div>

        <EditorContent editor={editor} />
      </div>
      <p className="mt-1.5 text-[11px] text-slate-500">
        Tip: click inside a table to show row/column controls. Drag column edges to resize.
      </p>
    </div>
  );
}

const toEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
    }

    if (host.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
      const parts = parsed.pathname.split('/');
      const embedIndex = parts.indexOf('embed');
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        return `https://www.youtube.com/embed/${parts[embedIndex + 1]}`;
      }
    }

    if (host.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }

  return null;
};

/** Renders HTML (from the new editor) or markdown (legacy posts). */
export function FormattedText({
  text,
  className,
  compact = false,
}: {
  text: string;
  className?: string;
  compact?: boolean;
}) {
  if (!text) return null;

  if (looksLikeHtml(text)) {
    return (
      <div
        className={`blog-html-content ${compact ? 'blog-html-compact' : ''} ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
      />
    );
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className={`font-bold text-[#160A0A] ${compact ? 'mb-2 text-xl' : 'mb-4 text-3xl'}`}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={`font-bold text-[#160A0A] ${compact ? 'mb-2 text-lg' : 'mb-3 text-2xl'}`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`font-semibold text-[#160A0A] ${compact ? 'mb-1 text-base' : 'mb-2 text-xl'}`}>{children}</h3>
          ),
          p: ({ children }) => <p className={`${compact ? 'mb-2' : 'mb-4'} leading-[1.8] text-inherit`}>{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-inherit">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          del: ({ children }) => <del className="line-through opacity-80">{children}</del>,
          ul: ({ children }) => <ul className={`${compact ? 'mb-2' : 'mb-4'} list-disc space-y-1 pl-5`}>{children}</ul>,
          ol: ({ children }) => <ol className={`${compact ? 'mb-2' : 'mb-4'} list-decimal space-y-1 pl-5`}>{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-s-4 border-[#B38D42] bg-[#B38D42]/8 px-4 py-3 text-[#160A0A]/85">{children}</blockquote>
          ),
          hr: () => <hr className="my-6 border-[#e5e5e5]" />,
          a: ({ href, children }) => {
            const embed = href ? toEmbedUrl(href) : null;
            if (embed && !compact) {
              return (
                <div className="my-5 aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <iframe
                    src={embed}
                    title="Embedded video"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#B38D42] underline underline-offset-2 transition-colors hover:text-[#9A7635]">
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src || ''}
              alt={alt || ''}
              className={`${compact ? 'my-2 max-h-40' : 'my-5'} h-auto w-full max-w-full rounded-sm object-cover`}
              loading="lazy"
            />
          ),
          table: ({ children }) => (
            <div className="my-5 w-full overflow-x-auto">
              <table className="min-w-full border-collapse border border-[#e5e5e5] text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-[#f7f4f2]">{children}</thead>,
          th: ({ children }) => <th className="border border-[#e5e5e5] px-3 py-2 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-[#e5e5e5] px-3 py-2 align-top">{children}</td>,
          code: ({ children }) => (
            <code className="rounded bg-[#f1efef] px-1.5 py-0.5 text-[0.9em] text-[#160A0A]">{children}</code>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export { RichTextField as BoldTextField };
