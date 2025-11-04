import React from 'react';
import { Page, pages } from '../data/pages';
import { VerticalCarousel } from '../components/VerticalCarousel';
import { PageSlide } from '../components/PageSlide';

export const Home: React.FC = () => {
  const applications: Page[] = pages.map(page => ({
    id: page.id,
    name: page.name,
    description: page.description,
    contentId: page.contentId
  }));

  // Create slides array for the carousel
  // You can mix and match slide types here
  const slides = applications.map((app) => ({
    key: app.id,
    content: <PageSlide name={app.name} description={app.description} />
  }));

  return (
    <div 
      className="w-full h-screen flex flex-col font-sans overflow-hidden relative"
      style={{
        background: '#faf8f3',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 20px, transparent 60px, #3b82f6 60px, #3b82f6 61px),
          linear-gradient(90deg, transparent 0px, transparent 100px, #ef4444 100px, #ef4444 101px, transparent 101px, transparent 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%',
        backgroundPosition: '0 0, 0 0'
      }}
    >
      {/* Vertical Stack Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-hidden py-8">
        <VerticalCarousel slides={slides} offsetRadius={4} />
      </div>
    </div>
  );
};

