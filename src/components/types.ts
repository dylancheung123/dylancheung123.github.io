/**
 * Shared types and interfaces for File Manager components
 */

export interface FileSystemNode {
  name: string;
  type: 'directory' | 'file';
  path: string;
  children?: FileSystemNode[];
  content?: string;
}

export interface MenuItem {
  label: string;
  action: (() => void) | null;
}

export interface Menu {
  name: string;
  items: MenuItem[];
}

export interface ToolbarButton {
  icon: string;
  tooltip: string;
  action: () => void;
}

export interface FileManagerCallbacks {
  onNavigateUp: () => void;
  onRefresh: () => void;
  onOpenSelected: () => void;
  onNodeSelect: (node: FileSystemNode) => void;
  onNodeClick: (node: FileSystemNode) => void;
  onLoadContent: (pageId: string) => void;
  onExpandTree: () => void;
  onExpandBranch: () => void;
  onExpandAll: () => void;
  onCollapseBranch: () => void;
  onUpdateListView: (path: string) => void;
}

