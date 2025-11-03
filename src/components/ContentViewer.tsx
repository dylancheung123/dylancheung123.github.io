import React from 'react';

interface ContentViewerProps {
  content: string;
  title: string;
  onClose: () => void;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({ content, title, onClose }) => {
  const markdownToHtml = (markdown: string): string => {
    let html = markdown;
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/\n/g, '<br>');
    return html;
  };

  return (
    <div className="fm-content-viewer">
      <div className="fm-viewer-title">{title.charAt(0).toUpperCase() + title.slice(1)}</div>
      <button className="fm-viewer-close" onClick={onClose}>×</button>
      <div className="fm-viewer-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
    </div>
  );
};

