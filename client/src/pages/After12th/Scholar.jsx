import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const scholarshipTypes = [
  {
    name: 'Government Scholarships',
    icon: '🏛️',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    particles: '🏛️📜💰'
  },
  {
    name: 'Private Scholarships',
    icon: '🏢',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    particles: '🏢💼🌟'
  },
  {
    name: 'Merit Based',
    icon: '🎯',
    bg: 'from-green-50 via-green-100 to-green-200',
    particles: '🎯📊⭐'
  },
  {
    name: 'Need Based',
    icon: '🤝',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    particles: '🤝💝🏠'
  },
  {
    name: 'Field Specific',
    icon: '🔬',
    bg: 'from-indigo-50 via-indigo-100 to-indigo-200',
    particles: '🔬🎨🏥'
  },
  {
    name: 'Sports & Talent',
    icon: '🏆',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    particles: '🏆🎭🎨'
  },
];

const scholarshipDetails = {
  // Government Scholarships
  'PM-USP/CSSS': {
    amount: '₹10,000-₹20,000 per year',
    eligibility: '12th pass, top 20% in board, family income < ₹4.5L PA',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Annual scholarship, DBT transfer, UG/PG support'
  },
  'PMSSS (J&K/Ladakh)': {
    amount: 'Tuition + ₹1L maintenance/year',
    eligibility: 'J&K/Ladakh domicile, 12th pass, income < ₹8L PA',
    lastDate: '30-Jun-2025',
    applyLink: 'https://aicte-india.org/pmsss',
    benefits: 'Full tuition, Living allowance, Outside state admission'
  },
  'Post-Matric SC/ST': {
    amount: '₹230-₹1,200/month + Fees',
    eligibility: 'SC/ST category, 12th pass, income < ₹2.5L PA',
    lastDate: '30-Sep-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Maintenance allowance, Fee reimbursement, Study material'
  },
  'Minority Scholarships': {
    amount: 'Up to ₹20,000 per year',
    eligibility: 'Minority community, 50%+ marks, income < ₹2L PA',
    lastDate: '15-Nov-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Tuition support, Maintenance allowance, Professional courses'
  },

  // Private Scholarships
  'Tata Endowment': {
    amount: 'Loan-cum-scholarship up to ₹10 Lakh',
    eligibility: 'Postgraduate abroad, merit-based selection',
    lastDate: '31-Mar-2025',
    applyLink: 'https://www.jntataendowment.org',
    benefits: 'Full funding, Travel allowance, Living expenses abroad'
  },
  'Aditya Birla Scholarship': {
    amount: '₹60,000-₹1,80,000/year',
    eligibility: 'Top institutes (IIT/IIM/XLRI), merit & leadership',
    lastDate: '30-Jun-2025',
    applyLink: 'https://www.adityabirlascholars.net',
    benefits: 'Scholarship, Leadership training, Alumni network'
  },
  'Reliance Foundation': {
    amount: 'Up to ₹2,00,000/year',
    eligibility: 'UG/PG students, merit-based, need-based',
    lastDate: '28-Feb-2025',
    applyLink: 'https://reliancefoundation.org',
    benefits: 'Full scholarship, Mentorship, Internship opportunities'
  },

  // Merit Based
  'INSPIRE Scholarship': {
    amount: '₹80,000/year for 5 years',
    eligibility: 'Top 1% in 12th/JEE/NEET, Natural Sciences',
    lastDate: '31-Aug-2025',
    applyLink: 'https://online-inspire.gov.in',
    benefits: 'Annual scholarship, Research opportunities, Mentorship'
  },
  'KVPY Fellowship': {
    amount: 'Monthly ₹5,000-₹7,000 + Contingency',
    eligibility: 'Science stream, 75%+ in 12th, KVPY qualified',
    lastDate: '31-Aug-2025',
    applyLink: 'https://kvpy.iisc.ac.in/',
    benefits: 'Monthly stipend, Research exposure, IISc connection'
  },
  'NTSE Scholarship': {
    amount: '₹1,250-₹2,000/month',
    eligibility: 'NTSE qualified, continuing education',
    lastDate: 'Automatic for qualified',
    applyLink: 'https://ncert.nic.in/ntse',
    benefits: 'Monthly stipend till PhD, All-India recognition'
  },

  // Need Based
  'EWS Scholarship': {
    amount: 'Full fee waiver + stipend',
    eligibility: 'EWS certificate, 60%+ marks, income < ₹8L PA',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Fee waiver, Monthly stipend, Book allowance'
  },
  'Single Girl Child': {
    amount: '₹30,000/year',
    eligibility: 'Single girl child, PG studies, merit-based',
    lastDate: '30-Sep-2025',
    applyLink: 'https://ugc.ac.in/',
    benefits: 'Annual scholarship, PG support, Women empowerment'
  },

  // Field Specific
  'AICTE Pragati': {
    amount: '₹50,000/year',
    eligibility: 'Girl students, Technical education, income < ₹8L PA',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Tuition support, Incidentals, Women in STEM'
  },
  'ICAR Scholarship': {
    amount: '₹2,000/month',
    eligibility: 'ICAR AIEEA qualified, Agriculture/Allied courses',
    lastDate: 'Automatic for qualified',
    applyLink: 'https://icar.nta.nic.in/',
    benefits: 'Monthly stipend, Agriculture education support'
  },
  'Medical Scholarships': {
    amount: '₹25,000-₹75,000/year',
    eligibility: 'MBBS/BDS students, merit + need based',
    lastDate: 'Various deadlines',
    applyLink: 'Various portals',
    benefits: 'Tuition support, Medical education assistance'
  },

  // Sports & Talent
  'DGYSSJK Sports': {
    amount: 'Varies by achievement level',
    eligibility: 'J&K domicile, National/State level medals',
    lastDate: 'After competition',
    applyLink: 'https://dgyssjk.jk.gov.in/',
    benefits: 'Cash awards, Monthly stipend, Sports quota'
  },
  'Khelo India': {
    amount: 'Comprehensive support package',
    eligibility: 'Selected through talent ID, age-group athletes',
    lastDate: 'Through trials/camps',
    applyLink: 'https://kheloindia.gov.in/',
    benefits: 'Training, Equipment, Competition support, Stipend'
  },
  'Cultural Talent': {
    amount: '₹2,000/month',
    eligibility: 'Cultural talents, age 10-14, talent test',
    lastDate: '30-Sep-2025',
    applyLink: 'https://ccrtindia.gov.in/',
    benefits: 'Monthly stipend, Training, Performance opportunities'
  },
};

const Scholarship = () => {
  const [activeType, setActiveType] = useState(null);
  const [activeScholarship, setActiveScholarship] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typesExpanded, setTypesExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const toggleType = (type) => {
    setActiveScholarship(null);
    setActiveType(activeType === type ? null : type);
  };

  const toggleScholarship = (scholarship) => {
    setActiveScholarship(activeScholarship === scholarship ? null : scholarship);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTypesInSidebar = () => {
    setTypesExpanded(!typesExpanded);
  };

  const getTypeScholarships = (type) => {
    switch (type) {
      case 'Government Scholarships':
        return ['PM-USP/CSSS', 'PMSSS (J&K/Ladakh)', 'Post-Matric SC/ST', 'Minority Scholarships'];
      case 'Private Scholarships':
        return ['Tata Endowment', 'Aditya Birla Scholarship', 'Reliance Foundation'];
      case 'Merit Based':
        return ['INSPIRE Scholarship', 'KVPY Fellowship', 'NTSE Scholarship'];
      case 'Need Based':
        return ['EWS Scholarship', 'Single Girl Child'];
      case 'Field Specific':
        return ['AICTE Pragati', 'ICAR Scholarship', 'Medical Scholarships'];
      case 'Sports & Talent':
        return ['DGYSSJK Sports', 'Khelo India', 'Cultural Talent'];
      default:
        return [];
    }
  };

  const categories = ['All', 'Government', 'Private', 'Merit', 'Need', 'Field', 'Sports'];

  const floatingElements = ["💰", "🎓", "📚", "🏆", "✨", "🌟", "⚡", "💎", "🎯"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-3xl opacity-20 animate-bounce`}
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
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

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
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/80 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">
                  Menu
                </h3>
              </div>

              {/* Scholarship Types Section */}
              <div className="mb-4">
                <button
                  onClick={toggleTypesInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300 backdrop-blur-sm border border-gray-300"
                >
                  Scholarship Types {typesExpanded ? '▼' : '▶'}
                </button>
                
                <AnimatePresence>
                  {typesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-gray-50 backdrop-blur-sm rounded-md mt-2 border border-gray-200"
                    >
                      {scholarshipTypes.map((type) => (
                        <motion.button
                          key={type.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                                                    onClick={() => toggleType(type.name)}
                          className={`w-full text-left py-2 px-4 text-sm font-medium rounded transition-colors duration-300 ${
                            activeType === type.name
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <span className="mr-2">{type.icon}</span>
                          {type.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/after12th/entrance12"
                  className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 text-center transition backdrop-blur-sm border border-blue-300"
                >
                  🎯 Entrance Exams
                </Link>

               

                

                <Link
                  to="/after-12th"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-100 hover:bg-pink-200 text-pink-700 text-center transition backdrop-blur-sm border border-pink-300"
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
              <span className="animation-delay-0">💰</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">✨</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Scholarships After 12th
          </h1>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search scholarships..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeType && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Enhanced Introduction */}
                <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-lg">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    After completing 12th standard, numerous scholarship opportunities await to support your higher education journey. Whether you're pursuing engineering, medicine, arts, or any other field, <span className="text-blue-600 font-semibold">EduAdvisor</span> helps you discover scholarships tailored to your profile. From government schemes like PM-USP and PMSSS to private foundations offering substantial support, we provide comprehensive information about eligibility, benefits, and application processes. With <span className="text-purple-600 font-semibold">EduAdvisor</span>, explore merit-based awards, need-based assistance, field-specific scholarships, and special schemes for J&K students to make your educational dreams affordable.
                  </p>
                </div>

                {/* Enhanced Scholarship Type Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
                  {scholarshipTypes.map((type, index) => (
                    <div
                      key={type.name}
                      onClick={() => toggleType(type.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${type.bg} rounded-3xl shadow-xl p-8 flex flex-col justify-between hover:rotate-1 hover:scale-105 transition-all duration-500 transform hover:shadow-2xl`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/40 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:animate-spin">
                        {type.particles.split('')[0]}
                      </div>
                      <div className="absolute top-8 right-8 text-lg opacity-40 group-hover:animate-bounce">
                        {type.particles.split('')[1]}
                      </div>
                      <div className="absolute top-12 right-12 text-sm opacity-30 group-hover:animate-pulse">
                        {type.particles.split('')[2]}
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-6xl mb-6 group-hover:animate-bounce">
                          {type.icon}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                          {type.name}
                        </h2>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/50 backdrop-blur-sm text-gray-800 font-bold py-3 px-8 rounded-full border border-gray-400 hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                          <span className="relative z-10">View Scholarships</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500"></div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">₹1000Cr+</div>
                    <div className="text-gray-600 text-sm">Total Funding Available</div>
                  </div>
                  <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">5L+</div>
                    <div className="text-gray-600 text-sm">Students Benefited</div>
                  </div>
                  <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                    <div className="text-gray-600 text-sm">Active Scholarships</div>
                  </div>
                  <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                    <div className="text-gray-600 text-sm">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Scholarship Details */}
          {activeType && (
            <motion.section
              key={activeType}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 shadow-xl"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {activeType}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {getTypeScholarships(activeType).map((scholarship) => (
                  <motion.div
                    key={scholarship}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition border border-gray-200"
                    onClick={() => toggleScholarship(scholarship)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{scholarship}</h3>
                    <div className="text-green-600 font-bold mb-2">
                      {scholarshipDetails[scholarship]?.amount || 'Amount details coming soon.'}
                    </div>
                    <p className="text-gray-600 text-sm">{scholarshipDetails[scholarship]?.eligibility || 'Detailed information coming soon.'}</p>
                  </motion.div>
                ))}
              </div>

              {activeScholarship && (
                <motion.div
                  key={activeScholarship}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm border border-gray-300 p-6 rounded-xl shadow-xl"
                >
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{activeScholarship}</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong className="text-green-600">Amount:</strong> {scholarshipDetails[activeScholarship]?.amount || 'Details are being updated.'}</p>
                    <p><strong className="text-blue-600">Eligibility:</strong> {scholarshipDetails[activeScholarship]?.eligibility || 'Information not available yet.'}</p>
                    <p><strong className="text-purple-600">Last Date:</strong> {scholarshipDetails[activeScholarship]?.lastDate || 'Check official website'}</p>
                    <p><strong className="text-orange-600">Benefits:</strong> {scholarshipDetails[activeScholarship]?.benefits || ''}</p>
                    {scholarshipDetails[activeScholarship]?.applyLink && (
                      <div className="mt-4">
                        <a
                          href={scholarshipDetails[activeScholarship].applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                        >
                          Apply Now →
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveType(null)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Types
                </button>
              </div>
            </motion.section>
          )}

          {/* Application Tips */}
          {!activeType && (
            <div className="mt-16 backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Application Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Before Applying</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Check eligibility criteria thoroughly</li>
                    <li>• Prepare all documents in advance</li>
                    <li>• Note application deadlines carefully</li>
                    <li>• Get income & category certificates ready</li>
                    <li>• Create NSP account early</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">During Application</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Apply to multiple eligible scholarships</li>
                    <li>• Double-check all information</li>
                    <li>• Keep application IDs safe</li>
                    <li>• Follow up with institute verification</li>
                    <li>• Track application status regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Application Timeline */}
          {!activeType && (
            <div className="mt-16 backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">📅 Application Timeline</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Research", desc: "Find suitable scholarships", icon: "🔍", time: "May-June" },
                  { step: "2", title: "Prepare", desc: "Gather documents", icon: "📋", time: "July-August" },
                  { step: "3", title: "Apply", desc: "Submit applications", icon: "📤", time: "Sept-Oct" },
                  { step: "4", title: "Follow Up", desc: "Track & verify", icon: "📞", time: "Nov onwards" }
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 border border-gray-200">
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

          {/* Important Documents Checklist */}
          {!activeType && (
            <div className="mt-16 backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📂 Documents Checklist</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-600 mb-3">Essential Documents</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ 10th & 12th Marksheets</li>
                    <li>✓ Domicile Certificate (J&K)</li>
                    <li>✓ Income Certificate</li>
                    <li>✓ Aadhaar Card</li>
                    <li>✓ Bank Account (Aadhaar linked)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3">Category Specific</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ Category Certificate (SC/ST/OBC)</li>
                    <li>✓ EWS Certificate (if applicable)</li>
                    <li>✓ Minority Certificate</li>
                    <li>✓ Disability Certificate (if applicable)</li>
                    <li>✓ Sports/Cultural Certificates</li>
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

export default Scholarship;