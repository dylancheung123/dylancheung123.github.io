import React from 'react';

interface TitleBarProps {
  currentPath: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({ currentPath }) => {
  return (
    <div className="fm-title-bar">
      <div className="fm-title-text">File Manager - {currentPath}*.*</div>
      <div className="fm-title-controls">
        <button className="fm-title-minimize" aria-label="minimize"></button>
        <button className="fm-title-maximize" aria-label="maximize"></button>
        <button 
          className="fm-title-close" 
          aria-label="close"
          onClick={() => alert('File Manager - Close not implemented in demo')}
        ></button>
      </div>
    </div>
  );
};

