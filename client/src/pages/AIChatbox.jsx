import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  FaRobot, 
  FaUser, 
  FaPaperPlane, 
  FaPlus, 
  FaHistory, 
  FaTimes,
  FaTrash,
  FaMicrophone,
  FaStop
} from 'react-icons/fa';
import { BACKENDURL } from '../Config/Config';

const AIChatbox = ({ isLoggedIn, userData }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [chatSessions, setChatSessions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to use AI Chat');
      navigate('/login');
      return;
    }
    
    // Load chat sessions and create new one if none exists
    loadChatSessions();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatSessions = async () => {
    try {
            const response = await axios.get(`${BACKENDURL}/api/ai/chat/sessions`, {
        withCredentials: true
      });

      if (response.data.success) {
        setChatSessions(response.data.sessions);
        
        // If no sessions exist, create a new one
        if (response.data.sessions.length === 0) {
          createNewChat();
        } else {
          // Load the most recent session
          const latestSession = response.data.sessions[0];
          setCurrentSessionId(latestSession.sessionId);
          loadChatHistory(latestSession.sessionId);
        }
      }
    } catch (error) {
      console.error('Load sessions error:', error);
      createNewChat(); // Fallback to creating new chat
    }
  };

  const createNewChat = async () => {
    try {
      const response = await axios.post(`${BACKENDURL}/api/ai/chat/create`, {}, {
        withCredentials: true
      });

      if (response.data.success) {
        const newSessionId = response.data.sessionId;
        setCurrentSessionId(newSessionId);
        setMessages([
          {
            role: 'assistant',
            content: `Hello ${userData?.name || 'there'}! 👋 I'm your AI Career Counselor. I'm here to help you with:

• Career guidance and course recommendations
• College and university information
• Study tips and academic advice
• Career planning and goal setting
• Any questions about education in Jammu & Kashmir

How can I assist you today?`,
            timestamp: new Date()
          }
        ]);
        
        // Refresh sessions list
        loadChatSessions();
        toast.success('New chat created!');
      }
    } catch (error) {
      console.error('Create chat error:', error);
      toast.error('Failed to create new chat');
    }
  };

  const loadChatHistory = async (sessionId) => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/ai/chat/history/${sessionId}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error('Load chat history error:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${BACKENDURL}/api/ai/chat/message`, {
        sessionId: currentSessionId,
        message: userMessage.content
      }, { withCredentials: true });

      if (response.data.success) {
        const aiMessage = {
          role: 'assistant',
          content: response.data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Send message error:', error);
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or create a new chat session.',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response');
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchToSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    loadChatHistory(sessionId);
    setShowSidebar(false);
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`${BACKENDURL}/api/ai/chat/session/${sessionId}`, {
        withCredentials: true
      });
      
      // Remove from local state
      setChatSessions(prev => prev.filter(session => session.sessionId !== sessionId));
      
      // If deleted session was current, create new one
      if (sessionId === currentSessionId) {
        createNewChat();
      }
      
      toast.success('Chat deleted');
    } catch (error) {
      console.error('Delete session error:', error);
      toast.error('Failed to delete chat');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-4">Please login to chat with AI Counselor</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="fixed inset-0 z-50 lg:relative lg:inset-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop for mobile */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
            
            {/* Sidebar content */}
            <motion.div
              className="relative bg-white w-80 h-full shadow-lg flex flex-col"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Chat History</h2>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <button
                  onClick={createNewChat}
                  className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 justify-center"
                >
                  <FaPlus /> New Chat
                </button>
              </div>

              {/* Chat Sessions List */}
              <div className="flex-1 overflow-y-auto p-4">
                {chatSessions.length === 0 ? (
                  <p className="text-gray-500 text-center">No chat history</p>
                ) : (
                  <div className="space-y-2">
                    {chatSessions.map((session) => (
                      <div
                        key={session.sessionId}
                        className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                          session.sessionId === currentSessionId
                            ? 'bg-blue-100 border-blue-300'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => switchToSession(session.sessionId)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-800 truncate">
                              {session.title}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {session.lastMessage}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(session.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.sessionId);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FaHistory />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">AI Career Counselor</h1>
                  <p className="text-sm text-gray-600">
                    {isTyping ? 'Typing...' : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden lg:block text-gray-500 hover:text-gray-700 p-2"
              >
                <FaHistory />
              </button>
              <button
                onClick={createNewChat}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <FaPlus /> New Chat
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.isError 
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                }`}>
                  {message.role === 'user' ? (
                    <span className="text-sm font-bold">
                      {userData?.name?.charAt(0) || 'U'}
                    </span>
                  ) : (
                    <FaRobot className="text-sm" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.isError
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' 
                      ? 'text-blue-100' 
                      : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about careers, courses, or education..."
                                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isTyping}
              />
              
              {/* Character count */}
              <div className="absolute bottom-1 right-1 text-xs text-gray-400">
                {inputMessage.length}/500
              </div>
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isTyping ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Tell me about engineering courses",
              "Best colleges in J&K",
              "Career after 12th science",
              "Scholarship opportunities"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbox;