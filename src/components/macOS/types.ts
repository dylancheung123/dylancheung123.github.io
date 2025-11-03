/**
 * Types for macOS UI components
 */

import { UIManager } from '../../UIManager';

export interface Application {
  id: string;
  name: string;
  icon: string;
  description: string;
  contentId: string;
}

export interface MacOSUICallbacks {
  onApplicationClick: (app: Application) => void;
  uiManager?: UIManager;
}

