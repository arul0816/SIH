import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const studyResources = {
  // Engineering Resources
  'Computer Science': {
    category: 'Engineering',
    icon: '💻',
    color: 'blue',
    description: 'Complete study materials for Computer Science Engineering',
    yearWise: {
      '1st Year': {
        subjects: ['Programming in C', 'Engineering Mathematics', 'Physics', 'Chemistry', 'Digital Logic'],
        books: [
          { title: 'Let Us C', author: 'Yashavant Kanetkar', type: 'Textbook', rating: 4.5, price: 350, downloadable: true },
          { title: 'Engineering Mathematics', author: 'B.S. Grewal', type: 'Textbook', rating: 4.3, price: 650, downloadable: false },
          { title: 'Digital Design', author: 'Morris Mano', type: 'Textbook', rating: 4.4, price: 580, downloadable: true }
        ],
        notes: [
          { title: 'C Programming Complete Notes', type: 'PDF', size: '15 MB', downloads: 25000, rating: 4.6 },
          { title: 'Digital Logic Design Notes', type: 'PDF', size: '12 MB', downloads: 18000, rating: 4.4 },
          { title: 'Engineering Mathematics Formula Sheet', type: 'PDF', size: '5 MB', downloads: 35000, rating: 4.7 }
        ],
        videos: [
          { title: 'C Programming Full Course', instructor: 'CodeWithHarry', duration: '12 hours', platform: 'YouTube', rating: 4.8 },
          { title: 'Digital Logic Design', instructor: 'NPTEL', duration: '40 lectures', platform: 'NPTEL', rating: 4.5 }
        ],
        practicals: [
          { title: 'C Programming Lab Manual', type: 'PDF', experiments: 15, difficulty: 'Beginner' },
          { title: 'Digital Logic Lab Experiments', type: 'PDF', experiments: 12, difficulty: 'Intermediate' }
        ]
      },
      '2nd Year': {
        subjects: ['Data Structures', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
        books: [
          { title: 'Data Structures and Algorithms', author: 'Cormen, Leiserson', type: 'Textbook', rating: 4.8, price: 850, downloadable: true },
          { title: 'Database System Concepts', author: 'Silberschatz', type: 'Textbook', rating: 4.6, price: 750, downloadable: true },
          { title: 'Operating System Concepts', author: 'Galvin', type: 'Textbook', rating: 4.5, price: 680, downloadable: false }
        ],
        notes: [
          { title: 'DSA Complete Notes with Examples', type: 'PDF', size: '25 MB', downloads: 45000, rating: 4.8 },
          { title: 'DBMS Notes with SQL Queries', type: 'PDF', size: '18 MB', downloads: 32000, rating: 4.6 },
          { title: 'OS Concepts and Algorithms', type: 'PDF', size: '20 MB', downloads: 28000, rating: 4.5 }
        ],
        videos: [
          { title: 'Data Structures Full Course', instructor: 'Abdul Bari', duration: '15 hours', platform: 'YouTube', rating: 4.9 },
          { title: 'DBMS Complete Tutorial', instructor: 'Gate Smashers', duration: '10 hours', platform: 'YouTube', rating: 4.7 }
        ],
        practicals: [
          { title: 'DSA Programming Assignments', type: 'ZIP', experiments: 20, difficulty: 'Intermediate' },
          { title: 'DBMS Lab Queries and Projects', type: 'SQL', experiments: 15, difficulty: 'Intermediate' }
        ]
      },
      '3rd Year': {
        subjects: ['Software Engineering', 'Computer Graphics', 'AI/ML', 'Web Development', 'Mobile Development'],
        books: [
          { title: 'Software Engineering', author: 'Ian Sommerville', type: 'Textbook', rating: 4.4, price: 720, downloadable: true },
          { title: 'Artificial Intelligence', author: 'Stuart Russell', type: 'Textbook', rating: 4.7, price: 890, downloadable: false },
          { title: 'Computer Graphics', author: 'Donald Hearn', type: 'Textbook', rating: 4.3, price: 650, downloadable: true }
        ],
        notes: [
          { title: 'Machine Learning Complete Guide', type: 'PDF', size: '30 MB', downloads: 38000, rating: 4.7 },
          { title: 'Web Development Full Stack Notes', type: 'PDF', size: '22 MB', downloads: 42000, rating: 4.8 },
          { title: 'Software Engineering Methodologies', type: 'PDF', size: '16 MB', downloads: 25000, rating: 4.5 }
        ],
        videos: [
          { title: 'Machine Learning Course', instructor: 'Andrew Ng', duration: '55 hours', platform: 'Coursera', rating: 4.9 },
          { title: 'Full Stack Web Development', instructor: 'FreeCodeCamp', duration: '20 hours', platform: 'YouTube', rating: 4.8 }
        ],
        practicals: [
          { title: 'ML Projects with Python', type: 'ZIP', experiments: 10, difficulty: 'Advanced' },
          { title: 'Web Development Projects', type: 'ZIP', experiments: 8, difficulty: 'Advanced' }
        ]
      },
      '4th Year': {
        subjects: ['Project Work', 'Advanced Topics', 'Industry Training', 'Placement Preparation'],
        books: [
          { title: 'Cracking the Coding Interview', author: 'Gayle McDowell', type: 'Interview Prep', rating: 4.8, price: 450, downloadable: true },
          { title: 'System Design Interview', author: 'Alex Xu', type: 'Interview Prep', rating: 4.7, price: 520, downloadable: false },
          { title: 'Clean Code', author: 'Robert Martin', type: 'Best Practices', rating: 4.6, price: 480, downloadable: true }
        ],
        notes: [
          { title: 'Interview Preparation Guide', type: 'PDF', size: '35 MB', downloads: 55000, rating: 4.9 },
          { title: 'System Design Notes', type: 'PDF', size: '28 MB', downloads: 40000, rating: 4.7 },
          { title: 'Project Documentation Templates', type: 'DOC', size: '8 MB', downloads: 22000, rating: 4.5 }
        ],
        videos: [
          { title: 'System Design Course', instructor: 'Gaurav Sen', duration: '25 hours', platform: 'YouTube', rating: 4.8 },
          { title: 'Placement Preparation', instructor: 'Apna College', duration: '30 hours', platform: 'YouTube', rating: 4.7 }
        ],
        practicals: [
          { title: 'Capstone Project Ideas', type: 'PDF', experiments: 50, difficulty: 'Advanced' },
          { title: 'Industry Standard Projects', type: 'ZIP', experiments: 5, difficulty: 'Expert' }
        ]
      }
    },
    examPrep: [
      { title: 'GATE CSE Previous Papers', type: 'PDF', years: '2010-2024', downloads: 75000 },
      { title: 'University Question Banks', type: 'PDF', subjects: 'All CSE Subjects', downloads: 45000 },
      { title: 'Placement Test Papers', type: 'PDF', companies: 'Top IT Companies', downloads: 60000 }
    ],
    tools: [
      { name: 'Visual Studio Code', type: 'IDE', platform: 'All', price: 'Free' },
      { name: 'IntelliJ IDEA', type: 'IDE', platform: 'All', price: 'Free/Paid' },
      { name: 'Git & GitHub', type: 'Version Control', platform: 'All', price: 'Free' },
      { name: 'Docker', type: 'Containerization', platform: 'All', price: 'Free' }
    ]
  },

  // Medical Resources
  'MBBS': {
    category: 'Medical',
    icon: '🩺',
    color: 'red',
    description: 'Comprehensive medical study materials for MBBS students',
    yearWise: {
      '1st Year': {
        subjects: ['Anatomy', 'Physiology', 'Biochemistry'],
        books: [
          { title: 'Gray\'s Anatomy', author: 'Susan Standring', type: 'Textbook', rating: 4.9, price: 2500, downloadable: false },
          { title: 'Guyton Physiology', author: 'John Hall', type: 'Textbook', rating: 4.8, price: 1800, downloadable: true },
          { title: 'Harper\'s Biochemistry', author: 'Victor Rodwell', type: 'Textbook', rating: 4.6, price: 1500, downloadable: true }
        ],
        notes: [
          { title: 'Anatomy Atlas with Diagrams', type: 'PDF', size: '150 MB', downloads: 35000, rating: 4.8 },
          { title: 'Physiology Concepts Simplified', type: 'PDF', size: '80 MB', downloads: 28000, rating: 4.7 },
          { title: 'Biochemistry Pathways Chart', type: 'PDF', size: '25 MB', downloads: 32000, rating: 4.6 }
        ],
        videos: [
          { title: 'Human Anatomy Complete', instructor: 'Dr. Najeeb', duration: '200 hours', platform: 'Dr. Najeeb Lectures', rating: 4.9 },
          { title: 'Physiology Made Easy', instructor: 'Armando Hasudungan', duration: '50 hours', platform: 'YouTube', rating: 4.8 }
        ],
        practicals: [
          { title: 'Anatomy Dissection Manual', type: 'PDF', experiments: 25, difficulty: 'Beginner' },
          { title: 'Physiology Lab Experiments', type: 'PDF', experiments: 20, difficulty: 'Intermediate' }
        ]
      },
      '2nd Year': {
        subjects: ['Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine'],
        books: [
          { title: 'Robbins Pathology', author: 'Vinay Kumar', type: 'Textbook', rating: 4.8, price: 2200, downloadable: true },
          { title: 'KD Tripathi Pharmacology', author: 'KD Tripathi', type: 'Textbook', rating: 4.7, price: 1600, downloadable: true },
          { title: 'Ananthanarayan Microbiology', author: 'Ananthanarayan', type: 'Textbook', rating: 4.6, price: 1400, downloadable: false }
        ],
        notes: [
          { title: 'Pathology Quick Review', type: 'PDF', size: '120 MB', downloads: 40000, rating: 4.8 },
          { title: 'Pharmacology Drug Charts', type: 'PDF', size: '60 MB', downloads: 35000, rating: 4.7 },
          { title: 'Microbiology Mnemonics', type: 'PDF', size: '30 MB', downloads: 28000, rating: 4.6 }
        ],
        videos: [
          { title: 'Pathology Lectures', instructor: 'Dr. Bhanu Prakash', duration: '100 hours', platform: 'YouTube', rating: 4.8 },
          { title: 'Pharmacology Complete', instructor: 'Speed Pharmacology', duration: '80 hours', platform: 'YouTube', rating: 4.7 }
        ],
        practicals: [
          { title: 'Pathology Slide Study', type: 'PDF', experiments: 30, difficulty: 'Intermediate' },
          { title: 'Microbiology Lab Manual', type: 'PDF', experiments: 25, difficulty: 'Intermediate' }
        ]
      },
      'Clinical Years': {
        subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Obstetrics & Gynecology', 'Orthopedics'],
        books: [
          { title: 'Harrison\'s Internal Medicine', author: 'Dennis Kasper', type: 'Textbook', rating: 4.9, price: 3500, downloadable: false },
          { title: 'Bailey & Love Surgery', author: 'Norman Williams', type: 'Textbook', rating: 4.8, price: 2800, downloadable: true },
          { title: 'Nelson Pediatrics', author: 'Robert Kliegman', type: 'Textbook', rating: 4.7, price: 2500, downloadable: true }
        ],
        notes: [
          { title: 'Clinical Medicine Quick Reference', type: 'PDF', size: '200 MB', downloads: 50000, rating: 4.9 },
          { title: 'Surgery Procedures Guide', type: 'PDF', size: '180 MB', downloads: 42000, rating: 4.8 },
          { title: 'Pediatrics Case Studies', type: 'PDF', size: '100 MB', downloads: 35000, rating: 4.7 }
        ],
        videos: [
          { title: 'Clinical Medicine Lectures', instructor: 'Osmosis', duration: '300 hours', platform: 'Osmosis', rating: 4.9 },
          { title: 'Surgery Techniques', instructor: 'WebSurg', duration: '150 hours', platform: 'WebSurg', rating: 4.8 }
        ],
        practicals: [
          { title: 'Clinical Examination Guide', type: 'PDF', experiments: 50, difficulty: 'Advanced' },
          { title: 'Surgical Procedures Manual', type: 'PDF', experiments: 40, difficulty: 'Expert' }
        ]
      }
    },
    examPrep: [
      { title: 'NEET PG Previous Papers', type: 'PDF', years: '2010-2024', downloads: 85000 },
      { title: 'USMLE Step 1 Prep', type: 'PDF', subjects: 'All Medical Subjects', downloads: 25000 },
      { title: 'Medical University Papers', type: 'PDF', universities: 'All India', downloads: 55000 }
    ],
    tools: [
      { name: 'Complete Anatomy', type: 'App', platform: 'Mobile/Desktop', price: 'Paid' },
      { name: 'Medscape', type: 'Reference', platform: 'All', price: 'Free' },
      { name: 'UpToDate', type: 'Clinical Reference', platform: 'Web', price: 'Subscription' },
            { name: 'Anki', type: 'Flashcards', platform: 'All', price: 'Free' }
    ]
  },

  // Management Resources
  'MBA': {
    category: 'Management',
    icon: '💼',
    color: 'green',
    description: 'Complete business administration study materials',
    yearWise: {
      '1st Year': {
        subjects: ['Management Principles', 'Financial Accounting', 'Marketing Management', 'Organizational Behavior', 'Business Economics'],
        books: [
          { title: 'Principles of Management', author: 'Harold Koontz', type: 'Textbook', rating: 4.5, price: 650, downloadable: true },
          { title: 'Marketing Management', author: 'Philip Kotler', type: 'Textbook', rating: 4.8, price: 850, downloadable: false },
          { title: 'Financial Management', author: 'Prasanna Chandra', type: 'Textbook', rating: 4.6, price: 720, downloadable: true }
        ],
        notes: [
          { title: 'Management Concepts & Theories', type: 'PDF', size: '45 MB', downloads: 32000, rating: 4.6 },
          { title: 'Marketing Mix & Strategies', type: 'PDF', size: '35 MB', downloads: 28000, rating: 4.7 },
          { title: 'Financial Accounting Basics', type: 'PDF', size: '40 MB', downloads: 35000, rating: 4.5 }
        ],
        videos: [
          { title: 'MBA Fundamentals', instructor: 'Khan Academy', duration: '40 hours', platform: 'Khan Academy', rating: 4.7 },
          { title: 'Marketing Management Course', instructor: 'Wharton', duration: '25 hours', platform: 'Coursera', rating: 4.8 }
        ],
        practicals: [
          { title: 'Business Case Studies', type: 'PDF', experiments: 20, difficulty: 'Intermediate' },
          { title: 'Financial Analysis Projects', type: 'Excel', experiments: 15, difficulty: 'Intermediate' }
        ]
      },
      '2nd Year': {
        subjects: ['Strategic Management', 'International Business', 'Entrepreneurship', 'Business Ethics', 'Capstone Project'],
        books: [
          { title: 'Strategic Management', author: 'Michael Porter', type: 'Textbook', rating: 4.7, price: 780, downloadable: true },
          { title: 'International Business', author: 'Charles Hill', type: 'Textbook', rating: 4.5, price: 690, downloadable: false },
          { title: 'Entrepreneurship', author: 'Robert Hisrich', type: 'Textbook', rating: 4.6, price: 620, downloadable: true }
        ],
        notes: [
          { title: 'Strategic Planning Framework', type: 'PDF', size: '50 MB', downloads: 25000, rating: 4.8 },
          { title: 'Global Business Environment', type: 'PDF', size: '42 MB', downloads: 22000, rating: 4.6 },
          { title: 'Startup Business Plans', type: 'PDF', size: '38 MB', downloads: 30000, rating: 4.7 }
        ],
        videos: [
          { title: 'Strategic Management', instructor: 'MIT Sloan', duration: '30 hours', platform: 'edX', rating: 4.8 },
          { title: 'Entrepreneurship Course', instructor: 'Stanford', duration: '20 hours', platform: 'Coursera', rating: 4.7 }
        ],
        practicals: [
          { title: 'Business Strategy Projects', type: 'PDF', experiments: 10, difficulty: 'Advanced' },
          { title: 'Consulting Case Studies', type: 'PDF', experiments: 15, difficulty: 'Expert' }
        ]
      }
    },
    examPrep: [
      { title: 'CAT Previous Papers', type: 'PDF', years: '2010-2024', downloads: 95000 },
      { title: 'MAT & XAT Question Banks', type: 'PDF', subjects: 'All Sections', downloads: 65000 },
      { title: 'GD-PI Preparation Guide', type: 'PDF', topics: 'Current Affairs & Business', downloads: 45000 }
    ],
    tools: [
      { name: 'Microsoft Excel', type: 'Spreadsheet', platform: 'All', price: 'Subscription' },
      { name: 'Tableau', type: 'Data Visualization', platform: 'All', price: 'Free/Paid' },
      { name: 'SPSS', type: 'Statistical Analysis', platform: 'All', price: 'Subscription' },
      { name: 'Bloomberg Terminal', type: 'Financial Data', platform: 'Web', price: 'Institutional' }
    ]
  },

  // Law Resources
  'Law': {
    category: 'Law',
    icon: '⚖️',
    color: 'purple',
    description: 'Comprehensive legal study materials and case laws',
    yearWise: {
      '1st Year': {
        subjects: ['Constitutional Law', 'Legal Methods', 'Contract Law', 'Criminal Law', 'Legal Writing'],
        books: [
          { title: 'Constitutional Law of India', author: 'M.P. Jain', type: 'Textbook', rating: 4.8, price: 950, downloadable: true },
          { title: 'Law of Contracts', author: 'Avtar Singh', type: 'Textbook', rating: 4.6, price: 680, downloadable: true },
          { title: 'Indian Penal Code', author: 'K.D. Gaur', type: 'Textbook', rating: 4.5, price: 720, downloadable: false }
        ],
        notes: [
          { title: 'Constitutional Law Cases', type: 'PDF', size: '80 MB', downloads: 28000, rating: 4.7 },
          { title: 'Contract Law Principles', type: 'PDF', size: '55 MB', downloads: 25000, rating: 4.6 },
          { title: 'Criminal Law Sections', type: 'PDF', size: '65 MB', downloads: 30000, rating: 4.8 }
        ],
        videos: [
          { title: 'Constitutional Law Lectures', instructor: 'Law with Twins', duration: '50 hours', platform: 'YouTube', rating: 4.7 },
          { title: 'Legal Research Methods', instructor: 'NLSIU', duration: '20 hours', platform: 'YouTube', rating: 4.6 }
        ],
        practicals: [
          { title: 'Moot Court Problems', type: 'PDF', experiments: 15, difficulty: 'Intermediate' },
          { title: 'Legal Drafting Exercises', type: 'DOC', experiments: 20, difficulty: 'Beginner' }
        ]
      },
      '2nd Year': {
        subjects: ['Civil Procedure', 'Criminal Procedure', 'Company Law', 'Family Law', 'Property Law'],
        books: [
          { title: 'Civil Procedure Code', author: 'C.K. Takwani', type: 'Textbook', rating: 4.7, price: 850, downloadable: true },
          { title: 'Company Law', author: 'Avtar Singh', type: 'Textbook', rating: 4.6, price: 780, downloadable: true },
          { title: 'Hindu Law', author: 'Paras Diwan', type: 'Textbook', rating: 4.5, price: 650, downloadable: false }
        ],
        notes: [
          { title: 'CPC Bare Act with Amendments', type: 'PDF', size: '45 MB', downloads: 32000, rating: 4.8 },
          { title: 'Company Law Case Studies', type: 'PDF', size: '60 MB', downloads: 22000, rating: 4.6 },
          { title: 'Family Law Judgments', type: 'PDF', size: '70 MB', downloads: 25000, rating: 4.7 }
        ],
        videos: [
          { title: 'Civil Procedure Explained', instructor: 'Legal Edge', duration: '40 hours', platform: 'YouTube', rating: 4.7 },
          { title: 'Company Law Simplified', instructor: 'CA Raj Doshi', duration: '30 hours', platform: 'YouTube', rating: 4.6 }
        ],
        practicals: [
          { title: 'Court Procedure Manual', type: 'PDF', experiments: 25, difficulty: 'Advanced' },
          { title: 'Legal Documentation', type: 'DOC', experiments: 18, difficulty: 'Intermediate' }
        ]
      },
      '3rd Year': {
        subjects: ['Evidence Law', 'International Law', 'IPR', 'Environmental Law', 'Cyber Law'],
        books: [
          { title: 'Law of Evidence', author: 'Batuk Lal', type: 'Textbook', rating: 4.8, price: 920, downloadable: true },
          { title: 'International Law', author: 'S.K. Kapoor', type: 'Textbook', rating: 4.5, price: 750, downloadable: true },
          { title: 'Intellectual Property Law', author: 'P. Narayanan', type: 'Textbook', rating: 4.6, price: 680, downloadable: false }
        ],
        notes: [
          { title: 'Evidence Act Sections', type: 'PDF', size: '50 MB', downloads: 28000, rating: 4.7 },
          { title: 'IPR Case Laws', type: 'PDF', size: '65 MB', downloads: 20000, rating: 4.8 },
          { title: 'Cyber Law Provisions', type: 'PDF', size: '40 MB', downloads: 18000, rating: 4.5 }
        ],
        videos: [
          { title: 'Evidence Law Masterclass', instructor: 'Unacademy', duration: '35 hours', platform: 'Unacademy', rating: 4.8 },
          { title: 'IPR Complete Course', instructor: 'WIPO', duration: '25 hours', platform: 'WIPO Academy', rating: 4.7 }
        ],
        practicals: [
          { title: 'Trial Advocacy Training', type: 'PDF', experiments: 12, difficulty: 'Expert' },
          { title: 'Legal Research Projects', type: 'PDF', experiments: 10, difficulty: 'Advanced' }
        ]
      }
    },
    examPrep: [
      { title: 'CLAT Previous Papers', type: 'PDF', years: '2010-2024', downloads: 75000 },
      { title: 'Judiciary Exam Papers', type: 'PDF', states: 'All States', downloads: 45000 },
      { title: 'Law Entrance Mock Tests', type: 'PDF', exams: 'CLAT, AILET, LSAT', downloads: 55000 }
    ],
    tools: [
      { name: 'Manupatra', type: 'Legal Database', platform: 'Web', price: 'Subscription' },
      { name: 'SCC Online', type: 'Case Law Database', platform: 'Web', price: 'Subscription' },
      { name: 'Westlaw', type: 'Legal Research', platform: 'Web', price: 'Subscription' },
      { name: 'LexisNexis', type: 'Legal Database', platform: 'Web', price: 'Subscription' }
    ]
  },

  // Arts & Design Resources
  'Fine Arts': {
    category: 'Arts',
    icon: '🎨',
    color: 'pink',
    description: 'Creative arts study materials and techniques',
    yearWise: {
      '1st Year': {
        subjects: ['Drawing Fundamentals', 'Color Theory', 'Art History', 'Basic Sculpture', 'Design Principles'],
        books: [
          { title: 'Drawing on the Right Side of the Brain', author: 'Betty Edwards', type: 'Textbook', rating: 4.7, price: 450, downloadable: true },
          { title: 'Interaction of Color', author: 'Josef Albers', type: 'Textbook', rating: 4.8, price: 520, downloadable: false },
          { title: 'Gardner\'s Art Through the Ages', author: 'Fred Kleiner', type: 'Textbook', rating: 4.6, price: 850, downloadable: true }
        ],
        notes: [
          { title: 'Drawing Techniques Guide', type: 'PDF', size: '120 MB', downloads: 15000, rating: 4.6 },
          { title: 'Color Mixing Chart', type: 'PDF', size: '25 MB', downloads: 22000, rating: 4.8 },
          { title: 'Art History Timeline', type: 'PDF', size: '80 MB', downloads: 18000, rating: 4.5 }
        ],
        videos: [
          { title: 'Drawing Fundamentals', instructor: 'Proko', duration: '40 hours', platform: 'YouTube', rating: 4.9 },
          { title: 'Color Theory Explained', instructor: 'Marco Bucci', duration: '15 hours', platform: 'YouTube', rating: 4.8 }
        ],
        practicals: [
          { title: 'Drawing Exercise Collection', type: 'PDF', experiments: 50, difficulty: 'Beginner' },
          { title: 'Sculpture Projects', type: 'PDF', experiments: 15, difficulty: 'Intermediate' }
        ]
      },
      'Advanced Years': {
        subjects: ['Advanced Painting', 'Digital Art', 'Portfolio Development', 'Exhibition Planning', 'Art Criticism'],
        books: [
          { title: 'Ways of Seeing', author: 'John Berger', type: 'Theory', rating: 4.7, price: 380, downloadable: true },
          { title: 'The Art Spirit', author: 'Robert Henri', type: 'Philosophy', rating: 4.6, price: 420, downloadable: true },
          { title: 'Digital Painting Techniques', author: 'Various Artists', type: 'Tutorial', rating: 4.8, price: 650, downloadable: false }
        ],
        notes: [
          { title: 'Advanced Painting Techniques', type: 'PDF', size: '150 MB', downloads: 12000, rating: 4.7 },
          { title: 'Digital Art Workflow', type: 'PDF', size: '90 MB', downloads: 20000, rating: 4.8 },
          { title: 'Portfolio Presentation Guide', type: 'PDF', size: '45 MB', downloads: 15000, rating: 4.6 }
        ],
        videos: [
          { title: 'Digital Painting Masterclass', instructor: 'Aaron Blaise', duration: '60 hours', platform: 'CreatureArtTeacher', rating: 4.9 },
          { title: 'Portfolio Development', instructor: 'RISD', duration: '20 hours', platform: 'YouTube', rating: 4.7 }
        ],
        practicals: [
          { title: 'Advanced Art Projects', type: 'PDF', experiments: 25, difficulty: 'Advanced' },
          { title: 'Exhibition Planning Guide', type: 'PDF', experiments: 8, difficulty: 'Expert' }
        ]
      }
    },
    examPrep: [
            { title: 'Art Entrance Exam Papers', type: 'PDF', exams: 'NID, NIFT, JJ School', downloads: 25000 },
      { title: 'Portfolio Preparation Guide', type: 'PDF', colleges: 'Top Art Schools', downloads: 18000 },
      { title: 'Art Theory Question Banks', type: 'PDF', subjects: 'Art History & Theory', downloads: 15000 }
    ],
    tools: [
      { name: 'Adobe Creative Suite', type: 'Design Software', platform: 'All', price: 'Subscription' },
      { name: 'Procreate', type: 'Digital Painting', platform: 'iPad', price: 'Paid' },
      { name: 'Blender', type: '3D Modeling', platform: 'All', price: 'Free' },
      { name: 'Figma', type: 'UI/UX Design', platform: 'Web', price: 'Free/Paid' }
    ]
  },

  // Science Resources
  'Physics': {
    category: 'Science',
    icon: '⚛️',
    color: 'indigo',
    description: 'Physics study materials from basics to advanced',
    yearWise: {
      '1st Year': {
        subjects: ['Mechanics', 'Thermodynamics', 'Waves & Oscillations', 'Electromagnetism'],
        books: [
          { title: 'Concepts of Physics', author: 'H.C. Verma', type: 'Textbook', rating: 4.9, price: 650, downloadable: true },
          { title: 'Fundamentals of Physics', author: 'Halliday Resnick', type: 'Textbook', rating: 4.8, price: 850, downloadable: false },
          { title: 'University Physics', author: 'Young & Freedman', type: 'Textbook', rating: 4.7, price: 920, downloadable: true }
        ],
        notes: [
          { title: 'Physics Formula Collection', type: 'PDF', size: '35 MB', downloads: 45000, rating: 4.8 },
          { title: 'Mechanics Problem Solutions', type: 'PDF', size: '60 MB', downloads: 38000, rating: 4.7 },
          { title: 'Electromagnetic Theory Notes', type: 'PDF', size: '55 MB', downloads: 32000, rating: 4.6 }
        ],
        videos: [
          { title: 'Physics Complete Course', instructor: 'Khan Academy', duration: '100 hours', platform: 'Khan Academy', rating: 4.8 },
          { title: 'Classical Mechanics', instructor: 'MIT OCW', duration: '80 hours', platform: 'MIT OpenCourseWare', rating: 4.9 }
        ],
        practicals: [
          { title: 'Physics Lab Manual', type: 'PDF', experiments: 30, difficulty: 'Intermediate' },
          { title: 'Numerical Problem Sets', type: 'PDF', experiments: 200, difficulty: 'Advanced' }
        ]
      },
      'Advanced Years': {
        subjects: ['Quantum Mechanics', 'Statistical Mechanics', 'Solid State Physics', 'Nuclear Physics'],
        books: [
          { title: 'Introduction to Quantum Mechanics', author: 'David Griffiths', type: 'Textbook', rating: 4.8, price: 750, downloadable: true },
          { title: 'Solid State Physics', author: 'Ashcroft & Mermin', type: 'Textbook', rating: 4.7, price: 890, downloadable: false },
          { title: 'Nuclear Physics', author: 'S.N. Ghoshal', type: 'Textbook', rating: 4.6, price: 680, downloadable: true }
        ],
        notes: [
          { title: 'Quantum Mechanics Solved Problems', type: 'PDF', size: '80 MB', downloads: 25000, rating: 4.8 },
          { title: 'Solid State Physics Notes', type: 'PDF', size: '70 MB', downloads: 20000, rating: 4.7 },
          { title: 'Nuclear Physics Concepts', type: 'PDF', size: '65 MB', downloads: 18000, rating: 4.6 }
        ],
        videos: [
          { title: 'Quantum Mechanics Course', instructor: 'Stanford', duration: '60 hours', platform: 'YouTube', rating: 4.9 },
          { title: 'Solid State Physics', instructor: 'IIT Bombay', duration: '40 hours', platform: 'NPTEL', rating: 4.7 }
        ],
        practicals: [
          { title: 'Advanced Physics Experiments', type: 'PDF', experiments: 25, difficulty: 'Expert' },
          { title: 'Research Project Ideas', type: 'PDF', experiments: 15, difficulty: 'Research Level' }
        ]
      }
    },
    examPrep: [
      { title: 'JEE Physics Papers', type: 'PDF', years: '2010-2024', downloads: 85000 },
      { title: 'GATE Physics Papers', type: 'PDF', years: '2010-2024', downloads: 45000 },
      { title: 'NET Physics Papers', type: 'PDF', years: '2010-2024', downloads: 35000 }
    ],
    tools: [
      { name: 'MATLAB', type: 'Computational', platform: 'All', price: 'Subscription' },
      { name: 'Mathematica', type: 'Symbolic Math', platform: 'All', price: 'Subscription' },
      { name: 'Python (SciPy)', type: 'Programming', platform: 'All', price: 'Free' },
      { name: 'LabVIEW', type: 'Instrumentation', platform: 'All', price: 'Subscription' }
    ]
  },

  // Agriculture Resources
  'Agriculture': {
    category: 'Agriculture',
    icon: '🌾',
    color: 'yellow',
    description: 'Agricultural science and farming study materials',
    yearWise: {
      '1st Year': {
        subjects: ['Crop Production', 'Soil Science', 'Plant Breeding', 'Agricultural Chemistry', 'Farm Management'],
        books: [
          { title: 'Principles of Agronomy', author: 'S.R. Reddy', type: 'Textbook', rating: 4.6, price: 580, downloadable: true },
          { title: 'Soil Science', author: 'Brady & Weil', type: 'Textbook', rating: 4.7, price: 750, downloadable: false },
          { title: 'Plant Breeding', author: 'B.D. Singh', type: 'Textbook', rating: 4.5, price: 650, downloadable: true }
        ],
        notes: [
          { title: 'Crop Production Techniques', type: 'PDF', size: '85 MB', downloads: 15000, rating: 4.6 },
          { title: 'Soil Management Practices', type: 'PDF', size: '70 MB', downloads: 12000, rating: 4.7 },
          { title: 'Plant Breeding Methods', type: 'PDF', size: '60 MB', downloads: 10000, rating: 4.5 }
        ],
        videos: [
          { title: 'Modern Agriculture Techniques', instructor: 'ICAR', duration: '50 hours', platform: 'YouTube', rating: 4.7 },
          { title: 'Soil Science Fundamentals', instructor: 'Agricultural Universities', duration: '30 hours', platform: 'NPTEL', rating: 4.6 }
        ],
        practicals: [
          { title: 'Field Crop Experiments', type: 'PDF', experiments: 20, difficulty: 'Intermediate' },
          { title: 'Soil Testing Procedures', type: 'PDF', experiments: 15, difficulty: 'Beginner' }
        ]
      },
      'Advanced Years': {
        subjects: ['Agricultural Economics', 'Food Technology', 'Agricultural Extension', 'Biotechnology', 'Sustainable Agriculture'],
        books: [
          { title: 'Agricultural Economics', author: 'Acharya & Agarwal', type: 'Textbook', rating: 4.5, price: 620, downloadable: true },
          { title: 'Food Technology', author: 'Potter & Hotchkiss', type: 'Textbook', rating: 4.6, price: 780, downloadable: true },
          { title: 'Agricultural Extension', author: 'Ray', type: 'Textbook', rating: 4.4, price: 550, downloadable: false }
        ],
        notes: [
          { title: 'Agricultural Marketing Guide', type: 'PDF', size: '55 MB', downloads: 8000, rating: 4.5 },
          { title: 'Food Processing Techniques', type: 'PDF', size: '90 MB', downloads: 12000, rating: 4.6 },
          { title: 'Sustainable Farming Practices', type: 'PDF', size: '75 MB', downloads: 10000, rating: 4.7 }
        ],
        videos: [
          { title: 'Agricultural Biotechnology', instructor: 'IARI', duration: '40 hours', platform: 'YouTube', rating: 4.6 },
          { title: 'Food Processing Technology', instructor: 'CFTRI', duration: '35 hours', platform: 'NPTEL', rating: 4.5 }
        ],
        practicals: [
          { title: 'Food Processing Lab Manual', type: 'PDF', experiments: 18, difficulty: 'Advanced' },
          { title: 'Agricultural Research Projects', type: 'PDF', experiments: 10, difficulty: 'Research Level' }
        ]
      }
    },
    examPrep: [
      { title: 'ICAR AIEEA Papers', type: 'PDF', years: '2010-2024', downloads: 25000 },
      { title: 'Agricultural University Papers', type: 'PDF', universities: 'All India', downloads: 18000 },
      { title: 'JRF Agriculture Papers', type: 'PDF', years: '2010-2024', downloads: 15000 }
    ],
    tools: [
      { name: 'QGIS', type: 'GIS Software', platform: 'All', price: 'Free' },
      { name: 'R Statistical Software', type: 'Data Analysis', platform: 'All', price: 'Free' },
      { name: 'DSSAT', type: 'Crop Modeling', platform: 'Windows', price: 'Free' },
      { name: 'GenStat', type: 'Statistical Analysis', platform: 'All', price: 'Subscription' }
    ]
  }
};

const ResourceHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [resourceType, setResourceType] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Filter states
  const [filters, setFilters] = useState({
    category: 'All',
    difficulty: 'All',
    price: 'All',
    downloadable: 'All'
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const closeSubjectView = () => {
    setSelectedSubject(null);
  };

  // Get all resources for filtering
  const getAllResources = () => {
    let allResources = [];
    
    Object.entries(studyResources).forEach(([subjectName, subjectData]) => {
      // Add books from all years
      Object.entries(subjectData.yearWise).forEach(([year, yearData]) => {
        yearData.books?.forEach(book => {
          allResources.push({
            ...book,
            subject: subjectName,
            year: year,
            category: subjectData.category,
            resourceType: 'Book',
            icon: subjectData.icon,
            color: subjectData.color
          });
        });

        yearData.notes?.forEach(note => {
          allResources.push({
            ...note,
            subject: subjectName,
            year: year,
            category: subjectData.category,
            resourceType: 'Notes',
            icon: subjectData.icon,
            color: subjectData.color,
            price: 0,
            downloadable: true
          });
        });

        yearData.videos?.forEach(video => {
          allResources.push({
            ...video,
            subject: subjectName,
            year: year,
            category: subjectData.category,
            resourceType: 'Video',
            icon: subjectData.icon,
            color: subjectData.color,
            price: 0,
            downloadable: false
          });
        });
      });

      // Add exam prep materials
      subjectData.examPrep?.forEach(exam => {
        allResources.push({
          ...exam,
          subject: subjectName,
          year: 'Exam Prep',
          category: subjectData.category,
          resourceType: 'Exam Prep',
          icon: subjectData.icon,
          color: subjectData.color,
          price: 0,
          downloadable: true,
          rating: 4.5
        });
      });
    });

    return allResources;
  };

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let resources = getAllResources();

    // Apply filters
    resources = resources.filter(resource => {
      const searchMatch = searchTerm === '' || 
        resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = filters.category === 'All' || resource.category === filters.category;
      const yearMatch = selectedYear === 'All Years' || resource.year === selectedYear;
      const typeMatch = resourceType === 'All' || resource.resourceType === resourceType;
      
      const priceMatch = filters.price === 'All' || 
        (filters.price === 'Free' && resource.price === 0) ||
        (filters.price === 'Paid' && resource.price > 0);

      const downloadableMatch = filters.downloadable === 'All' || 
        (filters.downloadable === 'Yes' && resource.downloadable) ||
        (filters.downloadable === 'No' && !resource.downloadable);

      return searchMatch && categoryMatch && yearMatch && typeMatch && priceMatch && downloadableMatch;
    });

    // Sort resources
    resources.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'downloads':
          return (b.downloads || 0) - (a.downloads || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return resources;
  }, [searchTerm, filters, selectedYear, resourceType, sortBy]);

   const floatingElements = ["📚", "📖", "🎓", "💡", "🔬", "⚙️", "🎨", "📝"];

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
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-purple-600 ml-8 mt-5 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Enhanced Sidebar with Filters */}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold ml-15 text-gray-800">
                  Resources
                </h3>
                <button
                  onClick={() => {
                    setFilters({ category: 'All', difficulty: 'All', price: 'All', downloadable: 'All' });
                    setSearchTerm('');
                    setSelectedYear('All Years');
                    setResourceType('All');
                  }}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
                >
                  Clear All
                </button>
              </div>

              {/* Search Box */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Resources</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Books, notes, videos, subjects..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Subject Categories */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Categories</label>
                <div className="space-y-2">
                  {Object.entries(studyResources).map(([subject, data]) => (
                    <button
                      key={subject}
                      onClick={() => selectSubject(subject)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition text-sm ${
                        selectedSubject === subject
                          ? `bg-${data.color}-500 text-white`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{data.icon}</span>
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="All">All Categories</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medical">Medical</option>
                  <option value="Management">Management</option>
                  <option value="Law">Law</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Agriculture">Agriculture</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="All Years">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Clinical Years">Clinical Years</option>
                  <option value="Advanced Years">Advanced Years</option>
                  <option value="Exam Prep">Exam Preparation</option>
                </select>
              </div>

              {/* Resource Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="All">All Types</option>
                  <option value="Book">Books</option>
                  <option value="Notes">Notes</option>
                  <option value="Video">Videos</option>
                  <option value="Exam Prep">Exam Preparation</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <select
                  value={filters.price}
                  onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="All">All Prices</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Downloadable Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Downloadable</label>
                <select
                  value={filters.downloadable}
                  onChange={(e) => setFilters(prev => ({ ...prev, downloadable: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="All">All Resources</option>
                  <option value="Yes">Downloadable</option>
                  <option value="No">Online Only</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-lg mr-2">📊</span>
                  Resource Stats
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Found:</span>
                    <span className="font-semibold text-purple-600">{filteredResources.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Free Resources:</span>
                    <span className="font-semibold text-green-600">
                      {filteredResources.filter(r => r.price === 0).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Downloadable:</span>
                    <span className="font-semibold text-blue-600">
                      {filteredResources.filter(r => r.downloadable).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/after10th/course"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-700 text-center transition text-sm"
                >
                  📚 All Courses
                </Link>
                <Link
                  to="/after10th/colleges"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 text-center transition text-sm"
                >
                  🏫 Colleges
                </Link>
                <Link
                  to="/"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-700 text-center transition text-sm"
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
        
        {/* Header */}
        <div className="text-center py-12 px-4">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 text-3xl animate-bounce">
              <span className="animation-delay-0">📚</span>
              <span className="animation-delay-200">💡</span>
              <span className="animation-delay-400">🎓</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-700 to-purple-800 bg-clip-text text-transparent mb-6 animate-pulse">
            Resource Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Your complete study companion with books, notes, videos, and exam materials for all courses. 
            Everything you need to excel in your academic journey.
          </p>
        </div>

        {/* Sort and View Options */}
        <div className="px-8 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'rating', label: 'Rating' },
                    { key: 'downloads', label: 'Downloads' },
                    { key: 'price', label: 'Price' },
                    { key: 'title', label: 'Title' }
                  ].map(sort => (
                    <button
                      key={sort.key}
                      onClick={() => setSortBy(sort.key)}
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        sortBy === sort.key
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredResources.length} resources found
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Overview or Resources Grid */}
        <div className="px-8 pb-8">
          {!selectedSubject ? (
            // Subject Overview
            <div>
              {/* Subject Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {Object.entries(studyResources).map(([subject, data]) => (
                                    <motion.div
                    key={subject}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer relative overflow-hidden bg-gradient-to-br from-${data.color}-50 via-${data.color}-100 to-${data.color}-200 rounded-3xl shadow-lg p-6 border border-gray-200`}
                    onClick={() => selectSubject(subject)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{data.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{subject}</h3>
                      <p className="text-sm text-gray-600 mb-4">{data.description}</p>
                      <div className="text-xs text-gray-500">
                        {Object.keys(data.yearWise).length} year levels • {data.category}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* All Resources Grid/List */}
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className={`bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 ${
                        viewMode === 'list' ? 'flex items-center space-x-4' : ''
                      }`}
                    >
                      {/* Resource Icon */}
                      <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                        <div className={`w-12 h-12 bg-${resource.color}-100 rounded-full flex items-center justify-center text-xl`}>
                          {resource.icon}
                        </div>
                      </div>

                      {/* Resource Content */}
                      <div className={viewMode === 'list' ? 'flex-1' : ''}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-800 text-lg line-clamp-2">{resource.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full bg-${resource.color}-100 text-${resource.color}-800`}>
                            {resource.resourceType}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">📚</span>
                            <span>{resource.subject} • {resource.year}</span>
                          </div>
                          
                          {resource.author && (
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-2">✍️</span>
                              <span>{resource.author}</span>
                            </div>
                          )}

                          {resource.instructor && (
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-2">👨‍🏫</span>
                              <span>{resource.instructor}</span>
                            </div>
                          )}

                          {resource.duration && (
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-2">⏱️</span>
                              <span>{resource.duration}</span>
                            </div>
                          )}

                          {resource.size && (
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-2">📁</span>
                              <span>{resource.size}</span>
                            </div>
                          )}
                        </div>

                        {/* Resource Stats */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {resource.rating && (
                              <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">⭐</span>
                                <span className="text-sm font-semibold">{resource.rating}</span>
                              </div>
                            )}
                            
                            {resource.downloads && (
                              <div className="flex items-center">
                                <span className="text-blue-500 mr-1">⬇️</span>
                                <span className="text-sm">{resource.downloads.toLocaleString()}</span>
                              </div>
                            )}
                          </div>

                          <div className="text-right">
                            {resource.price === 0 ? (
                              <span className="text-green-600 font-semibold text-sm">Free</span>
                            ) : (
                              <span className="text-gray-800 font-semibold text-sm">₹{resource.price}</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          {resource.downloadable ? (
                            <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
                              📥 Download
                            </button>
                          ) : (
                            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
                              🔗 View Online
                            </button>
                          )}
                          
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
                            ℹ️
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Subject Detailed View
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Subject Header */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 bg-${studyResources[selectedSubject].color}-100 rounded-full flex items-center justify-center text-2xl mr-4`}>
                      {studyResources[selectedSubject].icon}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">{selectedSubject}</h1>
                      <p className="text-gray-600">{studyResources[selectedSubject].description}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeSubjectView}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    ← Back to All Subjects
                  </button>
                </div>
              </div>

              {/* Year-wise Resources */}
              {Object.entries(studyResources[selectedSubject].yearWise).map(([year, yearData]) => (
                <div key={year} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{year}</h2>
                  
                  {/* Subjects */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">📚 Subjects Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {yearData.subjects.map((subject, index) => (
                        <span key={index} className={`bg-${studyResources[selectedSubject].color}-100 text-${studyResources[selectedSubject].color}-800 px-3 py-1 rounded-full text-sm`}>
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Books */}
                  {yearData.books && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">📖 Recommended Books</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {yearData.books.map((book, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">{book.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-yellow-500">⭐ {book.rating}</span>
                              <span className="font-semibold">₹{book.price}</span>
                            </div>
                            <div className="flex space-x-2">
                              {book.downloadable ? (
                                <button className="flex-1 bg-green-500 text-white py-1 px-3 rounded text-sm">
                                  Download
                                </button>
                              ) : (
                                <button className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm">
                                  Buy Online
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {yearData.notes && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">📝 Study Notes</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {yearData.notes.map((note, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">{note.title}</h4>
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                              <span>📁 {note.size}</span>
                              <span>⬇️ {note.downloads.toLocaleString()}</span>
                              <span>⭐ {note.rating}</span>
                            </div>
                            <button className="w-full bg-green-500 text-white py-2 rounded text-sm">
                              📥 Download Free
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos */}
                  {yearData.videos && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">🎥 Video Lectures</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {yearData.videos.map((video, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">{video.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">by {video.instructor}</p>
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                              <span>⏱️ {video.duration}</span>
                              <span>📺 {video.platform}</span>
                              <span>⭐ {video.rating}</span>
                            </div>
                            <button className="w-full bg-blue-500 text-white py-2 rounded text-sm">
                              🔗 Watch Online
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practicals */}
                  {yearData.practicals && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">🔬 Practical Materials</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {yearData.practicals.map((practical, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">{practical.title}</h4>
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                              <span>🧪 {practical.experiments} experiments</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                practical.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                practical.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                practical.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {practical.difficulty}
                              </span>
                            </div>
                            <button className="w-full bg-purple-500 text-white py-2 rounded text-sm">
                              📥 Download Manual
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Exam Preparation */}
              {studyResources[selectedSubject].examPrep && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Exam Preparation</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studyResources[selectedSubject].examPrep.map((exam, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">{exam.title}</h4>
                        <div className="space-y-2 mb-3 text-sm text-gray-600">
                          {exam.years && <div>📅 {exam.years}</div>}
                          {exam.subjects && <div>📚 {exam.subjects}</div>}
                          {exam.companies && <div>🏢 {exam.companies}</div>}
                          {exam.exams && <div>📝 {exam.exams}</div>}
                          <div>⬇️ {exam.downloads.toLocaleString()} downloads</div>
                        </div>
                        <button className="w-full bg-orange-500 text-white py-2 rounded text-sm">
                          📥 Download Papers
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Software */}
              {studyResources[selectedSubject].tools && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">🛠️ Essential Tools & Software</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {studyResources[selectedSubject].tools.map((tool, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">{tool.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tool.type}</p>
                        <div className="text-xs text-gray-500 mb-3">
                          <div>💻 {tool.platform}</div>
                          <div className={tool.price === 'Free' ? 'text-green-600 font-semibold' : 'text-blue-600'}>
                            💰 {tool.price}
                          </div>
                        </div>
                        <button className="w-full bg-gray-500 text-white py-1 px-3 rounded text-sm">
                          Learn More
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
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

      {/* Quick Access Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 space-y-3">
        <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
          <button
            onClick={() => setResourceType('Book')}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition block mb-2"
            title="Books Only"
          >
            📖
          </button>
          <button
            onClick={() => setResourceType('Notes')}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition block mb-2"
            title="Notes Only"
          >
            📝
          </button>
          <button
            onClick={() => setResourceType('Video')}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition block mb-2"
            title="Videos Only"
          >
            🎥
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, price: 'Free' }))}
            className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition block"
            title="Free Resources"
          >
            🆓
          </button>
        </div>
      </div>

      {/* Resource Statistics Panel */}
      {!selectedSubject && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-xs">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Resource Statistics</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Resources:</span>
                <span className="font-semibold">{getAllResources().length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Books:</span>
                <span className="font-semibold text-blue-600">
                  {getAllResources().filter(r => r.resourceType === 'Book').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Free Notes:</span>
                <span className="font-semibold text-green-600">
                  {getAllResources().filter(r => r.resourceType === 'Notes').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Video Lectures:</span>
                <span className="font-semibold text-red-600">
                  {getAllResources().filter(r => r.resourceType === 'Video').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exam Papers:</span>
                <span className="font-semibold text-orange-600">
                  {getAllResources().filter(r => r.resourceType === 'Exam Prep').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Resources Banner */}
      {!selectedSubject && filteredResources.length > 0 && (
        <div className="fixed top-24 right-6 z-40 max-w-sm">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold mb-2">🌟 Featured Resource</h4>
            <div className="text-sm">
              <div className="font-medium">{filteredResources[0].title}</div>
              <div className="text-purple-100">{filteredResources[0].subject}</div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-300">⭐ {filteredResources[0].rating || 'N/A'}</span>
                <span className="ml-2 text-purple-100">
                  {filteredResources[0].price === 0 ? 'Free' : `₹${filteredResources[0].price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ResourceHub;
                    