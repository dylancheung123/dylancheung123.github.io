import React, { useState, useEffect, useRef } from 'react';
import { Menu, FileManagerCallbacks } from './types';
import { UIManager, UIView } from '../UIManager';
import { pages } from '../data/pages';

interface MenuBarProps {
  callbacks: FileManagerCallbacks;
  uiManager: UIManager | null;
}

export const MenuBar: React.FC<MenuBarProps> = ({ callbacks, uiManager }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (openMenu) {
        const menuContainer = menuRefs.current[openMenu];
        if (menuContainer && !menuContainer.contains(event.target as Node)) {
          setOpenMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu]);

  const getMenus = (): Menu[] => {
    return [
      { 
        name: 'File', 
        items: [
          { label: 'New', action: null },
          { label: 'Open', action: () => callbacks.onOpenSelected() },
          { label: '---', action: null },
          ...pages.map(page => ({
            label: page.name,
            action: () => callbacks.onLoadContent(page.contentId)
          })),
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
          { label: 'Expand One Level', action: () => callbacks.onExpandTree() },
          { label: 'Expand Branch', action: () => callbacks.onExpandBranch() },
          { label: 'Expand All', action: () => callbacks.onExpandAll() },
          { label: 'Collapse Branch', action: () => callbacks.onCollapseBranch() }
        ]
      },
      { 
        name: 'View', 
        items: [
          { label: 'Tree and Directory', action: null },
          { label: 'Tree Only', action: null },
          { label: 'Directory Only', action: null },
          { label: 'Split', action: null },
          ...(uiManager ? [{ label: '---', action: null }] : []),
          ...(uiManager ? [{ label: 'Switch to macOS View', action: () => uiManager.switchToView(UIView.MacOS) }] : []),
          ...(uiManager ? [{ label: 'Toggle View', action: () => uiManager.toggleView() }] : [])
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
          { label: 'About File Manager', action: () => callbacks.onLoadContent('about') }
        ]
      }
    ];
  };

  const toggleMenu = (menuName: string): void => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="fm-menu-bar">
      {getMenus().map(menu => (
        <div key={menu.name} className="fm-menu-container" ref={el => menuRefs.current[menu.name] = el}>
          <div 
            className={`fm-menu-item ${openMenu === menu.name ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(menu.name);
            }}
          >
            {menu.name}
          </div>
          {openMenu === menu.name && (
            <div className="fm-menu-dropdown">
              {menu.items.map((item, index) => {
                if (item.label === '---') {
                  return <div key={index} className="fm-menu-separator"></div>;
                }
                return (
                  <div
                    key={index}
                    className="fm-menu-option"
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      }
                      setOpenMenu(null);
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

