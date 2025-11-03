import React, { useState, useEffect, useMemo } from 'react';
import { FileSystemNode, FileManagerCallbacks } from './components/types';
import { TitleBar } from './components/TitleBar';
import { MenuBar } from './components/MenuBar';
import { Toolbar } from './components/Toolbar';
import { DriveBar } from './components/DriveBar';
import { MainArea } from './components/MainArea';
import { StatusBar } from './components/StatusBar';
import { ContentViewer } from './components/ContentViewer';
import { UIManager } from './UIManager';
import { pages } from './data/pages';

interface FileManagerProps {
  uiManager: UIManager;
}

export const FileManager: React.FC<FileManagerProps> = ({ uiManager }) => {
  const [currentPath, setCurrentPath] = useState<string>('C:\\');
  const [selectedNode, setSelectedNode] = useState<FileSystemNode | null>(null);
  const [viewerContent, setViewerContent] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState<string>('');

  const fileSystem = useMemo(() => {
    const fs = new Map<string, FileSystemNode>();
    
    // Build file system from shared pages data
    const root: FileSystemNode = {
      name: 'C:',
      type: 'directory',
      path: 'C:\\',
      children: pages.map(page => ({
        name: `${page.name}.md`,
        type: 'file' as const,
        path: `C:\\${page.name}.md`,
        content: page.contentId
      }))
    };

    const buildMap = (node: FileSystemNode): void => {
      fs.set(node.path, node);
      if (node.children) {
        node.children.forEach(child => buildMap(child));
      }
    };

    buildMap(root);
    return fs;
  }, []);

  const getFallbackContent = React.useCallback((pageId: string): string => {
    const content: Record<string, string> = {
      'about': `# About Me\n\n## Hello, I'm Dylan Cheung\n\nI'm a passionate developer who loves creating immersive digital experiences. With a strong foundation in modern web technologies, I enjoy building applications that combine creativity with technical expertise.\n\n## Background\n\nI specialize in full-stack development, with expertise in JavaScript, TypeScript, React, and Node.js. I'm always learning and expanding my toolkit to build better experiences.`,
      'projects': `# Projects\n\n## My Projects\n\nFrom web applications to mobile apps, I've worked on various projects that showcase my skills and creativity.\n\n### Project 1\n\nDescription of your first project. Add details about technologies used, challenges overcome, and results achieved.\n\n### Project 2\n\nDescription of your second project.\n\n### Project 3\n\nDescription of your third project.`,
      'contact': `# Contact\n\n## Get In Touch\n\nI'm always interested in new opportunities and collaborations. Reach out and let's create something amazing together!\n\n## Email\n\nyour.email@example.com\n\n## Social Links\n\n- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)\n- **GitHub**: [Your GitHub](https://github.com/yourusername)\n- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)\n\n## Location\n\nYour City, Country`
    };
    return content[pageId] || `# ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}\n\nContent not found.`;
  }, []);

  const loadContent = React.useCallback(async (pageId: string, title: string): Promise<void> => {
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
  }, [getFallbackContent]);

  const callbacks: FileManagerCallbacks = useMemo(() => ({
    onNavigateUp: () => {
      if (currentPath !== 'C:\\') {
        const parentPath = currentPath.split('\\').slice(0, -1).join('\\') || 'C:\\';
        setCurrentPath(parentPath);
      }
    },
    onRefresh: () => {
      // Refresh logic
    },
    onOpenSelected: () => {
      if (selectedNode && selectedNode.type === 'file') {
        loadContent(selectedNode.content || '', selectedNode.name);
      }
    },
    onNodeSelect: (node: FileSystemNode) => {
      setSelectedNode(node);
    },
    onNodeClick: (node: FileSystemNode) => {
      if (node.type === 'file' && node.content) {
        loadContent(node.content, node.name);
      } else if (node.type === 'directory') {
        setCurrentPath(node.path);
      }
    },
    onLoadContent: (pageId: string) => {
      loadContent(pageId, pageId);
    },
    onExpandTree: () => {},
    onExpandBranch: () => {},
    onExpandAll: () => {},
    onCollapseBranch: () => {},
    onUpdateListView: (path: string) => {
      setCurrentPath(path);
    }
  }), [currentPath, selectedNode, loadContent]);

  const closeViewer = (): void => {
    setViewerContent(null);
    setViewerTitle('');
  };

  return (
    <div className="file-manager">
      <div className="fm-window-frame">
        <TitleBar currentPath={currentPath} />
        <MenuBar callbacks={callbacks} uiManager={uiManager} />
        <Toolbar callbacks={callbacks} />
        <DriveBar />
        <MainArea
          fileSystem={fileSystem}
          callbacks={callbacks}
          currentPath={currentPath}
        />
        <StatusBar fileCount={fileSystem.get(currentPath)?.children?.length || 0} />
      </div>
      {viewerContent && (
        <ContentViewer
          content={viewerContent}
          title={viewerTitle}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

