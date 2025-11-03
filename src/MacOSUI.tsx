import React, { useState } from 'react';
import { MacOSAppBar } from './components/macOS/MacOSAppBar';
import { Application } from './components/macOS/types';
import { ContentViewer } from './components/ContentViewer';

export const MacOSUI: React.FC = () => {
  const [viewerContent, setViewerContent] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState<string>('');

  const handleAppClick = async (app: Application): Promise<void> => {
    await loadContent(app.contentId, app.name);
  };

  const loadContent = async (pageId: string, title: string): Promise<void> => {
    try {
      const response = await fetch(`./content/${pageId}.md`);
      if (response.ok) {
        const content = await response.text();
        setViewerContent(content);
        setViewerTitle(title);
      } else {
        const fallbackContent = getFallbackContent(pageId);
        setViewerContent(fallbackContent);
        setViewerTitle(title);
      }
    } catch (error) {
      const fallbackContent = getFallbackContent(pageId);
      setViewerContent(fallbackContent);
      setViewerTitle(title);
    }
  };

  const closeViewer = (): void => {
    setViewerContent(null);
    setViewerTitle('');
  };

  const getFallbackContent = (pageId: string): string => {
    const content: Record<string, string> = {
      'about': `# About Me\n\n## Hello, I'm Dylan Cheung\n\nI'm a passionate developer who loves creating immersive digital experiences. With a strong foundation in modern web technologies, I enjoy building applications that combine creativity with technical expertise.\n\n## Background\n\nI specialize in full-stack development, with expertise in JavaScript, TypeScript, React, and Node.js. I'm always learning and expanding my toolkit to build better experiences.`,
      'projects': `# Projects\n\n## My Projects\n\nFrom web applications to mobile apps, I've worked on various projects that showcase my skills and creativity.\n\n### Project 1\n\nDescription of your first project. Add details about technologies used, challenges overcome, and results achieved.\n\n### Project 2\n\nDescription of your second project.\n\n### Project 3\n\nDescription of your third project.`,
      'contact': `# Contact\n\n## Get In Touch\n\nI'm always interested in new opportunities and collaborations. Reach out and let's create something amazing together!\n\n## Email\n\nyour.email@example.com\n\n## Social Links\n\n- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)\n- **GitHub**: [Your GitHub](https://github.com/yourusername)\n- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)\n\n## Location\n\nYour City, Country`
    };
    return content[pageId] || `# ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}\n\nContent not found.`;
  };

  return (
    <>
      <MacOSAppBar
        callbacks={{
          onApplicationClick: handleAppClick
        }}
      />
      {viewerContent && (
        <ContentViewer
          content={viewerContent}
          title={viewerTitle}
          onClose={closeViewer}
        />
      )}
    </>
  );
};

