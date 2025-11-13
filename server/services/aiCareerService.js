// services/aiCareerService.js
import { CAREER_FIELDS, getTieBreakerQuestions } from './questionBankService.js';

export class AICareerAnalyzer {
  constructor() {
    this.careerScores = {};
    this.responses = [];
    this.userProfile = {};
  }

  // Initialize career scores
  initializeScores() {
    Object.keys(CAREER_FIELDS).forEach(field => {
      this.careerScores[field] = 0;
    });
  }

  // Process user response and update scores
  processResponse(questionId, answer, questionData) {
    this.responses.push({
      questionId,
      answer,
      timestamp: new Date()
    });

    // Calculate scores based on question scoring
    if (questionData.scoring && questionData.scoring[answer]) {
      const scores = questionData.scoring[answer];
      Object.entries(scores).forEach(([field, points]) => {
        if (this.careerScores[field] !== undefined) {
          this.careerScores[field] += points * (questionData.weight || 1);
        }
      });
    }

    return this.careerScores;
  }

  // Get top career recommendations
  getTopCareers(limit = 5) {
    const sortedCareers = Object.entries(this.careerScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);

    return sortedCareers.map(([field, score]) => ({
      field,
      score,
      percentage: this.calculatePercentage(score),
      details: CAREER_FIELDS[field],
      confidence: this.calculateConfidence(score, field)
    }));
  }

  // Calculate percentage score
  calculatePercentage(score) {
    const maxPossibleScore = this.calculateMaxScore();
    return Math.min(100, Math.round((score / maxPossibleScore) * 100));
  }

  // Calculate maximum possible score
  calculateMaxScore() {
    // This would be calculated based on all questions and their max weights
    return 100; // Simplified for now
  }

  // Calculate confidence level
  calculateConfidence(score, field) {
    const topScores = Object.values(this.careerScores).sort((a, b) => b - a);
    const rank = topScores.indexOf(score) + 1;
    
    if (rank === 1 && score > topScores[1] * 1.2) return "High";
    if (rank <= 2) return "Medium";
    return "Low";
  }

  // Check if tie-breaker questions are needed
  needsTieBreaker() {
    const topScores = Object.entries(this.careerScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    // Check if top 2 scores are very close
    if (topScores.length >= 2) {
      const [first, second] = topScores;
      const difference = first[1] - second[1];
      return difference < 3; // If difference is less than 3 points
    }
    return false;
  }

  // Get tie-breaker questions
  getTieBreakerQuestions() {
    const topCareers = Object.entries(this.careerScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([field]) => field);

    return getTieBreakerQuestions(topCareers);
  }

  // Generate detailed recommendations
  generateRecommendations(userLocation = "Jammu & Kashmir") {
    const topCareers = this.getTopCareers(3);
    
    return topCareers.map(career => ({
      ...career,
      recommendations: this.generateCareerRecommendations(career, userLocation),
      nextSteps: this.generateNextSteps(career),
      colleges: this.getRelevantColleges(career.field, userLocation),
      marketInsights: this.getMarketInsights(career.field, userLocation)
    }));
  }

  // Generate specific career recommendations
  generateCareerRecommendations(career, location) {
    const field = career.field;
    const details = CAREER_FIELDS[field];
    
    return {
      whyThisCareer: this.generateWhyRecommendation(career),
      skillsToFocus: this.getRequiredSkills(field),
      preparationTips: this.getPreparationTips(field),
      timelineToGoal: this.getTimeline(field)
    };
  }

  // Generate "why this career" explanation
  generateWhyRecommendation(career) {
    const responses = this.responses;
    const field = career.field;
    
    // Analyze user responses to create personalized explanation
    const reasons = [];
    
    // Check for specific response patterns
    responses.forEach(response => {
      if (response.questionId === 'math_aptitude' && response.answer.includes('Mathematics') && field === 'engineering') {
        reasons.push("Your strong mathematical aptitude aligns perfectly with engineering requirements");
      }
      if (response.questionId === 'career_activities' && response.answer.includes('Helping people') && field === 'medical') {
        reasons.push("Your desire to help people makes healthcare an ideal career choice");
      }
      // Add more pattern matching...
    });

    return reasons.length > 0 ? reasons : [`Your responses indicate strong compatibility with ${CAREER_FIELDS[field].name}`];
  }

  // Get required skills for a field
  getRequiredSkills(field) {
    const skillMap = {
      engineering: ["Problem-solving", "Mathematical thinking", "Technical skills", "Innovation"],
      medical: ["Empathy", "Attention to detail", "Scientific knowledge", "Communication"],
      it: ["Programming", "Logical thinking", "Continuous learning", "Problem-solving"],
      commerce: ["Analytical skills", "Communication", "Business acumen", "Numerical ability"],
      // Add more fields...
    };
    
    return skillMap[field] || ["Critical thinking", "Communication", "Dedication"];
  }

  // Get preparation tips
  getPreparationTips(field) {
    const tipsMap = {
      engineering: [
        "Focus on Mathematics and Physics",
        "Practice problem-solving regularly",
        "Prepare for JEE Main/Advanced",
        "Develop programming basics"
      ],
      medical: [
        "Excel in Biology, Chemistry, and Physics",
        "Prepare thoroughly for NEET",
        "Develop empathy and communication skills",
        "Stay updated with medical developments"
      ],
      // Add more fields...
    };
    
    return tipsMap[field] || ["Focus on your core subjects", "Develop relevant skills", "Stay motivated"];
  }

  // Get timeline to achieve career goals
  getTimeline(field) {
    const timelineMap = {
      engineering: "4 years (B.Tech) + Optional 2 years (M.Tech)",
      medical: "5.5 years (MBBS) + 3 years (Specialization)",
      law: "5 years (Integrated LLB) or 3 years (LLB after graduation)",
      // Add more fields...
    };
    
    return timelineMap[field] || "3-4 years for undergraduate degree";
  }

  // Get relevant colleges for the field and location
  getRelevantColleges(field, location) {
    // This would integrate with your college database
    const details = CAREER_FIELDS[field];
    return details.colleges_jk || [];
  }

  // Get market insights for the field
  getMarketInsights(field, location) {
    const details = CAREER_FIELDS[field];
    return {
      jobProspects: details.job_prospects,
      salaryRange: details.salary_range,
      growthTrends: this.getGrowthTrends(field),
      localOpportunities: this.getLocalOpportunities(field, location)
    };
  }

  // Get growth trends for the field
  getGrowthTrends(field) {
    const trendsMap = {
      it: "Exponential growth expected with digital transformation",
      medical: "Steady growth with increasing healthcare awareness",
      engineering: "Strong growth in infrastructure and technology sectors",
      // Add more fields...
    };
    
    return trendsMap[field] || "Stable growth expected in this field";
  }

  // Get local opportunities
  getLocalOpportunities(field, location) {
    if (location === "Jammu & Kashmir") {
      const jkOpportunities = {
        it: "Growing IT parks in Jammu and Srinagar, remote work opportunities",
        medical: "Government hospitals, AIIMS Jammu, private healthcare expansion",
        engineering: "Infrastructure development, renewable energy projects",
        agriculture: "Horticulture, organic farming, agri-tech startups",
        // Add more fields...
      };
      
      return jkOpportunities[field] || "Government sector opportunities available";
    }
    
    return "Various opportunities available in this field";
  }

  // Reset analyzer for new session
  reset() {
    this.careerScores = {};
    this.responses = [];
    this.userProfile = {};
    this.initializeScores();
  }
}