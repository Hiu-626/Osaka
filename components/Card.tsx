import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/90 backdrop-blur-md
        rounded-[2rem]
        border-4 border-gray-100
        shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]
        p-6
        transition-all duration-300
        ${onClick ? 'active:scale-[0.98] cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.08)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};