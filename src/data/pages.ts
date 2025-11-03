export interface Page {
  id: string;
  name: string;
  description: string;
  contentId: string;
}

export const pages: Page[] = [
  {
    id: 'about',
    name: 'About Me',
    description: 'About Me',
    contentId: 'about'
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'My Projects',
    contentId: 'projects'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'My Photography',
    contentId: 'photography'
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Get In Touch',
    contentId: 'contact'
  }
];

