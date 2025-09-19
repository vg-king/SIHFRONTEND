import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Bot,
  Sparkles
} from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navigation = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const currentPath = location.pathname;
  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Welcome';
      case '/chat':
        return 'Health Assistant';
      case '/suggestions':
        return 'Quick Suggestions';
      case '/prevention':
        return 'Prevention Hub';
      case '/symptoms':
        return 'Symptom Checker';
      case '/vaccination':
        return 'Vaccination Center';
      default:
        return 'Health AI';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm"
    >
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden">
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onToggle={onMobileMenuToggle}
        />
      </div>

      {/* Mobile Header - Center logo and title */}
      <div className="md:hidden flex-1 flex items-center justify-center space-x-3">
        <motion.div 
          className="w-8 h-8 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-lg flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          <Bot className="w-4 h-4 text-white" />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Health AI</h1>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-2">
        <motion.button
          onClick={handleBack}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </motion.button>

        <motion.button
          onClick={handleForward}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Go Forward"
        >
          <ArrowRight className="w-5 h-5 text-slate-600" />
        </motion.button>

        <motion.button
          onClick={handleRefresh}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Refresh"
        >
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </motion.button>
      </div>

      {/* Center - Current Page Title (Desktop only) */}
      <div className="hidden md:block flex-1 text-center">
        <motion.h1
          key={currentPath}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-slate-800"
        >
          {getPageTitle(currentPath)}
        </motion.h1>
        <motion.p
          className="text-xs text-slate-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {currentPath === '/' ? '/' : currentPath}
        </motion.p>
      </div>

      {/* Right Navigation Controls (Desktop only) */}
      <div className="hidden md:flex items-center space-x-2">
        <motion.button
          onClick={handleHome}
          className="p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Home"
        >
          <Home className="w-5 h-5 text-slate-600" />
        </motion.button>

        <motion.button
          onClick={() => window.open('http://localhost:5175', '_blank')}
          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Open in New Tab"
        >
          <ExternalLink className="w-4 h-4 text-slate-600" />
        </motion.button>
      </div>

      {/* Mobile placeholder for right side */}
      <div className="md:hidden w-12"></div>
    </motion.div>
  );
};

export default Navigation;