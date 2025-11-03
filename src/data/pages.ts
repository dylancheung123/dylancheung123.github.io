/**
 * Shared data source for pages/menu items
 * Both macOS UI and File Manager UI use this same data
 */

export interface Page {
  id: string;
  name: string;
  icon: string;
  description: string;
  contentId: string;
}

export const pages: Page[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    description: 'About Me',
    contentId: 'about'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '🚀',
    description: 'My Projects',
    contentId: 'projects'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: '📸',
    description: 'My Photography',
    contentId: 'photography'
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: '📧',
    description: 'Get In Touch',
    contentId: 'contact'
  }
];

