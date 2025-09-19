import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw, AlertTriangle, CheckCircle, Info, ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatInterface = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      setShowScrollTop(container.scrollTop > 300);
    }
  };

  useEffect(() => {
    // Only auto-scroll for new messages, not when component first loads
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleFeedback = (messageId, type) => {
    console.log(`Feedback: ${type} for message ${messageId}`);
    // Handle feedback logic here
  };

  const getMessageTypeStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'border-l-4 border-amber-500 bg-amber-50';
      case 'success':
        return 'border-l-4 border-emerald-500 bg-emerald-50';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return '';
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-700" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-700" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-700" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-700" />;
      default:
        return null;
    }
  };

  const MessageBubble = ({ message, index }) => {
    const isUser = message.sender === 'user';
    const isBot = message.sender === 'bot';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 max-w-[85%] ${isUser ? 'flex justify-end' : ''}`}>
          <div className={`rounded-2xl p-5 shadow-sm ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
              : `bg-white border border-slate-200 ${getMessageTypeStyle(message.type)}`
          }`}>
            
            {/* Message Type Icon */}
            {isBot && message.type && (
              <div className="flex items-center space-x-2 mb-3">
                {getMessageIcon(message.type)}
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {message.type}
                </span>
              </div>
            )}

            {/* Message Text */}
            <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : ''}`}>
              {isBot ? (
                <ReactMarkdown
                  components={{
                    // Custom components for better styling
                    h1: ({children}) => <h1 className="text-lg font-bold mb-3 text-slate-800">{children}</h1>,
                    h2: ({children}) => <h2 className="text-base font-bold mb-2 text-slate-800">{children}</h2>,
                    h3: ({children}) => <h3 className="text-sm font-semibold mb-2 text-slate-700">{children}</h3>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-1 mb-3 text-slate-700">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-1 mb-3 text-slate-700">{children}</ol>,
                    li: ({children}) => <li className="text-sm leading-relaxed">{children}</li>,
                    p: ({children}) => <p className="mb-3 last:mb-0 text-sm leading-relaxed text-slate-700">{children}</p>,
                    strong: ({children}) => <strong className="font-semibold text-slate-800">{children}</strong>,
                    em: ({children}) => <em className="italic text-slate-600">{children}</em>,
                    code: ({children}) => <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-800">{children}</code>,
                    table: ({children}) => (
                      <div className="overflow-x-auto mb-3 rounded-lg border border-slate-200">
                        <table className="min-w-full text-xs">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({children}) => <th className="border border-slate-200 px-3 py-2 bg-slate-50 font-semibold text-left text-slate-700">{children}</th>,
                    td: ({children}) => <td className="border border-slate-200 px-3 py-2 text-slate-600">{children}</td>,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              ) : (
                <p className="text-sm leading-relaxed">{message.text}</p>
              )}
            </div>

            {/* File Attachments */}
            {message.files && message.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {message.files.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-slate-600">📄</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 font-medium truncate">{file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <div className={`mt-3 text-xs ${isUser ? 'text-blue-200' : 'text-slate-500'} font-medium`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>

          {/* Bot Message Actions */}
          {isBot && (
            <div className="flex items-center space-x-1 mt-3 ml-2">
              <button
                onClick={() => copyToClipboard(message.text)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors group"
                title="Copy message"
              >
                <Copy className="w-4 h-4 text-secondary-500" />
              </button>
              
              <button
                onClick={() => handleFeedback(message.id, 'like')}
                className="p-1 rounded hover:bg-secondary-100 transition-colors"
                title="Helpful"
              >
                <ThumbsUp className="w-4 h-4 text-secondary-500" />
              </button>
              
              <button
                onClick={() => handleFeedback(message.id, 'dislike')}
                className="p-1 rounded hover:bg-secondary-100 transition-colors"
                title="Not helpful"
              >
                <ThumbsDown className="w-4 h-4 text-secondary-500" />
              </button>
              
              <button
                onClick={() => handleFeedback(message.id, 'regenerate')}
                className="p-1 rounded hover:bg-secondary-100 transition-colors"
                title="Regenerate response"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-scroll p-3 sm:p-6 space-y-4 sm:space-y-8 bg-gradient-to-b from-slate-50 to-white"
      style={{ 
        height: 'calc(100vh - 300px)', 
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
      </AnimatePresence>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-start space-x-3"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full typing-dot"></div>
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full typing-dot"></div>
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full typing-dot"></div>
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-40 right-6 z-10 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;