import React from 'react';
import { FileSystemNode, FileManagerCallbacks } from './types';
import { TreeView } from './TreeView';
import { ListView } from './ListView';

interface MainAreaProps {
  fileSystem: Map<string, FileSystemNode>;
  callbacks: FileManagerCallbacks;
  currentPath: string;
}

export const MainArea: React.FC<MainAreaProps> = ({ fileSystem, callbacks, currentPath }) => {
  return (
    <div className="fm-main-area">
      <div className="fm-tree-pane">
        <div className="fm-pane-title">Tree</div>
        <TreeView fileSystem={fileSystem} callbacks={callbacks} />
      </div>
      <div className="fm-list-pane">
        <div className="fm-pane-title">{currentPath}</div>
        <ListView fileSystem={fileSystem} callbacks={callbacks} currentPath={currentPath} />
      </div>
    </div>
  );
};

