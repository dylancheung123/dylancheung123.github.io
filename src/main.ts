import { FileManager } from './FileManager';
import './styles.css';

// Main entry point for the File Manager application
document.addEventListener('DOMContentLoaded', () => {
  try {
    const fileManager = new FileManager('app-container');
    // Expose to window for debugging
    (window as any).fileManager = fileManager;
  } catch (error) {
    console.error('Failed to initialize File Manager:', error);
  }
});