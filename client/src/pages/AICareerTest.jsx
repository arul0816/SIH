import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaRobot, FaArrowRight, FaArrowLeft, FaCheck, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { BACKENDURL } from '../Config/Config';

const AICareerTest = ({ isLoggedIn, userData }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('welcome');
  const [educationLevel, setEducationLevel] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [currentLayer, setCurrentLayer] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [layer1Scores, setLayer1Scores] = useState({});

  // Question sets
  const questionSets = {
    after10th: {
      layer1: [
        {
          id: 1,
          question: "You are tasked with optimizing a process involving the flow of materials. Which approach would you prioritize?",
          options: [
            { id: 'A', text: 'Strength of the path', stream: 'civil' },
            { id: 'B', text: 'Mechanical advantage', stream: 'mechanical' },
            { id: 'C', text: 'Electrical efficiency', stream: 'electrical' },
            { id: 'D', text: 'Data reliability', stream: 'computer' },
            { id: 'E', text: 'Biological safety', stream: 'paramedical' }
          ]
        },
        {
          id: 2,
          question: "When troubleshooting a complex system, what is your first instinct?",
          options: [
            { id: 'A', text: 'Check structural integrity', stream: 'civil' },
            { id: 'B', text: 'Look for moving part failures', stream: 'mechanical' },
            { id: 'C', text: 'Measure current and voltage', stream: 'electrical' },
            { id: 'D', text: 'Analyze software logs', stream: 'computer' },
            { id: 'E', text: 'Observe physiological responses', stream: 'paramedical' }
          ]
        },
        // Add more questions from your set...
        {
          id: 15,
          question: "When under stress, you:",
          options: [
            { id: 'A', text: 'Focus on fundamentals', stream: 'civil' },
            { id: 'B', text: 'Move into action quickly', stream: 'mechanical' },
            { id: 'C', text: 'Analyze the system carefully', stream: 'electrical' },
            { id: 'D', text: 'Break problems into parts', stream: 'computer' },
            { id: 'E', text: 'Rely on empathy and patience', stream: 'paramedical' }
          ]
        }
      ],
      layer2: {
        civil: [
          {
            id: 1,
            question: "Which activity excites you most?",
            options: [
              { id: 'A', text: 'Designing buildings, bridges, or structures', dept: 'structural' },
              { id: 'B', text: 'Planning projects, managing timelines, and handling resources', dept: 'construction' },
              { id: 'C', text: 'Creating 3D digital models for planning and testing', dept: 'bim' },
              { id: 'D', text: 'Estimating costs, preparing budgets, and tracking contracts', dept: 'quantity' }
            ]
          }
          // Add more civil questions...
        ],
        mechanical: [
          {
            id: 1,
            question: "Which activity excites you most?",
            options: [
              { id: 'A', text: 'Working with general machines, engines, and mechanical components', dept: 'general' },
              { id: 'B', text: 'Designing, fixing, or improving vehicles and their parts', dept: 'automobile' },
              { id: 'C', text: 'Planning, organizing, and improving industrial production processes', dept: 'production' },
              { id: 'D', text: 'Installing, maintaining, or troubleshooting cooling and air systems', dept: 'refrigeration' }
            ]
          }
          // Add more mechanical questions...
        ]
        // Add other streams...
      }
    },
    after12th: {
      layer1: [
        {
          id: 1,
          question: "Which type of activities do you enjoy the most? (Select all that apply)",
          options: [
            { id: 'A', text: 'Reading, writing, or research', streams: ['law', 'research'] },
            { id: 'B', text: 'Solving puzzles, numbers, or logical problems', streams: ['science', 'it', 'research'] },
            { id: 'C', text: 'Painting, designing, or performing arts', streams: ['arts'] },
            { id: 'D', text: 'Helping or counseling others', streams: ['medical', 'psychology'] },
            { id: 'E', text: 'Working with machines, tools, or technology', streams: ['science', 'it'] },
            { id: 'F', text: 'Leading projects or organizing events', streams: ['management'] }
          ],
          type: 'multiple'
        }
        // Add more Layer 1 questions...
      ]
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to take the career test');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const startTest = async () => {
    if (!educationLevel) {
      toast.error('Please select your education level');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKENDURL}/api/ai/career-test/start`, {
        educationLevel
      }, { withCredentials: true });

      if (response.data.success) {
        setSessionId(response.data.sessionId);
        setCurrentStep('questions');
        toast.success('Career test started!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Start test error:', error);
      toast.error('Failed to start test');
    }
    setLoading(false);
  };

  const handleAnswer = async (selectedOption) => {
    const currentQuestions = getCurrentQuestions();
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    const answerData = {
      questionId: `${currentLayer}-${currentQuestion.id}`,
      questionText: currentQuestion.question,
      userAnswer: selectedOption.text,
      answerType: 'mcq',
      category: currentLayer === 1 ? 'stream_selection' : 'department_selection'
    };

    // Store answer locally
    setAnswers(prev => [...prev, answerData]);

    // Submit to backend
    try {
      await axios.post(`${BACKENDURL}/api/ai/career-test/answer`, {
        sessionId,
        ...answerData
      }, { withCredentials: true });
    } catch (error) {
      console.error('Submit answer error:', error);
    }

    // Calculate scores for layer 1
    if (currentLayer === 1) {
      updateLayer1Scores(selectedOption);
    }

    // Move to next question or layer
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentLayer === 1 && educationLevel === 'after10th') {
        // Move to layer 2
        const topStream = getTopStream();
        setCurrentLayer(2);
        setCurrentQuestionIndex(0);
        toast.success(`Moving to ${topStream} specialization questions`);
      } else {
        // Calculate final results
        calculateResults();
      }
    }
  };

  const updateLayer1Scores = (selectedOption) => {
    const newScores = { ...layer1Scores };
    
    if (educationLevel === 'after10th') {
      const stream = selectedOption.stream;
      newScores[stream] = (newScores[stream] || 0) + 1;
    } else {
      // For after12th, handle multiple streams
      if (selectedOption.streams) {
        selectedOption.streams.forEach(stream => {
          newScores[stream] = (newScores[stream] || 0) + 1;
        });
      }
    }
    
    setLayer1Scores(newScores);
  };

  const getTopStream = () => {
    const sortedStreams = Object.entries(layer1Scores)
      .sort(([,a], [,b]) => b - a);
    return sortedStreams[0]?.[0] || 'civil';
  };

  const getCurrentQuestions = () => {
    if (currentLayer === 1) {
      return questionSets[educationLevel].layer1;
    } else {
      const topStream = getTopStream();
      return questionSets[educationLevel].layer2[topStream] || [];
    }
  };

  const calculateResults = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKENDURL}/api/ai/career-test/results`, {
        sessionId
      }, { withCredentials: true });

      if (response.data.success) {
        setResults(response.data.results);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setShowResults(true);
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Calculate results error:', error);
      toast.error('Failed to calculate results');
    }
    setLoading(false);
  };

  const resetTest = () => {
    setCurrentStep('welcome');
    setEducationLevel('');
    setSessionId('');
    setCurrentLayer(1);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
    setLayer1Scores({});
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-4">Please login to take the AI Career Test</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Screen */}
        {currentStep === 'welcome' && (
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <FaGraduationCap className="text-6xl text-blue-500 mx-auto mb-4" />
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  AI Career Guidance Test
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover your perfect career path with our AI-powered assessment
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Select Your Education Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setEducationLevel('after10th')}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      educationLevel === 'after10th'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">🎓</div>
                    <h4 className="font-semibold">After 10th</h4>
                    <p className="text-sm text-gray-600">Diploma & Vocational Courses</p>
                  </button>
                  
                  <button
                    onClick={() => setEducationLevel('after12th')}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      educationLevel === 'after12th'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold">After 12th</h4>
                    <p className="text-sm text-gray-600">Undergraduate Programs</p>
                  </button>
                </div>
              </div>

              <button
                onClick={startTest}
                disabled={!educationLevel || loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Starting Test...
                  </>
                ) : (
                  <>
                    Start Assessment <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Questions Screen */}
        {currentStep === 'questions' && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <div className="flex justify-between items-center text-white mb-2">
                  <span className="font-semibold">
                    Layer {currentLayer} - {currentLayer === 1 ? 'Stream Selection' : 'Department Selection'}
                  </span>
                  <span>
                    {currentQuestionIndex + 1} / {getCurrentQuestions().length}
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / getCurrentQuestions().length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-8">
                {getCurrentQuestions().length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentLayer}-${currentQuestionIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {getCurrentQuestions()[currentQuestionIndex]?.question}
                      </h2>

                      <div className="space-y-3">
                        {getCurrentQuestions()[currentQuestionIndex]?.options.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(option)}
                            className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full group-hover:bg-blue-200">
                                {option.id}
                              </span>
                              <span className="text-gray-700 group-hover:text-gray-900">
                                {option.text}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
              >
                {/* Confetti Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                      initial={{ 
                        x: '50%', 
                        y: '50%',
                        scale: 0
                      }}
                      animate={{ 
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        scale: [0, 1, 0],
                        rotate: Math.random() * 360
                      }}
                      transition={{ 
                        duration: 2,
                        delay: Math.random() * 0.5
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Congratulations!
                  </h2>
                  <p className="text-gray-600">
                    Your career assessment is complete!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Screen */}
        {showResults && results && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <FaCheck className="text-5xl text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Your Career Recommendations
                </h1>
                <p className="text-gray-600">
                  Based on your responses, here are your personalized recommendations
                </p>
              </div>

              {/* Top Recommendation */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-gold text-white px-3 py-1 rounded-full text-sm">🏆 TOP MATCH</span>
                  {results.topRecommendation?.stream?.toUpperCase()}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Recommended Courses:</h3>
                    <ul className="space-y-1">
                      {results.topRecommendation?.courses?.map((course, index) => (
                        <li key={index} className="text-gray-600 flex items-center gap-2">
                          <FaCheck className="text-green-500 text-sm" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Top Colleges:</h3>
                    <ul className="space-y-1">
                      {results.topRecommendation?.colleges?.map((college, index) => (
                        <li key={index} className="text-gray-600 flex items-center gap-2">
                          <FaGraduationCap className="text-blue-500 text-sm" />
                          {college}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-gray-700">
                    <strong>Why this matches you:</strong> {results.topRecommendation?.reasoning}
                  </p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Confidence Score: </span>
                    <span className="font-bold text-green-600">{results.topRecommendation?.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Other Recommendations */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {results.allRecommendations?.slice(1, 3).map((recommendation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2">
                      {recommendation.stream?.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{recommendation.reasoning}</p>
                    <div className="text-sm">
                      <span className="text-gray-600">Match: </span>
                      <span className="font-semibold text-blue-600">{recommendation.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300"
                >
                  View Detailed Report
                </button>
                <button
                  onClick={resetTest}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Take Test Again
                </button>
                <button
                  onClick={() => navigate('/ai-chat')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Chat with AI Counselor
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AICareerTest;