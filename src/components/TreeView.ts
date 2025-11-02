import { FileSystemNode, FileManagerCallbacks } from './types';

export class TreeView {
  private fileSystem: Map<string, FileSystemNode>;
  private callbacks: FileManagerCallbacks;

  constructor(fileSystem: Map<string, FileSystemNode>, callbacks: FileManagerCallbacks) {
    this.fileSystem = fileSystem;
    this.callbacks = callbacks;
  }

  public render(): HTMLElement {
    const treeView = document.createElement('div');
    treeView.className = 'fm-tree-view';

    const rootNode = this.fileSystem.get('C:\\');
    if (rootNode) {
      const treeItem = this.createTreeNode(rootNode);
      treeView.appendChild(treeItem);
    }

    return treeView;
  }

  private createTreeNode(node: FileSystemNode, level: number = 0): HTMLElement {
    const treeItem = document.createElement('div');
    treeItem.className = 'fm-tree-item';
    treeItem.style.paddingLeft = `${level * 16}px`;

    const icon = document.createElement('span');
    icon.className = 'fm-tree-icon';
    icon.textContent = node.type === 'directory' ? '📁' : '📄';
    treeItem.appendChild(icon);

    const label = document.createElement('span');
    label.className = 'fm-tree-label';
    label.textContent = node.name;
    label.onclick = () => {
      this.callbacks.onNodeSelect(node);
      this.callbacks.onUpdateListView(node.path);
      const pathTitle = document.querySelector('.fm-list-pane .fm-pane-title');
      if (pathTitle) {
        pathTitle.textContent = node.path;
      }
    };
    treeItem.appendChild(label);

    // Add children if directory
    if (node.type === 'directory' && node.children && node.children.length > 0) {
      const expandIcon = document.createElement('span');
      expandIcon.className = 'fm-expand-icon';
      expandIcon.textContent = '+';
      
      const childrenContainer = document.createElement('div');
      childrenContainer.className = 'fm-tree-children';
      childrenContainer.style.display = 'none';
      
      node.children.forEach(child => {
        const childItem = this.createTreeNode(child, level + 1);
        childrenContainer.appendChild(childItem);
      });

      expandIcon.onclick = (e) => {
        e.stopPropagation();
        const expanded = treeItem.classList.toggle('expanded');
        expandIcon.textContent = expanded ? '-' : '+';
        childrenContainer.style.display = expanded ? 'block' : 'none';
      };

      treeItem.insertBefore(expandIcon, icon);
      treeItem.appendChild(childrenContainer);
    }

    return treeItem;
  }
}

