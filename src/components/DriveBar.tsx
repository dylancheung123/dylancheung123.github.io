import React from 'react';

export const DriveBar: React.FC = () => {
  return (
    <div className="fm-drive-bar">
      <select className="fm-drive-select">
        <option>C: [Local Disk]</option>
      </select>
    </div>
  );
};

