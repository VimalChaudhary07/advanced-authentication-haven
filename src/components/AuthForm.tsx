
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  className?: string;
}

const formVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3
    }
  }
};

const inputVariants = {
  hidden: { 
    opacity: 0,
    y: 10
  },
  visible: (i: number) => ({ 
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form when switching
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      // Clear form after success
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full px-3 py-1 bg-blue-50 text-auth-primary text-sm font-medium">
          {isLogin ? 'Welcome back!' : 'Create your account'}
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold text-center mb-8 text-auth-foreground">
        {isLogin ? 'Sign in to your account' : 'Join us today'}
      </h1>
      
      <AnimatePresence mode="wait">
        <motion.form
          key={isLogin ? 'login' : 'signup'}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {!isLogin && (
            <motion.div
              variants={inputVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <Label htmlFor="name" className="form-label">
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-auth-muted">
                  <User size={18} />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input pl-10"
                  required
                />
              </div>
            </motion.div>
          )}
          
          <motion.div
            variants={inputVariants}
            custom={isLogin ? 0 : 1}
            initial="hidden"
            animate="visible"
          >
            <Label htmlFor="email" className="form-label">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-auth-muted">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10"
                required
              />
            </div>
          </motion.div>
          
          <motion.div
            variants={inputVariants}
            custom={isLogin ? 1 : 2}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between">
              <Label htmlFor="password" className="form-label">
                Password
              </Label>
              {isLogin && (
                <a 
                  href="#" 
                  className="text-sm text-auth-primary hover:text-auth-primary/80 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Reset password link sent to your email");
                  }}
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-auth-muted">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-auth-muted hover:text-auth-foreground transition-colors"
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
          
          <motion.div
            variants={inputVariants}
            custom={isLogin ? 2 : 3}
            initial="hidden"
            animate="visible"
          >
            <Button
              type="submit"
              className="auth-button primary-button w-full flex items-center justify-center py-6 mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </motion.div>
          
          <motion.div
            variants={inputVariants}
            custom={isLogin ? 3 : 4}
            initial="hidden"
            animate="visible"
            className="text-center mt-6"
          >
            <p className="text-auth-muted text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleForm}
                className="ml-1 text-auth-primary hover:text-auth-primary/80 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>
          
          {isLogin && (
            <motion.div
              variants={inputVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="relative flex items-center justify-center mt-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative px-4 bg-white text-sm text-auth-muted">
                Or continue with
              </div>
            </motion.div>
          )}
          
          {isLogin && (
            <motion.div
              variants={inputVariants}
              custom={5}
              initial="hidden"
              animate="visible"
              className="flex space-x-3 mt-6"
            >
              <Button 
                type="button"
                variant="outline"
                className="auth-button secondary-button flex-1 py-5"
                onClick={() => toast.info("Google sign-in coming soon!")}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="auth-button secondary-button flex-1 py-5"
                onClick={() => toast.info("Apple sign-in coming soon!")}
              >
                <svg className="w-5 h-5 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.86-3.16.38-1.15-.5-2.19-.5-3.34 0-1.45.62-2.23.43-3.11-.38C2.86 15.7 3.56 7.8 8.42 7.45c1.22-.09 2.08.28 2.95.65.65.28 1.24.54 2.2.54.82 0 1.43-.27 2.09-.56.89-.39 1.83-.78 3.11-.58 1.52.21 2.67.93 3.42 2.02-1.39.8-2.38 2.07-2.38 4.13 0 2.23 1.31 3.57 2.85 4.35-.32.85-.69 1.65-1.41 2.29h0z" />
                  <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-.96 3.2-.65.86-1.68 1.54-2.98 1.45-.15-1.19.43-2.35 1-3.14z" />
                </svg>
                Apple
              </Button>
            </motion.div>
          )}
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
