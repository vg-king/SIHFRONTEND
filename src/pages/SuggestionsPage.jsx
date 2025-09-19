import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuickSuggestions from '../components/QuickSuggestions';

const SuggestionsPage = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion) => {
    navigate('/chat', { state: { initialMessage: suggestion } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full overflow-y-auto mobile-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
    >
      <QuickSuggestions 
        onSuggestionClick={handleSuggestionClick}
        currentLanguage={currentLanguage}
      />
    </motion.div>
  );
};

export default SuggestionsPage;