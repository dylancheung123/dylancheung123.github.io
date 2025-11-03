import React from 'react';
import { FileSystemNode, FileManagerCallbacks } from './types';

interface ListViewProps {
  fileSystem: Map<string, FileSystemNode>;
  callbacks: FileManagerCallbacks;
  currentPath: string;
}

export const ListView: React.FC<ListViewProps> = ({ fileSystem, callbacks, currentPath }) => {
  const currentDir = fileSystem.get(currentPath);
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);

  const handleClick = (node: FileSystemNode): void => {
    setSelectedPath(node.path);
    callbacks.onNodeSelect(node);
  };

  const handleDoubleClick = (node: FileSystemNode): void => {
    callbacks.onNodeClick(node);
  };

  if (!currentDir || !currentDir.children) {
    return <div className="fm-list-view"></div>;
  }

  return (
    <div className="fm-list-view">
      {currentDir.children.map(child => (
        <div
          key={child.path}
          className={`fm-list-item ${selectedPath === child.path ? 'selected' : ''}`}
          onClick={() => handleClick(child)}
          onDoubleClick={() => handleDoubleClick(child)}
        >
          <input type="checkbox" className="fm-list-checkbox" />
          <span className="fm-list-icon">{child.type === 'directory' ? '📁' : '📄'}</span>
          <span className="fm-list-name">{child.name}</span>
        </div>
      ))}
    </div>
  );
};

