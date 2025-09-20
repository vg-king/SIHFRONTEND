import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  Heart, 
  Shield, 
  Activity,
  Globe,
  Settings,
  HelpCircle,
  Sparkles,
  Users,
  Zap,
  Home,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useUtils';

const Sidebar = ({ isCollapsed, onToggle, currentLanguage, onLanguageChange, children, isMobileOpen, onMobileClose }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/chat') return 'chat';
    if (path === '/prevention') return 'prevention';
    if (path === '/symptoms') return 'symptoms';
    if (path === '/vaccination') return 'vaccination';
    return 'home';
  };

  const activeSection = getActiveSection();

  const sidebarVariants = {
    expanded: { 
      width: '350px',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    collapsed: { 
      width: '80px',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const mobileOverlayVariants = {
    hidden: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileSidebarVariants = {
    hidden: { 
      x: '-100%',
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    visible: { 
      x: '0%',
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    // Only close mobile menu after navigation starts
    if (isMobile && isMobileOpen) {
      // Small delay to ensure navigation happens first
      setTimeout(() => {
        onMobileClose();
      }, 100);
    }
  };

  const menuItems = [
    { 
      id: 'home', 
      path: '/',
      icon: Home, 
      label: 'Home', 
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      hoverColor: 'hover:bg-slate-100'
    },
    { 
      id: 'chat', 
      path: '/chat',
      icon: Bot, 
      label: 'Health Assistant', 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100'
    },
    { 
      id: 'prevention', 
      path: '/prevention',
      icon: Shield, 
      label: 'Prevention Hub', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    { 
      id: 'symptoms', 
      path: '/symptoms',
      icon: Activity, 
      label: 'Symptom Checker', 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100'
    },
    { 
      id: 'vaccination', 
      path: '/vaccination',
      icon: Heart, 
      label: 'Vaccination Center', 
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      hoverColor: 'hover:bg-rose-100'
    },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', native: 'Hindi' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', native: 'Bengali' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', native: 'Tamil' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳', native: 'Telugu' },
  ];

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
    active: { scale: 1.05, rotate: 0 }
  };

  // Mobile Overlay Component
  if (isMobile) {
    return (
      <>
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMobileClose();
              }}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col z-50 md:hidden"
              variants={mobileSidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ willChange: 'transform' }}
            >
              {/* Mobile Header */}
              <div className="relative z-10 p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="relative w-12 h-12 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bot className="w-6 h-6 text-white" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">WELL BOT</h1>
                      <p className="text-xs text-slate-600 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered Care</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    onClick={onMobileClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </motion.button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                    Healthcare Modules
                  </p>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.1), duration: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => handleNavigate(item.path)}
                        className={cn(
                          "w-full justify-start p-4 h-auto text-left transition-all duration-300 relative overflow-hidden group border-2 border-transparent",
                          activeSection === item.id
                            ? `${item.bgColor} border-slate-200 text-slate-800 shadow-md bg-gradient-to-r from-white to-slate-50`
                            : `text-slate-600 hover:text-slate-800 ${item.hoverColor} hover:border-slate-200`
                        )}
                      >
                        <div className="flex items-center space-x-4 relative z-10">
                          <div className={cn(
                            "p-2 rounded-lg transition-colors",
                            activeSection === item.id ? item.bgColor : "group-hover:bg-slate-100"
                          )}>
                            <item.icon className={cn("w-5 h-5", item.color)} />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Language Selector */}
                <div className="mt-8">
                  <Card className="p-4 bg-gradient-to-br from-slate-50 to-white border-slate-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg">
                        <Globe className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Language</span>
                    </div>
                    <select
                      value={currentLanguage}
                      onChange={(e) => onLanguageChange(e.target.value)}
                      className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code} className="bg-white text-slate-700">
                          {lang.flag} {lang.native}
                        </option>
                      ))}
                    </select>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <motion.div
      className="sticky top-0 left-0 bg-white/95 backdrop-blur-sm border-r border-slate-200 shadow-xl h-screen overflow-hidden z-40 hidden md:flex md:flex-col"
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-4 w-24 h-24 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-4"
              >
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bot className="w-6 h-6 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    WELL BOT
                  </h1>
                  <p className="text-xs text-slate-600 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>AI-Powered Care</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="relative z-10 flex-1 p-4 space-y-3">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                Healthcare Modules
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "w-full justify-start p-4 h-auto text-left transition-all duration-300 relative overflow-hidden group border-2 border-transparent",
                  activeSection === item.id
                    ? `${item.bgColor} border-slate-200 text-slate-800 shadow-md bg-gradient-to-r from-white to-slate-50`
                    : `text-slate-600 hover:text-slate-800 ${item.hoverColor} hover:border-slate-200`,
                  isCollapsed ? "justify-center px-4" : "justify-start"
                )}
              >
                <motion.div
                  className="flex items-center space-x-4 relative z-10"
                  variants={iconVariants}
                  animate={hoveredItem === item.id ? "hover" : activeSection === item.id ? "active" : "rest"}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeSection === item.id ? item.bgColor : "group-hover:bg-slate-100"
                  )}>
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1"
                      >
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Hover glow effect */}
                {hoveredItem === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </nav>

        {/* Language Selector */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card className="p-4 bg-white border border-slate-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg">
                    <Globe className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Language</span>
                </div>
                <select
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white text-slate-700">
                      {lang.flag} {lang.native}
                    </option>
                  ))}
                </select>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="relative z-10 p-4 border-t border-navy-800/30 space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-navy-300 hover:text-navy-100 hover:bg-navy-800/50",
            isCollapsed ? "justify-center px-4" : "justify-start"
          )}
        >
          <Settings className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-navy-300 hover:text-navy-100 hover:bg-navy-800/50",
            isCollapsed ? "justify-center px-4" : "justify-start"
          )}
        >
          <HelpCircle className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                Help & Support
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        
        {/* Status Indicator */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-700/30"
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <span className="text-xs font-medium text-emerald-300">System Online</span>
                  <p className="text-xs text-emerald-500">All services operational</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;