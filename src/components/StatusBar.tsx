import React from 'react';

interface StatusBarProps {
  fileCount: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ fileCount }) => {
  const freeSpace = '5GB free, 237GB total';

  return (
    <div className="fm-status-bar">
      <div className="fm-status-left">{freeSpace}</div>
      <div className="fm-status-right">Total {fileCount} file(s)</div>
    </div>
  );
};

