export class ContentViewer {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public show(content: string, title: string): void {
    const viewer = document.createElement('div');
    viewer.className = 'fm-content-viewer';
    
    const viewerTitle = document.createElement('div');
    viewerTitle.className = 'fm-viewer-title';
    viewerTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1);
    
    const viewerContent = document.createElement('div');
    viewerContent.className = 'fm-viewer-content';
    viewerContent.innerHTML = this.markdownToHtml(content);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fm-viewer-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => viewer.remove();
    
    viewer.appendChild(viewerTitle);
    viewer.appendChild(closeBtn);
    viewer.appendChild(viewerContent);
    
    this.container.appendChild(viewer);
  }

  private markdownToHtml(markdown: string): string {
    let html = markdown;
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }
}

