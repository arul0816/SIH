import aiSessionModel from '../models/aiSessionModel.js';
import chatModel from '../models/chatModel.js';
import ollamaService from '../services/ollamaService.js';
import { v4 as uuidv4 } from 'uuid';

// Career Test Controllers
export const startCareerTest = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationLevel } = req.body;

    if (!educationLevel || !['after10th', 'after12th'].includes(educationLevel)) {
      return res.json({ success: false, message: 'Valid education level required' });
    }

    const sessionId = uuidv4();
    
    const session = new aiSessionModel({
      user: userId,
      sessionId,
      educationLevel,
      stage: 'basic_info'
    });

    await session.save();

    res.json({
      success: true,
      sessionId,
      message: 'Career test started successfully'
    });
  } catch (error) {
    console.error('Start career test error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, questionText, userAnswer, answerType, category } = req.body;

    const session = await aiSessionModel.findOne({ sessionId, user: req.userId });
    if (!session) {
      return res.json({ success: false, message: 'Session not found' });
    }

    // Add response
    session.responses.push({
      questionId,
      questionText,
      userAnswer,
      answerType,
      category
    });

    session.currentQuestionIndex += 1;
    await session.save();

    res.json({ success: true, message: 'Answer submitted successfully' });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const calculateResults = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await aiSessionModel.findOne({ sessionId, user: req.userId });
    if (!session) {
      return res.json({ success: false, message: 'Session not found' });
    }

    // Calculate scores based on responses
    const scores = calculateCareerScores(session.responses, session.educationLevel);
    
    session.careerScores = scores.careerScores;
    session.recommendations = scores.recommendations;
    session.isCompleted = true;
    session.completedAt = new Date();
    session.stage = 'completed';

    await session.save();

    res.json({
      success: true,
      results: {
        topRecommendation: scores.recommendations[0],
        allRecommendations: scores.recommendations,
        scores: scores.careerScores
      }
    });
  } catch (error) {
    console.error('Calculate results error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const sessions = await aiSessionModel.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .select('sessionId educationLevel stage isCompleted recommendations createdAt');

    res.json({ success: true, sessions });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Chat Controllers
export const createChatSession = async (req, res) => {
  try {
    const userId = req.userId;
    const sessionId = uuidv4();

    const chatSession = new chatModel({
      user: userId,
      sessionId,
      title: "New Chat"
    });

    await chatSession.save();

    res.json({
      success: true,
      sessionId,
      message: 'Chat session created'
    });
  } catch (error) {
    console.error('Create chat session error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const userId = req.userId;

    if (!message || !sessionId) {
      return res.json({ success: false, message: 'Message and session ID required' });
    }

    // Find or create chat session
    let chatSession = await chatModel.findOne({ sessionId, user: userId });
    
    if (!chatSession) {
      chatSession = new chatModel({
        user: userId,
        sessionId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
      });
    }

    // Add user message
    chatSession.messages.push({
      role: 'user',
      content: message
    });

    // Get AI response
    const aiResponse = await ollamaService.generateResponse(message, 'career_guidance');

    // Add AI response
    chatSession.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chatSession.save();

    res.json({
      success: true,
      response: aiResponse,
      messageId: chatSession.messages[chatSession.messages.length - 1]._id
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.json({ 
      success: false, 
      message: 'Failed to get AI response',
      response: 'Sorry, I encountered an error. Please try again.'
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    const chatSession = await chatModel.findOne({ sessionId, user: userId });
    
    if (!chatSession) {
      return res.json({ success: false, message: 'Chat session not found' });
    }

    res.json({
      success: true,
      messages: chatSession.messages,
      title: chatSession.title
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllChatSessions = async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await chatModel.find({ user: userId, isActive: true })
      .sort({ updatedAt: -1 })
      .select('sessionId title updatedAt messages');

    const sessionsWithPreview = sessions.map(session => ({
      sessionId: session.sessionId,
      title: session.title,
      lastMessage: session.messages.length > 0 ? 
        session.messages[session.messages.length - 1].content.substring(0, 100) + '...' : 
        'No messages',
      updatedAt: session.updatedAt,
      messageCount: session.messages.length
    }));

    res.json({ success: true, sessions: sessionsWithPreview });
  } catch (error) {
    console.error('Get all chat sessions error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Helper function to calculate career scores
function calculateCareerScores(responses, educationLevel) {
  const scores = {};
  
  if (educationLevel === 'after10th') {
    // Initialize diploma scores
    const diplomaFields = ['civil', 'mechanical', 'electrical', 'computer', 'paramedical'];
    diplomaFields.forEach(field => scores[field] = 0);

    // Calculate scores based on responses
    responses.forEach(response => {
      if (response.userAnswer.includes('A')) scores.civil += 1;
      if (response.userAnswer.includes('B')) scores.mechanical += 1;
      if (response.userAnswer.includes('C')) scores.electrical += 1;
      if (response.userAnswer.includes('D')) scores.computer += 1;
      if (response.userAnswer.includes('E')) scores.paramedical += 1;
    });
  } else {
    // Initialize stream scores for after 12th
    const streams = ['science', 'commerce', 'arts', 'law', 'management', 'it', 'medical', 'research'];
    streams.forEach(stream => scores[stream] = 0);

    // Calculate scores based on responses
    responses.forEach(response => {
      // Simplified scoring logic - you can enhance this
      if (response.userAnswer.includes('science') || response.userAnswer.includes('logical')) {
        scores.science += 1;
        scores.it += 1;
      }
      if (response.userAnswer.includes('helping') || response.userAnswer.includes('counseling')) {
        scores.medical += 1;
      }
      if (response.userAnswer.includes('creative') || response.userAnswer.includes('arts')) {
        scores.arts += 1;
      }
      if (response.userAnswer.includes('business') || response.userAnswer.includes('money')) {
        scores.commerce += 1;
        scores.management += 1;
      }
    });
  }

  // Convert to percentage and sort
  const totalResponses = responses.length;
  const careerScores = Object.entries(scores)
    .map(([field, score]) => ({
      careerField: field,
      score: Math.round((score / totalResponses) * 100),
      factors: [{ factor: 'aptitude', contribution: score }]
    }))
    .sort((a, b) => b.score - a.score);

  // Generate recommendations
  const recommendations = careerScores.slice(0, 3).map((career, index) => ({
    stream: career.careerField,
    courses: getCoursesForField(career.careerField, educationLevel),
    colleges: getCollegesForField(career.careerField),
    reasoning: `Based on your responses, you show strong aptitude for ${career.careerField}`,
    confidence: career.score
  }));

  return { careerScores, recommendations };
}

function getCoursesForField(field, educationLevel) {
  const courses = {
    after10th: {
      civil: ['Diploma in Civil Engineering', 'Diploma in Construction Technology'],
      mechanical: ['Diploma in Mechanical Engineering', 'Diploma in Automobile Engineering'],
      electrical: ['Diploma in Electrical Engineering', 'Diploma in Electronics'],
      computer: ['Diploma in Computer Science', 'Diploma in Information Technology'],
      paramedical: ['Diploma in Medical Lab Technology', 'Diploma in Radiology']
    },
    after12th: {
      science: ['B.Tech', 'BSc Physics', 'BSc Chemistry', 'BSc Biology'],
      medical: ['MBBS', 'BDS', 'BAMS', 'BSc Nursing'],
      it: ['BCA', 'BSc Computer Science', 'B.Tech CSE'],
      commerce: ['BCom', 'BBA', 'CA', 'CS'],
      arts: ['BA English', 'BA Psychology', 'BFA'],
      management: ['BBA', 'MBA', 'Hotel Management'],
      law: ['BA LLB', 'LLB', 'BBA LLB'],
      research: ['BSc Research', 'Integrated MSc']
    }
  };

  return courses[educationLevel]?.[field] || ['General courses available'];
}

function getCollegesForField(field) {
  // Sample colleges - you can expand this
  return [
    'Government College, Jammu',
    'University of Kashmir',
    'IIT Jammu',
    'NIT Srinagar'
  ];
}