import { calculateCareerLength } from '../utils/helpers';
import { CAREER_START_DATE } from '../utils/constants';

export interface Page {
  id: string;
  name: string;
  description: string;
  contentId: string;
}

const careerLength = calculateCareerLength(CAREER_START_DATE);

export const pages: Page[] = [
  {
    id: 'about',
    name: 'About Me',
    description: `Hi, I am Dylan Cheung, a full stack software developer who's been building web applications for the past ${careerLength} years. I have a passion for design and an interest in architectural diagramming. I believe the key to successful projects are keeping things simple and intuitive.\n
    When I'm not on the computer, I'm out on the courts playing tennis when it's sunny or skiing slopes when it's snowing.`,
    contentId: 'about'
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Dedicated page in the works...',
    contentId: 'projects'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Click [here](#/photography) to view my photography',
    contentId: 'photography'
  },
  {
    id: 'contact',
    name: 'Contact',
    description: `
    GitHub: https://github.com/dylancheung123
    LinkedIn: https://www.linkedin.com/in/dylancheung123
    Email: dylancheung123@gmail.com`,
    contentId: 'contact'
  }
];

