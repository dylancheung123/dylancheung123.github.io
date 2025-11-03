import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slide } from './Slide';

interface SlideData {
  key: string | number;
  content: React.ReactNode;
}

interface VerticalCarouselProps {
  slides: SlideData[];
  offsetRadius?: number;
  animationConfig?: { tension: number; friction: number };
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

export const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  slides,
  offsetRadius = 2,
  animationConfig = { tension: 120, friction: 14 }
}) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wheelDeltaY = useRef(0);
  const lastWheelTime = useRef(0);

  const clampOffsetRadius = (offsetRadius: number): number => {
    const upperBound = Math.floor((slides.length - 1) / 2);
    if (offsetRadius < 0) return 0;
    if (offsetRadius > upperBound) return upperBound;
    return offsetRadius;
  };

  const modBySlidesLength = (index: number): number => {
    return mod(index, slides.length);
  };

  const moveSlide = useCallback((direction: number) => {
    setIndex(prev => modBySlidesLength(prev + direction));
  }, [slides.length]);

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.keyCode === 38) {
        // Up arrow - previous slide
        event.preventDefault();
        moveSlide(-1);
      }
      if (event.keyCode === 40) {
        // Down arrow - next slide
        event.preventDefault();
        moveSlide(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveSlide]);

  // Handle trackpad/mouse wheel scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    // Only handle vertical scrolling
    if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
    
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastWheelTime.current > 150) {
      wheelDeltaY.current = 0;
    }
    
    wheelDeltaY.current += e.deltaY;
    lastWheelTime.current = now;
    
    const threshold = 50;
    
    if (wheelDeltaY.current > threshold) {
      // Scroll down - next slide
      moveSlide(1);
      wheelDeltaY.current = 0;
    } else if (wheelDeltaY.current < -threshold) {
      // Scroll up - previous slide
      moveSlide(-1);
      wheelDeltaY.current = 0;
    }
  }, [moveSlide]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const getPresentableSlides = (): Array<{ slide: SlideData; presentableIndex: number }> => {
    const clampedOffsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides: Array<{ slide: SlideData; presentableIndex: number }> = [];

    for (let i = -clampedOffsetRadius; i < 1 + clampedOffsetRadius; i++) {
      const slideIndex = modBySlidesLength(index + i);
      presentableSlides.push({
        slide: slides[slideIndex],
        presentableIndex: i
      });
    }

    return presentableSlides;
  };

  const clampedOffsetRadius = clampOffsetRadius(offsetRadius);

  return (
    <div 
      ref={carouselRef}
      className="relative w-[280px] h-[400px]"
    >
      {getPresentableSlides().map(({ slide, presentableIndex }) => (
        <Slide
          key={slide.key}
          content={slide.content}
          offsetRadius={clampedOffsetRadius}
          index={presentableIndex}
        />
      ))}
    </div>
  );
};

