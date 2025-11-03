import React from 'react';
import { Page, pages } from '../data/pages';
import { VerticalCarousel } from '../components/VerticalCarousel';
import { GlassSlide } from '../components/GlassSlide';
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
    // content: <GlassSlide name={app.name} description={app.description} />
    // Uncomment to use credit card style instead:
    content: <PageSlide name={app.name} description={app.description} />
  }));

  return (
    <div 
      className="w-full h-screen flex flex-col font-sans overflow-hidden relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Vertical Stack Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-hidden py-8">
        <VerticalCarousel slides={slides} offsetRadius={4} />
      </div>
    </div>
  );
};

