import { FileManagerCallbacks } from './types';

export class TitleBar {
  private currentPath: string;

  constructor(currentPath: string) {
    this.currentPath = currentPath;
  }

  public render(): HTMLElement {
    const titleBar = document.createElement('div');
    titleBar.className = 'fm-title-bar';
    
    const title = document.createElement('div');
    title.className = 'fm-title-text';
    title.textContent = `File Manager - ${this.currentPath}*.*`;
    titleBar.appendChild(title);

    const controls = document.createElement('div');
    controls.className = 'fm-title-controls';
    
    ['minimize', 'maximize', 'close'].forEach(action => {
      const btn = document.createElement('button');
      btn.className = `fm-title-${action}`;
      btn.setAttribute('aria-label', action);
      if (action === 'close') {
        btn.onclick = () => alert('File Manager - Close not implemented in demo');
      }
      controls.appendChild(btn);
    });
    
    titleBar.appendChild(controls);
    return titleBar;
  }

  public updatePath(path: string): void {
    const title = document.querySelector('.fm-title-text');
    if (title) {
      title.textContent = `File Manager - ${path}*.*`;
      this.currentPath = path;
    }
  }
}

