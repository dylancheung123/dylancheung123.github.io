import { Menu, FileManagerCallbacks } from './types';

export class MenuBar {
  private callbacks: FileManagerCallbacks;

  constructor(callbacks: FileManagerCallbacks) {
    this.callbacks = callbacks;
  }

  public render(): HTMLElement {
    const menuBar = document.createElement('div');
    menuBar.className = 'fm-menu-bar';
    
    const menus = this.getMenus();
    menus.forEach(menu => {
      const menuContainer = this.createMenuContainer(menu);
      menuBar.appendChild(menuContainer);
    });

    return menuBar;
  }

  private getMenus(): Menu[] {
    return [
      { 
        name: 'File', 
        items: [
          { label: 'New', action: null },
          { label: 'Open', action: () => this.callbacks.onOpenSelected() },
          { label: '---', action: null },
          { label: 'Exit', action: () => alert('Thanks for using File Manager!') }
        ]
      },
      { 
        name: 'Disk', 
        items: [
          { label: 'Select Drive...', action: null },
          { label: 'Network Connection...', action: null }
        ]
      },
      { 
        name: 'Tree', 
        items: [
          { label: 'Expand One Level', action: () => this.callbacks.onExpandTree() },
          { label: 'Expand Branch', action: () => this.callbacks.onExpandBranch() },
          { label: 'Expand All', action: () => this.callbacks.onExpandAll() },
          { label: 'Collapse Branch', action: () => this.callbacks.onCollapseBranch() }
        ]
      },
      { 
        name: 'View', 
        items: [
          { label: 'Tree and Directory', action: null },
          { label: 'Tree Only', action: null },
          { label: 'Directory Only', action: null },
          { label: 'Split', action: null }
        ]
      },
      { 
        name: 'Options', 
        items: [
          { label: 'Font...', action: null },
          { label: 'Status Bar', action: null },
          { label: 'Minimize on Use', action: null }
        ]
      },
      { 
        name: 'Window', 
        items: [
          { label: 'New Window', action: null },
          { label: 'Cascade', action: null },
          { label: 'Tile', action: null }
        ]
      },
      { 
        name: 'Help', 
        items: [
          { label: 'Contents', action: null },
          { label: 'Search for Help...', action: null },
          { label: 'About File Manager', action: () => this.callbacks.onLoadContent('about') }
        ]
      }
    ];
  }

  private createMenuContainer(menu: Menu): HTMLElement {
    const menuContainer = document.createElement('div');
    menuContainer.className = 'fm-menu-container';
    
    const menuItem = document.createElement('div');
    menuItem.className = 'fm-menu-item';
    menuItem.textContent = menu.name;
    
    const dropdown = document.createElement('div');
    dropdown.className = 'fm-menu-dropdown';
    dropdown.style.display = 'none';
    
    menu.items.forEach(item => {
      if (item.label === '---') {
        const separator = document.createElement('div');
        separator.className = 'fm-menu-separator';
        dropdown.appendChild(separator);
      } else {
        const menuOption = document.createElement('div');
        menuOption.className = 'fm-menu-option';
        menuOption.textContent = item.label;
        if (item.action) {
          menuOption.onclick = () => {
            item.action?.();
            dropdown.style.display = 'none';
          };
        }
        dropdown.appendChild(menuOption);
      }
    });
    
    menuItem.onclick = () => {
      const isVisible = dropdown.style.display === 'block';
      document.querySelectorAll('.fm-menu-dropdown').forEach(d => {
        (d as HTMLElement).style.display = 'none';
      });
      dropdown.style.display = isVisible ? 'none' : 'block';
    };
    
    menuContainer.appendChild(menuItem);
    menuContainer.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuContainer.contains(e.target as Node)) {
        dropdown.style.display = 'none';
      }
    });
    
    return menuContainer;
  }
}

