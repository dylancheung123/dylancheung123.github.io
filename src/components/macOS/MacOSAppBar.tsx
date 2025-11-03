import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Application, MacOSUICallbacks } from './types';
import { UIView } from '../../UIManager';
import { pages } from '../../data/pages';

interface MacOSAppBarProps {
  callbacks: MacOSUICallbacks;
}

export const MacOSAppBar: React.FC<MacOSAppBarProps> = ({ callbacks }) => {
  const [activeDropdown, setActiveDropdown] = useState<HTMLElement | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      slidesToScroll: 1,
      axis: 'x'
    }
  );

  const wheelDeltaX = useRef(0);
  const lastWheelTime = useRef(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Create a ref callback that stores both Embla's ref and our ref
  const setViewportRef = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
    if (typeof emblaRef === 'function') {
      emblaRef(node);
    }
  }, [emblaRef]);

  // Add wheel support for trackpad two-finger scrolling
  useEffect(() => {
    if (!emblaApi || !viewportRef.current) return;

    const handleWheel = (e: WheelEvent): void => {
      // Only handle horizontal scrolling
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      
      const now = Date.now();
      
      // Reset accumulation if too much time has passed
      if (now - lastWheelTime.current > 150) {
        wheelDeltaX.current = 0;
      }
      
      wheelDeltaX.current += e.deltaX;
      lastWheelTime.current = now;
      
      // Threshold for horizontal scroll (higher = less sensitive)
      const threshold = 100;
      
      if (wheelDeltaX.current > threshold) {
        emblaApi.scrollNext();
        wheelDeltaX.current = 0;
      } else if (wheelDeltaX.current < -threshold) {
        emblaApi.scrollPrev();
        wheelDeltaX.current = 0;
      }
    };

    const viewport = viewportRef.current;
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [emblaApi]);

  // Convert pages to Application format for macOS UI
  const applications: Application[] = pages.map(page => ({
    id: page.id,
    name: page.name,
    icon: page.icon,
    description: page.description,
    contentId: page.contentId
  }));

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleViewDropdown = (menuItem: HTMLElement): void => {
    if (activeDropdown) {
      activeDropdown.remove();
      setActiveDropdown(null);
      return;
    }

    if (!callbacks.uiManager) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'macos-menu-dropdown';
    
    const rect = menuItem.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom}px`;

    const currentView = callbacks.uiManager.getCurrentView();
    const options = [
      { label: 'macOS View', view: UIView.MacOS, checkmark: true },
      { label: 'File Manager View', view: UIView.FileManager, checkmark: true },
      { type: 'separator' as const },
      { label: 'Toggle View', action: () => callbacks.uiManager!.toggleView() }
    ] as Array<{ label?: string; view?: UIView; checkmark?: boolean; type?: 'separator'; action?: () => void }>;

    options.forEach(option => {
      if (option.type === 'separator') {
        const separator = document.createElement('div');
        separator.className = 'macos-menu-separator';
        dropdown.appendChild(separator);
      } else {
        const item = document.createElement('div');
        item.className = 'macos-menu-dropdown-item';
        
        const label = document.createElement('span');
        label.textContent = option.label || '';
        
        if (option.checkmark && callbacks.uiManager!.getCurrentView() === option.view) {
          label.innerHTML = `✓ ${label.textContent}`;
        }
        
        item.appendChild(label);
        
        if (option.action) {
          item.addEventListener('click', () => {
            option.action!();
            dropdown.remove();
            setActiveDropdown(null);
          });
        } else if (option.view !== undefined) {
          item.addEventListener('click', () => {
            callbacks.uiManager!.switchToView(option.view!);
            dropdown.remove();
            setActiveDropdown(null);
          });
        }
        
        dropdown.appendChild(item);
      }
    });

    document.body.appendChild(dropdown);
    setActiveDropdown(dropdown);

    setTimeout(() => {
      const closeHandler = (e: MouseEvent) => {
        if (!dropdown.contains(e.target as Node) && !menuItem.contains(e.target as Node)) {
          dropdown.remove();
          setActiveDropdown(null);
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 0);
  };

  const handleViewMenuClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    toggleViewDropdown(e.currentTarget);
  };

  return (
    <div className="macos-ui">
      {/* Menu Bar */}
      <div className="macos-menu-bar">
        <div className="macos-apple-menu" title="Apple Menu">
          <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.532 0c-.18 1.28-.66 2.347-1.44 3.2-.75.827-1.67 1.307-2.76 1.44-.06-1.027-.33-1.88-.81-2.56C5.052 1.44 4.192 1 3.052.867c.06-.867.18-1.547.36-2.04C3.592.867 3.592.867 3.592.867c1.11.133 2.01.573 2.7 1.32.66.693 1.05 1.533 1.17 2.52.96-.133 1.8-.533 2.52-1.2.72-.667 1.23-1.467 1.53-2.4-.96-.187-1.79-.467-2.49-.84-.7-.373-1.27-.813-1.71-1.32C4.552.4 4.152.133 3.592 0c.84.24 1.55.613 2.13 1.12.58.507 1.02 1.12 1.32 1.84.36-.96.99-1.707 1.89-2.24.9-.533 1.89-.853 2.97-.96-.06.32-.15.613-.27.88z" fill="currentColor"/>
            <path d="M9.312 3.84c.96 0 1.77.32 2.43.96.66.64.99 1.493.99 2.56 0 1.24-.39 2.24-1.17 3-.78.76-1.74 1.14-2.88 1.14-.9 0-1.65-.307-2.25-.92-.6-.613-.9-1.4-.9-2.36 0-1.107.36-2.027 1.08-2.76.72-.733 1.68-1.1 2.88-1.1.12 0 .21.007.21.007v.467z" fill="currentColor"/>
          </svg>
        </div>

        <div className="macos-app-name" title="Application Menu">Dylan Cheung</div>

        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
          <div
            key={item}
            className="macos-menu-item"
            role="menuitem"
            onClick={item === 'View' && callbacks.uiManager ? handleViewMenuClick : undefined}
          >
            {item}
          </div>
        ))}

        <div className="macos-menu-right">
          <div className="macos-control-center" title="Control Center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="8" cy="8" r="2" fill="currentColor"/>
            </svg>
          </div>

          <div className="macos-menu-icon macos-wifi-icon" title="Wi-Fi">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.5 6.5L8 12l5.5-5.5c-2-2-4.5-2.5-7-2.5s-5 .5-7 2.5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
            </svg>
          </div>

          <div className="macos-menu-icon macos-battery-icon" title="Battery">
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <rect x="1" y="3" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <rect x="19" y="5" width="2" height="2" fill="currentColor"/>
              <rect x="2.5" y="4.5" width="15" height="5" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>

          <div className="macos-time">{currentTime}</div>
        </div>
      </div>

      {/* Carousel */}
      <div className="macos-carousel-container">
        <div className="macos-carousel-viewport" ref={setViewportRef}>
          <div className="macos-carousel">
            {applications.map((app, index) => (
              <div
                key={app.id}
                className="macos-app-tile"
                data-index={index}
                data-app={app.id}
                onClick={() => callbacks.onApplicationClick(app)}
              >
                <div className="macos-app-icon">{app.icon}</div>
                <div className="macos-app-name-label">{app.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

