import React, { useState, useEffect } from 'react';
import { UIManager, UIView } from './UIManager';
import { MacOSUI } from './MacOSUI';
import { FileManager } from './FileManager';
import './styles.css';
import './styles-macos.css';

export const App: React.FC = () => {
  const [uiManager] = useState(() => new UIManager());
  const [currentView, setCurrentView] = useState<UIView>(UIView.MacOS);

  useEffect(() => {
    // Listen for view changes
    uiManager.onViewChange((view) => {
      setCurrentView(view);
    });
  }, [uiManager]);

  return (
    <>
      {currentView === UIView.MacOS ? (
        <MacOSUI uiManager={uiManager} />
      ) : (
        <FileManager uiManager={uiManager} />
      )}
    </>
  );
};

