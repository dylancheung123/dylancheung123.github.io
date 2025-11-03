interface PageSlideProps {
  name: string;
  description: string;
  stackPosition?: number;
}

export const PageSlide = ({ name, description, stackPosition = 0 }: PageSlideProps) => {
  const isAbove = stackPosition < 0;
  const isActive = stackPosition === 0;
  
  return (
    <div className="w-[650px] h-[400px] select-none">
      <div 
        className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col p-8 relative overflow-hidden border-2 border-gray-300" 
        style={{
          backgroundColor: '#fefefe'
        }}
      >
        {/* Dot paper pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0'
        }}></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Title - always visible, especially important for cards above */}
          <h2 className="text-gray-900 text-3xl font-bold">
            {name}
          </h2>
          {/* Description - only show fully on active card */}
          {isActive && (
            <p className="text-gray-700 text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

