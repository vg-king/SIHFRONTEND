import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '../components/WelcomeScreen';

const HomePage = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const handleGetStarted = (initialMessage = null) => {
    if (initialMessage) {
      navigate('/chat', { state: { initialMessage } });
    } else {
      navigate('/suggestions');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto mobile-scroll"
    >
      <WelcomeScreen 
        onGetStarted={handleGetStarted}
        currentLanguage={currentLanguage}
      />
    </motion.div>
  );
};

export default HomePage;