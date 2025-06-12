import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation to home

interface LogoDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ size = 'md', className }) => {
  console.log("Rendering LogoDisplay");

  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
  };

  return (
    <Link to="/" className={`flex items-center justify-center ${className}`}>
      {/* Placeholder for an actual SVG logo or an img tag */}
      {/* Example: <img src="/logo.svg" alt="App Logo" className={sizeClasses[size]} /> */}
      <div
        className={`font-bold text-2xl text-primary ${
          size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl'
        }`}
      >
        YourApp
      </div>
    </Link>
  );
};

export default LogoDisplay;