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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gray-100 border-2 border-gray-300 flex flex-col z-[1000] shadow-2xl rounded-lg">
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white h-8 px-2 text-xs font-bold flex items-center rounded-t-lg">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
      <button className="absolute top-1 right-1 w-4 h-4 border border-gray-400 bg-gray-200 cursor-pointer text-xs font-bold hover:bg-gray-300 rounded" onClick={onClose}>×</button>
      <div className="flex-1 overflow-y-auto p-4 bg-white m-1 border border-gray-400 text-sm leading-relaxed rounded-b-lg prose max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
    </div>
  );
};

