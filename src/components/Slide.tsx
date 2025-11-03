import React from 'react';

interface SlideProps {
  content: React.ReactNode;
  offsetRadius: number;
  index: number;
}

export const Slide: React.FC<SlideProps> = ({ content, offsetRadius, index }) => {
  // index represents the position relative to current slide (e.g., -2, -1, 0, 1, 2)
  const stackPosition = index;
  const distance = Math.abs(stackPosition);
  
  // Only show slides that are within reasonable range
  if (distance > 3) return null;
  
  // Calculate opacity - fully opaque for current, progressively faded for others
  const opacity = stackPosition === 0 ? 1 : Math.max(0.2, 1 - distance * 0.25);
  
  // Calculate vertical offset - each card below is offset down
  const verticalOffset = stackPosition * 32;
  const horizontalOffset = stackPosition * 0;
  
  // Calculate scale - current card is full size, others slightly smaller
  const scale = stackPosition === 0 ? 1 : Math.max(0.85, 1 - distance * 0.05);
  
  // Calculate z-index - current card is on top
  const zIndex = 10 - distance;
  
  return (
    <div
      className="absolute top-1/2 left-1/2 select-none cursor-pointer transition-all duration-300 ease-out"
      style={{
        transform: `translate(-50%, -50%) translateY(${verticalOffset}px) translateX(${horizontalOffset}px) scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
        pointerEvents: stackPosition === 0 ? 'auto' : 'none'
      }}
    >
      {content}
    </div>
  );
};

