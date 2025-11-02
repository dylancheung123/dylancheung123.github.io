import { FileSystemNode, FileManagerCallbacks } from './types';
import { TreeView } from './TreeView';
import { ListView } from './ListView';

export class MainArea {
  private fileSystem: Map<string, FileSystemNode>;
  private callbacks: FileManagerCallbacks;
  private currentPath: string;
  private treeView: TreeView;
  private listView: ListView;

  constructor(
    fileSystem: Map<string, FileSystemNode>,
    callbacks: FileManagerCallbacks,
    currentPath: string
  ) {
    this.fileSystem = fileSystem;
    this.callbacks = callbacks;
    this.currentPath = currentPath;
    this.treeView = new TreeView(fileSystem, callbacks);
    this.listView = new ListView(fileSystem, callbacks, currentPath);
  }

  public render(): HTMLElement {
    const mainArea = document.createElement('div');
    mainArea.className = 'fm-main-area';

    // Left pane - Tree view
    const treePane = document.createElement('div');
    treePane.className = 'fm-tree-pane';
    treePane.innerHTML = '<div class="fm-pane-title">Tree</div>';
    const treeContent = this.treeView.render();
    treePane.appendChild(treeContent);
    mainArea.appendChild(treePane);

    // Right pane - Directory/File list
    const listPane = document.createElement('div');
    listPane.className = 'fm-list-pane';
    listPane.innerHTML = `<div class="fm-pane-title">${this.currentPath}</div>`;
    const listContent = this.listView.render();
    listPane.appendChild(listContent);
    mainArea.appendChild(listPane);

    return mainArea;
  }

  public updateListView(path: string): void {
    this.currentPath = path;
    this.listView.update(path);
    const pathTitle = document.querySelector('.fm-list-pane .fm-pane-title');
    if (pathTitle) {
      pathTitle.textContent = path;
    }
  }
}

