import { ToolbarButton, FileManagerCallbacks } from './types';

export class Toolbar {
  private callbacks: FileManagerCallbacks;

  constructor(callbacks: FileManagerCallbacks) {
    this.callbacks = callbacks;
  }

  public render(): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'fm-toolbar';
    
    const buttons = this.getButtons();
    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.className = 'fm-toolbar-button';
      button.innerHTML = btn.icon;
      button.title = btn.tooltip;
      button.onclick = btn.action;
      toolbar.appendChild(button);
    });

    return toolbar;
  }

  private getButtons(): ToolbarButton[] {
    return [
      { icon: '📁', tooltip: 'Up one level', action: () => this.callbacks.onNavigateUp() },
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
      { icon: '🔄', tooltip: 'Refresh', action: () => this.callbacks.onRefresh() }
    ];
  }
}

