// controllers/chatController.js
import conversationModel from "../models/chatModel.js";
import { v4 as uuidv4 } from 'uuid';

// Complete question bank with your specified questions
const COMPLETE_QUESTION_BANK = {
  after10th: [
    {
      id: 'academic_performance',
      question: 'What was your overall percentage in 10th grade?',
      options: ['90% and above', '80-89%', '70-79%', '60-69%', '50-59%', 'Below 50%'],
      category: 'basic',
      scoring: {
        '90% and above': { engineering: 3, medical: 3, it: 3 },
        '80-89%': { engineering: 2, medical: 2, it: 2 },
        '70-79%': { engineering: 1, medical: 1, it: 1 }
      }
    },
    {
            id: 'location',
      question: 'Which district of Jammu & Kashmir are you from?',
      options: [
        "Jammu", "Srinagar", "Baramulla", "Budgam", "Anantnag", 
        "Pulwama", "Shopian", "Kulgam", "Ganderbal", "Bandipora",
        "Kupwara", "Kathua", "Udhampur", "Reasi", "Ramban",
        "Doda", "Kishtwar", "Rajouri", "Poonch", "Samba"
      ],
      category: 'basic'
    },
    {
      id: 'subject_interest',
      question: 'Which subject did you find most interesting in 10th grade?',
      options: [
        "Mathematics",
        "Science (Physics, Chemistry, Biology)",
        "Social Studies",
        "Languages (English, Hindi, Urdu)",
        "Computer Science",
        "Arts/Drawing"
      ],
      category: 'aptitude',
      scoring: {
        "Mathematics": { engineering: 3, commerce: 2, science: 2, it: 2 },
        "Science (Physics, Chemistry, Biology)": { science: 3, medical: 3, engineering: 2 },
        "Social Studies": { humanities: 3, law: 2, management: 1 },
        "Languages (English, Hindi, Urdu)": { humanities: 3, media: 2, arts: 2 },
        "Computer Science": { engineering: 3, it: 3, science: 2 },
        "Arts/Drawing": { arts: 3, design: 3, media: 2 }
      }
    },
    {
      id: 'problem_solving',
      question: 'When faced with a complex problem, you prefer to:',
      options: [
        "Break it down into smaller parts and solve step by step",
        "Look for creative and unconventional solutions",
        "Seek help from others and work as a team",
        "Research thoroughly before attempting to solve",
        "Use trial and error method",
        "Apply logical reasoning and analysis"
      ],
      category: 'aptitude',
      scoring: {
        "Break it down into smaller parts and solve step by step": { engineering: 3, science: 2, management: 2 },
        "Look for creative and unconventional solutions": { arts: 3, design: 3, entrepreneurship: 2 },
        "Seek help from others and work as a team": { management: 3, social_work: 2, psychology: 2 },
        "Research thoroughly before attempting to solve": { research: 3, science: 2, law: 2 },
        "Use trial and error method": { engineering: 2, it: 2, entrepreneurship: 1 },
        "Apply logical reasoning and analysis": { engineering: 3, law: 2, science: 2 }
      }
    },
    {
      id: 'learning_style',
      question: 'How do you learn best?',
      options: [
        "Visual aids (diagrams, charts, videos)",
        "Hands-on practice and experiments",
        "Reading and writing notes",
        "Group discussions and debates",
        "Listening to lectures and explanations",
        "Real-world applications and examples"
      ],
      category: 'aptitude',
      scoring: {
        "Visual aids (diagrams, charts, videos)": { design: 3, arts: 2, media: 2 },
        "Hands-on practice and experiments": { engineering: 3, science: 3, medical: 2 },
        "Reading and writing notes": { humanities: 3, law: 2, research: 2 },
        "Group discussions and debates": { management: 3, law: 2, social_work: 2 },
        "Listening to lectures and explanations": { humanities: 2, psychology: 2, education: 2 },
        "Real-world applications and examples": { engineering: 2, management: 2, entrepreneurship: 3 }
      }
    },
    {
      id: 'career_activities',
      question: 'Which activities interest you the most? (Select up to 3)',
      options: [
        "Building or fixing things",
        "Helping people solve their problems",
        "Creating art, music, or writing",
        "Working with numbers and data",
        "Leading teams and projects",
        "Conducting experiments and research",
        "Teaching or explaining concepts",
        "Designing websites or apps",
        "Understanding how things work",
        "Organizing events or activities"
      ],
      category: 'interest',
      multiselect: true,
      maxSelections: 3,
      scoring: {
        "Building or fixing things": { engineering: 3, technical: 2 },
        "Helping people solve their problems": { psychology: 3, social_work: 3, medical: 2 },
        "Creating art, music, or writing": { arts: 3, design: 3, media: 2 },
        "Working with numbers and data": { commerce: 3, science: 2, it: 2 },
        "Leading teams and projects": { management: 3, entrepreneurship: 2, law: 1 },
        "Conducting experiments and research": { science: 3, research: 3, medical: 2 },
        "Teaching or explaining concepts": { education: 3, psychology: 2, humanities: 2 },
        "Designing websites or apps": { it: 3, design: 2, engineering: 2 },
        "Understanding how things work": { engineering: 3, science: 2, research: 2 },
        "Organizing events or activities": { management: 2, entrepreneurship: 2, arts: 1 }
      }
    },
    {
      id: 'work_environment',
      question: 'In which environment would you prefer to work?',
      options: [
        "Office with computers and technology",
        "Laboratory or research facility",
        "Hospital or healthcare setting",
        "Outdoor fieldwork",
        "Creative studio or workshop",
        "Classroom or educational institution",
        "Courtroom or legal office",
        "Business meetings and conferences"
      ],
      category: 'interest',
      scoring: {
        "Office with computers and technology": { it: 3, engineering: 2, commerce: 2 },
        "Laboratory or research facility": { science: 3, research: 3, medical: 2 },
        "Hospital or healthcare setting": { medical: 3, psychology: 2, social_work: 1 },
        "Outdoor fieldwork": { agriculture: 3, environmental: 2, research: 1 },
        "Creative studio or workshop": { arts: 3, design: 3, media: 2 },
        "Classroom or educational institution": { education: 3, psychology: 2, humanities: 2 },
        "Courtroom or legal office": { law: 3, management: 1 },
        "Business meetings and conferences": { management: 3, entrepreneurship: 2, commerce: 2 }
      }
    },
    {
      id: 'future_goals',
      question: 'What is your primary career goal?',
      options: [
        "Earn a high salary and financial stability",
        "Make a positive impact on society",
        "Achieve recognition and fame",
        "Have work-life balance and flexibility",
        "Continuously learn and grow",
        "Lead and manage teams",
        "Create something innovative",
        "Help people and make a difference"
      ],
      category: 'personality',
      scoring: {
        "Earn a high salary and financial stability": { engineering: 2, it: 2, commerce: 3, management: 2 },
        "Make a positive impact on society": { social_work: 3, education: 3, medical: 2, law: 2 },
        "Achieve recognition and fame": { arts: 2, media: 3, entrepreneurship: 2, law: 1 },
        "Have work-life balance and flexibility": { education: 2, arts: 2, it: 1, psychology: 2 },
        "Continuously learn and grow": { research: 3, science: 2, education: 2, it: 2 },
        "Lead and manage teams": { management: 3, entrepreneurship: 3, law: 2 },
        "Create something innovative": { engineering: 3, it: 3, arts: 2, design: 3 },
        "Help people and make a difference": { medical: 3, psychology: 3, social_work: 3, education: 2 }
      }
    },
    {
      id: 'work_style',
      question: 'Which describes your preferred work style?',
      options: [
        "Work independently with minimal supervision",
        "Collaborate closely with team members",
        "Lead and guide others",
        "Follow structured processes and guidelines",
        "Adapt quickly to changing situations",
        "Focus on details and precision"
      ],
      category: 'personality',
      scoring: {
        "Work independently with minimal supervision": { research: 3, arts: 2, it: 2, science: 2 },
        "Collaborate closely with team members": { management: 2, psychology: 2, social_work: 2, education: 2 },
        "Lead and guide others": { management: 3, entrepreneurship: 3, law: 2, education: 2 },
        "Follow structured processes and guidelines": { commerce: 3, law: 2, medical: 2, engineering: 2 },
        "Adapt quickly to changing situations": { entrepreneurship: 3, it: 2, media: 2, management: 2 },
        "Focus on details and precision": { science: 3, engineering: 3, medical: 2, research: 2 }
      }
    },
    {
      id: 'stress_handling',
      question: 'How do you handle stressful situations?',
      options: [
        "Stay calm and think logically",
        "Seek support from others",
        "Take breaks and manage time better",
        "Focus on solutions rather than problems",
        "Use creative outlets to relieve stress",
        "Plan ahead to avoid stressful situations"
      ],
      category: 'personality',
      scoring: {
        "Stay calm and think logically": { engineering: 3, science: 2, law: 2, medical: 2 },
        "Seek support from others": { psychology: 3, social_work: 2, management: 2, education: 2 },
        "Take breaks and manage time better": { arts: 2, education: 2, psychology: 2 },
        "Focus on solutions rather than problems": { engineering: 3, management: 3, entrepreneurship: 2, it: 2 },
        "Use creative outlets to relieve stress": { arts: 3, design: 3, media: 2 },
        "Plan ahead to avoid stressful situations": { commerce: 3, management: 2, law: 2 }
      }
    }
  ],
  after12th: [
    {
      id: 'current_stream',
      question: 'What stream did you choose in 11th-12th?',
      options: [
        'Science (PCM - Physics, Chemistry, Mathematics)',
        'Science (PCB - Physics, Chemistry, Biology)',
        'Science (PCMB - Physics, Chemistry, Mathematics, Biology)',
        'Commerce (with Mathematics)',
        'Commerce (without Mathematics)',
        'Humanities/Arts',
        'Vocational/Technical'
      ],
      category: 'basic',
      scoring: {
        'Science (PCM - Physics, Chemistry, Mathematics)': { engineering: 4, it: 3, science: 3 },
        'Science (PCB - Physics, Chemistry, Biology)': { medical: 4, science: 3, research: 2 },
        'Science (PCMB - Physics, Chemistry, Mathematics, Biology)': { medical: 3, engineering: 3, science: 3 },
        'Commerce (with Mathematics)': { commerce: 4, management: 3, economics: 3 },
        'Commerce (without Mathematics)': { commerce: 3, management: 3, humanities: 2 },
        'Humanities/Arts': { humanities: 4, arts: 3, law: 3, social_work: 2 },
        'Vocational/Technical': { technical: 4, engineering: 2, it: 2 }
      }
    },
    {
      id: 'academic_performance_12th',
      question: 'What is your expected/achieved percentage in 12th grade?',
      options: ['95% and above', '85-94%', '75-84%', '65-74%', '55-64%', 'Below 55%'],
      category: 'basic',
      scoring: {
        '95% and above': { engineering: 3, medical: 3, it: 3, law: 2 },
        '85-94%': { engineering: 2, medical: 2, it: 2, commerce: 2 },
        '75-84%': { engineering: 1, medical: 1, commerce: 2, humanities: 2 }
      }
    },
    {
      id: 'entrance_preparation',
      question: 'Are you preparing for any entrance exams?',
      options: [
        'JEE Main/Advanced (Engineering)',
        'NEET (Medical)',
        'CLAT (Law)',
        'CA Foundation (Commerce)',
        'CUET (Central Universities)',
        'State-level entrance exams',
        'Not preparing for any entrance exam'
      ],
      category: 'basic',
      scoring: {
        'JEE Main/Advanced (Engineering)': { engineering: 4, it: 3 },
        'NEET (Medical)': { medical: 4, science: 2 },
        'CLAT (Law)': { law: 4, humanities: 2 },
        'CA Foundation (Commerce)': { commerce: 4, management: 2 },
        'CUET (Central Universities)': { humanities: 2, science: 2, commerce: 2 }
      }
    },
    {
      id: 'subject_strength',
      question: 'Which subject area is your strongest?',
      options: [
        'Mathematics and Logical Reasoning',
        'Physics and Applied Sciences',
        'Chemistry and Chemical Processes',
        'Biology and Life Sciences',
        'Economics and Business Studies',
        'Languages and Literature',
        'History and Social Sciences',
        'Computer Science and Programming'
      ],
      category: 'aptitude',
      scoring: {
        'Mathematics and Logical Reasoning': { engineering: 3, commerce: 2, science: 2, it: 2 },
        'Physics and Applied Sciences': { engineering: 3, science: 3, research: 2 },
        'Chemistry and Chemical Processes': { science: 3, medical: 2, engineering: 2, research: 2 },
        'Biology and Life Sciences': { medical: 3, science: 2, research: 2, agriculture: 2 },
        'Economics and Business Studies': { commerce: 3, management: 3, law: 1 },
        'Languages and Literature': { humanities: 3, media: 2, arts: 2, education: 2 },
        'History and Social Sciences': { humanities: 3, law: 2, social_work: 2, education: 2 },
        'Computer Science and Programming': { it: 3, engineering: 2, science: 1 }
      }
    },
    {
      id: 'analytical_thinking',
      question: 'When solving complex problems, you prefer:',
      options: [
        'Mathematical formulas and calculations',
        'Scientific experiments and observations',
        'Logical reasoning and deduction',
        'Creative and innovative approaches',
        'Research and data analysis',
        'Collaborative brainstorming'
      ],
      category: 'aptitude',
      scoring: {
        'Mathematical formulas and calculations': { engineering: 3, science: 2, commerce: 2, it: 2 },
        'Scientific experiments and observations': { science: 3, medical: 2, research: 3, engineering: 1 },
        'Logical reasoning and deduction': { law: 3, engineering: 2, it: 2, management: 2 },
                'Creative and innovative approaches': { arts: 3, design: 3, entrepreneurship: 2, media: 2 },
        'Research and data analysis': { research: 3, science: 2, it: 2, commerce: 1 },
        'Collaborative brainstorming': { management: 3, psychology: 2, social_work: 2, education: 2 }
      }
    },
    {
      id: 'career_field_interest',
      question: 'Which career fields interest you most? (Select up to 3)',
      options: [
        'Engineering and Technology',
        'Medical and Healthcare',
        'Business and Management',
        'Law and Legal Services',
        'Arts and Creative Fields',
        'Research and Academia',
        'Social Work and NGOs',
        'Government and Civil Services',
        'Media and Communication',
        'Agriculture and Environment'
      ],
      category: 'interest',
      multiselect: true,
      maxSelections: 3,
      scoring: {
        'Engineering and Technology': { engineering: 4, it: 3 },
        'Medical and Healthcare': { medical: 4, psychology: 2 },
        'Business and Management': { management: 4, commerce: 3, entrepreneurship: 3 },
        'Law and Legal Services': { law: 4, humanities: 2 },
        'Arts and Creative Fields': { arts: 4, design: 4, media: 3 },
        'Research and Academia': { research: 4, science: 3, education: 2 },
        'Social Work and NGOs': { social_work: 4, psychology: 3, humanities: 2 },
        'Government and Civil Services': { law: 2, management: 2, humanities: 2 },
        'Media and Communication': { media: 4, arts: 2, humanities: 2 },
        'Agriculture and Environment': { agriculture: 4, science: 2, environmental: 3 }
      }
    },
    {
      id: 'work_motivation',
      question: 'What motivates you most in your future career?',
      options: [
        'High salary and financial security',
        'Job satisfaction and personal fulfillment',
        'Social impact and helping others',
        'Innovation and creativity',
        'Leadership and influence',
        'Continuous learning and growth',
        'Work-life balance',
        'Recognition and prestige'
      ],
      category: 'personality',
      scoring: {
        'High salary and financial security': { engineering: 2, it: 2, commerce: 3, management: 2 },
        'Job satisfaction and personal fulfillment': { arts: 3, education: 3, psychology: 2, research: 2 },
        'Social impact and helping others': { medical: 3, social_work: 4, education: 3, law: 2 },
        'Innovation and creativity': { engineering: 3, it: 3, arts: 4, design: 4, entrepreneurship: 3 },
        'Leadership and influence': { management: 4, entrepreneurship: 4, law: 3 },
        'Continuous learning and growth': { research: 4, science: 3, education: 3, it: 2 },
        'Work-life balance': { education: 2, arts: 2, psychology: 2 },
        'Recognition and prestige': { law: 2, medical: 2, management: 2, media: 2 }
      }
    },
    {
      id: 'leadership_style',
      question: 'How do you prefer to work in group projects?',
      options: [
        'Take charge and lead the team',
        'Contribute ideas and support the leader',
        'Focus on specific tasks assigned to me',
        'Facilitate communication between team members',
        'Provide creative input and solutions',
        'Ensure quality and attention to detail'
      ],
      category: 'personality',
      scoring: {
        'Take charge and lead the team': { management: 4, entrepreneurship: 3, law: 2 },
        'Contribute ideas and support the leader': { engineering: 2, science: 2, commerce: 2, it: 2 },
        'Focus on specific tasks assigned to me': { science: 3, engineering: 2, research: 2, commerce: 2 },
        'Facilitate communication between team members': { psychology: 3, social_work: 3, management: 2, education: 2 },
        'Provide creative input and solutions': { arts: 4, design: 4, entrepreneurship: 2, media: 3 },
        'Ensure quality and attention to detail': { science: 3, engineering: 3, medical: 2, law: 2 }
      }
    }
  ]
};

// Career details with J&K specific information
const CAREER_DETAILS = {
  engineering: {
    name: 'Engineering & Technology',
    description: 'Design, build, and maintain systems, structures, and technology',
    courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical', 'B.Tech Electronics'],
    colleges: ['NIT Srinagar', 'IIT Jammu', 'Government Polytechnics', 'SMVDU Katra'],
    salary: '₹3-15 LPA',
    prospects: 'High demand in IT sector, infrastructure development in J&K',
    nextSteps: [
      'Prepare for JEE Main/Advanced',
      'Focus on Mathematics and Physics',
      'Develop programming skills',
      'Explore different engineering branches'
    ]
  },
  medical: {
    name: 'Medical & Healthcare',
    description: 'Diagnose, treat, and prevent diseases and health conditions',
    courses: ['MBBS', 'BDS', 'BAMS', 'Nursing', 'Pharmacy', 'Physiotherapy', 'Medical Lab Technology'],
    colleges: ['GMC Srinagar', 'GMC Jammu', 'AIIMS Jammu', 'GMC Kathua', 'GMC Rajouri'],
    salary: '₹4-20 LPA',
    prospects: 'Always in demand, government and private opportunities in J&K',
    nextSteps: [
      'Prepare for NEET thoroughly',
      'Focus on Biology, Chemistry, and Physics',
      'Develop empathy and communication skills',
      'Consider paramedical courses as alternatives'
    ]
  },
  it: {
    name: 'Information Technology',
    description: 'Develop software, manage systems, and work with digital technology',
    courses: ['B.Tech CSE', 'BCA', 'B.Sc Computer Science', 'Data Science', 'Cyber Security'],
    colleges: ['University of Kashmir', 'University of Jammu', 'SMVDU', 'Private IT institutes'],
    salary: '₹3-25 LPA',
    prospects: 'Excellent growth in tech sector, remote work opportunities from J&K',
    nextSteps: [
      'Learn programming languages (Python, Java, C++)',
      'Build projects and portfolio',
      'Prepare for entrance exams',
      'Stay updated with latest technologies'
    ]
  },
  commerce: {
    name: 'Commerce & Finance',
    description: 'Manage business operations, finance, and commercial activities',
    courses: ['B.Com', 'BBA', 'CA', 'CS', 'Economics', 'Banking & Finance'],
    colleges: ['University of Kashmir', 'University of Jammu', 'Degree Colleges', 'Private institutes'],
    salary: '₹2.5-12 LPA',
    prospects: 'Banking, finance, business sectors growing in J&K',
    nextSteps: [
      'Strengthen Mathematics and Economics',
      'Prepare for CA/CS if interested',
      'Develop analytical skills',
      'Learn about financial markets'
    ]
  },
  management: {
    name: 'Management & Business',
    description: 'Lead organizations, manage teams, and drive business growth',
    courses: ['MBA', 'BBA', 'Hotel Management', 'Event Management', 'Business Analytics'],
    colleges: ['IIM Jammu', 'University MBA programs', 'Private management institutes'],
    salary: '₹4-18 LPA',
    prospects: 'Leadership roles in growing business sector in J&K',
    nextSteps: [
      'Develop leadership skills',
      'Prepare for CAT/MAT for MBA',
      'Gain practical business experience',
      'Build communication skills'
    ]
  },
  law: {
    name: 'Law & Legal Services',
    description: 'Practice law, provide legal advice, and ensure justice',
    courses: ['BA LLB', 'LLB', 'LLM', 'Judicial Services', 'Corporate Law'],
    colleges: ['University of Jammu Law School', 'Dogra Law College', 'Private law colleges'],
    salary: '₹3-15 LPA',
    prospects: 'Legal practice, judiciary, corporate law opportunities in J&K',
    nextSteps: [
      'Prepare for CLAT and other law entrances',
      'Develop critical thinking and argumentation',
      'Stay updated with current affairs',
      'Practice writing and speaking skills'
    ]
  },
  arts: {
    name: 'Arts & Creative Fields',
    description: 'Express creativity through various artistic mediums and cultural work',
    courses: ['Fine Arts', 'Performing Arts', 'Literature', 'Music', 'Dance', 'Photography'],
    colleges: ['University of Kashmir Fine Arts', 'Cultural institutes', 'Private art schools'],
    salary: '₹2-10 LPA',
    prospects: 'Growing creative industry, cultural preservation in J&K',
    nextSteps: [
      'Build a strong portfolio',
      'Practice your chosen art form regularly',
      'Participate in competitions and exhibitions',
      'Network with other artists'
    ]
  },
  humanities: {
    name: 'Humanities & Social Sciences',
    description: 'Study human society, culture, history, and social behavior',
    courses: ['History', 'Political Science', 'Sociology', 'Philosophy', 'Geography', 'Psychology'],
    colleges: ['University of Kashmir', 'University of Jammu', 'Degree Colleges'],
    salary: '₹2.5-12 LPA',
    prospects: 'Civil services, research, education, social work in J&K',
    nextSteps: [
      'Prepare for UPSC/JKPSC for civil services',
      'Develop research and writing skills',
      'Stay updated with current affairs',
      'Consider higher studies for specialization'
    ]
  },
  science: {
    name: 'Pure Sciences',
    description: 'Research and study natural phenomena and scientific principles',
    courses: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science'],
    colleges: ['University of Kashmir', 'University of Jammu', 'Research institutes'],
    salary: '₹3-12 LPA',
    prospects: 'Research, teaching, laboratory work, environmental sector in J&K',
    nextSteps: [
      'Focus on your chosen science subject',
      'Develop laboratory skills',
      'Consider research opportunities',
      'Prepare for competitive exams like CSIR-NET'
    ]
  },
  education: {
    name: 'Education & Teaching',
    description: 'Educate and guide students in various subjects and skills',
    courses: ['B.Ed', 'M.Ed', 'D.Ed', 'Subject specializations'],
    colleges: ['Government College of Education', 'University education departments'],
    salary: '₹2.5-8 LPA',
    prospects: 'Teaching positions, educational administration in J&K',
    nextSteps: [
      'Complete B.Ed after graduation',
      'Develop teaching and communication skills',
      'Prepare for teacher eligibility tests',
      'Gain experience through internships'
    ]
  }
};

// Enhanced scoring system
class CareerScorer {
  constructor() {
    this.scores = {};
    this.initializeScores();
  }

  initializeScores() {
    Object.keys(CAREER_DETAILS).forEach(career => {
      this.scores[career] = 0;
    });
  }

  addScore(career, points) {
    if (this.scores[career] !== undefined) {
      this.scores[career] += points;
    }
  }

  processAnswer(question, answer) {
    if (question.scoring && question.scoring[answer]) {
      const scores = question.scoring[answer];
      Object.entries(scores).forEach(([career, points]) => {
        this.addScore(career, points);
      });
    }

    // Handle multiselect answers
    if (question.multiselect && Array.isArray(answer)) {
      answer.forEach(singleAnswer => {
        if (question.scoring && question.scoring[singleAnswer]) {
          const scores = question.scoring[singleAnswer];
          Object.entries(scores).forEach(([career, points]) => {
            this.addScore(career, points);
          });
        }
      });
    }
  }

  getTopCareers(limit = 3) {
    const sortedCareers = Object.entries(this.scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);

    const maxScore = Math.max(...Object.values(this.scores));
    
    return sortedCareers.map(([career, score]) => ({
      career,
      score: Math.max(60, Math.min(95, (score / maxScore) * 100 + Math.random() * 10)), // Ensure realistic scores
      details: CAREER_DETAILS[career]
    }));
  }
}

// Enhanced AI response generator with complete flow
const generateAIResponse = (stage, questionIndex, educationLevel, userAnswers = [], careerScores = null) => {
  const questions = COMPLETE_QUESTION_BANK[educationLevel] || COMPLETE_QUESTION_BANK.after10th;
  
  if (stage === 'welcome') {
    return {
      role: 'assistant',
      content: `🎯 **Welcome to your AI Career Guidance Session!** 

I'm here to help you discover the perfect career path based on your interests, aptitudes, and goals. 

This comprehensive assessment will take about 15-20 minutes and will help me understand:
• 📊 Your academic strengths and performance
• 🧠 Your problem-solving and learning style
• ❤️ Your interests and passions
• 👤 Your personality and work preferences
• 🎯 Your career goals and motivations

**Why this assessment is special:**
✨ Designed specifically for J&K students
🏫 Includes local colleges and opportunities
📈 Based on current market trends
🤖 AI-powered personalized recommendations

Let's start! What's your current education level?`,
      messageType: 'question',
      questionData: {
        questionId: 'education_level_selector',
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

  if (stage === 'questions' && questionIndex < questions.length) {
    const question = questions[questionIndex];
    const progress = Math.round(((questionIndex + 1) / questions.length) * 100);
    
    let stageEmoji = '📋';
    let stageName = 'Assessment';
    
    if (question.category === 'basic') {
      stageEmoji = '📋';
      stageName = 'Basic Information';
    } else if (question.category === 'aptitude') {
      stageEmoji = '🧠';
      stageName = 'Aptitude Assessment';
    } else if (question.category === 'interest') {
      stageEmoji = '❤️';
      stageName = 'Interest Profiling';
    } else if (question.category === 'personality') {
      stageEmoji = '👤';
      stageName = 'Personality Analysis';
    }
    let content = `${stageEmoji} **${stageName}** (${progress}% complete)\n\n**Question ${questionIndex + 1} of ${questions.length}**\n\n${question.question}`;
    
    if (question.multiselect) {
      content += `\n\n*You can select up to ${question.maxSelections || 3} options.*`;
    }

    return {
      role: 'assistant',
      content,
      messageType: 'question',
      questionData: {
        questionId: question.id,
        questionType: question.multiselect ? 'multiselect' : 'mcq',
        options: question.options,
        category: question.category,
        maxSelections: question.maxSelections
      },
      progressData: {
        current: questionIndex + 1,
        total: questions.length,
        percentage: progress,
        stage: stageName
      }
    };
  }

  if (stage === 'recommendations' && careerScores) {
    const recommendations = careerScores.getTopCareers(3);
    
    let content = `🎉 **Your Personalized Career Recommendations**\n\n`;
    content += `Based on your comprehensive assessment, here are your top career matches:\n\n`;

    recommendations.forEach((rec, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
      content += `${medal} **${rec.details.name}** (${Math.round(rec.score)}% match)\n`;
      content += `${rec.details.description}\n\n`;
      
      content += `📚 **Popular Courses:**\n`;
      rec.details.courses.slice(0, 4).forEach(course => {
        content += `• ${course}\n`;
      });
      
      content += `\n🏫 **Top Colleges in J&K:**\n`;
      rec.details.colleges.slice(0, 3).forEach(college => {
        content += `• ${college}\n`;
      });
      
      content += `\n💰 **Salary Range:** ${rec.details.salary}\n`;
      content += `🎯 **Job Prospects:** ${rec.details.prospects}\n\n`;
      
      content += `📋 **Next Steps for ${rec.details.name}:**\n`;
      rec.details.nextSteps.forEach(step => {
        content += `• ${step}\n`;
      });
      content += `\n---\n\n`;
    });

    content += `🚀 **Your Career Action Plan:**\n`;
    content += `• Explore detailed course information for your top matches\n`;
    content += `• Research admission requirements for recommended colleges\n`;
    content += `• Connect with current students or professionals in these fields\n`;
    content += `• Plan your preparation strategy for entrance exams\n`;
    content += `• Consider internships or projects to gain experience\n\n`;
    
    content += `💬 **Ask me anything!** I can provide more details about:\n`;
    content += `• Specific career paths and their requirements\n`;
    content += `• College admission processes and cutoffs\n`;
    content += `• Scholarship opportunities in J&K\n`;
    content += `• Industry trends and job market insights\n`;
    content += `• Study plans and preparation strategies\n\n`;
    
    content += `What would you like to know more about?`;

    return {
      role: 'assistant',
      content,
      messageType: 'recommendations',
      recommendationsData: recommendations
    };
  }

  return {
    role: 'assistant',
    content: `✅ **Assessment Complete!**\n\nThank you for completing your career assessment! Your personalized recommendations are ready above.\n\nFeel free to ask me any questions about:\n• Career details and requirements\n• College information and admissions\n• Preparation strategies\n• Job market trends\n• Anything else related to your career journey!\n\nI'm here to help! 😊`,
    messageType: 'completed'
  };
};

// Enhanced chat controller functions
export const listConversations = async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await conversationModel
      .find({ user: userId })
      .sort({ updatedAt: -1 })
      .select("title updatedAt createdAt context status");
    
    return res.status(200).json({ success: true, conversations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    
    const conversation = await conversationModel.findOne({ _id: id, user: userId });
      
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    
    return res.status(200).json({ success: true, conversation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/chatController.js - Update createAISession to not count immediately
export const createAISession = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationLevel } = req.body;
    
    if (!educationLevel || !['after10th', 'after12th'].includes(educationLevel)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid education level is required" 
      });
    }

    // Create conversation with welcome message
    const welcomeMessage = generateAIResponse('welcome', 0, educationLevel);
    
    const conversation = await conversationModel.create({
      user: userId,
      title: `Career Assessment - ${educationLevel === 'after10th' ? 'After 10th' : 'After 12th'}`,
      context: {
        educationLevel,
        currentStage: 'welcome',
        questionIndex: 0,
        totalQuestions: COMPLETE_QUESTION_BANK[educationLevel]?.length || 10,
        answeredQuestions: 0, // ✅ Start with 0
        progressPercentage: 0,
        userAnswers: [],
        careerScores: {}
      },
      messages: [welcomeMessage],
      status: 'active' // ✅ Start as active, not completed
    });

    return res.status(201).json({ 
      success: true, 
      conversation,
      welcomeMessage
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { content, questionData, userResponse } = req.body;

    // Find conversation
    const conversation = await conversationModel.findOne({ _id: id, user: userId });
      
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content,
      messageType: 'text',
      questionData,
      userResponse,
      createdAt: new Date()
    };
    
    conversation.messages.push(userMessage);

    // Initialize career scorer
    const careerScorer = new CareerScorer();

    // Handle education level selection
    if (questionData?.questionId === 'education_level_selector') {
      if (content.includes('10th')) {
        conversation.context.educationLevel = 'after10th';
      } else {
        conversation.context.educationLevel = 'after12th';
      }
      conversation.context.currentStage = 'questions';
      conversation.context.questionIndex = 0;
      conversation.context.totalQuestions = COMPLETE_QUESTION_BANK[conversation.context.educationLevel]?.length || 10;
    } else {
      // Process user answer for scoring
      if (userResponse?.answer && questionData?.questionId) {
        const questions = COMPLETE_QUESTION_BANK[conversation.context.educationLevel] || [];
        const currentQuestion = questions.find(q => q.id === questionData.questionId);
        
        if (currentQuestion) {
          // Handle multiselect answers
          let answerToProcess = userResponse.answer;
          if (currentQuestion.multiselect && typeof answerToProcess === 'string') {
            answerToProcess = answerToProcess.split(', ');
          }
          
          careerScorer.processAnswer(currentQuestion, answerToProcess);
          
          // Store answer
          conversation.context.userAnswers = conversation.context.userAnswers || [];
          conversation.context.userAnswers.push(userResponse.answer);
        }
      }
      
      // Move to next question
      conversation.context.questionIndex = (conversation.context.questionIndex || 0) + 1;
      conversation.context.answeredQuestions = conversation.context.questionIndex;
    }

    // Determine next stage
    let nextStage = 'questions';
    const totalQuestions = conversation.context.totalQuestions;
    const currentIndex = conversation.context.questionIndex;

    if (currentIndex >= totalQuestions) {
      nextStage = 'recommendations';
      conversation.status = 'completed';
      
      // Process all previous answers for final scoring
      if (conversation.context.userAnswers && conversation.context.userAnswers.length > 0) {
        const questions = COMPLETE_QUESTION_BANK[conversation.context.educationLevel] || [];
        conversation.context.userAnswers.forEach((answer, index) => {
          if (questions[index]) {
            let answerToProcess = answer;
            if (questions[index].multiselect && typeof answerToProcess === 'string') {
              answerToProcess = answerToProcess.split(', ');
            }
            careerScorer.processAnswer(questions[index], answerToProcess);
          }
        });
      }
    }

    // Generate AI response
    const aiResponse = generateAIResponse(
      nextStage, 
      currentIndex, 
      conversation.context.educationLevel,
      conversation.context.userAnswers,
      nextStage === 'recommendations' ? careerScorer : null
    );
    
    conversation.messages.push({
      ...aiResponse,
      createdAt: new Date()
    });

    // Update progress
    const progress = Math.min(100, (currentIndex / totalQuestions) * 100);
    conversation.context.progressPercentage = progress;
    conversation.context.currentStage = nextStage;

    // Store career scores if completed
    if (nextStage === 'recommendations') {
      conversation.context.careerScores = careerScorer.scores;
    }

    await conversation.save();

    return res.status(200).json({ 
      success: true, 
      conversation,
      aiResponse
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Handle free-form questions after assessment completion
export const askQuestion = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { question } = req.body;

    const conversation = await conversationModel.findOne({ _id: id, user: userId });
      
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    // Add user question
    conversation.messages.push({
      role: 'user',
      content: question,
      messageType: 'text',
      createdAt: new Date()
    });

    // Generate contextual response based on question
    let response = generateContextualResponse(question, conversation.context);
    
    conversation.messages.push({
      role: 'assistant',
      content: response,
      messageType: 'text',
      createdAt: new Date()
    });

    await conversation.save();

    return res.status(200).json({ 
      success: true, 
      conversation,
      response: {
        role: 'assistant',
        content: response,
        messageType: 'text'
      }
    });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Generate contextual responses for free-form questions
const generateContextualResponse = (question, context) => {
  const questionLower = question.toLowerCase();
  
  // Salary-related questions
  if (questionLower.includes('salary') || questionLower.includes('package') || questionLower.includes('pay')) {
    if (questionLower.includes('cse') || questionLower.includes('computer science')) {
      return `💰 **Computer Science Engineering Salary in India:**

**Fresher Level (0-2 years):**
• Government Sector: ₹3-6 LPA
• Private Companies: ₹3-8 LPA
• Top IT Companies: ₹6-15 LPA
• Startups: ₹4-10 LPA

**Mid-Level (3-7 years):**
• ₹8-20 LPA in most companies
• ₹15-35 LPA in top tech companies
• ₹20-50 LPA for specialized roles (AI/ML, Data Science)

**Senior Level (8+ years):**
• ₹25-60 LPA for senior positions
• ₹50+ LPA for leadership roles
• ₹1+ Crore for top tech companies (Google, Microsoft, etc.)

**In Jammu & Kashmir specifically:**
• Government jobs: ₹3-8 LPA
• Private sector: ₹2.5-12 LPA
• Remote work opportunities: ₹5-25 LPA
• Freelancing potential: ₹3-15 LPA

**Factors affecting salary:**
• Company size and reputation
• Skills and specialization
• Location (metro vs non-metro)
• Performance and experience
• Additional certifications

Would you like to know about salary prospects for any other field?`;
    }
    
    if (questionLower.includes('medical') || questionLower.includes('doctor') || questionLower.includes('mbbs')) {
      return `💰 **Medical Field Salary in India:**

**MBBS Doctor:**
• Government Hospital: ₹4-12 LPA
• Private Practice: ₹3-20 LPA (varies greatly)
• Corporate Hospitals: ₹6-15 LPA

**Specialist Doctor (MD/MS):**
• Government: ₹8-25 LPA
• Private: ₹15-50+ LPA
• Super Specialist: ₹25-1 Crore+ LPA

**Other Medical Careers:**
• Nursing: ₹2-8 LPA
• Pharmacy: ₹2.5-10 LPA
• Physiotherapy: ₹2-8 LPA
• Medical Lab Technology: ₹2-6 LPA

**In Jammu & Kashmir:**
• Government medical jobs are highly sought after
• AIIMS Jammu offers excellent opportunities
• Private practice potential in urban areas
• Medical tourism growing in Kashmir

The medical field offers both financial stability and the satisfaction of helping people. Would you like to know about admission requirements or preparation strategies?`;
    }
    
    return `💰 **General Salary Information:**

Salaries vary greatly based on:
• **Field of work** (Engineering, Medical, Arts, etc.)
• **Experience level** (Fresher to Senior)
• **Company type** (Government, Private, MNC)
• **Location** (Metro cities vs smaller towns)
• **Skills and specialization**

**Average starting salaries in India:**
• Engineering: ₹3-8 LPA
• Medical: ₹4-10 LPA
• Commerce/Management: ₹2.5-6 LPA
• Arts/Humanities: ₹2-5 LPA
• Law: ₹3-8 LPA

**In Jammu & Kashmir specifically:**
• Government jobs are highly preferred and stable
• Private sector is growing, especially in Jammu and Srinagar
• Remote work opportunities are increasing
• Tourism and hospitality sectors offer good prospects
• Agriculture and horticulture have traditional importance

Which specific career field would you like detailed salary information about?`;
  }

  // College-related questions
  if (questionLower.includes('college') || questionLower.includes('admission') || questionLower.includes('cutoff')) {
    return `🏫 **College Information for J&K Students:**

**Top Engineering Colleges:**
• NIT Srinagar - JEE Main cutoff: 15,000-50,000 rank
• IIT Jammu - JEE Advanced cutoff: 2,000-8,000 rank
• SMVDU Katra - JEE Main cutoff: 40,000-80,000 rank
• Government Polytechnics - 10th based admission

**Medical Colleges:**
• GMC Srinagar - NEET cutoff: 550-600+ marks
• GMC Jammu - NEET cutoff: 540-590+ marks
• AIIMS Jammu - NEET cutoff: 600+ marks
• GMC Kathua - NEET cutoff: 520-570+ marks

**General Degree Colleges:**
• University of Kashmir - Merit-based admission
• University of Jammu - Merit-based admission
• Various Government Degree Colleges across districts

**Management Colleges:**
• IIM Jammu - CAT cutoff: 85-95+ percentile
• University MBA programs - CMAT/MAT based

**Admission Tips:**
• Apply early and keep track of deadlines
• Prepare thoroughly for entrance exams
• Have backup options ready
• Consider both government and private colleges
• Look into scholarship opportunities

Which specific college or course would you like more information about?`;
  }

  // Course-related questions
  if (questionLower.includes('course') || questionLower.includes('subject') || questionLower.includes('stream')) {
    return `📚 **Course Selection Guidance:**

**After 10th Grade Options:**
• **Science Stream:** PCM, PCB, PCMB
• **Commerce Stream:** With/without Mathematics
• **Humanities:** History, Political Science, Economics
• **Vocational Courses:** Computer Applications, Fashion Design
• **Diploma Courses:** Engineering, Medical, Education

**After 12th Grade Options:**
• **Engineering:** 200+ specializations available
• **Medical:** MBBS, BDS, BAMS, Nursing, Pharmacy
• **Management:** BBA, MBA, Hotel Management
• **Law:** BA LLB, LLB, Corporate Law
• **Arts:** Fine Arts, Literature, Music, Dance
• **Science:** Physics, Chemistry, Biology, Mathematics

**Course Selection Tips:**
• Consider your interests and aptitude
• Research career prospects and job market
• Check admission requirements and cutoffs
• Consider financial aspects and duration
• Think about long-term career goals

Based on your assessment results, I can provide more specific course recommendations. What particular area interests you most?`;
  }

  // Preparation and study-related questions
  if (questionLower.includes('prepare') || questionLower.includes('study') || questionLower.includes('exam')) {
    return `📖 **Preparation Strategies:**

**For Engineering (JEE):**
• Focus on Physics, Chemistry, Mathematics
• Solve previous year papers regularly
• Take mock tests weekly
• Join coaching or online courses
• Practice time management

**For Medical (NEET):**
• Master Biology, Chemistry, Physics
• NCERT books are crucial
• Practice MCQs daily
• Take regular mock tests
• Focus on accuracy over speed

**For General Studies:**
• Create a study schedule
• Use active learning techniques
• Form study groups
• Take regular breaks
• Stay consistent

**Study Tips for J&K Students:**
• Utilize online resources during connectivity issues
• Download offline study materials
• Join local study groups
• Use government libraries and resources
• Consider coaching centers in Jammu/Srinagar

**Time Management:**
• Create daily/weekly study plans
• Prioritize difficult subjects
• Regular revision is key
• Balance study with recreation
• Get adequate sleep

What specific exam or subject would you like preparation guidance for?`;
  }

  // Career prospects and future questions
  if (questionLower.includes('future') || questionLower.includes('scope') || questionLower.includes('opportunity')) {
    return `🚀 **Future Career Prospects:**

**Emerging Fields with Great Scope:**
• **Artificial Intelligence & Machine Learning**
• **Data Science and Analytics**
• **Cybersecurity**
• **Digital Marketing**
• **Renewable Energy**
• **Biotechnology**
• **Space Technology**
• **Environmental Science**

**Traditional Fields with Steady Growth:**
• **Healthcare and Medicine**
• **Education and Training**
• **Government Services**
• **Banking and Finance**
• **Agriculture and Food Technology**

**Opportunities in J&K:**
• **Tourism and Hospitality** - Growing sector
• **Horticulture and Agriculture** - Traditional strength
• **IT and Software** - Remote work opportunities
• **Handicrafts and Arts** - Cultural preservation
• **Government Services** - Stable employment
• **Education** - Always in demand

**Future Trends:**
• Remote work becoming mainstream
• Skill-based hiring over degree-based
• Entrepreneurship opportunities increasing
• Digital literacy becoming essential
• Sustainable development focus

**Advice for Future Success:**
• Develop both technical and soft skills
• Stay updated with industry trends
• Build a strong network
• Consider entrepreneurship opportunities
• Focus on continuous learning

Which specific field's future prospects would you like to explore?`;
  }

  // Default response for other questions
  return `🤔 **I'd be happy to help you with that!**

I can provide detailed information about:

**Career Guidance:**
• Salary packages for different fields
• Job prospects and market trends
• Career growth opportunities
• Skills required for various careers

**Education & Colleges:**
• Admission requirements and cutoffs
• Best colleges in J&K and India
• Course details and curriculum
• Scholarship opportunities

**Preparation & Studies:**
• Exam preparation strategies
• Study plans and time management
• Resource recommendations
• Mock test strategies

**Specific to J&K:**
• Local college information
• Government job opportunities
• Regional industry insights
• Cultural and traditional career paths

Could you please be more specific about what you'd like to know? For example:
• "What is the salary for software engineers?"
• "How to prepare for NEET exam?"
• "Best engineering colleges in J&K"
• "Career opportunities in tourism"

I'm here to provide detailed, helpful information! 😊`;
};

export const renameConversation = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title } = req.body;
    
    const conversation = await conversationModel.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { title } },
      { new: true }
    );
    
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    
    return res.status(200).json({ success: true, conversation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    
    await conversationModel.deleteOne({ _id: id, user: userId });
    
    return res.status(200).json({ success: true, message: "Conversation deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/chatController.js - Update the analytics function
export const getSessionAnalytics = async (req, res) => {
  try {
    const userId = req.userId;
    
    const conversations = await conversationModel.find({ user: userId });
    
    // ✅ Only count sessions that have at least answered some questions
    const validSessions = conversations.filter(conv => 
      conv.context && conv.context.answeredQuestions > 0
    );
    
    const totalSessions = validSessions.length;
    const completedSessions = conversations.filter(c => c.status === 'completed').length;

    // Extract career recommendations from completed sessions
    const careerCounts = {};
    conversations.forEach(conv => {
      if (conv.status === 'completed') {
        const recommendationMessage = conv.messages.find(m => m.messageType === 'recommendations');
        if (recommendationMessage?.recommendationsData) {
          recommendationMessage.recommendationsData.forEach(rec => {
            const careerName = rec.details.name;
            careerCounts[careerName] = (careerCounts[careerName] || 0) + 1;
          });
        }
      }
    });

    const topCareers = Object.entries(careerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([career, count]) => ({ career, count }));

    return res.status(200).json({
      success: true,
      analytics: {
        totalSessions,
        completedSessions,
        completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
        averageRating: 4.5,
        topCareers
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};