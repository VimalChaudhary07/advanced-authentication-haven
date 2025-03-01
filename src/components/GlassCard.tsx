
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={`auth-card ${className}`}
      whileHover={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        y: -4,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
