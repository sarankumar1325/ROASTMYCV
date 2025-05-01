
import React, { useState, useEffect } from 'react';
import { FileText, Flame } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'small';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  showText = true,
  className = ''
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldPuff, setShouldPuff] = useState(false);
  
  // Animation for the smoke puff every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldPuff(true);
      setTimeout(() => setShouldPuff(false), 700);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const size = variant === 'small' ? 20 : 24;
  const containerClass = `relative flex items-center ${className}`;
  
  return (
    <div 
      className={containerClass}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Toaster container */}
      <div 
        className={`relative rounded-md bg-gradient-to-r from-amber-500 to-red-600 p-1.5 
        transition-all duration-300 ${isHovering ? 'scale-105' : ''}`}
        style={{ transform: isHovering ? 'translateY(-2px)' : '' }}
      >
        {/* Paper/Resume icon */}
        <div 
          className={`relative bg-white rounded transform transition-transform duration-300 ${
            isHovering ? 'translate-y-[-3px]' : ''
          }`}
        >
          <FileText 
            size={size} 
            className={`transition-all duration-300 ${
              isHovering ? 'text-amber-600' : 'text-gray-700'
            }`}
          />
          
          {/* Burnt edges on hover */}
          {isHovering && (
            <div className="absolute inset-0 rounded pointer-events-none border-2 border-amber-500/50"></div>
          )}
          
          {/* Smile face that appears on hover */}
          {isHovering && (
            <div className="absolute bottom-1 left-0 right-0 flex justify-center">
              <div className="w-[8px] h-[4px] border-b-2 border-amber-600 rounded-b-full"></div>
            </div>
          )}
        </div>
        
        {/* Heat waves */}
        <div className="absolute -top-2 left-0 right-0 flex justify-center">
          {[...Array(3)].map((_, i) => (
            <Flame 
              key={i} 
              size={8} 
              className={`text-red-500/80 animate-pulse mx-0.5 ${
                shouldPuff ? 'scale-150 opacity-70' : 'scale-100 opacity-50'
              } transition-all duration-300`}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
        
        {/* Smoke puff */}
        {shouldPuff && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-gray-200/70 rounded-full animate-fade-in"></div>
          </div>
        )}
      </div>
      
      {/* Brand text */}
      {showText && (
        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
          Resume Roaster
        </span>
      )}
    </div>
  );
};

export default Logo;
