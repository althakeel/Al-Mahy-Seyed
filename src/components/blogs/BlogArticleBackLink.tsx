import Link from 'next/link';

interface BlogArticleBackLinkProps {
  href: string;
  label: string;
  isRTL: boolean;
}

export default function BlogArticleBackLink({ href, label, isRTL }: BlogArticleBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#B38D42] transition-colors hover:text-[#9A7635]"
    >
      <span className="text-base leading-none">{isRTL ? '→' : '←'}</span>
      {label}
    </Link>
  );
}
