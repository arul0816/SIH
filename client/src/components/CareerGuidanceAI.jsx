// components/CareerGuidanceAI.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CareerGuidanceAI = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    USERDATA,
    currentConversation,
    conversations,
    createAISession,
    sendMessage,
    getConversation,
    fetchConversations,
    deleteConversation,
    clearCurrentConversation
  } = useContext(AppContext);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEducationSelector, setShowEducationSelector] = useState(false);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [responseStartTime, setResponseStartTime] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations on mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchConversations();
    }
  }, [isLoggedIn]);

  // Load current conversation messages
  useEffect(() => {
    if (currentConversation?.messages) {
      setMessages(currentConversation.messages);
      
      // Find current question if any
      const lastMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage?.questionData) {
        setCurrentQuestion(lastMessage.questionData);
        setSelectedAnswers([]);
      }
    }
  }, [currentConversation]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to access AI Career Guidance");
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Start new session
  const handleStartNewSession = async () => {
    if (!selectedEducationLevel) {
      toast.error("Please select your education level");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createAISession(selectedEducationLevel);
      if (result.success) {
        setShowEducationSelector(false);
        setMessages(result.conversation.messages);
        
        // Check if there's a question in the welcome message
        const welcomeMessage = result.conversation.messages[result.conversation.messages.length - 1];
        if (welcomeMessage?.questionData) {
          setCurrentQuestion(welcomeMessage.questionData);
        }
      }
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answer, answerIndex) => {
    if (!currentQuestion) return;

    if (currentQuestion.questionType === 'multiselect') {
      const maxSelections = currentQuestion.maxSelections || 3;
      
      if (selectedAnswers.includes(answer)) {
        // Remove if already selected
        setSelectedAnswers(prev => prev.filter(a => a !== answer));
      } else if (selectedAnswers.length < maxSelections) {
        // Add if under limit
        setSelectedAnswers(prev => [...prev, answer]);
      } else {
        toast.warning(`You can select maximum ${maxSelections} options`);
      }
    } else {
      // Single selection
      setSelectedAnswers([answer]);
      // Auto-submit for single selection
      setTimeout(() => handleSubmitAnswer([answer], answerIndex), 500);
    }
  };

  // Submit answer
  const handleSubmitAnswer = async (answers = selectedAnswers, answerIndex = null) => {
    if (!currentQuestion || answers.length === 0) {
      toast.error("Please select an answer");
      return;
    }

    setIsLoading(true);
    setResponseStartTime(Date.now());

    try {
      const userResponse = {
        answer: currentQuestion.questionType === 'multiselect' ? answers.join(', ') : answers[0],
        answerIndex: answerIndex,
        confidence: 5, // Default confidence
        timeSpent: responseStartTime ? Math.round((Date.now() - responseStartTime) / 1000) : 0
      };

      const messageData = {
        content: userResponse.answer,
        questionData: currentQuestion,
        userResponse
      };

      const result = await sendMessage(currentConversation._id, messageData);
      
      if (result.success) {
        // Messages will be updated through context
        setCurrentQuestion(result.response?.questionData || null);
        setSelectedAnswers([]);
        setInputMessage('');
      }
    } catch (error) {
      console.error('Error sending answer:', error);
    } finally {
      setIsLoading(false);
      setResponseStartTime(null);
    }
  };

  // Handle text input submit
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const messageData = {
        content: inputMessage.trim(),
        questionData: currentQuestion,
        userResponse: {
          answer: inputMessage.trim(),
          confidence: 5,
          timeSpent: responseStartTime ? Math.round((Date.now() - responseStartTime) / 1000) : 0
        }
      };

      const result = await sendMessage(currentConversation._id, messageData);
      
      if (result.success) {
        setCurrentQuestion(result.response?.questionData || null);
        setSelectedAnswers([]);
        setInputMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load existing conversation
  // Load existing conversation
  const handleLoadConversation = async (conversationId) => {
    setIsLoading(true);
    try {
      const result = await getConversation(conversationId);
      if (result.success) {
        setShowSidebar(false);
        // Messages and current question will be set through useEffect
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete conversation
  const handleDeleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(conversationId);
    }
  };

  // Format message content
  const formatMessageContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Get progress percentage
  const getProgress = () => {
    if (!currentConversation?.context) return 0;
    return currentConversation.context.progressPercentage || 0;
  };

  // Show education selector if no current conversation
  if (!currentConversation && !showEducationSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                🤖 AI Career Guidance
              </h1>
              <p className="text-gray-600 text-lg">
                Get personalized career recommendations powered by AI
              </p>
            </div>

            {/* Welcome Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome, {USERDATA?.name}!
                </h2>
                <p className="text-gray-600">
                  Let's discover your perfect career path together
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">🧠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Smart Assessment</h3>
                    <p className="text-gray-600 text-sm">AI-powered questions that adapt to your responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Personalized Results</h3>
                    <p className="text-gray-600 text-sm">Tailored recommendations based on your profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🏫</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">J&K Focus</h3>
                    <p className="text-gray-600 text-sm">Colleges and opportunities in Jammu & Kashmir</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Detailed Analysis</h3>
                    <p className="text-gray-600 text-sm">Comprehensive career roadmap and insights</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowEducationSelector(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>🚀</span>
                  <span>Start New Assessment</span>
                </button>
                
                {conversations.length > 0 && (
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>📋</span>
                    <span>View Previous Sessions</span>
                  </button>
                )}
              </div>
            </div>

            {/* Previous Sessions Preview */}
            {conversations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sessions</h3>
                <div className="space-y-3">
                  {conversations.slice(0, 3).map((conv) => (
                    <div
                      key={conv._id}
                      onClick={() => handleLoadConversation(conv._id)}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          conv.status === 'completed' ? 'bg-green-500' : 
                          conv.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-800">{conv.title}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(conv.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education Level Selector Modal */}
        {showEducationSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Select Your Education Level
              </h3>
              <p className="text-gray-600 text-center mb-6">
                This helps us ask the right questions for your career guidance
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  { value: 'after10th', label: 'Just completed 10th grade', icon: '📚' },
                  { value: 'after12th', label: 'Completed 12th grade', icon: '🎓' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedEducationLevel(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                      selectedEducationLevel === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEducationSelector(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartNewSession}
                  disabled={!selectedEducationLevel || isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Starting...' : 'Start Assessment'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar for conversations */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Previous Sessions</h3>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
                {conversations.map((conv) => (
                  <div
                    key={conv._id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleLoadConversation(conv._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{conv.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(conv.updatedAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${
                            conv.status === 'completed' ? 'bg-green-500' : 
                            conv.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-xs text-gray-500 capitalize">{conv.status}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteConversation(conv._id, e)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main chat interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-t-2xl shadow-lg p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={clearCurrentConversation}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    AI Career Guidance
                  </h1>
                  <p className="text-sm text-gray-600">
                    {currentConversation?.title || 'Career Assessment'}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              {getProgress() > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{getProgress()}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${getProgress()}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white shadow-lg h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">🤖</span>
                      <span className="text-xs text-gray-500">AI Assistant</span>
                    </div>
                                      )}
                  
                  <div className="text-sm">
                    {formatMessageContent(message.content)}
                  </div>

                  {/* Progress indicator for AI messages */}
                  {message.role === 'assistant' && message.progressData && (
                    <div className="mt-2 text-xs text-gray-500">
                      Stage: {message.progressData.stage} • Question {message.progressData.currentQuestion}/{message.progressData.totalQuestions}
                    </div>
                  )}

                  {/* Recommendations display */}
                  {message.messageType === 'recommendations' && message.recommendationsData && (
                    <div className="mt-4 space-y-3">
                      {message.recommendationsData.map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                            </span>
                            <span className="font-semibold text-gray-800">
                              {rec.details.name}
                            </span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {rec.percentage}% match
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {rec.details.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            💰 {rec.details.salary_range} • 📈 {rec.details.job_prospects}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🤖</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Question Interface */}
          {currentQuestion && (
            <div className="bg-white shadow-lg p-4 border-t">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {currentQuestion.questionType === 'multiselect' ? 'Select your answers:' : 'Choose your answer:'}
                </h3>
                
                {currentQuestion.questionType === 'multiselect' && (
                  <p className="text-sm text-gray-600 mb-3">
                    You can select up to {currentQuestion.maxSelections || 3} options
                  </p>
                )}

                <div className="grid gap-2">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option, index)}
                      className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers.includes(option)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers.includes(option)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswers.includes(option) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Submit button for multiselect */}
                {currentQuestion.questionType === 'multiselect' && (
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {selectedAnswers.length} of {currentQuestion.maxSelections || 3} selected
                    </span>
                    <button
                      onClick={() => handleSubmitAnswer()}
                      disabled={selectedAnswers.length === 0 || isLoading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Submitting...' : 'Submit Answer'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Input (for open-ended questions or completed assessment) */}
          {(!currentQuestion || currentQuestion.questionType === 'text') && (
            <form onSubmit={handleTextSubmit} className="bg-white rounded-b-2xl shadow-lg p-4">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    currentQuestion?.questionType === 'text' 
                      ? "Type your answer..." 
                      : "Ask me anything about your career recommendations..."
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {/* New Session Button */}
        <button
          onClick={() => setShowEducationSelector(true)}
          className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          title="Start New Session"
        >
          <span className="text-xl">+</span>
        </button>

        {/* Sessions List Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          title="View All Sessions"
        >
          <span className="text-xl">📋</span>
        </button>

        {/* Help Button */}
        <button
          onClick={() => toast.info("Need help? Contact our support team!")}
          className="w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          title="Help"
        >
          <span className="text-xl">?</span>
        </button>
      </div>

      {/* Education Level Selector Modal */}
      {showEducationSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Start New Assessment
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Select your education level to begin a new career guidance session
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                { value: 'after10th', label: 'Just completed 10th grade', icon: '📚', desc: 'Explore streams and career options' },
                { value: 'after12th', label: 'Completed 12th grade', icon: '🎓', desc: 'Find the right college and course' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedEducationLevel(option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedEducationLevel === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <h4 className={`font-medium ${
                        selectedEducationLevel === option.value ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        {option.label}
                      </h4>
                      <p className={`text-sm ${
                        selectedEducationLevel === option.value ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {option.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowEducationSelector(false);
                  setSelectedEducationLevel('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartNewSession}
                disabled={!selectedEducationLevel || isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Start Assessment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for conversations */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Your Sessions</h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {conversations.length} session{conversations.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="overflow-y-auto h-full pb-20">
              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-400">📋</span>
                  </div>
                  <p className="text-gray-500">No sessions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start your first assessment!</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {conversations.map((conv) => (
                    <div
                      key={conv._id}
                      className="group p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all duration-200"
                      onClick={() => handleLoadConversation(conv._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm text-gray-800 truncate">
                              {conv.title}
                            </h4>
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              conv.status === 'completed' ? 'bg-green-500' : 
                              conv.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-2">
                            {new Date(conv.updatedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                            conv.status === 'completed' ? 'bg-green-100 text-green-800' :
                              conv.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {conv.status === 'completed' ? '✓ Completed' :
                               conv.status === 'active' ? '⏳ In Progress' : '⏸️ Paused'}
                            </span>
                            
                            {conv.context?.progressPercentage && (
                              <span className="text-xs text-gray-500">
                                {conv.context.progressPercentage}%
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => handleDeleteConversation(conv._id, e)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm p-1 rounded transition-all duration-200"
                          title="Delete session"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidanceAI;