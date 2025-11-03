import React from 'react';

interface CreditCardSlideProps {
  name: string;
  description: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
}

export const CreditCardSlide: React.FC<CreditCardSlideProps> = ({ 
  name, 
  description, 
  cardNumber = '1234 5678 9012 3456',
  cardHolder = 'CARD HOLDER',
  expiryDate = '12/25'
}) => {
  return (
    <div className="w-[300px] h-[185px] select-none">
      <div className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col justify-between p-6 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        {/* Card background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Card content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-8 bg-white rounded opacity-90"></div>
              <div className="text-white text-sm font-semibold">{name}</div>
            </div>
            <div className="text-white text-2xl font-mono tracking-wider mb-2">
              {cardNumber}
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-white/70 text-xs uppercase tracking-wider mb-1">
                {cardHolder}
              </div>
              <div className="text-white text-sm font-semibold">{description}</div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-xs uppercase tracking-wider mb-1">
                Expires
              </div>
              <div className="text-white text-sm font-semibold">{expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

