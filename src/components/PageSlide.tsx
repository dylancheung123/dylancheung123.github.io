import { parseTextWithLinks } from '../utils/helpers';

interface PageSlideProps {
  name: string;
  description: string;
  stackPosition?: number;
  slideKey?: string | number;
}

export const PageSlide = ({ name, description, stackPosition = 0, slideKey }: PageSlideProps) => {
  const isAbove = stackPosition < 0;
  const isActive = stackPosition === 0;
  
  // Generate a consistent small rotation based on slide key for post-it effect
  const rotation = stackPosition === 0 ? 0 : ((typeof slideKey === 'string' ? slideKey.charCodeAt(0) : slideKey || 0) % 7 - 3) * 0.5;
  
  return (
    <div className="w-[650px] h-[400px] select-none">
      <div 
        className="w-full h-full flex flex-col p-8 relative overflow-hidden" 
        style={{
          backgroundColor: '#fffb8d',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          transform: `rotate(${rotation}deg)`
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Title - always visible, especially important for cards above */}
          <h2 className="text-gray-900 text-3xl font-bold" style={{ fontFamily: "'Handlee', cursive" }}>
            {name}
          </h2>
          {/* Description - only show fully on active card */}
          {isActive && (
            <p className="text-gray-700 text-xl leading-relaxed" style={{ fontFamily: "'Handlee', cursive", whiteSpace: 'pre-line' }}>
              {parseTextWithLinks(description)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

