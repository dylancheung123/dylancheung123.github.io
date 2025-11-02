/**
 * Windows File Manager-style UI component
 * Recreates the classic Windows File Manager interface
 */

import { FileSystemNode, FileManagerCallbacks } from './components/types';
import { TitleBar } from './components/TitleBar';
import { MenuBar } from './components/MenuBar';
import { Toolbar } from './components/Toolbar';
import { DriveBar } from './components/DriveBar';
import { MainArea } from './components/MainArea';
import { StatusBar } from './components/StatusBar';
import { ContentViewer } from './components/ContentViewer';

export class FileManager {
  private container: HTMLElement;
  private currentPath: string = 'C:\\';
  private fileSystem: Map<string, FileSystemNode> = new Map();
  private selectedNode: FileSystemNode | null = null;
  private titleBar!: TitleBar;
  private mainArea!: MainArea;
  private statusBar!: StatusBar;
  private contentViewer: ContentViewer;
  private callbacks!: FileManagerCallbacks;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
    this.contentViewer = new ContentViewer(this.container);
    
    this.initializeFileSystem();
    this.setupCallbacks();
    this.render();
  }

  private setupCallbacks(): void {
    this.callbacks = {
      onNavigateUp: () => this.navigateUp(),
      onRefresh: () => this.refresh(),
      onOpenSelected: () => this.openSelected(),
      onNodeSelect: (node: FileSystemNode) => {
        this.selectedNode = node;
      },
      onNodeClick: (node: FileSystemNode) => {
        if (node.type === 'file' && node.content) {
          this.loadContent(node.content);
        } else if (node.type === 'directory') {
          this.currentPath = node.path;
          this.mainArea.updateListView(node.path);
          this.titleBar.updatePath(node.path);
        }
      },
      onLoadContent: (pageId: string) => this.loadContent(pageId),
      onExpandTree: () => this.expandTree(),
      onExpandBranch: () => this.expandBranch(),
      onExpandAll: () => this.expandAll(),
      onCollapseBranch: () => this.collapseBranch(),
      onUpdateListView: (path: string) => {
        this.mainArea.updateListView(path);
        this.titleBar.updatePath(path);
      }
    };
  }

  private initializeFileSystem(): void {
    // Create a virtual file system structure
    const root: FileSystemNode = {
      name: 'C:',
      type: 'directory',
      path: 'C:\\',
      children: [
        {
          name: 'About',
          type: 'file',
          path: 'C:\\About.txt',
          content: 'about'
        },
        {
          name: 'Projects',
          type: 'file',
          path: 'C:\\Projects.txt',
          content: 'projects'
        },
        {
          name: 'Contact',
          type: 'file',
          path: 'C:\\Contact.txt',
          content: 'contact'
        },
        {
          name: 'Documents',
          type: 'directory',
          path: 'C:\\Documents\\',
          children: []
        },
        {
          name: 'Desktop',
          type: 'directory',
          path: 'C:\\Desktop\\',
          children: []
        }
      ]
    };

    // Build file system map
    const buildMap = (node: FileSystemNode) => {
      this.fileSystem.set(node.path, node);
      if (node.children) {
        node.children.forEach(child => buildMap(child));
      }
    };
    buildMap(root);
  }

  private render(): void {
    this.container.innerHTML = '';
    this.container.className = 'file-manager';

    // Create main window structure
    const windowFrame = document.createElement('div');
    windowFrame.className = 'fm-window-frame';
    
    // Title bar
    this.titleBar = new TitleBar(this.currentPath);
    windowFrame.appendChild(this.titleBar.render());

    // Menu bar
    const menuBar = new MenuBar(this.callbacks);
    windowFrame.appendChild(menuBar.render());

    // Toolbar
    const toolbar = new Toolbar(this.callbacks);
    windowFrame.appendChild(toolbar.render());

    // Drive bar
    const driveBar = new DriveBar();
    windowFrame.appendChild(driveBar.render());

    // Main content area (split panes)
    this.mainArea = new MainArea(this.fileSystem, this.callbacks, this.currentPath);
    windowFrame.appendChild(this.mainArea.render());

    // Status bar
    this.statusBar = new StatusBar();
    windowFrame.appendChild(this.statusBar.render());
    this.updateStatusBar();

    this.container.appendChild(windowFrame);
  }

  private navigateUp(): void {
    if (this.currentPath !== 'C:\\') {
      const parts = this.currentPath.split('\\').filter(p => p);
      parts.pop();
      this.currentPath = parts.length > 0 ? parts.join('\\') + '\\' : 'C:\\';
      this.mainArea.updateListView(this.currentPath);
      this.titleBar.updatePath(this.currentPath);
    }
  }

  private refresh(): void {
    this.mainArea.updateListView(this.currentPath);
  }

  public async loadContent(pageId: string): Promise<void> {
    try {
      // Try to fetch markdown content
      const response = await fetch(`./content/${pageId}.md`);
      if (response.ok) {
        const content = await response.text();
        this.contentViewer.show(content, pageId);
      } else {
        // Fallback: show placeholder content
        const fallbackContent = this.getFallbackContent(pageId);
        this.contentViewer.show(fallbackContent, pageId);
      }
    } catch (error) {
      // Fallback: show placeholder content
      const fallbackContent = this.getFallbackContent(pageId);
      this.contentViewer.show(fallbackContent, pageId);
    }
  }

  private getFallbackContent(pageId: string): string {
    const content: Record<string, string> = {
      'about': `# About Me\n\n## Hello, I'm Dylan Cheung\n\nI'm a passionate developer who loves creating immersive digital experiences.`,
      'projects': `# Projects\n\n## My Projects\n\nFrom web applications to mobile apps, I've worked on various projects.`,
      'contact': `# Contact\n\n## Get In Touch\n\nI'm always interested in new opportunities and collaborations.`
    };
    return content[pageId] || `# ${pageId}\n\nContent not found.`;
  }

  private openSelected(): void {
    if (this.selectedNode && this.selectedNode.type === 'file' && this.selectedNode.content) {
      this.loadContent(this.selectedNode.content);
    }
  }

  private expandTree(): void {
    // Expand first level of tree
    document.querySelectorAll('.fm-tree-item').forEach(item => {
      const expandIcon = item.querySelector('.fm-expand-icon') as HTMLElement;
      const children = item.querySelector('.fm-tree-children') as HTMLElement;
      if (expandIcon && children && !item.classList.contains('expanded')) {
        expandIcon.click();
      }
    });
  }

  private expandBranch(): void {
    // Expand selected branch
    if (this.selectedNode) {
      // Implementation would expand the branch containing selectedNode
      this.expandTree();
    }
  }

  private expandAll(): void {
    // Recursively expand all branches
    const expandRecursive = (item: Element) => {
      const expandIcon = item.querySelector('.fm-expand-icon') as HTMLElement;
      const children = item.querySelector('.fm-tree-children') as HTMLElement;
      if (expandIcon && children) {
        if (!item.classList.contains('expanded')) {
          expandIcon.click();
        }
        children.querySelectorAll('.fm-tree-item').forEach(child => expandRecursive(child));
      }
    };
    document.querySelectorAll('.fm-tree-item').forEach(item => expandRecursive(item));
  }

  private collapseBranch(): void {
    // Collapse all branches
    document.querySelectorAll('.fm-tree-item.expanded').forEach(item => {
      const expandIcon = item.querySelector('.fm-expand-icon') as HTMLElement;
      if (expandIcon) {
        expandIcon.click();
      }
    });
  }

  private updateStatusBar(): void {
    const currentDir = this.fileSystem.get(this.currentPath);
    const fileCount = currentDir && currentDir.children ? currentDir.children.length : 0;
    this.statusBar.updateFileCount(fileCount);
  }
}
