
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-auth-background">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70" />
      
      {/* Animated blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ 
          background: 'linear-gradient(135deg, #0A84FF 0%, #30D158 100%)',
          translateX: '20%',
          translateY: '-40%'
        }}
        animate={{
          scale: [1, 1.05, 1],
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ 
          background: 'linear-gradient(135deg, #5E5CE6 0%, #0A84FF 100%)',
          translateX: '-20%',
          translateY: '30%'
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
