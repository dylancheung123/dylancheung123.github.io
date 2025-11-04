import React from 'react';

export const calculateCareerLength = (startDate: Date): number => {
  const now = new Date();
  const yearsWithDecimal = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const fractionalPart = yearsWithDecimal % 1;
  // Round to nearest whole year, but at 6th month mark (0.5), round up
  return fractionalPart >= 0.5 ? Math.ceil(yearsWithDecimal) : Math.round(yearsWithDecimal);
};

export const parseTextWithLinks = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let key = 0;
  let lastIndex = 0;

  // First, find all markdown-style links [text](url) and regular URLs/emails
  const allMatches: Array<{
    index: number;
    length: number;
    type: 'markdown' | 'url' | 'email' | 'route';
    linkText?: string;
    url: string;
  }> = [];

  // Find markdown-style links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const url = match[2];
    const linkText = match[1];
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'markdown',
      linkText: linkText,
      url: url
    });
  }

  // Find standalone URLs, emails, and hash routes (but not inside markdown links)
  const urlRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(#\/[^\s]+)/g;
  while ((match = urlRegex.exec(text)) !== null) {
    // Check if this match is inside a markdown link
    const matchIndex = match.index;
    const isInsideMarkdown = allMatches.some(m => 
      m.type === 'markdown' && matchIndex >= m.index && matchIndex < m.index + m.length
    );
    if (isInsideMarkdown) continue;

    const url = match[1] || match[2] || match[3];
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: match[2] ? 'email' : match[3] ? 'route' : 'url',
      url: url
    });
  }

  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);

  // Build the parts array
  allMatches.forEach(match => {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link
    let linkText: string;
    let href: string;
    let isEmail: boolean;
    let isHashRoute: boolean;

    if (match.type === 'markdown') {
      linkText = match.linkText || match.url;
      const url = match.url;
      isEmail = url.includes('@');
      isHashRoute = url.startsWith('#/');
      href = isEmail ? `mailto:${url}` : url;
    } else {
      linkText = match.type === 'route' ? match.url.replace('#/', '') : match.url;
      isEmail = match.type === 'email';
      isHashRoute = match.type === 'route' || match.url.startsWith('#/');
      href = isEmail ? `mailto:${match.url}` : match.url;
    }

    parts.push(
      React.createElement(
        'a',
        {
          key: key++,
          href: href,
          target: (isEmail || isHashRoute) ? undefined : '_blank',
          rel: (isEmail || isHashRoute) ? undefined : 'noopener noreferrer',
          className: "text-blue-600 hover:text-blue-800 underline",
          onClick: (e: React.MouseEvent) => e.stopPropagation()
        },
        linkText
      )
    );

    lastIndex = match.index + match.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

