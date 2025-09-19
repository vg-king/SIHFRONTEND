import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PreventionPage from './pages/PreventionPage';
import SuggestionsPage from './pages/SuggestionsPage';

function App() {
  // State management
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Router>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-teal-200/20 to-emerald-200/20 rounded-full blur-2xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 15, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="flex h-screen max-h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            isMobileOpen={isMobileMenuOpen}
            onMobileClose={handleMobileMenuClose}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full min-h-0 w-full md:w-auto relative z-10">
            {/* Navigation Bar */}
            <Navigation 
              onMobileMenuToggle={handleMobileMenuToggle}
              isMobileMenuOpen={isMobileMenuOpen}
            />
            
            {/* Page Content */}
            <main className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50 md:border-l border-slate-200 min-h-0">
              <Routes>
                <Route path="/" element={<HomePage currentLanguage={currentLanguage} />} />
                <Route path="/chat" element={
                  <div className="h-full overflow-hidden">
                    <ChatPage currentLanguage={currentLanguage} />
                  </div>
                } />
                <Route path="/suggestions" element={<SuggestionsPage currentLanguage={currentLanguage} />} />
                <Route path="/prevention" element={<PreventionPage currentLanguage={currentLanguage} />} />
                <Route path="/symptoms" element={
                  <div className="p-4 md:p-8 text-center text-slate-600 h-full flex items-center justify-center overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-md mx-auto"
                    >
                      <h2 className="text-xl md:text-2xl font-bold mb-4">Symptom Checker</h2>
                      <p className="text-slate-500">Coming Soon!</p>
                    </motion.div>
                  </div>
                } />
                <Route path="/vaccination" element={
                  <div className="p-4 md:p-8 text-center text-slate-600 h-full flex items-center justify-center overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-md mx-auto"
                    >
                      <h2 className="text-xl md:text-2xl font-bold mb-4">Vaccination Center</h2>
                      <p className="text-slate-500">Coming Soon!</p>
                    </motion.div>
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </div>
      </motion.div>
    </Router>
  );
}

export default App;
