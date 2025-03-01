
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import AuthForm from '@/components/AuthForm';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Preload animation when component mounts
  useEffect(() => {
    const preloadFramerMotion = async () => {
      await import('framer-motion');
    };
    preloadFramerMotion();
  }, []);

  return (
    <AnimatedBackground>
      <div className="container px-4 py-8 md:py-16 mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen">
        {/* Left side (Hidden on mobile) */}
        {!isMobile && (
          <motion.div 
            className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
          >
            <Logo size="lg" className="mb-12" />
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-auth-foreground leading-tight">
                Secure authentication for the modern web
              </h1>
              
              <p className="text-lg text-auth-muted md:pr-12">
                Experience seamless security with our elegant authentication solution. Simple, fast, and beautifully designed.
              </p>
              
              <div className="pt-4">
                <div className="flex flex-wrap items-center gap-6">
                  {['Fast', 'Secure', 'Beautiful'].map((feature, index) => (
                    <motion.div 
                      key={feature}
                      className="flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-auth-accent/20 text-auth-accent mr-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-auth-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating details cards */}
            <div className="relative h-64 mt-12">
              <motion.div 
                className="absolute glass-morphism rounded-xl p-4 w-64 shadow-lg"
                style={{ top: '10%', left: '5%' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-auth-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 className="ml-2 font-medium text-auth-foreground">Enhanced Security</h3>
                </div>
                <p className="text-sm text-auth-muted">Industry-standard encryption with advanced protection mechanisms.</p>
              </motion.div>
              
              <motion.div 
                className="absolute glass-morphism rounded-xl p-4 w-64 shadow-lg"
                style={{ top: '45%', left: '25%' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-auth-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <h3 className="ml-2 font-medium text-auth-foreground">User Friendly</h3>
                </div>
                <p className="text-sm text-auth-muted">Designed for the best possible user experience and satisfaction.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Mobile Logo (Visible only on mobile) */}
        {isMobile && (
          <motion.div 
            className="w-full mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Logo size="md" className="mx-auto" />
          </motion.div>
        )}
        
        {/* Right side (Auth Form) */}
        <div className="w-full md:w-1/2">
          <GlassCard className="shadow-xl">
            <AuthForm />
          </GlassCard>
          
          {/* Mobile footer text (Visible only on mobile) */}
          {isMobile && (
            <motion.p 
              className="text-center text-sm text-auth-muted mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Secure authentication for the modern web
            </motion.p>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Index;
