import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Paperclip, 
  X, 
  MicOff,
  Image,
  FileText,
  Camera
} from 'lucide-react';

const ChatInput = ({ onSendMessage, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage({
        text: message.trim(),
        files: attachedFiles,
        timestamp: new Date().toISOString()
      });
      setMessage('');
      setAttachedFiles([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
    if (!isRecording) {
      // Start recording
      console.log('Starting voice recording...');
    } else {
      // Stop recording
      console.log('Stopping voice recording...');
    }
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const fileObj = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      };
      setAttachedFiles(prev => [...prev, fileObj]);
    });
    setShowFileMenu(false);
  };

  const removeFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm p-3 sm:p-6 pb-safe-area-inset-bottom">
      {/* Attached Files Preview */}
      {attachedFiles.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 space-y-2"
        >
          {attachedFiles.map((file) => (
            <motion.div
              key={file.id}
              layout
              className="flex items-center space-x-3 bg-slate-50 rounded-xl p-3 border border-slate-200"
            >
              {file.preview ? (
                <img src={file.preview} alt={file.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
              ) : (
                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-slate-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Main Input Area */}
      <div className="flex items-end space-x-2 sm:space-x-4">
        {/* Attachment Menu */}
        <div className="relative">
          <button
            onClick={() => setShowFileMenu(!showFileMenu)}
            className="p-2 sm:p-3 rounded-xl border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex-shrink-0"
            disabled={disabled}
          >
            <Paperclip className="w-5 h-5 text-slate-600" />
          </button>

          {showFileMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-3 left-0 bg-white border border-slate-200 rounded-xl shadow-xl p-2 min-w-[220px]"
            >
              <button
                onClick={() => imageInputRef.current?.click()}
                className="w-full flex items-center space-x-3 p-3 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
              >
                <Image className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700">Upload Image</span>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Upload Document</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors">
                <Camera className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-slate-700">Take Photo</span>
              </button>
            </motion.div>
          )}

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileUpload(e, 'document')}
            className="hidden"
          />
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image')}
            className="hidden"
          />
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about healthcare…"
            disabled={disabled}
            className="w-full p-3 sm:p-4 pr-12 sm:pr-14 border-2 border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 disabled:bg-slate-50 disabled:text-slate-400 placeholder-slate-500 text-slate-700 font-medium transition-all duration-200 text-sm sm:text-base"
            rows={message.split('\n').length || 1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Character counter for long messages */}
          {message.length > 200 && (
            <div className="absolute bottom-3 right-3 text-xs text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm">
              {message.length}/500
            </div>
          )}
        </div>

        {/* Voice Input */}
        <button
          onClick={toggleRecording}
          disabled={disabled}
          className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 flex-shrink-0 ${
            isRecording
              ? 'bg-red-50 border-red-300 text-red-600 animate-pulse shadow-lg'
              : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Send Button */}
        <motion.button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && attachedFiles.length === 0)}
          className={`p-2 sm:p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
            disabled || (!message.trim() && attachedFiles.length === 0)
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200'
              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl border-2 border-emerald-600'
          }`}
          whileHover={!disabled && (message.trim() || attachedFiles.length > 0) ? { scale: 1.05, y: -1 } : {}}
          whileTap={!disabled && (message.trim() || attachedFiles.length > 0) ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center justify-center space-x-2 text-red-600"
        >
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full typing-dot"></div>
          </div>
          <span className="text-sm">Recording voice message...</span>
        </motion.div>
      )}

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center space-x-2 text-secondary-500"
        >
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-secondary-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full typing-dot"></div>
          </div>
          <span className="text-sm">Health AI is typing...</span>
        </motion.div>
      )}
    </div>
  );
};

export default ChatInput;