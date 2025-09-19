import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import ChatInput from '../components/ChatInput';

const ChatPage = ({ currentLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Call your backend ML API with environment detection
  const callHealthAIAPI = async (userMessage) => {
    try {
      // Use different endpoints for development vs production
      const isDevelopment = import.meta.env.DEV;
      
      const apiUrl = isDevelopment 
        ? '/api/rag'  // Use proxy in development
        : '/api/rag';  // Use Vercel serverless function in production

      console.log('API URL:', apiUrl, 'Environment:', isDevelopment ? 'development' : 'production');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Return the response from your API
      return {
        text: data.answer || data.response || data.message || 'I apologize, but I couldn\'t process your request at the moment. Please try again.',
        type: data.type || null
      };
    } catch (error) {
      console.error('Error calling Health AI API:', error);
      
      // Fallback response if API fails
      return {
        text: `I'm currently experiencing some technical difficulties connecting to the health database. Please try again in a moment.

**If this is a medical emergency, please:**
- 🚨 Call your local emergency services immediately
- 📞 Contact your nearest healthcare center
- 🏥 Visit the emergency room

**For non-urgent queries:**
- Try rephrasing your question
- Check your internet connection
- Contact your local health department

**Error details:** ${error.message}`,
        type: 'error'
      };
    }
  };

  // Handle sending messages
  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageData.text,
      files: messageData.files,
      timestamp: messageData.timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Call your backend API
      const botResponseData = await callHealthAIAPI(messageData.text);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseData.text,
        type: botResponseData.type,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Fallback message if everything fails
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again later or contact your healthcare provider for urgent medical concerns.',
        type: 'error',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Hide typing indicator
      setIsTyping(false);
    }
  };

  // Handle initial message from navigation
  useEffect(() => {
    if (location.state?.initialMessage) {
      handleSendMessage({
        text: location.state.initialMessage,
        files: [],
        timestamp: new Date().toISOString()
      });
      // Clear the state to prevent re-sending on refresh
      navigate('/chat', { replace: true });
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-full max-h-screen bg-white md:bg-gradient-to-br md:from-slate-50 md:via-white md:to-blue-50"
    >
      <div className="flex-1 overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
        />
      </div>
      <div className="flex-shrink-0 border-t border-slate-200 bg-white" style={{ minHeight: '120px' }}>
        <ChatInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          disabled={isTyping}
        />
      </div>
    </motion.div>
  );
};

export default ChatPage;