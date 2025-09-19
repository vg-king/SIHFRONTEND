import React from 'react';
import { motion } from 'framer-motion';

const MobileMenu = ({ isOpen, onToggle, className = "" }) => {
  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 }
  };

  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 }
  };

  return (
    <motion.button
      onClick={onToggle}
      className={`relative z-50 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <motion.div
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-0.5 bg-slate-700 rounded-full mb-1.5"
        />
        <motion.div
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-0.5 bg-slate-700 rounded-full mb-1.5"
        />
        <motion.div
          variants={line3Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-0.5 bg-slate-700 rounded-full"
        />
      </div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-emerald-500/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default MobileMenu;