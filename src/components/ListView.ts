import { FileSystemNode, FileManagerCallbacks } from './types';

export class ListView {
  private fileSystem: Map<string, FileSystemNode>;
  private callbacks: FileManagerCallbacks;
  private currentPath: string;

  constructor(
    fileSystem: Map<string, FileSystemNode>,
    callbacks: FileManagerCallbacks,
    currentPath: string
  ) {
    this.fileSystem = fileSystem;
    this.callbacks = callbacks;
    this.currentPath = currentPath;
  }

  public render(): HTMLElement {
    const listView = document.createElement('div');
    listView.className = 'fm-list-view';
    this.renderItems(listView);
    return listView;
  }

  public update(path: string): void {
    this.currentPath = path;
    const listView = document.querySelector('.fm-list-view');
    if (listView) {
      listView.innerHTML = '';
      this.renderItems(listView as HTMLElement);
    }
  }

  private renderItems(container: HTMLElement): void {
    const currentDir = this.fileSystem.get(this.currentPath);
    if (currentDir && currentDir.children) {
      currentDir.children.forEach(child => {
        const listItem = this.createListItem(child);
        container.appendChild(listItem);
      });
    }
  }

  private createListItem(child: FileSystemNode): HTMLElement {
    const listItem = document.createElement('div');
    listItem.className = 'fm-list-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'fm-list-checkbox';
    listItem.appendChild(checkbox);

    const icon = document.createElement('span');
    icon.className = 'fm-list-icon';
    icon.textContent = child.type === 'directory' ? '📁' : '📄';
    listItem.appendChild(icon);

    const name = document.createElement('span');
    name.className = 'fm-list-name';
    name.textContent = child.name;
    
    // Select on single click
    listItem.onclick = () => {
      this.callbacks.onNodeSelect(child);
      document.querySelectorAll('.fm-list-item').forEach(item => {
        item.classList.remove('selected');
      });
      listItem.classList.add('selected');
    };
    
    // Double-click to open file or navigate directory
    name.ondblclick = () => {
      this.callbacks.onNodeClick(child);
    };
    
    listItem.appendChild(name);
    return listItem;
  }
}

