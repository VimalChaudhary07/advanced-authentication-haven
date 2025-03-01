
import React from 'react';
import { motion } from 'framer-motion';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  // Size mapping
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative">
        <motion.div 
          className={`relative z-10 ${sizeMap[size]}`}
          animate={{ 
            y: [0, -4, 0],
            rotateZ: [0, -2, 0, 2, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <svg 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${sizeMap[size]} text-auth-primary filter drop-shadow-lg`}
          >
            <path 
              d="M20 5L30 27.5H10L20 5Z" 
              fill="currentColor" 
              fillOpacity="0.8"
            />
            <circle 
              cx="20" 
              cy="25" 
              r="10" 
              fill="currentColor" 
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-50 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            background: `radial-gradient(circle, rgba(10, 132, 255, 0.6) 0%, rgba(10, 132, 255, 0) 70%)`,
            zIndex: -1
          }}
        />
      </div>
      <motion.div 
        className="ml-2 font-semibold text-auth-foreground"
        style={{ fontSize: size === 'sm' ? '1.25rem' : size === 'md' ? '1.5rem' : '2rem' }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        Haven
      </motion.div>
    </motion.div>
  );
};

export default Logo;
