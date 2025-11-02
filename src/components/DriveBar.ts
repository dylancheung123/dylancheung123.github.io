export class DriveBar {
  public render(): HTMLElement {
    const driveBar = document.createElement('div');
    driveBar.className = 'fm-drive-bar';
    
    const driveSelect = document.createElement('select');
    driveSelect.className = 'fm-drive-select';
    driveSelect.innerHTML = '<option>C: [Local Disk]</option>';
    driveBar.appendChild(driveSelect);

    return driveBar;
  }
}

