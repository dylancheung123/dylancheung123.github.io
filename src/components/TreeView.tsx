import React, { useState } from 'react';
import { FileSystemNode, FileManagerCallbacks } from './types';

interface TreeViewProps {
  fileSystem: Map<string, FileSystemNode>;
  callbacks: FileManagerCallbacks;
}

interface TreeNodeProps {
  node: FileSystemNode;
  level: number;
  callbacks: FileManagerCallbacks;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, callbacks }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.type === 'directory' && node.children && node.children.length > 0;

  const handleClick = (): void => {
    callbacks.onNodeSelect(node);
    callbacks.onUpdateListView(node.path);
  };

  const handleExpand = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className="fm-tree-item" style={{ paddingLeft: `${level * 16}px` }}>
      {hasChildren && (
        <span className="fm-expand-icon" onClick={handleExpand}>
          {expanded ? '-' : '+'}
        </span>
      )}
      <span className="fm-tree-icon">{node.type === 'directory' ? '📁' : '📄'}</span>
      <span className="fm-tree-label" onClick={handleClick}>{node.name}</span>
      {hasChildren && expanded && (
        <div className="fm-tree-children" style={{ display: 'block' }}>
          {node.children!.map(child => (
            <TreeNode key={child.path} node={child} level={level + 1} callbacks={callbacks} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ fileSystem, callbacks }) => {
  const rootNode = fileSystem.get('C:\\');

  if (!rootNode) return null;

  return (
    <div className="fm-tree-view">
      <TreeNode node={rootNode} level={0} callbacks={callbacks} />
    </div>
  );
};

