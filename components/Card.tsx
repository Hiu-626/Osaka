import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'white' | 'yellow' | 'blue';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', color = 'white', onClick }) => {
  const bgColors = {
    white: 'bg-white',
    yellow: 'bg-duck-yellow',
    blue: 'bg-blue-100',
  };

  return (
    <div 
      onClick={onClick}
      className={`
        ${bgColors[color]} 
        rounded-2xl 
        border-2 border-duck-dark 
        shadow-[4px_4px_0px_0px_rgba(30,58,138,0.2)] 
        p-4 
        mb-4 
        transition-transform 
        ${onClick ? 'active:scale-[0.98] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};