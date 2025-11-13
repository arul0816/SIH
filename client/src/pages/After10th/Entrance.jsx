import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const entranceFields = [
  {
    name: 'Engineering National',
    icon: '⚙️',
    bg: 'from-blue-500 via-blue-600 to-blue-700',
    particles: '⚙️🔧🏗️'
  },
  {
    name: 'Engineering State',
    icon: '🏢',
    bg: 'from-green-500 via-green-600 to-green-700',
    particles: '🏛️📍🌆'
  },
  {
    name: 'Computer Applications',
    icon: '💻',
    bg: 'from-purple-500 via-purple-600 to-purple-700',
    particles: '💻🖥️📱'
  },
  {
    name: 'Design & Animation',
    icon: '🎨',
    bg: 'from-pink-500 via-pink-600 to-pink-700',
    particles: '🎨🖌️✨'
  },
  {
    name: 'Science & Research',
    icon: '🔬',
    bg: 'from-teal-500 via-teal-600 to-teal-700',
    particles: '🔬⚗️🧪'
  },
  {
    name: 'Law',
    icon: '⚖️',
    bg: 'from-orange-500 via-orange-600 to-orange-700',
    particles: '⚖️📚🏛️'
  },
  {
    name: 'Medical & Allied',
    icon: '🏥',
    bg: 'from-red-500 via-red-600 to-red-700',
    particles: '🏥💊🩺'
  },
];

const examDetails = {
  // Engineering National
  'JEE Main & Advanced': {
    desc: 'IITs, NITs, IIITs – B.Tech in CSE/IT.',
    difficulty: 'Very High',
    applicants: '12L+',
    successRate: '2%',
    examDate: 'Jan & Apr',
    eligibility: '12th with PCM, 75% marks',
    syllabus: 'Physics, Chemistry, Mathematics'
  },
  'BITSAT': {
    desc: 'BITS Pilani, Goa, Hyderabad – CSE, Data Science.',
    difficulty: 'High',
    applicants: '3L+',
    successRate: '8%',
    examDate: 'May',
    eligibility: '12th with PCM, 75% marks',
    syllabus: 'Physics, Chemistry, Mathematics, English'
  },
  'VITEEE': {
    desc: 'VIT University – CSE specializations.',
    difficulty: 'Medium',
    applicants: '5L+',
    successRate: '15%',
    examDate: 'Apr',
    eligibility: '12th with PCM, 60% marks',
    syllabus: 'Physics, Chemistry, Mathematics'
  },
  'SRMJEEE': {
    desc: 'SRM Institute – B.Tech CSE/IT.',
    difficulty: 'Medium',
    applicants: '2L+',
    successRate: '20%',
    examDate: 'May',
    eligibility: '12th with PCM, 50% marks',
    syllabus: 'Physics, Chemistry, Mathematics'
  },

  // Engineering State
  'MHT CET': {
    desc: 'Maharashtra state engineering admissions.',
    difficulty: 'Medium',
    applicants: '4L+',
    successRate: '25%',
    examDate: 'May',
    eligibility: '12th with PCM from Maharashtra',
    syllabus: 'Physics, Chemistry, Mathematics'
  },
  'KCET': {
    desc: 'Karnataka state engineering (including CSE).',
    difficulty: 'Medium',
    applicants: '2L+',
    successRate: '30%',
    examDate: 'Jun',
    eligibility: '12th with PCM from Karnataka',
    syllabus: 'Physics, Chemistry, Mathematics'
  },
  'TS EAMCET': {
    desc: 'Telangana engineering entrance test.',
    difficulty: 'Medium',
    applicants: '3L+',
    successRate: '28%',
    examDate: 'May',
    eligibility: '12th with PCM from Telangana',
    syllabus: 'Physics, Chemistry, Mathematics'
  },

  // Computer Applications
  'CUET UG': {
    desc: 'Central Universities – BCA, B.Sc. CS.',
    difficulty: 'Medium',
    applicants: '15L+',
    successRate: '12%',
    examDate: 'May-Jun',
    eligibility: '12th pass from any stream',
    syllabus: 'General Test, Domain Specific'
  },
  'IPU CET': {
    desc: 'Delhi IP University – BCA, IT.',
    difficulty: 'Medium',
    applicants: '1L+',
    successRate: '35%',
    examDate: 'May',
    eligibility: '12th with Mathematics',
    syllabus: 'Mathematics, General Aptitude'
  },
  'Christ Univ Test': {
    desc: 'Christ University – BCA, CS, Data Science.',
    difficulty: 'Medium',
    applicants: '50K+',
    successRate: '40%',
    examDate: 'Apr',
    eligibility: '12th pass with 50% marks',
    syllabus: 'Aptitude, English, Mathematics'
  },

  // Design & Animation
  'UCEED': {
    desc: 'IITs – B.Des, UI/UX.',
    difficulty: 'Very High',
    applicants: '15K+',
    successRate: '5%',
    examDate: 'Jan',
    eligibility: '12th pass from any stream',
    syllabus: 'Design Aptitude, Drawing, Visualization'
  },
  'NID DAT': {
    desc: 'National Institute of Design – Game Design, Animation.',
    difficulty: 'High',
    applicants: '12K+',
    successRate: '8%',
    examDate: 'Jan',
    eligibility: '12th pass from any stream',
    syllabus: 'Design Aptitude, Drawing, General Knowledge'
  },

  // Science & Research
  'IISER Aptitude Test': {
    desc: 'IISERs – BS/MS in Sciences.',
    difficulty: 'High',
    applicants: '25K+',
    successRate: '10%',
    examDate: 'Jun',
    eligibility: '12th with PCM/PCB, 60% marks',
    syllabus: 'Physics, Chemistry, Mathematics/Biology'
  },
  'NEST': {
    desc: 'NISER & UM-DAE CEBS – Science Research.',
    difficulty: 'High',
    applicants: '15K+',
    successRate: '12%',
    examDate: 'Jun',
    eligibility: '12th with PCM, 60% marks',
    syllabus: 'Physics, Chemistry, Mathematics'
  },
  'ISI Admission Test': {
    desc: 'Statistics, Mathematics, Computing.',
    difficulty: 'Very High',
    applicants: '8K+',
    successRate: '6%',
    examDate: 'May',
    eligibility: '12th with Mathematics',
    syllabus: 'Mathematics, Statistics, Reasoning'
  },

  // Law
  'CLAT': {
    desc: 'For National Law Universities.',
    difficulty: 'High',
    applicants: '60K+',
    successRate: '4%',
    examDate: 'Dec',
    eligibility: '12th pass with 45% marks',
    syllabus: 'English, GK, Legal Reasoning, Logical Reasoning, Mathematics'
  },
  'AILET': {
    desc: 'For NLUD Delhi.',
    difficulty: 'High',
    applicants: '25K+',
    successRate: '3%',
    examDate: 'Dec',
    eligibility: '12th pass with 50% marks',
    syllabus: 'English, GK, Legal Reasoning, Logical Reasoning, Mathematics'
  },
  'LSAT India': {
    desc: 'Private law schools admissions.',
    difficulty: 'Medium',
    applicants: '15K+',
    successRate: '25%',
    examDate: 'Multiple',
    eligibility: '12th pass from any stream',
    syllabus: 'Logical Reasoning, Reading Comprehension, Analytical Reasoning'
  },

  // Medical & Allied
  'NEET UG': {
    desc: 'For MBBS, BDS, BAMS, BHMS, Nursing.',
    difficulty: 'Very High',
    applicants: '18L+',
    successRate: '7%',
    examDate: 'May',
    eligibility: '12th with PCB, 50% marks',
    syllabus: 'Physics, Chemistry, Biology'
  },
  'AIIMS Nursing': {
    desc: 'Nursing admissions at AIIMS.',
    difficulty: 'High',
    applicants: '50K+',
    successRate: '5%',
    examDate: 'Jun',
    eligibility: '12th with PCB, 55% marks',
    syllabus: 'Physics, Chemistry, Biology, GK'
  },
  'JIPMER Nursing': {
    desc: 'JIPMER – Allied & Nursing programs.',
    difficulty: 'High',
    applicants: '30K+',
    successRate: '8%',
    examDate: 'Jun',
    eligibility: '12th with PCB, 50% marks',
    syllabus: 'Physics, Chemistry, Biology'
  },
};

const Entrance = () => {
  const [activeField, setActiveField] = useState(null);
  const [activeExam, setActiveExam] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fieldsExpanded, setFieldsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const toggleField = (field) => {
    setActiveExam(null);
    setActiveField(activeField === field ? null : field);
  };

  const toggleExam = (exam) => {
    setActiveExam(activeExam === exam ? null : exam);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFieldsInSidebar = () => {
    setFieldsExpanded(!fieldsExpanded);
  };

  const getFieldExams = (field) => {
    switch (field) {
      case 'Engineering National':
        return ['JEE Main & Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'];
      case 'Engineering State':
        return ['MHT CET', 'KCET', 'TS EAMCET'];
      case 'Computer Applications':
        return ['CUET UG', 'IPU CET', 'Christ Univ Test'];
      case 'Design & Animation':
        return ['UCEED', 'NID DAT'];
      case 'Science & Research':
        return ['IISER Aptitude Test', 'NEST', 'ISI Admission Test'];
      case 'Law':
        return ['CLAT', 'AILET', 'LSAT India'];
      case 'Medical & Allied':
        return ['NEET UG', 'AIIMS Nursing', 'JIPMER Nursing'];
      default:
        return [];
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Very High': return 'text-red-600';
      default: return 'text-green-600';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch(difficulty) {
      case 'Medium': return 'bg-yellow-100 border-yellow-300';
      case 'High': return 'bg-orange-100 border-orange-300';
      case 'Very High': return 'bg-red-100 border-red-300';
      default: return 'bg-green-100 border-green-300';
    }
  };

  // Get all exams for search functionality
  const allExams = Object.keys(examDetails);
  const filteredExams = allExams.filter(exam => {
    const matchesSearch = exam.toLowerCase().includes(search.toLowerCase()) ||
                         examDetails[exam].desc.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || examDetails[exam].difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = ['All', 'Medium', 'High', 'Very High'];
  const floatingElements = ["🎯", "📚", "⚙️", "💻", "🎨", "🔬", "⚖️", "🏥", "✨"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-3xl opacity-20 animate-bounce text-gray-400`}
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
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>

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
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/95 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">
                  Menu
                </h3>
              </div>

              {/* Entrance Fields Section */}
              <div className="mb-4">
                <button
                  onClick={toggleFieldsInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300 border border-gray-300"
                >
                  Entrance Fields {fieldsExpanded ? '▼' : '▶'}
                </button>
                
                <AnimatePresence>
                  {fieldsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-gray-50 rounded-md mt-2 border border-gray-200"
                    >
                      {entranceFields.map((field) => (
                        <motion.button
                          key={field.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleField(field.name)}
                          className={`w-full text-left py-2 px-4 text-sm font-medium rounded transition-colors duration-300 ${
                            activeField === field.name
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <span className="mr-2">{field.icon}</span>
                          {field.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/after10th/scholarship"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-100 hover:bg-cyan-200 text-cyan-700 text-center transition border border-cyan-300"
                >
                  🎓 Scholarships
                </Link>

                <Link
                  to="/after10th/diploma"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 text-center transition border border-purple-300"
                >
                  📜 Diploma Courses
                </Link>

                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-100 hover:bg-green-200 text-green-700 text-center transition border border-green-300"
                >
                  📚 Explore All Courses
                </Link>

                <Link
                  to="/after-10th"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-100 hover:bg-pink-200 text-pink-700 text-center transition border border-pink-300"
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
              <span className="animation-delay-0">🎯</span>
              <span className="animation-delay-200">📚</span>
              <span className="animation-delay-400">🚀</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Entrance Exams
          </h1>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search entrance exams..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              <div>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty} className="bg-white">{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeField && !search && difficultyFilter === 'All' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Enhanced Introduction */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-lg">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Entrance exams are the gateway to your dream career and top institutions. Whether you're aiming for prestigious engineering colleges, medical schools, or specialized programs, <span className="text-blue-600 font-semibold">EduAdvisor</span> provides comprehensive information about entrance exams across various fields. From exam patterns and eligibility criteria to preparation strategies and important dates, we help you navigate the complex landscape of competitive exams. With <span className="text-purple-600 font-semibold">EduAdvisor</span>, you can explore different exam options, understand their requirements, and make informed decisions about your academic future.
                  </p>
                </div>

                {/* Enhanced Field Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
                  {entranceFields.map((field, index) => (
                    <div
                      key={field.name}
                      onClick={() => toggleField(field.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${field.bg} rounded-3xl shadow-xl p-8 flex flex-col justify-between hover:rotate-1 hover:scale-105 transition-all duration-500 transform hover:shadow-blue-500/25 hover:shadow-2xl`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:animate-spin">
                        {field.particles.split('')[0]}
                      </div>
                      <div className="absolute top-8 right-8 text-lg opacity-40 group-hover:animate-bounce">
                        {field.particles.split('')[1]}
                      </div>
                      <div className="absolute top-12 right-12 text-sm opacity-30 group-hover:animate-pulse">
                        {field.particles.split('')[2]}
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-6xl mb-6 group-hover:animate-bounce">
                          {field.icon}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-yellow-100 transition-colors duration-300">
                          {field.name}
                        </h2>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/30 hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                          <span className="relative z-10">View Exams</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-500"></div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-700 text-sm">Entrance Exams</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">50L+</div>
                    <div className="text-gray-700 text-sm">Annual Applicants</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                    <div className="text-gray-700 text-sm">Top Colleges</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                    <div className="text-gray-700 text-sm">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results View */}
          {(search || difficultyFilter !== 'All') && !activeField && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {filteredExams.length} entrance exams
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer hover:border-gray-300"
                    onClick={() => setActiveExam(exam)}
                  >
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{exam}</h3>
                    <p className="text-gray-600 text-sm mb-3">{examDetails[exam].desc}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyBg(examDetails[exam].difficulty)} ${getDifficultyColor(examDetails[exam].difficulty)}`}>
                        {examDetails[exam].difficulty}
                      </span>
                      <span className="text-blue-600 font-semibold text-sm">{examDetails[exam].examDate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-500">Applicants: <span className="text-gray-800">{examDetails[exam].applicants}</span></div>
                      <div className="text-gray-500">Success: <span className="text-green-600">{examDetails[exam].successRate}</span></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredExams.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No exams found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse different fields</p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Exam Details */}
          {activeField && (
            <motion.section
              key={activeField}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {activeField}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {getFieldExams(activeField).map((exam) => (
                  <motion.div
                    key={exam}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-xl transition border border-gray-200"
                    onClick={() => toggleExam(exam)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg">{exam}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyBg(examDetails[exam]?.difficulty)} ${getDifficultyColor(examDetails[exam]?.difficulty)}`}>
                        {examDetails[exam]?.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{examDetails[exam]?.desc || 'Detailed information coming soon.'}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">{examDetails[exam]?.examDate}</span>
                      <span className="text-green-600">{examDetails[exam]?.successRate} success rate</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {activeExam && (
                <motion.div
                  key={activeExam}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-300 p-6 rounded-xl shadow-xl"
                >
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{activeExam}</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="mb-2"><strong className="text-blue-600">Description:</strong> {examDetails[activeExam]?.desc || 'Details are being updated.'}</p>
                      <p className="mb-2"><strong className="text-green-600">Exam Date:</strong> {examDetails[activeExam]?.examDate || 'Check official website'}</p>
                      <p className="mb-2"><strong className="text-purple-600">Difficulty:</strong> {examDetails[activeExam]?.difficulty || ''}</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-orange-600">Applicants:</strong> {examDetails[activeExam]?.applicants || 'Information not available yet.'}</p>
                      <p className="mb-2"><strong className="text-pink-600">Success Rate:</strong> {examDetails[activeExam]?.successRate || ''}</p>
                      <p className="mb-2"><strong className="text-cyan-600">Eligibility:</strong> {examDetails[activeExam]?.eligibility || ''}</p>
                    </div>
                  </div>
                  {examDetails[activeExam]?.syllabus && (
                    <div className="mt-4">
                      <p><strong className="text-yellow-600">Syllabus:</strong> {examDetails[activeExam].syllabus}</p>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveField(null)}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Fields
                </button>
              </div>
            </motion.section>
          )}

          {/* Preparation Tips */}
          {!activeField && !search && difficultyFilter === 'All' && (
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Preparation Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Study Strategy</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Start preparation early (1-2 years before exam)</li>
                    <li>• Create a structured study schedule</li>
                    <li>• Focus on understanding concepts, not memorization</li>
                    <li>• Practice previous year question papers</li>
                    <li>• Take regular mock tests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">Exam Strategy</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Understand the exam pattern thoroughly</li>
                    <li>• Manage time effectively during the exam</li>
                    <li>• Attempt easier questions first</li>
                    <li>• Avoid negative marking traps</li>
                    <li>• Stay calm and confident during the exam</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Exam Timeline */}
          {!activeField && !search && difficultyFilter === 'All' && (
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">📅 Exam Preparation Timeline</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Research", desc: "Identify target exams and colleges", icon: "🔍", time: "12-18 months before" },
                  { step: "2", title: "Foundation", desc: "Build strong conceptual base", icon: "📚", time: "8-12 months before" },
                  { step: "3", title: "Practice", desc: "Solve mock tests and previous papers", icon: "📝", time: "3-6 months before" },
                  { step: "4", title: "Revision", desc: "Final revision and exam strategy", icon: "🎯", time: "1-2 months before" }
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                      {item.step}
                    </div>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                    <p className="text-xs text-blue-600">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .animation-delay-4000 { animation-delay: 4000ms; }
      `}</style>
    </div>
  );
};

export default Entrance;