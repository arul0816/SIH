// services/questionBankService.js

// Comprehensive question bank for career guidance
export const QUESTION_BANK = {
  after10th: {
    basic_info: [
      {
        id: "location",
        type: "mcq",
        category: "basic",
        question: "Which district of Jammu & Kashmir are you from?",
        options: [
          "Jammu", "Srinagar", "Baramulla", "Budgam", "Anantnag", 
          "Pulwama", "Shopian", "Kulgam", "Ganderbal", "Bandipora",
          "Kupwara", "Kathua", "Udhampur", "Reasi", "Ramban",
          "Doda", "Kishtwar", "Rajouri", "Poonch", "Samba"
        ],
        weight: 1
      },
      {
        id: "academic_performance",
        type: "mcq",
        category: "basic",
        question: "What was your overall percentage in 10th grade?",
        options: [
          "90% and above",
          "80-89%",
          "70-79%",
          "60-69%",
          "50-59%",
          "Below 50%"
        ],
        weight: 2
      }
    ],
    aptitude: [
      {
        id: "math_aptitude",
        type: "mcq",
        category: "aptitude",
        question: "Which subject did you find most interesting in 10th grade?",
        options: [
          "Mathematics",
          "Science (Physics, Chemistry, Biology)",
          "Social Studies",
          "Languages (English, Hindi, Urdu)",
          "Computer Science",
          "Arts/Drawing"
        ],
        scoring: {
          "Mathematics": { engineering: 3, commerce: 2, science: 2 },
          "Science (Physics, Chemistry, Biology)": { science: 3, medical: 3, engineering: 2 },
          "Social Studies": { humanities: 3, law: 2, management: 1 },
          "Languages (English, Hindi, Urdu)": { humanities: 3, media: 2, arts: 2 },
          "Computer Science": { engineering: 3, it: 3, science: 2 },
          "Arts/Drawing": { arts: 3, design: 3, media: 2 }
        },
        weight: 3
      },
      {
        id: "problem_solving",
        type: "mcq",
        category: "aptitude",
        question: "When faced with a complex problem, you prefer to:",
        options: [
          "Break it down into smaller parts and solve step by step",
          "Look for creative and unconventional solutions",
          "Seek help from others and work as a team",
          "Research thoroughly before attempting to solve",
          "Use trial and error method",
          "Apply logical reasoning and analysis"
        ],
        scoring: {
          "Break it down into smaller parts and solve step by step": { engineering: 3, science: 2, management: 2 },
          "Look for creative and unconventional solutions": { arts: 3, design: 3, entrepreneurship: 2 },
          "Seek help from others and work as a team": { management: 3, social_work: 2, psychology: 2 },
          "Research thoroughly before attempting to solve": { research: 3, science: 2, law: 2 },
          "Use trial and error method": { engineering: 2, it: 2, entrepreneurship: 1 },
          "Apply logical reasoning and analysis": { engineering: 3, law: 2, science: 2 }
        },
        weight: 3
      },
      {
        id: "learning_style",
        type: "mcq",
        category: "aptitude",
        question: "How do you learn best?",
        options: [
          "Visual aids (diagrams, charts, videos)",
          "Hands-on practice and experiments",
          "Reading and writing notes",
          "Group discussions and debates",
          "Listening to lectures and explanations",
          "Real-world applications and examples"
        ],
        scoring: {
          "Visual aids (diagrams, charts, videos)": { design: 3, arts: 2, media: 2 },
          "Hands-on practice and experiments": { engineering: 3, science: 3, medical: 2 },
          "Reading and writing notes": { humanities: 3, law: 2, research: 2 },
          "Group discussions and debates": { management: 3, law: 2, social_work: 2 },
          "Listening to lectures and explanations": { humanities: 2, psychology: 2, education: 2 },
          "Real-world applications and examples": { engineering: 2, management: 2, entrepreneurship: 3 }
        },
        weight: 2
      }
    ],
    interest: [
      {
        id: "career_activities",
        type: "multiselect",
        category: "interest",
        question: "Which activities interest you the most? (Select up to 3)",
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
        },
        weight: 4,
        maxSelections: 3
      },
      {
        id: "work_environment",
        type: "mcq",
        category: "interest",
        question: "In which environment would you prefer to work?",
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
        scoring: {
          "Office with computers and technology": { it: 3, engineering: 2, commerce: 2 },
          "Laboratory or research facility": { science: 3, research: 3, medical: 2 },
          "Hospital or healthcare setting": { medical: 3, psychology: 2, social_work: 1 },
          "Outdoor fieldwork": { agriculture: 3, environmental: 2, research: 1 },
          "Creative studio or workshop": { arts: 3, design: 3, media: 2 },
          "Classroom or educational institution": { education: 3, psychology: 2, humanities: 2 },
          "Courtroom or legal office": { law: 3, management: 1 },
          "Business meetings and conferences": { management: 3, entrepreneurship: 2, commerce: 2 }
        },
        weight: 3
      },
      {
        id: "future_goals",
        type: "mcq",
        category: "interest",
        question: "What is your primary career goal?",
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
        scoring: {
          "Earn a high salary and financial stability": { engineering: 2, it: 2, commerce: 3, management: 2 },
          "Make a positive impact on society": { social_work: 3, education: 3, medical: 2, law: 2 },
          "Achieve recognition and fame": { arts: 2, media: 3, entrepreneurship: 2, law: 1 },
          "Have work-life balance and flexibility": { education: 2, arts: 2, it: 1, psychology: 2 },
                    "Continuously learn and grow": { research: 3, science: 2, education: 2, it: 2 },
          "Lead and manage teams": { management: 3, entrepreneurship: 3, law: 2 },
          "Create something innovative": { engineering: 3, it: 3, arts: 2, design: 3 },
          "Help people and make a difference": { medical: 3, psychology: 3, social_work: 3, education: 2 }
        },
        weight: 4
      }
    ],
    personality: [
      {
        id: "work_style",
        type: "mcq",
        category: "personality",
        question: "Which describes your preferred work style?",
        options: [
          "Work independently with minimal supervision",
          "Collaborate closely with team members",
          "Lead and guide others",
          "Follow structured processes and guidelines",
          "Adapt quickly to changing situations",
          "Focus on details and precision"
        ],
        scoring: {
          "Work independently with minimal supervision": { research: 3, arts: 2, it: 2, science: 2 },
          "Collaborate closely with team members": { management: 2, psychology: 2, social_work: 2, education: 2 },
          "Lead and guide others": { management: 3, entrepreneurship: 3, law: 2, education: 2 },
          "Follow structured processes and guidelines": { commerce: 3, law: 2, medical: 2, engineering: 2 },
          "Adapt quickly to changing situations": { entrepreneurship: 3, it: 2, media: 2, management: 2 },
          "Focus on details and precision": { science: 3, engineering: 3, medical: 2, research: 2 }
        },
        weight: 3
      },
      {
        id: "stress_handling",
        type: "mcq",
        category: "personality",
        question: "How do you handle stressful situations?",
        options: [
          "Stay calm and think logically",
          "Seek support from others",
          "Take breaks and manage time better",
          "Focus on solutions rather than problems",
          "Use creative outlets to relieve stress",
          "Plan ahead to avoid stressful situations"
        ],
        scoring: {
          "Stay calm and think logically": { engineering: 3, science: 2, law: 2, medical: 2 },
          "Seek support from others": { psychology: 3, social_work: 2, management: 2, education: 2 },
          "Take breaks and manage time better": { arts: 2, education: 2, psychology: 2 },
          "Focus on solutions rather than problems": { engineering: 3, management: 3, entrepreneurship: 2, it: 2 },
          "Use creative outlets to relieve stress": { arts: 3, design: 3, media: 2 },
          "Plan ahead to avoid stressful situations": { commerce: 3, management: 2, law: 2 }
        },
        weight: 2
      }
    ]
  },
  
  after12th: {
    basic_info: [
      {
        id: "current_stream",
        type: "mcq",
        category: "basic",
        question: "What stream did you choose in 11th-12th?",
        options: [
          "Science (PCM - Physics, Chemistry, Mathematics)",
          "Science (PCB - Physics, Chemistry, Biology)",
          "Science (PCMB - Physics, Chemistry, Mathematics, Biology)",
          "Commerce (with Mathematics)",
          "Commerce (without Mathematics)",
          "Humanities/Arts",
          "Vocational/Technical"
        ],
        weight: 4
      },
      {
        id: "academic_performance_12th",
        type: "mcq",
        category: "basic",
        question: "What is your expected/achieved percentage in 12th grade?",
        options: [
          "95% and above",
          "85-94%",
          "75-84%",
          "65-74%",
          "55-64%",
          "Below 55%"
        ],
        weight: 3
      },
      {
        id: "entrance_preparation",
        type: "mcq",
        category: "basic",
        question: "Are you preparing for any entrance exams?",
        options: [
          "JEE Main/Advanced (Engineering)",
          "NEET (Medical)",
          "CLAT (Law)",
          "CA Foundation (Commerce)",
          "CUET (Central Universities)",
          "State-level entrance exams",
          "Not preparing for any entrance exam"
        ],
        weight: 3
      }
    ],
    aptitude: [
      {
        id: "subject_strength",
        type: "mcq",
        category: "aptitude",
        question: "Which subject area is your strongest?",
        options: [
          "Mathematics and Logical Reasoning",
          "Physics and Applied Sciences",
          "Chemistry and Chemical Processes",
          "Biology and Life Sciences",
          "Economics and Business Studies",
          "Languages and Literature",
          "History and Social Sciences",
          "Computer Science and Programming"
        ],
        scoring: {
          "Mathematics and Logical Reasoning": { engineering: 3, commerce: 2, science: 2, it: 2 },
          "Physics and Applied Sciences": { engineering: 3, science: 3, research: 2 },
          "Chemistry and Chemical Processes": { science: 3, medical: 2, engineering: 2, research: 2 },
          "Biology and Life Sciences": { medical: 3, science: 2, research: 2, agriculture: 2 },
          "Economics and Business Studies": { commerce: 3, management: 3, law: 1 },
          "Languages and Literature": { humanities: 3, media: 2, arts: 2, education: 2 },
          "History and Social Sciences": { humanities: 3, law: 2, social_work: 2, education: 2 },
          "Computer Science and Programming": { it: 3, engineering: 2, science: 1 }
        },
        weight: 4
      },
      {
        id: "analytical_thinking",
        type: "mcq",
        category: "aptitude",
        question: "When solving complex problems, you prefer:",
        options: [
          "Mathematical formulas and calculations",
          "Scientific experiments and observations",
          "Logical reasoning and deduction",
          "Creative and innovative approaches",
          "Research and data analysis",
          "Collaborative brainstorming"
        ],
        scoring: {
          "Mathematical formulas and calculations": { engineering: 3, science: 2, commerce: 2, it: 2 },
          "Scientific experiments and observations": { science: 3, medical: 2, research: 3, engineering: 1 },
          "Logical reasoning and deduction": { law: 3, engineering: 2, it: 2, management: 2 },
          "Creative and innovative approaches": { arts: 3, design: 3, entrepreneurship: 2, media: 2 },
          "Research and data analysis": { research: 3, science: 2, it: 2, commerce: 1 },
          "Collaborative brainstorming": { management: 3, psychology: 2, social_work: 2, education: 2 }
        },
        weight: 3
      }
    ],
    interest: [
      {
        id: "career_field_interest",
        type: "multiselect",
        category: "interest",
        question: "Which career fields interest you most? (Select up to 3)",
        options: [
          "Engineering and Technology",
          "Medical and Healthcare",
          "Business and Management",
          "Law and Legal Services",
          "Arts and Creative Fields",
          "Research and Academia",
          "Social Work and NGOs",
          "Government and Civil Services",
          "Media and Communication",
          "Agriculture and Environment"
        ],
        scoring: {
          "Engineering and Technology": { engineering: 4, it: 3 },
          "Medical and Healthcare": { medical: 4, psychology: 2 },
          "Business and Management": { management: 4, commerce: 3, entrepreneurship: 3 },
          "Law and Legal Services": { law: 4, humanities: 2 },
          "Arts and Creative Fields": { arts: 4, design: 4, media: 3 },
          "Research and Academia": { research: 4, science: 3, education: 2 },
          "Social Work and NGOs": { social_work: 4, psychology: 3, humanities: 2 },
          "Government and Civil Services": { law: 2, management: 2, humanities: 2 },
          "Media and Communication": { media: 4, arts: 2, humanities: 2 },
          "Agriculture and Environment": { agriculture: 4, science: 2, environmental: 3 }
        },
        weight: 5,
        maxSelections: 3
      },
      {
        id: "work_motivation",
        type: "mcq",
        category: "interest",
        question: "What motivates you most in your future career?",
        options: [
          "High salary and financial security",
          "Job satisfaction and personal fulfillment",
          "Social impact and helping others",
          "Innovation and creativity",
          "Leadership and influence",
          "Continuous learning and growth",
          "Work-life balance",
          "Recognition and prestige"
        ],
        scoring: {
          "High salary and financial security": { engineering: 2, it: 2, commerce: 3, management: 2 },
          "Job satisfaction and personal fulfillment": { arts: 3, education: 3, psychology: 2, research: 2 },
          "Social impact and helping others": { medical: 3, social_work: 4, education: 3, law: 2 },
          "Innovation and creativity": { engineering: 3, it: 3, arts: 4, design: 4, entrepreneurship: 3 },
          "Leadership and influence": { management: 4, entrepreneurship: 4, law: 3 },
          "Continuous learning and growth": { research: 4, science: 3, education: 3, it: 2 },
          "Work-life balance": { education: 2, arts: 2, psychology: 2 },
          "Recognition and prestige": { law: 2, medical: 2, management: 2, media: 2 }
        },
        weight: 4
      }
    ],
    personality: [
      {
        id: "leadership_style",
        type: "mcq",
        category: "personality",
        question: "How do you prefer to work in group projects?",
        options: [
          "Take charge and lead the team",
          "Contribute ideas and support the leader",
          "Focus on specific tasks assigned to me",
          "Facilitate communication between team members",
          "Provide creative input and solutions",
          "Ensure quality and attention to detail"
        ],
        scoring: {
          "Take charge and lead the team": { management: 4, entrepreneurship: 3, law: 2 },
          "Contribute ideas and support the leader": { engineering: 2, science: 2, commerce: 2, it: 2 },
          "Focus on specific tasks assigned to me": { science: 3, engineering: 2, research: 2, commerce: 2 },
          "Facilitate communication between team members": { psychology: 3, social_work: 3, management: 2, education: 2 },
          "Provide creative input and solutions": { arts: 4, design: 4, entrepreneurship: 2, media: 3 },
          "Ensure quality and attention to detail": { science: 3, engineering: 3, medical: 2, law: 2 }
        },
        weight: 3
      }
    ]
  }
};

// Tie-breaker questions for close scores
export const TIE_BREAKER_QUESTIONS = {
  "engineering_it": [
    {
      id: "hardware_vs_software",
      question: "Do you enjoy working with hardware, machines, or physical systems?",
      options: ["Yes, I prefer hands-on work", "No, I prefer software/digital work"],
      scoring: { "Yes, I prefer hands-on work": { engineering: 2 }, "No, I prefer software/digital work": { it: 2 } }
    },
    {
      id: "programming_interest",
      question: "Do you enjoy programming, coding, or software development?",
      options: ["Yes, very much", "Somewhat", "Not really"],
      scoring: { "Yes, very much": { it: 3 }, "Somewhat": { it: 1, engineering: 1 }, "Not really": { engineering: 2 } }
    }
  ],
  "medical_psychology": [
    {
      id: "treatment_preference",
      question: "Do you prefer treating physical health problems or mental/emotional well-being?",
      options: ["Physical health", "Mental/emotional health", "Both equally"],
      scoring: { "Physical health": { medical: 2 }, "Mental/emotional health": { psychology: 2 }, "Both equally": { medical: 1, psychology: 1 } }
    }
  ],
  "arts_media": [
    {
      id: "creation_vs_communication",
      question: "Do you prefer creating original artwork or managing media and communication?",
      options: ["Creating original artwork", "Managing media/communication", "Both"],
      scoring: { "Creating original artwork": { arts: 2 }, "Managing media/communication": { media: 2 }, "Both": { arts: 1, media: 1 } }
    }
  ]
};

// Career field definitions with J&K specific information
export const CAREER_FIELDS = {
  engineering: {
    name: "Engineering",
    description: "Design, build, and maintain systems, structures, and technology",
    streams: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"],
    colleges_jk: ["NIT Srinagar", "IIT Jammu", "Government Polytechnics"],
    job_prospects: "High demand in IT sector, infrastructure development",
    salary_range: "₹3-15 LPA"
  },
  medical: {
    name: "Medical & Healthcare",
    description: "Diagnose, treat, and prevent diseases and health conditions",
    streams: ["MBBS", "BDS", "BAMS", "Nursing", "Pharmacy", "Physiotherapy"],
    colleges_jk: ["GMC Srinagar", "GMC Jammu", "AIIMS Jammu"],
    job_prospects: "Always in demand, government and private opportunities",
    salary_range: "₹4-20 LPA"
  },
  it: {
    name: "Information Technology",
    description: "Develop software, manage systems, and work with digital technology",
    streams: ["Computer Science", "IT", "Software Engineering", "Data Science"],
    colleges_jk: ["University of Kashmir", "University of Jammu", "SMVDU"],
    job_prospects: "Excellent growth in tech sector, remote work opportunities",
    salary_range: "₹3-25 LPA"
  },
  commerce: {
    name: "Commerce & Finance",
    description: "Manage business operations, finance, and commercial activities",
    streams: ["B.Com", "BBA", "CA", "CS", "Economics"],
    colleges_jk: ["University of Kashmir", "University of Jammu", "Degree Colleges"],
    job_prospects: "Banking, finance, business sectors growing in J&K",
    salary_range: "₹2.5-12 LPA"
  },
  management: {
    name: "Management & Business",
    description: "Lead organizations, manage teams, and drive business growth",
    streams: ["MBA", "BBA", "Hotel Management", "Event Management"],
    colleges_jk: ["IIM Jammu", "University MBA programs", "Private institutes"],
    job_prospects: "Leadership roles in growing business sector",
    salary_range: "₹4-18 LPA"
  },
  law: {
    name: "Law & Legal Services",
    description: "Practice law, provide legal advice, and ensure justice",
    streams: ["BA LLB", "LLB", "LLM", "Judicial Services"],
        colleges_jk: ["University of Jammu Law School", "Dogra Law College"],
    job_prospects: "Legal practice, judiciary, corporate law, government legal services",
    salary_range: "₹3-15 LPA"
  },
  arts: {
    name: "Arts & Creative Fields",
    description: "Express creativity through various artistic mediums and cultural work",
    streams: ["Fine Arts", "Performing Arts", "Literature", "Music", "Dance"],
    colleges_jk: ["University of Kashmir Fine Arts", "Cultural institutes"],
    job_prospects: "Growing creative industry, cultural preservation, media",
    salary_range: "₹2-10 LPA"
  },
  humanities: {
    name: "Humanities & Social Sciences",
    description: "Study human society, culture, history, and social behavior",
    streams: ["History", "Political Science", "Sociology", "Philosophy", "Geography"],
    colleges_jk: ["University of Kashmir", "University of Jammu", "Degree Colleges"],
    job_prospects: "Civil services, research, education, social work",
    salary_range: "₹2.5-12 LPA"
  },
  science: {
    name: "Pure Sciences",
    description: "Research and study natural phenomena and scientific principles",
    streams: ["Physics", "Chemistry", "Biology", "Mathematics", "Environmental Science"],
    colleges_jk: ["University of Kashmir", "University of Jammu", "Research institutes"],
    job_prospects: "Research, teaching, laboratory work, environmental sector",
    salary_range: "₹3-12 LPA"
  },
  education: {
    name: "Education & Teaching",
    description: "Educate and guide students in various subjects and skills",
    streams: ["B.Ed", "M.Ed", "D.Ed", "Subject specializations"],
    colleges_jk: ["Government College of Education", "University education departments"],
    job_prospects: "Teaching positions, educational administration, curriculum development",
    salary_range: "₹2.5-8 LPA"
  },
  psychology: {
    name: "Psychology & Counseling",
    description: "Study human behavior and provide mental health support",
    streams: ["Psychology", "Clinical Psychology", "Counseling", "Social Work"],
    colleges_jk: ["University of Kashmir", "University of Jammu"],
    job_prospects: "Counseling centers, hospitals, NGOs, private practice",
    salary_range: "₹2.5-10 LPA"
  },
  social_work: {
    name: "Social Work & NGO",
    description: "Work for social welfare and community development",
    streams: ["MSW", "Social Work", "Community Development", "Rural Development"],
    colleges_jk: ["University departments", "NGO training institutes"],
    job_prospects: "NGOs, government social schemes, community development",
    salary_range: "₹2-8 LPA"
  },
  agriculture: {
    name: "Agriculture & Allied Sciences",
    description: "Work in farming, food production, and rural development",
    streams: ["Agriculture", "Horticulture", "Veterinary Science", "Food Technology"],
    colleges_jk: ["SKUAST Kashmir", "SKUAST Jammu"],
    job_prospects: "Farming, agribusiness, government agriculture departments",
    salary_range: "₹2.5-10 LPA"
  },
  design: {
    name: "Design & Architecture",
    description: "Create visual designs, plan spaces, and develop user experiences",
    streams: ["Architecture", "Interior Design", "Graphic Design", "Fashion Design"],
    colleges_jk: ["Private design institutes", "University art departments"],
    job_prospects: "Design studios, architecture firms, freelancing",
    salary_range: "₹2.5-12 LPA"
  },
  media: {
    name: "Media & Communication",
    description: "Work in journalism, broadcasting, and digital media",
    streams: ["Mass Communication", "Journalism", "Digital Media", "Film Studies"],
    colleges_jk: ["University of Kashmir Media department", "Private institutes"],
    job_prospects: "News channels, newspapers, digital media, content creation",
    salary_range: "₹2.5-12 LPA"
  },
  entrepreneurship: {
    name: "Entrepreneurship & Startups",
    description: "Start and manage your own business ventures",
    streams: ["Any field + Business skills", "Startup incubation programs"],
    colleges_jk: ["IIM Jammu incubation", "University entrepreneurship cells"],
    job_prospects: "Self-employment, business ownership, innovation",
    salary_range: "Variable (₹0-50+ LPA)"
  },
  research: {
    name: "Research & Academia",
    description: "Conduct research and contribute to knowledge advancement",
    streams: ["PhD programs", "Research fellowships", "Academic positions"],
    colleges_jk: ["University research departments", "CSIR labs", "DRDO"],
    job_prospects: "Research institutions, universities, think tanks",
    salary_range: "₹3-15 LPA"
  }
};

export const getQuestionsByStage = (educationLevel, stage) => {
  if (!QUESTION_BANK[educationLevel] || !QUESTION_BANK[educationLevel][stage]) {
    return [];
  }
  return QUESTION_BANK[educationLevel][stage];
};

export const getQuestionById = (questionId, educationLevel) => {
  const allStages = QUESTION_BANK[educationLevel] || {};
  for (const stage in allStages) {
    const question = allStages[stage].find(q => q.id === questionId);
    if (question) return question;
  }
  return null;
};

export const getTieBreakerQuestions = (fields) => {
  const key = fields.sort().join('_');
  return TIE_BREAKER_QUESTIONS[key] || [];
};