import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'white' | 'yellow' | 'blue';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', color = 'white', onClick }) => {
  // Enhanced colors with slight opacity for glass feel if background allows, 
  // but keeping solid for readability on the pattern background.
  const bgColors = {
    white: 'bg-white/90 backdrop-blur-sm',
    yellow: 'bg-duck-yellow',
    blue: 'bg-blue-50/90 backdrop-blur-sm',
  };

  return (
    <div 
      onClick={onClick}
      className={`
        ${bgColors[color]} 
        rounded-3xl 
        border-2 border-duck-dark/10
        shadow-[0px_4px_20px_rgba(30,58,138,0.06)]
        hover:shadow-[0px_4px_25px_rgba(30,58,138,0.12)]
        p-5
        mb-4 
        transition-all duration-300
        ${onClick ? 'active:scale-[0.98] cursor-pointer hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};