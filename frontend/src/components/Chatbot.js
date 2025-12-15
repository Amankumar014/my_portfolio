import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Mitra, an AI assistant who can answer questions about Aman Kumar Sah. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/chatbot/ask', {
        question: userMessage.text,
        thread_id: 'default'
      });

      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || 'Failed to get response');
      }
    } catch (err) {
      setError('Failed to get response. Please try again.');
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbot = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else if (isOpen && !isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="chatbot__toggle"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen && !isMinimized ? <FiMinimize2 /> : <FiMessageCircle />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot__window ${isMinimized ? 'chatbot__window--minimized' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chatbot Header */}
            <div className="chatbot__header">
              <div className="chatbot__header-info">
                <div className="chatbot__avatar">AI</div>
                <div>
                  <h3 className="chatbot__title">Mitra</h3>
                  <span className="chatbot__subtitle">Ask me about Aman</span>
                </div>
              </div>
              <div className="chatbot__header-actions">
                <button
                  className="chatbot__button chatbot__button--minimize"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label="Minimize"
                >
                  <FiMinimize2 />
                </button>
                <button
                  className="chatbot__button chatbot__button--close"
                  onClick={closeChatbot}
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Chatbot Messages */}
            {!isMinimized && (
              <div className="chatbot__messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chatbot__message chatbot__message--${message.sender}`}
                  >
                    <div className="chatbot__message-content">
                      {message.text}
                    </div>
                    <div className="chatbot__message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="chatbot__message chatbot__message--bot">
                    <div className="chatbot__message-content chatbot__message--loading">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="chatbot__error">{error}</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chatbot Input */}
            {!isMinimized && (
              <form className="chatbot__input-form" onSubmit={handleSendMessage}>
                <input
                  ref={inputRef}
                  type="text"
                  className="chatbot__input"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="chatbot__send-button"
                  disabled={loading || !inputMessage.trim()}
                  aria-label="Send message"
                >
                  <FiSend />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

