import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SearchAiAnswerProps {
  text: string;
  isRTL: boolean;
}

/**
 * Renders AI guidance text as markdown. The API returns markdown-style strings
 * (e.g. **bold**), which were previously shown as raw plain text.
 */
export default function SearchAiAnswer({ text, isRTL }: SearchAiAnswerProps) {
  const listClass = 'mb-3 list-disc space-y-1.5 ps-5 marker:text-[#B38D42]';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`search-ai-answer text-sm leading-relaxed text-white/85 ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-white/90">{children}</em>,
          h2: ({ children }) => (
            <h3 className={`mb-2 mt-5 text-base font-bold text-[#B38D42] first:mt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className={`mb-2 mt-4 text-sm font-bold text-white first:mt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
              {children}
            </h4>
          ),
          ul: ({ children }) => <ul className={listClass}>{children}</ul>,
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1.5 ps-5 marker:text-[#B38D42]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#B38D42] underline underline-offset-2 transition-colors hover:text-[#D4B87A]"
            >
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
