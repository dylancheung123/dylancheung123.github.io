export class StatusBar {
  private fileCount: number = 0;
  private freeSpace: string = '5GB free, 237GB total';

  public render(): HTMLElement {
    const statusBar = document.createElement('div');
    statusBar.className = 'fm-status-bar';
    
    const left = document.createElement('div');
    left.className = 'fm-status-left';
    left.textContent = this.freeSpace;
    statusBar.appendChild(left);

    const right = document.createElement('div');
    right.className = 'fm-status-right';
    right.textContent = `Total ${this.fileCount} file(s)`;
    statusBar.appendChild(right);

    return statusBar;
  }

  public updateFileCount(count: number): void {
    this.fileCount = count;
    const right = document.querySelector('.fm-status-right');
    if (right) {
      right.textContent = `Total ${count} file(s)`;
    }
  }

  public updateFreeSpace(space: string): void {
    this.freeSpace = space;
    const left = document.querySelector('.fm-status-left');
    if (left) {
      left.textContent = space;
    }
  }
}

