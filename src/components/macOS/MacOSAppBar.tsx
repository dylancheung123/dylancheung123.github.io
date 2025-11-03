import React, { useRef, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Application, MacOSUICallbacks } from './types';
import { pages } from '../../data/pages';

interface MacOSAppBarProps {
  callbacks: MacOSUICallbacks;
}

export const MacOSAppBar: React.FC<MacOSAppBarProps> = ({ callbacks }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      containScroll: 'keepSnaps',
      dragFree: false,
      slidesToScroll: 1,
      axis: 'x'
    }
  );

  const wheelDeltaX = useRef(0);
  const lastWheelTime = useRef(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Create a ref callback that stores both Embla's ref and our ref
  const setViewportRef = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
    if (typeof emblaRef === 'function') {
      emblaRef(node);
    }
  }, [emblaRef]);

  // Add wheel support for trackpad two-finger scrolling
  useEffect(() => {
    if (!emblaApi || !viewportRef.current) return;

    const handleWheel = (e: WheelEvent): void => {
      // Only handle horizontal scrolling
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      
      const now = Date.now();
      
      // Reset accumulation if too much time has passed
      if (now - lastWheelTime.current > 150) {
        wheelDeltaX.current = 0;
      }
      
      wheelDeltaX.current += e.deltaX;
      lastWheelTime.current = now;
      
      // Threshold for horizontal scroll (higher = less sensitive)
      const threshold = 100;
      
      if (wheelDeltaX.current > threshold) {
        emblaApi.scrollNext();
        wheelDeltaX.current = 0;
      } else if (wheelDeltaX.current < -threshold) {
        emblaApi.scrollPrev();
        wheelDeltaX.current = 0;
      }
    };

    const viewport = viewportRef.current;
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [emblaApi]);

  // Convert pages to Application format for macOS UI
  const applications: Application[] = pages.map(page => ({
    id: page.id,
    name: page.name,
    icon: page.icon,
    description: page.description,
    contentId: page.contentId
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
      {/* Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-hidden py-8">
        <div className="w-[70%] h-[400px] overflow-hidden" ref={setViewportRef}>
          <div className="flex h-full items-center gap-6" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            {applications.map((app, index) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center cursor-pointer flex-shrink-0 select-none"
                data-index={index}
                data-app={app.id}
                onClick={() => callbacks.onApplicationClick(app)}
              >
                {/* Glassmorphism Card */}
                <div className="w-[280px] h-[200px] rounded-[36px] flex flex-col items-center justify-center px-6 py-4 relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[200%] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-[600ms] ease-out select-none overflow-hidden" style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.2)'
                }}>
                  {/* Glass edge highlight */}
                  <div className="absolute inset-0 rounded-[36px] pointer-events-none" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                  }}></div>
                  <h3 className="text-white text-xl font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none text-center relative z-10">{app.name}</h3>
                  <p className="text-white/90 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none text-center relative z-10">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

