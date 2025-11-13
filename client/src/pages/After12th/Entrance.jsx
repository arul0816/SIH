import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Define entrance exam categories
const examCategories = [
  {
    name: 'Medical',
    icon: '🏥',
    bg: 'from-green-50 via-green-100 to-green-200',
    exams: ['NEET-UG', 'AIIMS Nursing', 'JIPMER Nursing']
  },
  {
    name: 'Engineering',
    icon: '⚙️',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MHT-CET', 'KCET', 'WBJEE']
  },
  {
    name: 'Science',
    icon: '🔬',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    exams: ['CUET-UG', 'IISER Aptitude Test', 'NEST', 'ISI Admission Test']
  },
  {
    name: 'Arts & Humanities',
    icon: '🎨',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    exams: ['CUET-UG', 'TISS BAT', 'BHU UET', 'JNU Entrance']
  },
  {
    name: 'Management',
    icon: '📊',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    exams: ['IPMAT', 'JIPMAT', 'NPAT', 'SET', 'CUET-UG']
  },
  {
    name: 'Hotel Management',
    icon: '🏨',
    bg: 'from-yellow-50 via-yellow-100 to-yellow-200',
    exams: ['NCHM JEE', 'IIHM eCHAT', 'Christ University Test']
  },
  {
    name: 'Law',
    icon: '⚖️',
    bg: 'from-red-50 via-red-100 to-red-200',
    exams: ['CLAT', 'AILET', 'LSAT India', 'MH CET Law']
  },
  {
    name: 'Design',
    icon: '🎨',
    bg: 'from-indigo-50 via-indigo-100 to-indigo-200',
    exams: ['UCEED', 'NID DAT', 'NIFT', 'CEED']
  },
  {
    name: 'Polytechnic',
    icon: '🛠️',
    bg: 'from-teal-50 via-teal-100 to-teal-200',
    exams: ['JEECUP', 'AP POLYCET', 'TS POLYCET', 'Delhi CET', 'JEXPO']
  }
];

// Exam details with links
const examDetails = {
  // Medical
  'NEET-UG': {
    fullName: 'National Eligibility cum Entrance Test',
    desc: 'For MBBS, BDS, AYUSH, Veterinary & Nursing',
    link: 'https://neet.nta.nic.in/',
    seats: '1.1L+ MBBS seats',
    difficulty: 'Very High'
  },
  'AIIMS Nursing': {
    fullName: 'AIIMS Nursing Entrance Exam',
    desc: 'B.Sc Nursing at AIIMS institutes',
    link: 'https://aiimsexams.ac.in/',
    seats: '3000+ seats',
    difficulty: 'High'
  },
  'JIPMER Nursing': {
    fullName: 'JIPMER Nursing Entrance',
    desc: 'Nursing programs at JIPMER',
    link: 'https://jipmer.edu.in/',
    seats: '200+ seats',
    difficulty: 'High'
  },

  // Engineering
  'JEE Main': {
    fullName: 'Joint Entrance Examination Main',
    desc: 'For NITs, IIITs, GFTIs & gateway to JEE Advanced',
    link: 'https://jeemain.nta.nic.in/',
    seats: '50K+ in NITs/IIITs',
    difficulty: 'High'
  },
  'JEE Advanced': {
    fullName: 'Joint Entrance Examination Advanced',
    desc: 'For admission to all IITs',
    link: 'https://jeeadv.ac.in/',
    seats: '17K+ IIT seats',
    difficulty: 'Very High'
  },
  'BITSAT': {
    fullName: 'BITS Admission Test',
    desc: 'For BITS Pilani campuses',
    link: 'https://www.bitsadmission.com/',
    seats: '2500+ seats',
    difficulty: 'High'
  },
  'VITEEE': {
    fullName: 'VIT Engineering Entrance Exam',
    desc: 'For VIT University campuses',
    link: 'https://viteee.vit.ac.in/',
    seats: '5000+ seats',
    difficulty: 'Medium'
  },
  'SRMJEEE': {
    fullName: 'SRM Joint Engineering Entrance Exam',
    desc: 'For SRM Institute of Science & Technology',
    link: 'https://www.srmist.edu.in/',
    seats: '7000+ seats',
    difficulty: 'Medium'
  },
  'MHT-CET': {
    fullName: 'Maharashtra Common Entrance Test',
    desc: 'For Maharashtra state engineering colleges',
    link: 'https://cetcell.mahacet.org/',
    seats: '1.5L+ seats',
    difficulty: 'Medium'
  },
  'KCET': {
    fullName: 'Karnataka Common Entrance Test',
    desc: 'For Karnataka engineering colleges',
    link: 'https://cetonline.karnataka.gov.in/kea/',
    seats: '70K+ seats',
    difficulty: 'Medium'
  },
  'WBJEE': {
    fullName: 'West Bengal Joint Entrance Exam',
    desc: 'For West Bengal engineering colleges',
    link: 'https://wbjeeb.nic.in/',
    seats: '35K+ seats',
    difficulty: 'Medium'
  },

  // Science
  'CUET-UG': {
    fullName: 'Common University Entrance Test',
    desc: 'For Central Universities - BA, BSc, BCom, BBA, BCA',
    link: 'https://cuet.samarth.ac.in/',
    seats: '2L+ across universities',
    difficulty: 'Medium'
  },
  'IISER Aptitude Test': {
    fullName: 'Indian Institute of Science Education & Research',
    desc: 'For BS-MS programs at IISERs',
    link: 'https://www.iiseradmission.in/',
    seats: '2000+ seats',
    difficulty: 'High'
  },
  'NEST': {
    fullName: 'National Entrance Screening Test',
    desc: 'For NISER & UM-DAE CEBS',
    link: 'https://www.nestexam.in/',
    seats: '300+ seats',
    difficulty: 'High'
  },
  'ISI Admission Test': {
    fullName: 'Indian Statistical Institute',
    desc: 'For Statistics, Mathematics programs',
    link: 'https://www.isical.ac.in/',
    seats: '500+ seats',
    difficulty: 'Very High'
  },

  // Management
  'IPMAT': {
    fullName: 'Integrated Program in Management Aptitude Test',
    desc: '5-year BBA+MBA at IIM Indore & Rohtak',
    link: 'https://www.iimidr.ac.in/',
    seats: '300+ seats',
    difficulty: 'High'
  },
  'JIPMAT': {
    fullName: 'Joint Integrated Program in Management',
    desc: 'For IIM Bodh Gaya & Jammu',
    link: 'https://jipmat.nta.ac.in/',
    seats: '240 seats',
    difficulty: 'High'
  },
  'NPAT': {
    fullName: 'NMIMS Programs After Twelfth',
    desc: 'For NMIMS Mumbai & other campuses',
    link: 'https://www.nmims.edu/',
    seats: '1000+ seats',
    difficulty: 'Medium'
  },

  // Hotel Management
  'NCHM JEE': {
    fullName: 'National Council for Hotel Management JEE',
    desc: 'For IHMs across India',
    link: 'https://nchmjee.nta.nic.in/',
    seats: '12K+ seats',
    difficulty: 'Medium'
  },

  // Law
  'CLAT': {
    fullName: 'Common Law Admission Test',
    desc: 'For National Law Universities',
    link: 'https://consortiumofnlus.ac.in/',
    seats: '3000+ seats',
    difficulty: 'High'
  },
  'AILET': {
    fullName: 'All India Law Entrance Test',
    desc: 'For National Law University Delhi',
    link: 'https://nludelhi.ac.in/',
    seats: '120 seats',
    difficulty: 'High'
  },

  // Design
  'UCEED': {
    fullName: 'Undergraduate Common Entrance Exam for Design',
    desc: 'B.Des at IITs & IIITDM',
    link: 'http://www.uceed.iitb.ac.in/',
    seats: '300+ seats',
    difficulty: 'Very High'
  },
  'NID DAT': {
    fullName: 'National Institute of Design Admission Test',
    desc: 'For NID campuses',
    link: 'https://admissions.nid.edu/',
    seats: '400+ seats',
    difficulty: 'High'
  },
  'NIFT': {
    fullName: 'National Institute of Fashion Technology',
    desc: 'Fashion & Design programs',
    link: 'https://nift.ac.in/',
    seats: '3500+ seats',
    difficulty: 'High'
  },

  // Polytechnic
  'JEECUP': {
    fullName: 'Joint Entrance Exam Council UP',
    desc: 'UP Polytechnic admissions',
    link: 'https://jeecup.admissions.nic.in/',
    seats: '2L+ seats',
    difficulty: 'Easy'
  },
  'AP POLYCET': {
    fullName: 'Andhra Pradesh Polytechnic CET',
    desc: 'AP Polytechnic diploma courses',
    link: 'https://polycetap.nic.in/',
    seats: '50K+ seats',
    difficulty: 'Easy'
  }
};

const Entrance12= () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCategoriesInSidebar = () => {
    setCategoriesExpanded(!categoriesExpanded);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCategoriesExpanded(false);
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExam(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const floatingElements = ['📚', '🎓', '💡', '🔬', '💻', '🏥', '⚖️', '🎨'];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-4xl opacity-5 animate-bounce`}
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

      {/* Light Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-gradient-to-r from-blue-100 to-blue-200 ml-8 mt-6 text-gray-800 p-3 rounded-lg shadow-lg hover:from-blue-200 hover:to-blue-300 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-gray-800"></span>
          <span className="block h-0.5 bg-gray-800"></span>
          <span className="block h-0.5 bg-gray-800"></span>
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
                        className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">Menu</h3>
              </div>

              {/* Exam Categories Section */}
              <div className="mb-4">
                <button
                  onClick={toggleCategoriesInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-colors duration-300 border border-blue-200"
                >
                  Exam Categories {categoriesExpanded ? '▼' : '▶'}
                </button>

                <AnimatePresence>
                  {categoriesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white rounded-md mt-2 border border-gray-200"
                    >
                      {examCategories.map((category, index) => (
                        <motion.button
                          key={category.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategoryClick(category.name)}
                          className={`w-full text-left py-2 px-4 text-sm font-medium rounded transition-all duration-300 ${
                            activeCategory === category.name
                              ? `bg-gradient-to-r ${category.bg} text-gray-800 shadow-md`
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
             
              

              <Link
                to="/after12th/scholarship12"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-gray-800 text-center transition border border-purple-200"
              >
                🎓 Scholarships
              </Link>

              <Link
                to="/"
                className="block w-full py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 text-gray-800 text-center transition border border-pink-200"
              >
                🏠 Back to Home
              </Link>
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

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Entrance Exams After 12th
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your gateway to top colleges and universities across India
          </p>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {/* Default View - Category Cards */}
            {!activeCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Exam Category</h2>
                  <p className="text-gray-600">Select a category to explore entrance exams</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {examCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`cursor-pointer bg-gradient-to-br ${category.bg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 relative overflow-hidden group`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

                      <div className="relative z-10">
                        <div className="text-5xl mb-4">{category.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                        <p className="text-gray-700 font-medium">{category.exams.length} Major Exams</p>

                        <div className="mt-6 flex items-center text-gray-700">
                          <span className="text-sm font-semibold">View Exams</span>
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category View - Exam Cards */}
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="mb-4 text-gray-600 hover:text-gray-800 flex items-center transition"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Categories
                  </button>
                  
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    {examCategories.find(c => c.name === activeCategory)?.icon} {activeCategory} Entrance Exams
                  </h2>
                  <p className="text-gray-600">
                    Click on any exam to view details
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {examCategories
                    .find(c => c.name === activeCategory)
                    ?.exams.map((exam, index) => (
                      <motion.div
                        key={exam}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleExamClick(exam)}
                        className={`cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden group`}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{exam}</h3>
                          
                          {examDetails[exam] && (
                            <>
                              <p className="text-sm text-gray-600 mb-3">{examDetails[exam].desc}</p>
                              <div className="flex justify-between items-center">
                                <span className={`text-sm font-semibold ${getDifficultyColor(examDetails[exam].difficulty)}`}>
                                  {examDetails[exam].difficulty}
                                </span>
                                <svg className="w-5 h-5 text-gray-700 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Exam Details Modal */}
      <AnimatePresence>
        {showModal && selectedExam && examDetails[selectedExam] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedExam}</h2>
                <p className="text-gray-600">{examDetails[selectedExam].fullName}</p>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">About the Exam</h3>
                    <p className="text-gray-600">{examDetails[selectedExam].desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Available Seats</h4>
                      <p className="text-gray-600">{examDetails[selectedExam].seats}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Difficulty Level</h4>
                      <p className={`font-semibold ${getDifficultyColor(examDetails[selectedExam].difficulty)}`}>
                        {examDetails[selectedExam].difficulty}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href={examDetails[selectedExam].link}
                      target="_blank"
                      rel="noopener noreferrer"
                                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition"
                    >
                      Visit Official Website →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Entrance12;