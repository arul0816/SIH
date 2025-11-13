// services/aiChatService.js
import { AICareerAnalyzer } from './aiCareerService.js';
import { getQuestionsByStage, getQuestionById } from './questionBankService.js';

export class AIChatService {
  constructor() {
    this.analyzer = new AICareerAnalyzer();
    this.currentSession = null;
    this.conversationFlow = {
      welcome: this.handleWelcome.bind(this),
      basic_info: this.handleBasicInfo.bind(this),
      aptitude: this.handleAptitude.bind(this),
      interest: this.handleInterest.bind(this),
      personality: this.handlePersonality.bind(this),
      tie_breaker: this.handleTieBreaker.bind(this),
      recommendations: this.handleRecommendations.bind(this),
      completed: this.handleCompleted.bind(this)
    };
  }

  // Initialize new chat session
    // Initialize new chat session
  async initializeSession(userId, educationLevel) {
    this.analyzer.reset();
    this.analyzer.initializeScores();
    
    this.currentSession = {
      userId,
      educationLevel,
      stage: 'welcome',
      currentQuestionIndex: 0,
      responses: [],
      startTime: new Date()
    };

    return this.generateWelcomeMessage();
  }

  // Generate welcome message
  generateWelcomeMessage() {
    return {
      role: 'assistant',
      content: `🎯 Welcome to your AI Career Guidance Session! 

I'm here to help you discover the perfect career path based on your interests, aptitudes, and goals. 

This assessment will take about 10-15 minutes and will help me understand:
• Your academic strengths and interests
• Your personality and work preferences  
• Your career goals and motivations

Let's start! What's your current education level?`,
      messageType: 'question',
      questionData: {
        questionId: 'education_level',
        questionType: 'mcq',
        options: [
          'Just completed 10th grade',
          'Currently in 11th/12th grade',
          'Completed 12th grade'
        ],
        category: 'basic'
      }
    };
  }

  // Process user message and generate response
  async processMessage(message, sessionData) {
    try {
      this.currentSession = sessionData;
      
      // Handle user response
      if (message.userResponse) {
        await this.processUserResponse(message);
      }

      // Generate next message based on current stage
      const handler = this.conversationFlow[this.currentSession.stage];
      if (handler) {
        return await handler();
      } else {
        return this.generateErrorMessage("I'm not sure how to help with that. Let me restart the assessment.");
      }
    } catch (error) {
      console.error('Error processing message:', error);
      return this.generateErrorMessage("Something went wrong. Let me help you continue.");
    }
  }

  // Process user response
  async processUserResponse(message) {
    const { questionData, userResponse } = message;
    
    if (questionData && userResponse) {
      // Handle education level selection
      if (questionData.questionId === 'education_level') {
        if (userResponse.answer === 'Just completed 10th grade') {
          this.currentSession.educationLevel = 'after10th';
        } else {
          this.currentSession.educationLevel = 'after12th';
        }
        this.currentSession.stage = 'basic_info';
        this.currentSession.currentQuestionIndex = 0;
        return;
      }

      // Get question details for scoring
      const question = getQuestionById(questionData.questionId, this.currentSession.educationLevel);
      if (question) {
        // Process response with analyzer
        this.analyzer.processResponse(
          questionData.questionId,
          userResponse.answer,
          question
        );

        // Store response
        this.currentSession.responses.push({
          questionId: questionData.questionId,
          answer: userResponse.answer,
          timestamp: new Date(),
          timeSpent: userResponse.timeSpent || 0
        });
      }
    }
  }

  // Handle welcome stage
  async handleWelcome() {
    return this.generateWelcomeMessage();
  }

  // Handle basic info stage
  async handleBasicInfo() {
    const questions = getQuestionsByStage(this.currentSession.educationLevel, 'basic_info');
    
    if (this.currentSession.currentQuestionIndex < questions.length) {
      const question = questions[this.currentSession.currentQuestionIndex];
      this.currentSession.currentQuestionIndex++;
      
      return this.formatQuestionMessage(question, 'basic_info');
    } else {
      // Move to next stage
      this.currentSession.stage = 'aptitude';
      this.currentSession.currentQuestionIndex = 0;
      return this.handleAptitude();
    }
  }

  // Handle aptitude stage
  async handleAptitude() {
    const questions = getQuestionsByStage(this.currentSession.educationLevel, 'aptitude');
    
    if (this.currentSession.currentQuestionIndex < questions.length) {
      const question = questions[this.currentSession.currentQuestionIndex];
      this.currentSession.currentQuestionIndex++;
      
      return this.formatQuestionMessage(question, 'aptitude');
    } else {
      // Move to next stage
      this.currentSession.stage = 'interest';
      this.currentSession.currentQuestionIndex = 0;
      return this.handleInterest();
    }
  }

  // Handle interest stage
  async handleInterest() {
    const questions = getQuestionsByStage(this.currentSession.educationLevel, 'interest');
    
    if (this.currentSession.currentQuestionIndex < questions.length) {
      const question = questions[this.currentSession.currentQuestionIndex];
      this.currentSession.currentQuestionIndex++;
      
      return this.formatQuestionMessage(question, 'interest');
    } else {
      // Move to next stage
      this.currentSession.stage = 'personality';
      this.currentSession.currentQuestionIndex = 0;
      return this.handlePersonality();
    }
  }

  // Handle personality stage
  async handlePersonality() {
    const questions = getQuestionsByStage(this.currentSession.educationLevel, 'personality');
    
    if (this.currentSession.currentQuestionIndex < questions.length) {
      const question = questions[this.currentSession.currentQuestionIndex];
      this.currentSession.currentQuestionIndex++;
      
      return this.formatQuestionMessage(question, 'personality');
    } else {
      // Check if tie-breaker is needed
      if (this.analyzer.needsTieBreaker()) {
        this.currentSession.stage = 'tie_breaker';
        this.currentSession.currentQuestionIndex = 0;
        return this.handleTieBreaker();
      } else {
        // Move to recommendations
        this.currentSession.stage = 'recommendations';
        return this.handleRecommendations();
      }
    }
  }

  // Handle tie-breaker stage
  async handleTieBreaker() {
    const tieBreakerQuestions = this.analyzer.getTieBreakerQuestions();
    
    if (this.currentSession.currentQuestionIndex < tieBreakerQuestions.length) {
      const question = tieBreakerQuestions[this.currentSession.currentQuestionIndex];
      this.currentSession.currentQuestionIndex++;
      
      return {
        role: 'assistant',
        content: `🎯 I need to ask a few more specific questions to give you the best recommendations.\n\n${question.question}`,
        messageType: 'question',
        questionData: {
          questionId: question.id,
          questionType: 'mcq',
          options: question.options,
          category: 'tie_breaker'
        }
      };
    } else {
      // Move to recommendations
      this.currentSession.stage = 'recommendations';
      return this.handleRecommendations();
    }
  }

  // Handle recommendations stage
  async handleRecommendations() {
    const recommendations = this.analyzer.generateRecommendations();
    this.currentSession.stage = 'completed';
    
    return this.formatRecommendationsMessage(recommendations);
  }

  // Handle completed stage
  async handleCompleted() {
    return {
      role: 'assistant',
      content: `✅ Your career assessment is complete! 

You can:
• Review your recommendations above
• Ask me questions about specific careers
• Get information about colleges and courses
• Request a detailed career roadmap

What would you like to know more about?`,
      messageType: 'completed'
    };
  }

  // Format question message
  formatQuestionMessage(question, stage) {
    const stageEmojis = {
      basic_info: '📋',
      aptitude: '🧠',
      interest: '❤️',
      personality: '👤'
    };

    const stageNames = {
      basic_info: 'Basic Information',
      aptitude: 'Aptitude Assessment',
      interest: 'Interest Profiling',
      personality: 'Personality Analysis'
    };

    const progress = this.calculateProgress();
    
    let content = `${stageEmojis[stage]} **${stageNames[stage]}** (${progress}% complete)\n\n${question.question}`;
    
    if (question.type === 'multiselect') {
      content += `\n\n*You can select up to ${question.maxSelections} options.*`;
    }

    return {
      role: 'assistant',
      content,
      messageType: 'question',
      questionData: {
        questionId: question.id,
        questionType: question.type,
        options: question.options,
        category: question.category,
        maxSelections: question.maxSelections
      },
      progressData: {
        stage,
        progress,
        currentQuestion: this.currentSession.currentQuestionIndex,
        totalQuestions: this.getTotalQuestions()
      }
    };
  }

  // Format recommendations message
  formatRecommendationsMessage(recommendations) {
    let content = `🎉 **Your Personalized Career Recommendations**\n\n`;
    content += `Based on your responses, here are your top career matches:\n\n`;

    recommendations.forEach((rec, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
      content += `${medal} **${rec.details.name}** (${rec.percentage}% match)\n`;
      content += `${rec.details.description}\n`;
      content += `💰 Salary Range: ${rec.details.salary_range}\n`;
      content += `🎯 Job Prospects: ${rec.details.job_prospects}\n\n`;
    });

    content += `📚 **Next Steps:**\n`;
    content += `• Explore detailed course information\n`;
    content += `• Check college options in J&K\n`;
    content += `• Plan your preparation strategy\n`;
    content += `• Connect with career counselors\n\n`;
    content += `Would you like detailed information about any specific career path?`;

    return {
      role: 'assistant',
      content,
      messageType: 'recommendations',
      recommendationsData: recommendations
    };
  }

  // Calculate progress percentage
  calculateProgress() {
    const totalQuestions = this.getTotalQuestions();
    const answeredQuestions = this.currentSession.responses.length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  // Get total questions count
  getTotalQuestions() {
    const educationLevel = this.currentSession.educationLevel;
    let total = 0;
    
    ['basic_info', 'aptitude', 'interest', 'personality'].forEach(stage => {
      const questions = getQuestionsByStage(educationLevel, stage);
      total += questions.length;
    });
    
    return total;
  }

  // Generate error message
  generateErrorMessage(message) {
    return {
      role: 'assistant',
      content: `❌ ${message}`,
      messageType: 'error'
    };
  }

  // Get current session data
  getSessionData() {
    return {
      ...this.currentSession,
      careerScores: this.analyzer.careerScores,
      totalResponses: this.currentSession.responses.length
    };
  }
}