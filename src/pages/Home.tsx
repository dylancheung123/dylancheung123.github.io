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
          repeating-linear-gradient(0deg, transparent 120px, transparent 160px, #e0ddd6 160px, #e0ddd6 161px),
          linear-gradient(90deg, #e8e5de 0%, #e8e5de 50px, transparent 50px, transparent 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%'
      }}
    >
      {/* Vertical Stack Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-hidden py-8">
        <VerticalCarousel slides={slides} offsetRadius={4} />
      </div>
    </div>
  );
};

