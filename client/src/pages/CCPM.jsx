import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const courseCategories = [
  {
    name: 'Engineering',
    icon: '⚙️',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    particles: '⚙️🔧💻',
    streams: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Biotechnology', 'Aerospace']
  },
  {
    name: 'Medical',
    icon: '🏥',
    bg: 'from-red-50 via-red-100 to-red-200',
    particles: '🏥💊🩺',
    streams: ['MBBS/BDS', 'MD Specializations', 'MS Specializations', 'Super Specialty (DM)', 'Super Specialty (MCh)', 'AYUSH', 'Nursing', 'Pharmacy', 'Allied Health']
  },
  {
    name: 'Management',
    icon: '💼',
    bg: 'from-green-50 via-green-100 to-green-200',
    particles: '💼📊📈',
    streams: ['MBA General', 'MBA Specializations', 'BBA', 'Commerce', 'Professional Certifications']
  },
  {
    name: 'Law',
    icon: '⚖️',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    particles: '⚖️📖🏛️',
    streams: ['LLB (3 Year)', 'Integrated Law (5 Year)', 'LLM', 'Specialized Law', 'Legal Certifications']
  },
  {
    name: 'Arts & Design',
    icon: '🎨',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    particles: '🎨🖌️🎭',
    streams: ['Fine Arts', 'Design', 'Performing Arts', 'Media & Communication', 'Fashion Design']
  },
  {
    name: 'Science',
    icon: '🔬',
    bg: 'from-teal-50 via-teal-100 to-teal-200',
    particles: '🔬🧪📊',
    streams: ['Life Sciences', 'Physical Sciences', 'Environmental Sciences', 'Data Science', 'Research']
  },
  {
    name: 'Education',
    icon: '🎓',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    particles: '🎓📚✏️',
    streams: ['B.Ed', 'M.Ed', 'D.Ed', 'Physical Education', 'Special Education']
  },
  {
    name: 'Agriculture',
    icon: '🌾',
    bg: 'from-yellow-50 via-yellow-100 to-yellow-200',
    particles: '🌾🚜🌱',
    streams: ['Agriculture', 'Horticulture', 'Forestry', 'Veterinary', 'Food Technology']
  }
];

const careerRoadmaps = {
  // ENGINEERING STREAMS
  'Computer Science': {
    about: 'Computer Science Engineering (CSE) is a 4-year undergraduate program that combines theoretical foundations of computing, programming, data structures, algorithms, computer hardware, and software development. It focuses on designing, developing, testing, and maintaining computer systems and applications.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or other entrance exams',
        'Diploma students eligible for lateral entry to 2nd year'
      ]
    },

    roadmap: {
      title: '🛣️ CSE Career Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Foundations',
          duration: '2 Semesters',
          focus: 'Building Programming & Mathematical Foundation',
          subjects: [
            'Programming Basics (C/Python/Java)',
            'Engineering Mathematics I & II',
            'Engineering Physics & Chemistry',
            'Digital Logic & Electronics',
            'Communication Skills'
          ],
          projects: [
            'Simple calculator program',
            'Student database system',
            'Basic mini games'
          ],
          skills: ['Syntax mastery', 'Problem-solving logic', 'Basic algorithms'],
          goal: 'Build strong coding fundamentals and mathematical thinking'
        },
        {
          phase: '📍 2nd Year – Core CS Subjects',
          duration: '2 Semesters',
          focus: 'Core Computer Science Concepts',
          subjects: [
            'Data Structures & Algorithms (DSA)',
            'Object-Oriented Programming (OOP)',
            'Database Management Systems (DBMS)',
            'Operating Systems (OS)',
            'Computer Networks (CN)',
            'Software Engineering'
          ],
          projects: [
            'Library management system',
            'Chat application',
            'Simple website with database'
          ],
          skills: ['DSA mastery', 'Database design', 'System understanding'],
          goal: 'Strengthen problem-solving and core CS subjects'
        },
        {
          phase: '📍 3rd Year – Advanced Topics + Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Concepts & Real-world Development',
          subjects: [
            'Compiler Design',
            'Artificial Intelligence',
            'Machine Learning',
            'Web Development (Full Stack)',
            'Mobile App Development',
            'Cybersecurity Fundamentals'
          ],
          projects: [
            'AI-based application',
            'Full-stack web application',
            'Mobile app with backend'
          ],
          skills: ['Full-stack development', 'AI/ML basics', 'Security awareness'],
          goal: 'Learn real-world applications and choose specialization'
        },
        {
          phase: '📍 4th Year – Career Preparation',
          duration: '2 Semesters',
          focus: 'Industry Readiness & Placement Preparation',
          subjects: [
            'Capstone Project',
            'System Design',
            'Advanced Algorithms',
            'Industry Electives',
            'Internship/Training'
          ],
          projects: [
            'End-to-end industry project',
            'Open source contributions',
            'Research paper/publication'
          ],
          skills: ['System design', 'Interview preparation', 'Industry exposure'],
          goal: 'Complete career preparation for placements or higher studies'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Artificial Intelligence & Machine Learning',
          description: 'AI algorithms, neural networks, deep learning, NLP',
          careers: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'Research Scientist'],
          salary: '₹8-25 LPA'
        },
        {
          name: 'Cybersecurity',
          description: 'Network security, ethical hacking, cryptography',
          careers: ['Security Analyst', 'Ethical Hacker', 'Security Consultant'],
          salary: '₹6-20 LPA'
        },
        {
          name: 'Full Stack Development',
          description: 'Frontend, backend, databases, cloud deployment',
          careers: ['Full Stack Developer', 'Software Engineer', 'Tech Lead'],
          salary: '₹5-18 LPA'
        },
        {
          name: 'Data Science & Analytics',
          description: 'Big data, analytics, visualization, statistics',
          careers: ['Data Scientist', 'Data Analyst', 'Business Intelligence'],
          salary: '₹7-22 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Software Developer/Engineer',
        'Web Developer',
        'Mobile App Developer',
        'Database Administrator',
        'System Analyst',
        'Quality Assurance Engineer'
      ],
      advanced: [
        'Technical Architect',
        'Project Manager',
        'Product Manager',
        'CTO/Technical Director',
        'Entrepreneur/Startup Founder',
        'Research Scientist'
      ],
      sectors: [
        'IT Services (TCS, Infosys, Wipro)',
        'Product Companies (Google, Microsoft, Amazon)',
        'Startups & Unicorns',
        'Banking & Fintech',
        'Healthcare Tech',
        'Government & Defense'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹4-8 LPA (Average), ₹12-30 LPA (Top Tier)',
        experienced: '₹15-50 LPA (5+ years)',
        senior: '₹30-80 LPA (10+ years)'
      },
      abroad: {
        fresher: '$70,000-$110,000 (USA/Europe)',
        experienced: '$120,000-$180,000 (5+ years)',
        senior: '$200,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'High demand globally across all industries',
        'Excellent salary packages and growth opportunities',
        'Flexibility to work remotely',
        'Continuous learning keeps work interesting',
        'Multiple career paths and specializations',
        'Entrepreneurship opportunities',
        'Global job market access'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'High Competition',
          solution: 'Build strong practical skills, get internships early, learn emerging technologies'
        },
        {
          challenge: 'Rapidly Changing Technology',
          solution: 'Stay updated with online courses, follow industry trends, practice continuous learning'
        },
        {
          challenge: 'Work Pressure in IT Jobs',
          solution: 'Learn time management, choose companies with work-life balance, build strong fundamentals'
        },
        {
          challenge: 'Risk of Automation',
          solution: 'Focus on creative/analytical roles, develop domain expertise, build soft skills'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Programming & DSA',
          resources: ['LeetCode', 'GeeksforGeeks', 'HackerRank', 'Codeforces']
        },
        {
          category: 'Web Development',
          resources: ['FreeCodeCamp', 'MDN Docs', 'React Documentation', 'Node.js Guides']
        },
        {
          category: 'AI/ML',
          resources: ['Andrew Ng ML Course', 'Kaggle', 'TensorFlow Tutorials', 'PyTorch Documentation']
        },
        {
          category: 'System Design',
          resources: ['Grokking System Design', 'High Scalability', 'System Design Primer']
        }
      ]
    }
  },

  'Electronics': {
    about: 'Electronics and Communication Engineering (ECE) is a 4-year program focusing on electronic devices, circuits, communication systems, signal processing, and embedded systems. It bridges hardware and software domains.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or state entrance exams',
        'Diploma in Electronics for lateral entry'
      ]
    },

    roadmap: {
      title: '🛣️ ECE Career Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Fundamentals',
          duration: '2 Semesters',
          focus: 'Basic Engineering and Mathematical Foundation',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Basic Electrical Engineering',
            'Programming in C'
          ],
          projects: [
            'Simple LED circuits',
            'Basic programming projects',
            'Physics lab experiments'
          ],
          skills: ['Circuit analysis', 'Mathematical concepts', 'Programming basics'],
          goal: 'Build foundation in engineering principles and mathematics'
        },
        {
          phase: '📍 2nd Year – Core Electronics',
          duration: '2 Semesters',
          focus: 'Electronic Devices and Circuit Design',
          subjects: [
            'Electronic Devices & Circuits',
            'Digital Electronics',
            'Network Analysis',
            'Signals & Systems',
            'Electromagnetic Fields'
          ],
          projects: [
            'Amplifier design',
            'Digital logic circuits',
            'Signal generator'
          ],
          skills: ['Circuit design', 'Device characteristics', 'Digital logic'],
          goal: 'Master electronic devices and circuit fundamentals'
        },
        {
          phase: '📍 3rd Year – Communication Systems',
          duration: '2 Semesters',
          focus: 'Communication and Advanced Topics',
          subjects: [
            'Analog Communication',
            'Digital Communication',
            'Microprocessors',
            'Control Systems',
            'VLSI Design'
          ],
          projects: [
            'AM/FM transmitter',
            'Microcontroller projects',
            'VLSI circuit design'
          ],
          skills: ['Communication systems', 'Microprocessor programming', 'VLSI'],
          goal: 'Learn communication systems and advanced electronics'
        },
        {
          phase: '📍 4th Year – Specialization & Industry',
          duration: '2 Semesters',
          focus: 'Specialization and Industry Preparation',
          subjects: [
            'Mobile Communication',
            'Embedded Systems',
            'Digital Signal Processing',
            'Project Work',
            'Industry Training'
          ],
          projects: [
            'Final year project',
            'Industry internship',
            'IoT applications'
          ],
          skills: ['Advanced communication', 'Embedded programming', 'Project management'],
          goal: 'Specialize and prepare for industry placement'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'VLSI Design',
          description: 'Chip design, semiconductor technology, IC fabrication',
          careers: ['VLSI Engineer', 'Chip Designer', 'Verification Engineer'],
          salary: '₹6-18 LPA'
        },
        {
          name: 'Embedded Systems',
          description: 'Microcontroller programming, IoT, automotive electronics',
          careers: ['Embedded Engineer', 'IoT Developer', 'Firmware Engineer'],
          salary: '₹5-16 LPA'
        },
        {
          name: 'Telecommunications',
          description: '5G, network protocols, wireless communication',
          careers: ['Telecom Engineer', 'Network Engineer', 'RF Engineer'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Signal Processing',
          description: 'Digital signal processing, image processing, audio processing',
          careers: ['DSP Engineer', 'Algorithm Developer', 'Research Engineer'],
          salary: '₹6-20 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Electronics Engineer',
        'Embedded Systems Engineer',
        'VLSI Design Engineer',
        'Telecom Engineer',
        'Field Engineer',
        'Quality Control Engineer'
      ],
      advanced: [
        'Lead Design Engineer',
        'Project Manager',
        'R&D Manager',
        'Technical Consultant',
        'Product Manager',
        'Entrepreneur'
      ],
      sectors: [
        'Semiconductor Companies',
        'Telecom Industry',
        'Consumer Electronics',
        'Automotive Industry',
        'Defense & Aerospace',
        'IoT Companies'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹3-7 LPA (Average), ₹8-15 LPA (Top Companies)',
        experienced: '₹10-25 LPA (5+ years)',
        senior: '₹20-50 LPA (10+ years)'
      },
      abroad: {
        fresher: '$60,000-$90,000 (USA/Europe)',
        experienced: '$90,000-$140,000 (5+ years)',
        senior: '$140,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Core engineering field with stable demand',
        'Diverse career options in multiple industries',
        'Strong foundation for higher studies',
        'Growing demand in IoT and embedded systems',
        'Government job opportunities',
        'Research and development opportunities',
        'Hardware-software integration skills'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Rapid Technology Changes',
          solution: 'Continuous learning, online courses, industry certifications'
        },
        {
          challenge: 'Competition from Software Engineers',
          solution: 'Develop interdisciplinary skills, learn programming, focus on embedded systems'
        },
        {
          challenge: 'Complex Mathematical Concepts',
          solution: 'Strong foundation building, practice, seek help from mentors'
        },
        {
          challenge: 'Industry-Academia Gap',
          solution: 'Internships, industry projects, hands-on experience'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Circuit Design',
          resources: ['Razavi - Microelectronics', 'Sedra Smith', 'LTSpice', 'Multisim']
        },
        {
          category: 'Embedded Systems',
          resources: ['Arduino/Raspberry Pi', 'Keil uVision', 'STM32 Development', 'FreeRTOS']
        },
        {
          category: 'VLSI',
          resources: ['Cadence Tools', 'Synopsis Tools', 'Verilog/VHDL', 'VLSI Design Flow']
        },
        {
          category: 'Communication',
          resources: ['Matlab/Simulink', 'GNU Radio', 'Communication Theory Books']
        }
      ]
    }
  },

  'Mechanical': {
    about: 'Mechanical Engineering is one of the oldest and broadest engineering disciplines. It involves design, manufacturing, and maintenance of mechanical systems including engines, machines, and thermal systems.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or state entrance exams',
        'Diploma in Mechanical for lateral entry'
      ]
    },

    roadmap: {
      title: '🛣️ Mechanical Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Basics',
          duration: '2 Semesters',
          focus: 'Foundation in Engineering Principles',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Engineering Graphics',
            'Workshop Technology'
          ],
          projects: [
            'Technical drawing projects',
            'Workshop practice',
            'Basic engineering models'
          ],
          skills: ['Technical drawing', 'Workshop skills', 'Mathematical foundation'],
          goal: 'Build strong foundation in engineering fundamentals'
        },
        {
          phase: '📍 2nd Year – Core Mechanical',
          duration: '2 Semesters',
          focus: 'Mechanical Engineering Fundamentals',
          subjects: [
            'Strength of Materials',
            'Thermodynamics',
            'Fluid Mechanics',
            'Manufacturing Processes',
            'Engineering Materials'
          ],
          projects: [
            'Material testing',
            'Heat engine models',
            'Manufacturing projects'
          ],
          skills: ['Material analysis', 'Thermal systems', 'Manufacturing processes'],
          goal: 'Master core mechanical engineering subjects'
        },
        {
          phase: '📍 3rd Year – Advanced Topics',
          duration: '2 Semesters',
          focus: 'Design and Advanced Mechanical Systems',
          subjects: [
            'Machine Design',
            'Heat Transfer',
            'IC Engines',
            'Refrigeration & AC',
            'Control Engineering'
          ],
          projects: [
            'Machine design project',
            'IC engine testing',
            'Heat exchanger design'
          ],
          skills: ['Design principles', 'Engine technology', 'Heat transfer'],
          goal: 'Learn design and advanced mechanical systems'
        },
        {
          phase: '📍 4th Year – Specialization & Industry',
          duration: '2 Semesters',
          focus: 'Specialization and Industry Readiness',
          subjects: [
            'Automobile Engineering',
            'Production Management',
            'CAD/CAM',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Major project',
            'Industry internship',
            'CAD modeling projects'
          ],
          skills: ['CAD/CAM software', 'Project management', 'Industry exposure'],
          goal: 'Specialize and prepare for industry placement'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Automotive Engineering',
          description: 'Vehicle design, engine technology, automotive systems',
          careers: ['Automotive Engineer', 'Design Engineer', 'Test Engineer'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Manufacturing Engineering',
          description: 'Production processes, quality control, automation',
          careers: ['Production Engineer', 'Quality Engineer', 'Process Engineer'],
          salary: '₹3-12 LPA'
        },
        {
          name: 'Thermal Engineering',
          description: 'Heat transfer, power plants, HVAC systems',
          careers: ['Thermal Engineer', 'Power Plant Engineer', 'HVAC Engineer'],
          salary: '₹4-14 LPA'
        },
        {
          name: 'Design & Analysis',
          description: 'CAD/CAE, product design, structural analysis',
          careers: ['Design Engineer', 'CAD Engineer', 'R&D Engineer'],
          salary: '₹5-16 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Mechanical Engineer',
        'Design Engineer',
        'Production Engineer',
        'Quality Control Engineer',
        'Maintenance Engineer',
        'Sales Engineer'
      ],
      advanced: [
        'Project Manager',
        'Plant Manager',
        'R&D Manager',
        'Consultant Engineer',
        'General Manager',
        'Entrepreneur'
      ],
      sectors: [
        'Automotive Industry',
        'Manufacturing Companies',
        'Power Generation',
        'Aerospace Industry',
        'Oil & Gas',
        'Government Organizations'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹3-6 LPA (Average), ₹7-12 LPA (Top Companies)',
        experienced: '₹8-20 LPA (5+ years)',
        senior: '₹15-40 LPA (10+ years)'
      },
      abroad: {
        fresher: '$55,000-$80,000 (USA/Europe)',
        experienced: '$80,000-$120,000 (5+ years)',
        senior: '$120,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Broad engineering field with diverse opportunities',
        'Strong foundation for various industries',
        'Government job opportunities',
        'Entrepreneurship opportunities in manufacturing',
        'Core engineering skills applicable everywhere',
        'Higher studies options (M.Tech, MBA)',
        'Stable career with continuous demand'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Economic Sensitivity',
          solution: 'Develop multiple skills, consider government jobs, build strong technical foundation'
        },
        {
          challenge: 'Manufacturing Shifts',
          solution: 'Learn automation, robotics, and advanced manufacturing technologies'
        },
        {
          challenge: 'Competition from Other Branches',
          solution: 'Develop interdisciplinary skills, learn software tools, focus on design'
        },
        {
          challenge: 'Complex Calculations',
          solution: 'Master mathematics, use software tools, practice problem-solving'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Design & CAD',
          resources: ['AutoCAD', 'SolidWorks', 'CATIA', 'ANSYS']
        },
        {
          category: 'Core Subjects',
          resources: ['R.S. Khurmi', 'R.K. Rajput', 'Shigley Mechanical Design']
        },
        {
          category: 'Manufacturing',
          resources: ['CNC Programming', 'Lean Manufacturing', 'Six Sigma']
        },
        {
          category: 'Analysis',
          resources: ['MATLAB', 'ANSYS', 'Finite Element Analysis']
        }
      ]
    }
  },

  'Civil': {
    about: 'Civil Engineering involves planning, designing, constructing, and maintaining infrastructure projects like buildings, roads, bridges, dams, and water supply systems. It is one of the oldest engineering disciplines.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or state entrance exams',
        'Diploma in Civil for lateral entry'
      ]
    },

    roadmap: {
      title: '🛣️ Civil Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Foundation',
          duration: '2 Semesters',
          focus: 'Basic Engineering and Mathematical Skills',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Engineering Graphics',
            'Basic Civil Engineering'
          ],
          projects: [
            'Engineering drawing',
            'Surveying practice',
            'Material testing basics'
          ],
          skills: ['Technical drawing', 'Surveying', 'Material properties'],
          goal: 'Build foundation in engineering principles'
        },
        {
          phase: '📍 2nd Year – Core Civil Subjects',
          duration: '2 Semesters',
          focus: 'Fundamental Civil Engineering Concepts',
          subjects: [
            'Building Materials & Construction',
            'Surveying',
            'Strength of Materials',
            'Fluid Mechanics',
            'Engineering Geology'
          ],
          projects: [
            'Surveying field work',
            'Material testing lab',
            'Construction site visits'
          ],
          skills: ['Construction materials', 'Surveying techniques', 'Structural analysis'],
          goal: 'Master fundamental civil engineering concepts'
        },
        {
          phase: '📍 3rd Year – Structural & Infrastructure',
          duration: '2 Semesters',
          focus: 'Structural Design and Infrastructure Systems',
          subjects: [
            'Structural Analysis',
            'Concrete Technology',
            'Soil Mechanics',
            'Highway Engineering',
            'Water Resources Engineering'
          ],
          projects: [
            'Structural design project',
            'Soil testing',
            'Highway design'
          ],
          skills: ['Structural design', 'Soil analysis', 'Infrastructure planning'],
          goal: 'Learn structural design and infrastructure systems'
        },
        {
          phase: '📍 4th Year – Advanced & Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Topics and Career Preparation',
          subjects: [
            'Foundation Engineering',
            'Construction Management',
            'Environmental Engineering',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Major design project',
            'Construction management',
            'Site internship'
          ],
          skills: ['Project management', 'Advanced design', 'Construction planning'],
          goal: 'Specialize and prepare for professional practice'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Structural Engineering',
          description: 'Building design, bridge engineering, earthquake engineering',
          careers: ['Structural Engineer', 'Design Consultant', 'Bridge Engineer'],
          salary: '₹4-16 LPA'
        },
        {
          name: 'Transportation Engineering',
          description: 'Highway design, traffic engineering, transportation planning',
          careers: ['Highway Engineer', 'Traffic Engineer', 'Transportation Planner'],
          salary: '₹3-14 LPA'
        },
        {
          name: 'Geotechnical Engineering',
          description: 'Foundation design, soil mechanics, ground improvement',
          careers: ['Geotechnical Engineer', 'Foundation Designer', 'Site Engineer'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Environmental Engineering',
          description: 'Water treatment, waste management, pollution control',
          careers: ['Environmental Engineer', 'Water Treatment Engineer', 'EIA Consultant'],
          salary: '₹3-12 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Civil Engineer',
        'Site Engineer',
        'Design Engineer',
        'Quality Control Engineer',
        'Survey Engineer',
        'Junior Engineer (Government)'
      ],
      advanced: [
        'Project Manager',
        'Structural Consultant',
        'Construction Manager',
        'Chief Engineer',
        'Urban Planner',
        'Contractor/Entrepreneur'
      ],
      sectors: [
        'Construction Companies',
        'Consulting Firms',
        'Government Departments',
        'Real Estate',
        'Infrastructure Development',
        'Environmental Organizations'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹2.5-5 LPA (Average), ₹6-10 LPA (Top Companies)',
        experienced: '₹7-18 LPA (5+ years)',
        senior: '₹15-35 LPA (10+ years)'
      },
      abroad: {
        fresher: '$50,000-$75,000 (USA/Europe)',
        experienced: '$75,000-$110,000 (5+ years)',
        senior: '$110,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Essential for infrastructure development',
        'Strong government job opportunities',
        'Entrepreneurship opportunities in construction',
        'Diverse specialization options',
        'Social impact through infrastructure projects',
        'Stable career with continuous demand',
        'Professional license opportunities'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Economic Dependency',
          solution: 'Develop multiple skills, consider government jobs, build strong network'
        },
        {
          challenge: 'Site Conditions & Weather',
          solution: 'Build physical stamina, learn safety protocols, adapt to field conditions'
        },
        {
          challenge: 'Regulatory Complexities',
          solution: 'Stay updated with codes, develop legal knowledge, network with authorities'
        },
        {
          challenge: 'Technology Integration',
          solution: 'Learn CAD software, BIM technology, project management tools'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Design Software',
          resources: ['AutoCAD', 'STAAD Pro', 'ETABS', 'Revit BIM']
        },
        {
          category: 'Reference Books',
          resources: ['IS Codes', 'Punmia Books', 'Khanna Publishers', 'ASCE Standards']
        },
        {
          category: 'Construction',
          resources: ['MS Project', 'Primavera', 'Construction Management', 'Quantity Surveying']
        },
        {
          category: 'Specialization',
          resources: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering']
        }
      ]
    }
  },

  'Electrical': {
    about: 'Electrical Engineering deals with electrical systems, power generation, transmission, distribution, and electrical machines. It covers everything from microelectronics to large power systems.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or state entrance exams',
        'Diploma in Electrical for lateral entry'
      ]
    },

    roadmap: {
      title: '🛣️ Electrical Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Basics',
          duration: '2 Semesters',
          focus: 'Foundation in Engineering and Electrical Concepts',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Basic Electrical Engineering',
            'Programming in C'
          ],
          projects: [
            'Basic electrical circuits',
            'Programming assignments',
            'Laboratory experiments'
          ],
          skills: ['Circuit analysis', 'Mathematical concepts', 'Programming basics'],
          goal: 'Build foundation in electrical engineering principles'
        },
        {
          phase: '📍 2nd Year – Core Electrical',
          duration: '2 Semesters',
          focus: 'Electrical Circuits and Network Theory',
          subjects: [
            'Network Analysis',
            'Electronic Devices & Circuits',
            'Electrical Measurements',
            'Electromagnetic Fields',
            'Electrical Materials'
          ],
          projects: [
            'Circuit analysis projects',
            'Electronic circuit design',
            'Measurement instruments'
          ],
          skills: ['Network analysis', 'Electronic circuits', 'Measurement techniques'],
          goal: 'Master electrical circuit analysis and electronics'
        },
        {
          phase: '📍 3rd Year – Power Systems & Machines',
          duration: '2 Semesters',
          focus: 'Electrical Machines and Power Systems',
          subjects: [
            'Electrical Machines I & II',
            'Power Systems I',
            'Control Systems',
            'Power Electronics',
            'Digital Electronics'
          ],
          projects: [
            'Motor control circuits',
            'Power system analysis',
            'Control system design'
          ],
          skills: ['Machine operation', 'Power system analysis', 'Control systems'],
          goal: 'Learn electrical machines and power systems'
        },
        {
          phase: '📍 4th Year – Advanced & Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Topics and Industry Preparation',
          subjects: [
            'Power Systems II',
            'High Voltage Engineering',
            'Renewable Energy',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Major project',
            'Industry internship',
            'Power system studies'
          ],
          skills: ['Advanced power systems', 'High voltage techniques', 'Project management'],
          goal: 'Specialize and prepare for industry'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Power Systems',
          description: 'Power generation, transmission, distribution, grid management',
          careers: ['Power Systems Engineer', 'Grid Operator', 'Protection Engineer'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Power Electronics',
          description: 'Converters, inverters, motor drives, renewable energy',
          careers: ['Power Electronics Engineer', 'Drive Systems Engineer', 'R&D Engineer'],
          salary: '₹5-16 LPA'
        },
        {
          name: 'Control Systems',
          description: 'Automation, robotics, process control, instrumentation',
          careers: ['Control Engineer', 'Automation Engineer', 'Instrumentation Engineer'],
          salary: '₹4-14 LPA'
        },
        {
          name: 'Renewable Energy',
          description: 'Solar, wind, energy storage, smart grids',
          careers: ['Renewable Energy Engineer', 'Solar Design Engineer', 'Energy Analyst'],
          salary: '₹4-12 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Electrical Engineer',
        'Power Systems Engineer',
        'Control Systems Engineer',
        'Maintenance Engineer',
        'Design Engineer',
        'Junior Engineer (Government)'
      ],
      advanced: [
        'Project Manager',
        'Chief Electrical Engineer',
        'Consultant Engineer',
        'Power Plant Manager',
        'R&D Manager',
        'Entrepreneur'
      ],
      sectors: [
        'Power Generation Companies',
        'Electrical Equipment Manufacturing',
        'Automation Companies',
        'Government Power Boards',
        'Renewable Energy',
        'Consulting Firms'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹3-6 LPA (Average), ₹7-12 LPA (Top Companies)',
        experienced: '₹8-20 LPA (5+ years)',
        senior: '₹15-40 LPA (10+ years)'
      },
      abroad: {
        fresher: '$55,000-$80,000 (USA/Europe)',
        experienced: '$80,000-$120,000 (5+ years)',
        senior: '$120,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Essential for all industries requiring power',
        'Strong government job opportunities',
        'Growing renewable energy sector',
        'Diverse career paths available',
        'High demand in developing countries',
        'Core engineering with stable demand',
        'Research opportunities in smart grids'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'High Voltage Safety Risks',
          solution: 'Learn safety protocols, get proper training, follow safety standards'
        },
        {
          challenge: 'Rapid Technology Changes',
          solution: 'Continuous learning, industry certifications, stay updated with smart grid tech'
        },
        {
          challenge: 'Competition from Other Branches',
          solution: 'Develop software skills, learn automation, focus on specialized areas'
        },
        {
          challenge: 'Complex Power System Analysis',
          solution: 'Master mathematics, use simulation software, practical training'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Power Systems',
          resources: ['ETAP', 'PowerWorld', 'PSCAD', 'DIgSILENT']
        },
        {
          category: 'Control Systems',
          resources: ['MATLAB/Simulink', 'LabVIEW', 'PLC Programming', 'SCADA']
        },
        {
          category: 'Power Electronics',
          resources: ['PSIM', 'LTSpice', 'PLECS', 'Power Electronics Books']
        },
        {
          category: 'Reference Books',
          resources: ['Nagrath & Kothari', 'Ashfaq Husain', 'J.B. Gupta', 'IEEE Standards']
        }
      ]
    }
  },

  'Chemical': {
    about: 'Chemical Engineering combines chemistry, physics, mathematics, and biology to transform raw materials into useful products. It involves process design, optimization, and scale-up of chemical processes.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 50-60% aggregate in PCM',
        'JEE Main/Advanced or state entrance exams',
        'Strong chemistry background preferred'
      ]
    },

    roadmap: {
      title: '🛣️ Chemical Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Foundation',
          duration: '2 Semesters',
          focus: 'Basic Engineering and Chemistry Concepts',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Chemical Process Principles',
            'Programming in C'
          ],
          projects: [
            'Chemistry lab experiments',
            'Basic process calculations',
            'Programming assignments'
          ],
          skills: ['Chemical calculations', 'Laboratory techniques', 'Programming basics'],
          goal: 'Build foundation in chemistry and engineering principles'
        },
        {
          phase: '📍 2nd Year – Core Chemical Engineering',
          duration: '2 Semesters',
          focus: 'Fundamental Chemical Engineering Concepts',
          subjects: [
            'Fluid Mechanics',
            'Heat Transfer',
            'Mass Transfer',
            'Chemical Engineering Thermodynamics',
            'Materials Science'
          ],
          projects: [
            'Heat exchanger design',
            'Distillation column design',
            'Fluid flow experiments'
          ],
          skills: ['Transport phenomena', 'Thermodynamics', 'Process calculations'],
          goal: 'Master fundamental transport phenomena'
        },
        {
          phase: '📍 3rd Year – Process Design & Control',
          duration: '2 Semesters',
          focus: 'Chemical Process Design and Control',
          subjects: [
            'Chemical Reaction Engineering',
            'Process Control',
            'Separation Processes',
            'Process Equipment Design',
            'Environmental Engineering'
          ],
          projects: [
            'Reactor design project',
            'Process control simulation',
            'Separation process design'
          ],
          skills: ['Reactor design', 'Process control', 'Equipment design'],
          goal: 'Learn process design and control systems'
        },
        {
          phase: '📍 4th Year – Advanced & Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Topics and Industry Preparation',
          subjects: [
            'Process Plant Design',
            'Petroleum Refining',
            'Biochemical Engineering',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Plant design project',
            'Industry internship',
            'Process simulation'
          ],
          skills: ['Plant design', 'Process simulation', 'Project management'],
          goal: 'Specialize and prepare for industry'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Petroleum Engineering',
          description: 'Oil refining, petrochemicals, upstream processes',
          careers: ['Process Engineer', 'Refinery Engineer', 'Petroleum Engineer'],
          salary: '₹6-20 LPA'
        },
        {
          name: 'Biochemical Engineering',
          description: 'Biotechnology, pharmaceuticals, food processing',
          careers: ['Bioprocess Engineer', 'Pharmaceutical Engineer', 'Food Engineer'],
          salary: '₹5-16 LPA'
        },
        {
          name: 'Environmental Engineering',
          description: 'Pollution control, waste treatment, sustainability',
          careers: ['Environmental Engineer', 'Waste Treatment Engineer', 'EHS Manager'],
          salary: '₹4-14 LPA'
        },
        {
          name: 'Process Control',
          description: 'Automation, instrumentation, optimization',
          careers: ['Control Engineer', 'Process Optimization Engineer', 'Automation Engineer'],
          salary: '₹5-15 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Process Engineer',
        'Production Engineer',
        'Quality Control Engineer',
        'Safety Engineer',
        'Research Engineer',
        'Plant Engineer'
      ],
      advanced: [
        'Plant Manager',
        'Process Development Manager',
        'Technical Director',
        'Consultant Engineer',
        'R&D Manager',
        'Entrepreneur'
      ],
      sectors: [
        'Petroleum & Petrochemicals',
        'Pharmaceuticals',
        'Food & Beverages',
        'Chemical Manufacturing',
        'Environmental Services',
        'Consulting Firms'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹4-8 LPA (Average), ₹8-15 LPA (Top Companies)',
        experienced: '₹10-25 LPA (5+ years)',
        senior: '₹20-50 LPA (10+ years)'
      },
      abroad: {
        fresher: '$60,000-$85,000 (USA/Europe)',
        experienced: '$85,000-$130,000 (5+ years)',
        senior: '$130,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'High-paying industry with excellent packages',
        'Diverse career options across industries',
        'Strong research and development opportunities',
        'Global job market availability',
        'Core engineering skills applicable everywhere',
        'Growing environmental and sustainability focus',
        'Entrepreneurship opportunities in process industries'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Complex Process Calculations',
          solution: 'Master mathematics, use simulation software, practice problem-solving'
        },
        {
          challenge: 'Safety and Environmental Concerns',
          solution: 'Learn safety protocols, environmental regulations, process safety management'
        },
        {
          challenge: 'Economic Sensitivity',
          solution: 'Develop multiple skills, consider diverse industries, build strong fundamentals'
        },
        {
          challenge: 'Continuous Technology Updates',
          solution: 'Continuous learning, industry certifications, attend conferences'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Process Simulation',
          resources: ['Aspen HYSYS', 'ChemCAD', 'MATLAB', 'Aspen Plus']
        },
        {
          category: 'Reference Books',
          resources: ['McCabe & Smith', 'Fogler Reactor Design', 'Coulson & Richardson']
        },
        {
          category: 'Process Control',
          resources: ['Honeywell DCS', 'Yokogawa', 'Process Control Books']
        },
        {
          category: 'Industry Software',
          resources: ['AutoCAD Plant 3D', 'PDMS', 'SmartPlant', 'P&ID Software']
        }
      ]
    }
  },

  'Biotechnology': {
    about: 'Biotechnology Engineering combines biology, chemistry, and engineering to develop technologies and products that improve human life and the environment through biological processes.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Biology/Mathematics',
        'Minimum 50-60% aggregate in PCB/PCM',
        'JEE Main/Advanced or specialized biotech entrance exams',
        'Strong biology and chemistry background'
      ]
    },

    roadmap: {
      title: '🛣️ Biotechnology Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Basic Sciences',
          duration: '2 Semesters',
          focus: 'Foundation in Biology, Chemistry, and Mathematics',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Biology for Engineers',
            'Computer Programming'
          ],
          projects: [
            'Basic biology experiments',
            'Chemistry lab work',
            'Programming assignments'
          ],
          skills: ['Laboratory techniques', 'Mathematical concepts', 'Programming basics'],
          goal: 'Build foundation in basic sciences'
        },
        {
          phase: '📍 2nd Year – Core Biotechnology',
          duration: '2 Semesters',
          focus: 'Fundamental Biotechnology Concepts',
          subjects: [
            'Biochemistry',
            'Microbiology',
            'Molecular Biology',
            'Cell Biology',
            'Genetics'
          ],
          projects: [
            'Microbiology cultures',
            'DNA extraction',
            'Enzyme assays'
          ],
          skills: ['Molecular techniques', 'Microbial culture', 'Genetic analysis'],
          goal: 'Master fundamental biotechnology concepts'
        },
        {
          phase: '📍 3rd Year – Bioprocess Engineering',
          duration: '2 Semesters',
          focus: 'Bioprocess Design and Bioinformatics',
          subjects: [
            'Bioprocess Engineering',
            'Bioinformatics',
            'Immunology',
            'Biostatistics',
            'Environmental Biotechnology'
          ],
          projects: [
            'Fermentation projects',
            'Bioinformatics analysis',
            'Immunoassay development'
          ],
          skills: ['Bioprocess design', 'Bioinformatics tools', 'Statistical analysis'],
          goal: 'Learn bioprocess engineering and computational biology'
        },
        {
          phase: '📍 4th Year – Advanced & Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Topics and Research',
          subjects: [
            'Genetic Engineering',
            'Bioseparations',
            'Biomedical Engineering',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Research project',
            'Industry internship',
            'Genetic engineering experiments'
          ],
          skills: ['Genetic engineering', 'Research methodology', 'Industry knowledge'],
          goal: 'Specialize and prepare for research or industry'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Medical Biotechnology',
          description: 'Drug development, diagnostics, gene therapy',
          careers: ['Biomedical Engineer', 'Research Scientist', 'Clinical Research Associate'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Industrial Biotechnology',
          description: 'Bioprocessing, enzyme production, biofuels',
          careers: ['Bioprocess Engineer', 'Production Manager', 'Process Development Scientist'],
          salary: '₹5-16 LPA'
        },
        {
          name: 'Agricultural Biotechnology',
          description: 'Crop improvement, plant breeding, agricultural products',
          careers: ['Agricultural Scientist', 'Plant Biotechnologist', 'Seed Technology Specialist'],
          salary: '₹3-12 LPA'
        },
        {
          name: 'Bioinformatics',
          description: 'Computational biology, data analysis, software development',
          careers: ['Bioinformatics Scientist', 'Computational Biologist', 'Data Analyst'],
          salary: '₹6-18 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Research Associate',
        'Quality Control Analyst',
        'Bioprocess Engineer',
        'Laboratory Technician',
        'Clinical Research Coordinator',
        'Regulatory Affairs Associate'
      ],
      advanced: [
        'Research Scientist',
        'R&D Manager',
        'Biotechnology Consultant',
        'Product Manager',
        'Chief Scientific Officer',
        'Biotech Entrepreneur'
      ],
      sectors: [
        'Pharmaceutical Companies',
        'Biotechnology Companies',
        'Research Institutions',
        'Government Labs',
        'Food & Beverage Industry',
        'Environmental Companies'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹3-7 LPA (Average), ₹8-15 LPA (Top Companies)',
        experienced: '₹8-20 LPA (5+ years)',
        senior: '₹15-40 LPA (10+ years)'
      },
      abroad: {
        fresher: '$50,000-$80,000 (USA/Europe)',
        experienced: '$80,000-$130,000 (5+ years)',
        senior: '$130,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Rapidly growing field with high potential',
        'Opportunity to contribute to human welfare',
        'Diverse career paths in multiple industries',
        'Strong research and development opportunities',
        'Global job market with high demand',
        'Entrepreneurship opportunities in biotech startups',
        'Interdisciplinary field combining biology and engineering'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Limited Industry in India',
          solution: 'Consider international opportunities, government research jobs, develop multiple skills'
        },
        {
          challenge: 'High Research Investment Required',
          solution: 'Seek government funding, collaborate with institutions, consider industry partnerships'
        },
        {
          challenge: 'Regulatory Complexities',
          solution: 'Learn regulatory processes, develop compliance knowledge, network with regulators'
        },
        {
          challenge: 'Interdisciplinary Knowledge Required',
          solution: 'Continuous learning, collaborate with experts, develop broad skill set'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Laboratory Techniques',
          resources: ['Molecular Cloning', 'PCR Techniques', 'Cell Culture Methods', 'Protein Purification']
        },
        {
          category: 'Bioinformatics',
          resources: ['BLAST', 'R Programming', 'Python for Biology', 'NCBI Tools']
        },
        {
          category: 'Bioprocessing',
          resources: ['Bioprocess Engineering Books', 'Fermentation Technology', 'Downstream Processing']
        },
        {
          category: 'Research Tools',
          resources: ['PubMed', 'Research Methodologies', 'Statistical Software', 'Scientific Writing']
        }
      ]
    }
  },

  'Aerospace': {
    about: 'Aerospace Engineering involves design, development, testing, and production of aircraft, spacecraft, satellites, and missiles. It combines aerodynamics, propulsion, structures, and control systems.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Mathematics (PCM)',
        'Minimum 60-70% aggregate in PCM',
        'JEE Main/Advanced with high ranks',
        'Strong mathematical and physics background'
      ]
    },

    roadmap: {
      title: '🛣️ Aerospace Engineering Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Engineering Foundation',
          duration: '2 Semesters',
          focus: 'Basic Engineering and Mathematical Concepts',
          subjects: [
            'Engineering Mathematics',
            'Engineering Physics',
            'Engineering Chemistry',
            'Engineering Graphics',
            'Introduction to Aerospace'
          ],
          projects: [
            'Model aircraft design',
            'Technical drawing',
            'Basic physics experiments'
          ],
          skills: ['Mathematical foundation', 'Technical drawing', 'Physics concepts'],
          goal: 'Build strong foundation in engineering principles'
        },
        {
          phase: '📍 2nd Year – Core Aerospace Fundamentals',
          duration: '2 Semesters',
          focus: 'Fundamental Aerospace Engineering Concepts',
          subjects: [
            'Fluid Mechanics',
            'Thermodynamics',
            'Strength of Materials',
            'Material Science',
            'Computer Programming'
          ],
          projects: [
            'Wind tunnel experiments',
            'Material testing',
            'CFD simulations'
          ],
          skills: ['Fluid mechanics', 'Material properties', 'Programming'],
          goal: 'Master fundamental aerospace concepts'
        },
        {
          phase: '📍 3rd Year – Aerospace Systems',
          duration: '2 Semesters',
          focus: 'Aircraft and Spacecraft Systems',
          subjects: [
            'Aerodynamics',
            'Aircraft Structures',
            'Propulsion',
            'Flight Mechanics',
            'Control Systems'
          ],
          projects: [
            'Aircraft design project',
            'Propulsion system analysis',
            'Flight simulation'
          ],
          skills: ['Aerodynamic analysis', 'Structural design', 'Propulsion systems'],
          goal: 'Learn aircraft and spacecraft systems'
        },
        {
          phase: '📍 4th Year – Advanced & Specialization',
          duration: '2 Semesters',
          focus: 'Advanced Topics and Career Preparation',
          subjects: [
            'Aircraft Design',
            'Space Technology',
            'Avionics',
            'Final Year Project',
            'Industrial Training'
          ],
          projects: [
            'Comprehensive design project',
            'Industry internship',
            'Research project'
          ],
          skills: ['System integration', 'Advanced design', 'Project management'],
          goal: 'Specialize and prepare for aerospace industry'
        }
      ]
    },

    specializations: {
      title: '🎯 Specialization Areas',
      areas: [
        {
          name: 'Aeronautical Engineering',
          description: 'Aircraft design, aerodynamics, flight testing',
          careers: ['Aircraft Design Engineer', 'Flight Test Engineer', 'Aerodynamicist'],
          salary: '₹6-20 LPA'
        },
        {
          name: 'Astronautical Engineering',
          description: 'Spacecraft design, satellite technology, space missions',
          careers: ['Spacecraft Engineer', 'Mission Analyst', 'Satellite Engineer'],
          salary: '₹7-22 LPA'
        },
        {
          name: 'Propulsion Engineering',
          description: 'Jet engines, rocket propulsion, fuel systems',
          careers: ['Propulsion Engineer', 'Engine Designer', 'Combustion Engineer'],
          salary: '₹6-18 LPA'
        },
        {
          name: 'Avionics Engineering',
          description: 'Flight control systems, navigation, communication',
          careers: ['Avionics Engineer', 'Control Systems Engineer', 'Navigation Specialist'],
          salary: '₹5-16 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Design Engineer',
        'Test Engineer',
        'Systems Engineer',
        'Manufacturing Engineer',
        'Quality Assurance Engineer',
        'Research Engineer'
      ],
      advanced: [
        'Chief Engineer',
        'Project Manager',
        'Flight Test Manager',
        'Technical Director',
        'R&D Manager',
        'Aerospace Consultant'
      ],
      sectors: [
        'ISRO/DRDO',
        'HAL (Hindustan Aeronautics)',
        'Private Aerospace Companies',
        'Airlines (Maintenance)',
        'Defense Organizations',
        'International Aerospace'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹5-10 LPA (Government), ₹8-15 LPA (Private)',
        experienced: '₹12-30 LPA (5+ years)',
        senior: '₹25-60 LPA (10+ years)'
      },
      abroad: {
        fresher: '$70,000-$95,000 (USA/Europe)',
        experienced: '$95,000-$150,000 (5+ years)',
        senior: '$150,000+ (Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Cutting-edge technology and innovation',
        'High prestige and respect in society',
        'Excellent salary packages',
        'Opportunity to work on space missions',
        'Strong government job opportunities',
        'Global career opportunities',
        'Contribution to national defense and space program'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Limited Industry in India',
          solution: 'Consider government organizations, international opportunities, develop broad skills'
        },
        {
          challenge: 'High Competition for Jobs',
          solution: 'Maintain high academic performance, gain internships, develop specialized skills'
        },
        {
          challenge: 'Complex Technical Concepts',
          solution: 'Strong mathematical foundation, continuous practice, seek mentorship'
        },
        {
          challenge: 'Long Development Cycles',
          solution: 'Develop patience, focus on long-term goals, gain diverse experience'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Design Software',
          resources: ['CATIA', 'ANSYS Fluent', 'MATLAB/Simulink', 'SolidWorks']
        },
        {
          category: 'Reference Books',
          resources: ['Anderson Aerodynamics', 'Raymer Aircraft Design', 'Sutton Rocket Propulsion']
        },
        {
          category: 'Simulation Tools',
          resources: ['CFD Software', 'Flight Simulators', 'NASTRAN', 'LS-DYNA']
        },
        {
          category: 'Industry Knowledge',
          resources: ['AIAA Publications', 'NASA Resources', 'ISRO Publications']
        }
      ]
    }
  },

  // MEDICAL STREAMS
  'MBBS/BDS': {
    about: 'MBBS (Bachelor of Medicine and Bachelor of Surgery) is a 5.5-year undergraduate medical degree program that trains students to become doctors. It includes 4.5 years of academic study and 1 year of compulsory internship. BDS (Bachelor of Dental Surgery) is a 5-year program for dental medicine.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        '12th Standard with Physics, Chemistry, Biology (PCB)',
        'Minimum 50% aggregate (40% for SC/ST/OBC)',
        'NEET qualification mandatory',
        'Age: 17-25 years (relaxation for reserved categories)',
        'English proficiency required'
      ]
    },

    roadmap: {
      title: '🛣️ MBBS Career Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Basic Medical Sciences',
          duration: '1 Year',
          focus: 'Foundation of Human Body Structure & Function',
          subjects: [
            'Anatomy (Human body structure)',
            'Physiology (Body functions)',
            'Biochemistry (Chemical processes)',
            'Community Medicine basics',
            'Medical Ethics & Communication'
          ],
          projects: [
            'Cadaver dissection',
            'Physiology experiments',
            'Community health surveys'
          ],
          skills: ['Medical terminology', 'Basic clinical skills', 'Patient communication'],
          goal: 'Understand human body structure and basic functions'
        },
        {
          phase: '📍 2nd Year – Pathology & Pharmacology',
          duration: '1 Year',
          focus: 'Disease Processes & Drug Actions',
          subjects: [
            'Pathology (Disease study)',
            'Pharmacology (Drug actions)',
            'Microbiology (Infectious agents)',
            'Forensic Medicine',
            'Community Medicine'
          ],
          projects: [
            'Disease case studies',
            'Drug interaction analysis',
            'Microorganism identification'
          ],
          skills: ['Disease diagnosis', 'Drug prescription knowledge', 'Lab interpretation'],
          goal: 'Learn about diseases and their treatment mechanisms'
        },
        {
          phase: '📍 3rd & 4th Year – Clinical Subjects',
          duration: '2 Years',
          focus: 'Patient Care & Clinical Practice',
          subjects: [
            'General Medicine',
            'General Surgery',
            'Obstetrics & Gynecology',
            'Pediatrics',
            'Orthopedics',
            'ENT, Ophthalmology',
            'Psychiatry, Dermatology'
          ],
          projects: [
            'Patient case presentations',
            'Clinical rotations',
            'Medical research projects'
          ],
          skills: ['Patient examination', 'Clinical diagnosis', 'Treatment planning'],
          goal: 'Gain hands-on clinical experience across medical specialties'
        },
        {
          phase: '📍 Internship Year – Practical Training',
          duration: '1 Year',
          focus: 'Real-world Medical Practice',
          subjects: [
            'Rotating internship in all departments',
            'Emergency medicine',
            'Rural health posting',
            'Thesis/Research project'
          ],
          projects: [
            'Independent patient management',
            'Medical research thesis',
            'Community health programs'
          ],
          skills: ['Independent practice', 'Emergency handling', 'Research methodology'],
          goal: 'Become competent for independent medical practice'
        }
      ]
    },

    specializations: {
      title: '🎯 Post-MBBS Specialization Options',
      areas: [
        {
          name: 'MD (Doctor of Medicine)',
          description: 'Non-surgical specializations like Internal Medicine, Pediatrics',
          careers: ['Physician', 'Specialist Doctor', 'Medical Consultant'],
          salary: '₹8-25 LPA'
        },
        {
          name: 'MS (Master of Surgery)',
          description: 'Surgical specializations like General Surgery, Orthopedics',
          careers: ['Surgeon', 'Surgical Specialist', 'Hospital Consultant'],
          salary: '₹10-30 LPA'
        },
        {
          name: 'Super Speciality (DM/MCh)',
          description: 'Advanced specializations like Cardiology, Neurosurgery',
          careers: ['Super Specialist', 'Department Head', 'Medical Director'],
          salary: '₹15-50 LPA'
        },
        {
          name: 'Public Health',
          description: 'Community health, epidemiology, health policy',
          careers: ['Public Health Officer', 'Epidemiologist', 'Health Policy Analyst'],
          salary: '₹6-18 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Junior Resident Doctor',
        'Medical Officer (Government)',
        'General Practitioner',
        'Hospital Doctor',
        'Emergency Medicine Doctor',
        'Medical Writer'
      ],
      advanced: [
        'Specialist Consultant',
        'Department Head',
        'Medical Superintendent',
        'Medical Director',
        'Healthcare Entrepreneur',
        'Medical Researcher'
      ],
      sectors: [
        'Government Hospitals',
        'Private Healthcare',
        'Medical Research',
        'Pharmaceutical Industry',
        'Medical Education',
        'International Healthcare'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹6-12 LPA (Government), ₹8-15 LPA (Private)',
        experienced: '₹15-40 LPA (5+ years)',
        senior: '₹30-80 LPA (Specialists/Consultants)'
      },
      abroad: {
        fresher: '$200,000-$300,000 (USA after USMLE)',
        experienced: '$300,000-$500,000 (Specialists)',
        senior: '$500,000+ (Senior Consultants)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Noble profession serving humanity',
        'High social respect and status',
        'Excellent earning potential',
        'Job security and stability',
        'Global career opportunities',
        'Continuous learning and growth',
        'Multiple specialization options'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Long Duration of Study (5.5 years + specialization)',
          solution: 'Stay motivated with clear goals, join study groups, maintain work-life balance'
        },
        {
          challenge: 'High Competition for PG Seats',
          solution: 'Start NEET PG preparation early, focus on clinical knowledge, take mock tests'
        },
        {
          challenge: 'Emotional Stress & Patient Responsibility',
          solution: 'Develop emotional resilience, seek mentorship, practice stress management'
        },
        {
          challenge: 'Continuous Study Requirements',
          solution: 'Develop effective study habits, stay updated with medical literature, join CME programs'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Basic Sciences',
          resources: ['Gray\'s Anatomy', 'Guyton Physiology', 'Harper\'s Biochemistry', 'Robbins Pathology']
        },
        {
          category: 'Clinical Subjects',
          resources: ['Harrison\'s Internal Medicine', 'Bailey & Love Surgery', 'Williams Obstetrics']
        },
        {
          category: 'Exam Preparation',
          resources: ['NEET PG Question Banks', 'Marrow', 'PrepLadder', 'Medical PG Entrance Books']
        },
        {
          category: 'Research & Updates',
          resources: ['PubMed', 'Medical Journals', 'UpToDate', 'Medscape']
        }
      ]
    }
  },

  // Add similar detailed roadmaps for other streams...
  // Continue with Management, Law, Arts & Design, Science, Education, and Agriculture streams...

  // MANAGEMENT STREAMS
  'MBA General': {
    about: 'Master of Business Administration (MBA) is a 2-year postgraduate program that develops leadership, management, and business skills. It covers various aspects of business including finance, marketing, operations, human resources, and strategy.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        'Bachelor\'s degree in any discipline',
        'Minimum 50% aggregate (45% for SC/ST)',
        'CAT/MAT/XAT/GMAT scores required',
        'Work experience preferred (not mandatory)',
        'Group Discussion & Personal Interview'
      ]
    },

    roadmap: {
      title: '🛣️ MBA Career Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Foundation & Core Subjects',
          duration: '2 Semesters',
          focus: 'Business Fundamentals & Management Principles',
          subjects: [
            'Principles of Management',
            'Financial Accounting & Analysis',
            'Marketing Management',
            'Organizational Behavior',
            'Business Economics',
            'Operations Management',
            'Business Statistics',
            'Business Communication'
          ],
          projects: [
            'Business case studies',
            'Market research project',
            'Financial analysis assignment'
          ],
          skills: ['Analytical thinking', 'Leadership basics', 'Communication skills'],
          goal: 'Build strong foundation in all business functions'
        },
        {
          phase: '📍 2nd Year – Specialization & Advanced Topics',
          duration: '2 Semesters',
          focus: 'Specialized Knowledge & Industry Exposure',
          subjects: [
            'Strategic Management',
            'Specialization subjects (Finance/Marketing/HR/Operations)',
            'International Business',
            'Entrepreneurship',
            'Business Ethics',
            'Digital Business',
            'Capstone Project'
          ],
          projects: [
            'Summer internship project',
            'Consulting project with industry',
            'Business plan development'
          ],
          skills: ['Strategic thinking', 'Specialized expertise', 'Industry knowledge'],
          goal: 'Develop specialization and prepare for management roles'
        }
      ]
    },

    specializations: {
      title: '🎯 MBA Specialization Areas',
      areas: [
        {
          name: 'Finance',
          description: 'Corporate finance, investment banking, financial analysis',
          careers: ['Financial Analyst', 'Investment Banker', 'Finance Manager', 'CFO'],
          salary: '₹8-25 LPA'
        },
        {
          name: 'Marketing',
          description: 'Brand management, digital marketing, sales strategy',
          careers: ['Brand Manager', 'Marketing Manager', 'Sales Manager', 'CMO'],
          salary: '₹7-22 LPA'
        },
        {
          name: 'Human Resources',
          description: 'Talent management, organizational development, HR strategy',
          careers: ['HR Manager', 'Talent Acquisition', 'CHRO', 'HR Consultant'],
          salary: '₹6-20 LPA'
        },
        {
          name: 'Operations',
          description: 'Supply chain, project management, process optimization',
          careers: ['Operations Manager', 'Supply Chain Manager', 'COO'],
          salary: '₹7-23 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Management Trainee',
        'Business Analyst',
        'Assistant Manager',
        'Consultant',
        'Product Manager',
        'Business Development Executive'
      ],
      advanced: [
        'General Manager',
        'Vice President',
        'CEO/COO/CFO/CMO',
        'Management Consultant',
        'Entrepreneur',
        'Board Member'
      ],
      sectors: [
        'Banking & Financial Services',
        'Consulting Firms',
        'FMCG Companies',
        'Technology Companies',
        'Healthcare & Pharma',
        'Manufacturing Industries'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹6-15 LPA (Tier-2), ₹15-30 LPA (Tier-1)',
        experienced: '₹20-50 LPA (5+ years)',
        senior: '₹50-150 LPA (C-level positions)'
      },
      abroad: {
        fresher: '$80,000-$150,000 (USA/Europe)',
        experienced: '$150,000-$300,000 (5+ years)',
        senior: '$300,000+ (Senior Management)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Fast career progression to leadership roles',
        'High earning potential across industries',
        'Develops versatile business skills',
        'Strong professional network building',
        'Global career opportunities',
        'Entrepreneurship preparation',
        'Industry recognition and respect'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'High Competition for Top B-Schools',
          solution: 'Prepare thoroughly for entrance exams, build strong profile with work experience'
        },
        {
          challenge: 'Expensive Education Costs',
          solution: 'Research scholarships, education loans, consider ROI of different colleges'
        },
        {
          challenge: 'Pressure to Perform in Corporate Environment',
          solution: 'Develop stress management skills, build strong fundamentals, seek mentorship'
        },
        {
          challenge: 'Keeping Up with Business Trends',
          solution: 'Continuous learning, industry certifications, networking with professionals'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Entrance Preparation',
          resources: ['CAT Preparation Books', 'MBA Entrance Mock Tests', 'GD-PI Preparation']
        },
        {
          category: 'Core Subjects',
          resources: ['Kotler Marketing', 'Financial Management Books', 'Operations Research']
        },
        {
          category: 'Case Studies',
          resources: ['Harvard Business Review', 'Business Case Studies', 'Industry Reports']
        },
        {
          category: 'Professional Development',
          resources: ['LinkedIn Learning', 'Coursera Business Courses', 'Industry Certifications']
        }
      ]
    }
  },

  // LAW STREAMS
  'LLB (3 Year)': {
    about: 'LLB (Bachelor of Laws) is a 3-year undergraduate law degree for graduates from any discipline. It provides comprehensive legal education covering various branches of law including constitutional, criminal, civil, corporate, and international law.',
    
    eligibility: {
      title: '🎯 Eligibility Criteria',
      requirements: [
        'Graduation in any discipline',
        'Minimum 45% aggregate (42% for SC/ST)',
        'CLAT/LSAT/University entrance exam',
        'Age limit: Usually up to 30 years',
        'No specific subject requirements'
      ]
    },

    roadmap: {
      title: '🛣️ LLB Career Roadmap',
      phases: [
        {
          phase: '📍 1st Year – Legal Foundations',
          duration: '2 Semesters',
          focus: 'Basic Legal Principles & Constitutional Law',
          subjects: [
            'Constitutional Law',
            'Legal Methods & Jurisprudence',
            'Law of Contracts',
            'Criminal Law',
            'Legal Writing & Research',
            'Professional Ethics'
          ],
          projects: [
            'Legal research assignments',
            'Moot court participation',
            'Case study analysis'
          ],
          skills: ['Legal reasoning', 'Research skills', 'Legal writing'],
          goal: 'Understand fundamental legal principles and Indian legal system'
        },
        {
          phase: '📍 2nd Year – Specialized Legal Areas',
          duration: '2 Semesters',
          focus: 'Diverse Legal Specializations',
          subjects: [
            'Civil Procedure Code',
            'Criminal Procedure Code',
            'Company Law',
            'Family Law',
            'Property Law',
            'Administrative Law'
          ],
          projects: [
            'Legal aid clinic work',
            'Internship with law firms',
            'Legal drafting exercises'
          ],
          skills: ['Legal drafting', 'Client counseling', 'Court procedures'],
          goal: 'Develop expertise in various legal specializations'
        },
        {
          phase: '📍 3rd Year – Advanced Practice & Specialization',
          duration: '2 Semesters',
          focus: 'Practical Legal Skills & Career Preparation',
          subjects: [
            'Evidence Law',
            'International Law',
            'Intellectual Property Rights',
            'Environmental Law',
            'Cyber Law',
            'Alternative Dispute Resolution'
          ],
          projects: [
            'Final year dissertation',
            'Court internship',
            'Legal consultancy projects'
          ],
          skills: ['Court advocacy', 'Legal consultation', 'Specialized practice'],
          goal: 'Prepare for legal practice and bar examination'
        }
      ]
    },

    specializations: {
      title: '🎯 Legal Specialization Areas',
      areas: [
        {
          name: 'Corporate Law',
          description: 'Company law, mergers & acquisitions, securities law',
          careers: ['Corporate Lawyer', 'Legal Advisor', 'Compliance Officer'],
          salary: '₹6-20 LPA'
        },
        {
          name: 'Criminal Law',
          description: 'Criminal defense, prosecution, criminal justice',
          careers: ['Criminal Lawyer', 'Public Prosecutor', 'Legal Aid Lawyer'],
          salary: '₹4-15 LPA'
        },
        {
          name: 'Civil Law',
          description: 'Property disputes, family law, civil litigation',
          careers: ['Civil Lawyer', 'Family Court Lawyer', 'Property Lawyer'],
          salary: '₹3-12 LPA'
        },
        {
          name: 'Intellectual Property',
          description: 'Patents, trademarks, copyrights, IP litigation',
          careers: ['IP Lawyer', 'Patent Attorney', 'IP Consultant'],
          salary: '₹8-25 LPA'
        }
      ]
    },

    careerPaths: {
      title: '💼 Career Opportunities',
      immediate: [
        'Junior Associate (Law Firms)',
        'Legal Assistant',
        'Court Clerk',
        'Legal Researcher',
        'Paralegal',
        'Legal Content Writer'
      ],
      advanced: [
        'Senior Advocate',
        'Judge (through judicial services)',
        'Legal Consultant',
        'Law Firm Partner',
        'Corporate Legal Head',
        'Legal Academic'
      ],
      sectors: [
        'Law Firms',
        'Corporate Legal Departments',
        'Government Legal Services',
        'Judiciary',
        'Legal Process Outsourcing',
        'Legal Education'
      ]
    },

    salary: {
      title: '💰 Salary Expectations',
      india: {
        fresher: '₹3-8 LPA (varies by city and firm type)',
        experienced: '₹10-30 LPA (5+ years)',
        senior: '₹25-100 LPA (Senior Advocates/Partners)'
      },
      abroad: {
        fresher: '$60,000-$120,000 (after qualifying local bar)',
        experienced: '$120,000-$250,000 (5+ years)',
        senior: '$250,000+ (Partners/Senior positions)'
      }
    },

    advantages: {
      title: '✅ Advantages',
      points: [
        'Intellectual and challenging work',
        'High social respect and status',
        'Opportunity to serve justice',
        'Flexible career options',
        'Potential for high earnings',
        'Continuous learning opportunities',
        'Independence in practice'
      ]
    },

    challenges: {
      title: '⚠️ Challenges & Solutions',
      items: [
        {
          challenge: 'Initial Low Income Period',
          solution: 'Build strong network, take diverse cases, consider corporate law for stable income'
        },
        {
          challenge: 'High Competition in Legal Field',
          solution: 'Specialize in niche areas, build expertise, maintain professional relationships'
        },
        {
          challenge: 'Long Working Hours & Stress',
          solution: 'Develop time management skills, maintain work-life balance, build stress resilience'
        },
        {
          challenge: 'Continuous Learning Requirements',
          solution: 'Stay updated with legal developments, attend seminars, join bar associations'
        }
      ]
    },

    resources: {
      title: '📚 Essential Resources',
      categories: [
        {
          category: 'Legal Texts',
          resources: ['Bare Acts', 'Legal Commentaries', 'Case Law Databases', 'Legal Dictionaries']
        },
        {
          category: 'Practice Skills',
          resources: ['Moot Court Competitions', 'Legal Aid Clinics', 'Internship Programs']
        },
        {
          category: 'Research Tools',
          resources: ['Manupatra', 'SCC Online', 'Legal Databases', 'Law Journals']
        },
        {
          category: 'Professional Development',
          resources: ['Bar Council Programs', 'Legal Workshops', 'Continuing Legal Education']
        }
      ]
    }
  }

  // Add remaining streams following the same detailed pattern...
  // This would include all other courses from each category

  
};

const CCPM = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStream, setActiveStream] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  const toggleCategory = (category) => {
    setActiveStream(null);
    setSelectedRoadmap(null);
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleStream = (stream) => {
    setSelectedRoadmap(null);
    setActiveStream(activeStream === stream ? null : stream);
  };

  const selectRoadmap = (stream) => {
    setSelectedRoadmap(stream);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const floatingElements = ["🛣️", "💼", "🎯", "📈", "🚀", "💡", "🌟", "🔥"];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-2xl opacity-5 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-5 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/90 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">
                  Career Fields
                </h3>
              </div>

              {/* Course Categories */}
              <div className="space-y-3 mb-8">
                {courseCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleCategory(category.name)}
                    className={`w-full text-left py-3 px-4 font-semibold rounded-md transition-colors duration-300 ${
                      activeCategory === category.name
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/courses"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-500/20 hover:bg-green-500/30 text-black-200 text-center transition backdrop-blur-sm border border-green-500/30"
                >
                  📚 All Courses
                </Link>

                <Link
                  to="/colleges"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-black-200 text-center transition backdrop-blur-sm border border-purple-500/30"
                >
                  🏫 Colleges
                </Link>

                <Link
                  to="/after10th/scholarship"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-black-200 text-center transition backdrop-blur-sm border border-cyan-500/30"
                >
                  🎓 Scholarships
                </Link>

                <Link
                  to="/"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-black-200 text-center transition backdrop-blur-sm border border-pink-500/30"
                >
                  🏠 Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} relative z-10`}>
        
        {/* Animated Header */}
        <div className="text-center py-12 px-4">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 text-3xl animate-bounce">
              <span className="animation-delay-0">🛣️</span>
              <span className="animation-delay-200">💼</span>
              <span className="animation-delay-400">🎯</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 bg-clip-text text-transparent mb-6 animate-pulse">
            Course to Career Path Mapping
          </h1>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search career paths, courses, specializations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeCategory && !selectedRoadmap && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Introduction */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-sm">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Discover comprehensive career roadmaps for every course and field. From detailed year-wise academic progression to industry insights, salary expectations, and growth opportunities - <span className="text-blue-600 font-semibold">EduAdvisor</span> provides complete career path mapping to help you make informed decisions about your educational journey and professional future.
                  </p>
                </div>

                {/* Course Category Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto">
                  {courseCategories.map((category, index) => (
                    <div
                      key={category.name}
                      onClick={() => toggleCategory(category.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${category.bg} rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-all duration-500 transform hover:shadow-xl border border-gray-200`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/30"></div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/20 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Floating Particles */}
                      <div className="absolute top-2 right-2 text-lg opacity-50 group-hover:animate-spin">
                        {category.particles.split('')[0]}
                      </div>
                      <div className="absolute top-4 right-6 text-sm opacity-40 group-hover:animate-bounce">
                        {category.particles.split('')[1]}
                      </div>
                      <div className="absolute top-6 right-10 text-xs opacity-30 group-hover:animate-pulse">
                        {category.particles.split('')[2]}
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-4xl mb-4 group-hover:animate-bounce">
                          {category.icon}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                          {category.name}
                        </h2>

                        {/* Stream Count */}
                        <p className="text-sm text-gray-600 mb-4">
                          {category.streams.length} career paths
                        </p>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/70 text-gray-700 font-bold py-2 px-6 rounded-full border border-gray-300 hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg text-sm">
                          <span className="relative z-10">Explore Paths</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-500"></div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                    <div className="text-gray-600 text-sm">Career Paths</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                    <div className="text-gray-600 text-sm">Major Fields</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-gray-600 text-sm">Detailed Roadmaps</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-gray-600 text-sm">Career Guidance</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Streams View */}
          {activeCategory && !activeStream && !selectedRoadmap && (
            <motion.section
              key={activeCategory}
                            initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">
                  {activeCategory} Career Paths
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {courseCategories.find(cat => cat.name === activeCategory)?.streams.map((stream) => (
                  <motion.div
                    key={stream}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => selectRoadmap(stream)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{stream}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {careerRoadmaps[stream] ? 'Complete roadmap available' : 'Roadmap coming soon'}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">
                        {careerRoadmaps[stream] ? 'View Roadmap' : 'Coming Soon'}
                      </span>
                      <span className="text-gray-500">Click to explore →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Fields
                </button>
              </div>
            </motion.section>
          )}

          {/* Detailed Roadmap View */}
          {selectedRoadmap && careerRoadmaps[selectedRoadmap] && (
            <motion.section
              key={selectedRoadmap}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Course Header */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
                    {selectedRoadmap} Career Roadmap
                  </span>
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {careerRoadmaps[selectedRoadmap].about}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  {careerRoadmaps[selectedRoadmap].eligibility.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {careerRoadmaps[selectedRoadmap].eligibility.requirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Roadmap */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <span className="text-2xl mr-3">🛣️</span>
                  {careerRoadmaps[selectedRoadmap].roadmap.title}
                </h2>
                
                <div className="space-y-8">
                  {careerRoadmaps[selectedRoadmap].roadmap.phases.map((phase, index) => (
                    <div key={index} className="relative">
                      {/* Timeline connector */}
                      {index < careerRoadmaps[selectedRoadmap].roadmap.phases.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                      )}
                      
                      <div className="flex items-start">
                        {/* Phase indicator */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                          {index + 1}
                        </div>
                        
                        {/* Phase content */}
                        <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.phase}</h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-blue-600 font-semibold mb-2">Duration: {phase.duration}</p>
                              <p className="text-gray-700 mb-4">{phase.focus}</p>
                              
                              <h4 className="font-semibold text-gray-800 mb-2">📚 Key Subjects:</h4>
                              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                {phase.subjects.map((subject, idx) => (
                                  <li key={idx}>• {subject}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">🚀 Projects & Activities:</h4>
                              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                {phase.projects.map((project, idx) => (
                                  <li key={idx}>• {project}</li>
                                ))}
                              </ul>
                              
                              <h4 className="font-semibold text-gray-800 mb-2">💪 Skills Developed:</h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {phase.skills.map((skill, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p className="text-sm text-blue-800">
                              <strong>Goal:</strong> {phase.goal}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  {careerRoadmaps[selectedRoadmap].specializations.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {careerRoadmaps[selectedRoadmap].specializations.areas.map((area, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{area.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-semibold text-blue-600">CAREERS:</span>
                          <p className="text-xs text-gray-600">{area.careers.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-green-600">SALARY:</span>
                          <p className="text-xs text-gray-600">{area.salary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">💼</span>
                  {careerRoadmaps[selectedRoadmap].careerPaths.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3">🚀 Entry Level (0-2 years)</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {careerRoadmaps[selectedRoadmap].careerPaths.immediate.map((career, index) => (
                        <li key={index}>• {career}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-700 mb-3">📈 Advanced Level (5+ years)</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {careerRoadmaps[selectedRoadmap].careerPaths.advanced.map((career, index) => (
                        <li key={index}>• {career}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-3">🏢 Industry Sectors</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {careerRoadmaps[selectedRoadmap].careerPaths.sectors.map((sector, index) => (
                        <li key={index}>• {sector}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Salary Expectations */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  {careerRoadmaps[selectedRoadmap].salary.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                      🇮🇳 India Market
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-green-700">Fresher:</span>
                        <p className="text-sm text-green-600">{careerRoadmaps[selectedRoadmap].salary.india.fresher}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-green-700">Experienced:</span>
                        <p className="text-sm text-green-600">{careerRoadmaps[selectedRoadmap].salary.india.experienced}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-green-700">Senior:</span>
                        <p className="text-sm text-green-600">{careerRoadmaps[selectedRoadmap].salary.india.senior}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                      🌍 International Market
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-blue-700">Fresher:</span>
                        <p className="text-sm text-blue-600">{careerRoadmaps[selectedRoadmap].salary.abroad.fresher}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-700">Experienced:</span>
                        <p className="text-sm text-blue-600">{careerRoadmaps[selectedRoadmap].salary.abroad.experienced}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-700">Senior:</span>
                        <p className="text-sm text-blue-600">{careerRoadmaps[selectedRoadmap].salary.abroad.senior}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advantages & Challenges */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Advantages */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    {careerRoadmaps[selectedRoadmap].advantages.title}
                  </h2>
                  <ul className="space-y-3">
                                        {careerRoadmaps[selectedRoadmap].advantages.points.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    {careerRoadmaps[selectedRoadmap].challenges.title}
                  </h2>
                  <div className="space-y-4">
                    {careerRoadmaps[selectedRoadmap].challenges.items.map((item, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-800 mb-2">
                          ⚡ {item.challenge}
                        </h4>
                        <p className="text-sm text-orange-700">
                          <strong>Solution:</strong> {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Essential Resources */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  {careerRoadmaps[selectedRoadmap].resources.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {careerRoadmaps[selectedRoadmap].resources.categories.map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-3">{category.category}</h3>
                      <ul className="space-y-2">
                        {category.resources.map((resource, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="text-blue-500 mr-2">📖</span>
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center space-x-4">
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to {activeCategory} Paths
                </button>
                <button
                  onClick={() => {setActiveCategory(null); setSelectedRoadmap(null);}}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Fields
                </button>
                <Link
                  to={`/career-guidance/${selectedRoadmap.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-8 rounded-full font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                >
                  Get Personalized Guidance →
                </Link>
              </div>
            </motion.section>
          )}

          {/* Coming Soon Message for Unavailable Roadmaps */}
          {selectedRoadmap && !careerRoadmaps[selectedRoadmap] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center"
            >
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedRoadmap} Roadmap Coming Soon!
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're working hard to create a comprehensive career roadmap for {selectedRoadmap}. 
                This will include detailed academic progression, specializations, career opportunities, 
                salary expectations, and industry insights.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300"
                >
                  ← Back to {activeCategory} Paths
                </button>
                <Link
                  to="/contact"
                  className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-all duration-300"
                >
                  Request This Roadmap
                </Link>
              </div>
            </motion.div>
          )}

          {/* Career Path Benefits */}
          {!activeCategory && !selectedRoadmap && (
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 Why Use Career Path Mapping?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">📋 Clear Direction</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Year-wise academic progression</li>
                    <li>• Skill development timeline</li>
                    <li>• Project and internship guidance</li>
                    <li>• Specialization decision points</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">💰 Financial Planning</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Realistic salary expectations</li>
                    <li>• ROI analysis for education</li>
                    <li>• Career growth projections</li>
                    <li>• Industry comparison data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">🚀 Success Strategies</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Industry-specific preparation</li>
                    <li>• Networking opportunities</li>
                    <li>• Skill gap identification</li>
                    <li>• Alternative career paths</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  );
};

export default CCPM;