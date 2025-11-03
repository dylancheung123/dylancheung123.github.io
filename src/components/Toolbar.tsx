import React from 'react';
import { FileManagerCallbacks } from './types';

interface ToolbarProps {
  callbacks: FileManagerCallbacks;
}

export const Toolbar: React.FC<ToolbarProps> = ({ callbacks }) => {
  const buttons = [
    { icon: '📁', tooltip: 'Up one level', action: () => callbacks.onNavigateUp() },
    { icon: '📂', tooltip: 'Connect Network Drive', action: () => {} },
    { icon: '📋', tooltip: 'Copy', action: () => {} },
    { icon: '✂️', tooltip: 'Move', action: () => {} },
    { icon: '🗑️', tooltip: 'Delete', action: () => {} },
    { icon: 'ℹ️', tooltip: 'Properties', action: () => {} },
    { icon: '➕', tooltip: 'Create Directory', action: () => {} },
    { icon: '🔍', tooltip: 'Search', action: () => {} },
    { icon: '📊', tooltip: 'Sort by Name', action: () => {} },
    { icon: '📊', tooltip: 'Sort by Type', action: () => {} },
    { icon: '📊', tooltip: 'Sort by Size', action: () => {} },
    { icon: '📊', tooltip: 'Sort by Date', action: () => {} },
    { icon: '📋', tooltip: 'View Details', action: () => {} },
    { icon: '📄', tooltip: 'View List', action: () => {} },
    { icon: '🔄', tooltip: 'Refresh', action: () => callbacks.onRefresh() }
  ];

  return (
    <div className="fm-toolbar">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className="fm-toolbar-button"
          title={btn.tooltip}
          onClick={btn.action}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

