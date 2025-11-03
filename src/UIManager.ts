/**
 * UI Manager - Handles switching between different UI views
 */

export enum UIView {
  MacOS = 'macos',
  FileManager = 'filemanager'
}

export class UIManager {
  private currentView: UIView = UIView.MacOS;
  private macosContainer: HTMLElement | null;
  private fileManagerContainer: HTMLElement | null;
  private onViewChangeCallbacks: Array<(view: UIView) => void> = [];

  constructor() {
    this.macosContainer = document.getElementById('macos-container');
    this.fileManagerContainer = document.getElementById('app-container');
    
    // Initialize: Show macOS, hide File Manager
    this.switchToView(UIView.MacOS);
  }

  public switchToView(view: UIView): void {
    console.log('Switching to view:', view, 'from:', this.currentView);
    this.currentView = view;

    // Hide/show containers
    if (this.macosContainer) {
      if (view === UIView.MacOS) {
        this.macosContainer.style.display = 'flex';
        this.macosContainer.style.zIndex = '2';
      } else {
        this.macosContainer.style.display = 'none';
        this.macosContainer.style.zIndex = '1';
      }
    }
    
    if (this.fileManagerContainer) {
      if (view === UIView.FileManager) {
        this.fileManagerContainer.style.display = 'block';
        this.fileManagerContainer.style.zIndex = '2';
      } else {
        this.fileManagerContainer.style.display = 'none';
        this.fileManagerContainer.style.zIndex = '1';
      }
    }

    console.log('View switched. macOS:', this.macosContainer?.style.display, 'FileManager:', this.fileManagerContainer?.style.display);

    // Notify callbacks
    this.onViewChangeCallbacks.forEach(callback => callback(view));
  }

  public getCurrentView(): UIView {
    return this.currentView;
  }

  public onViewChange(callback: (view: UIView) => void): void {
    this.onViewChangeCallbacks.push(callback);
  }

  public toggleView(): void {
    const newView = this.currentView === UIView.MacOS ? UIView.FileManager : UIView.MacOS;
    this.switchToView(newView);
  }
}

