interface GlassSlideProps {
  name: string;
  description: string;
  stackPosition?: number;
}

export const GlassSlide = ({ name, description, stackPosition = 0 }: GlassSlideProps) => {
  // Calculate opacity based on stack position - only for GlassSlide
  const distance = Math.abs(stackPosition);
  const opacity = stackPosition === 0 ? 1 : Math.max(0.2, 1 - distance * 0.25);
  
  return (
    <div className="w-[320px] h-[320px] select-none" style={{ opacity }}>
      {/* Glassmorphism Card */}
      <div className="w-full h-full rounded-[36px] flex flex-col items-center justify-center px-6 py-4 relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[200%] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] select-none overflow-hidden" style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.2)'
      }}>
        {/* Glass edge highlight */}
        <div className="absolute inset-0 rounded-[36px] pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}></div>
        <h3 className="text-white text-xl font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none text-center relative z-10">{name}</h3>
        <p className="text-white/90 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none text-center relative z-10">{description}</p>
      </div>
    </div>
  );
};

