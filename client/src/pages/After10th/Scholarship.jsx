import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const scholarshipTypes = [
  {
    name: 'Government Scholarships',
    icon: '🏛️',
    bg: 'from-blue-500 via-blue-600 to-blue-700',
    particles: '🏛️📜💰'
  },
  {
    name: 'Private Scholarships',
    icon: '🏢',
    bg: 'from-purple-500 via-purple-600 to-purple-700',
    particles: '🏢💼🌟'
  },
  {
    name: 'Merit Based',
    icon: '🎯',
    bg: 'from-green-500 via-green-600 to-green-700',
    particles: '🎯📊⭐'
  },
  {
    name: 'Need Based',
    icon: '🤝',
    bg: 'from-orange-500 via-orange-600 to-orange-700',
    particles: '🤝💝🏠'
  },
  {
    name: 'Minority Scholarships',
    icon: '🌍',
    bg: 'from-teal-500 via-teal-600 to-teal-700',
    particles: '🌍🤲🕊️'
  },
  {
    name: 'Sports & Arts',
    icon: '🎨',
    bg: 'from-pink-500 via-pink-600 to-pink-700',
    particles: '🎨🏆🎭'
  },
];

const scholarshipDetails = {
  // Government Scholarships
  'Central Sector Scheme': {
    amount: '₹10,000–₹20,000 per year',
    eligibility: '10th pass, 12th pass, min 80% marks, family income < ₹8L PA',
    lastDate: '31-Jul-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Annual stipend, Fee reimbursement, Book allowance'
  },
  'NMMS Scholarship': {
    amount: '₹12,000 per year',
    eligibility: '8th pass, min 55% marks, family income < ₹3.5L PA',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Monthly stipend, Study material, Exam fee waiver'
  },
  'KVPY Fellowship': {
    amount: 'Monthly stipend up to ₹10,000',
    eligibility: '11th, 12th, UG, min 75% marks (science stream)',
    lastDate: '31-Aug-2025',
    applyLink: 'https://kvpy.iisc.ac.in/',
    benefits: 'Monthly stipend, Research opportunities, Mentorship'
  },
  'PM YASASVI': {
    amount: 'Up to ₹75,000 per year',
    eligibility: '9th to PG, OBC/EBC/DNT, family income < ₹2.5L PA',
    lastDate: '10-Oct-2025',
    applyLink: 'https://yasasvi.nic.in/',
    benefits: 'Full scholarship, Living allowance, Book allowance'
  },

  // Private Scholarships
  'Tata Endowment': {
    amount: 'Loan-cum-scholarship up to ₹10 Lakh',
    eligibility: 'Postgraduate abroad (merit-based)',
    lastDate: '31-Mar-2025',
    applyLink: 'https://www.jntataendowment.org',
    benefits: 'Full funding, Travel allowance, Living expenses'
  },
  'Aditya Birla Scholarship': {
    amount: 'Approx. ₹60,000/year',
    eligibility: 'Based on merit & leadership',
    lastDate: '30-Jun-2025',
    applyLink: 'https://www.adityabirlascholars.net',
    benefits: 'Scholarship amount, Leadership training, Network access'
  },
  'Vidyadhan Scholarship': {
    amount: '₹6,000–₹10,000/year',
    eligibility: 'Class 10 passed with ≥85% (SC/ST 75%)',
    lastDate: '31-Dec-2025',
    applyLink: 'https://www.vidyadhan.org',
    benefits: 'Educational support, Career guidance, Skill development'
  },

  // Merit Based
  'Inspire Scholarship': {
    amount: '₹80,000/year',
    eligibility: 'Top 1% in Class 12 / JEE / KVPY',
    lastDate: '31-Aug-2025',
    applyLink: 'https://online-inspire.gov.in',
    benefits: 'Annual scholarship, Research opportunities, Mentorship'
  },
  'Kishore Vaigyanik': {
    amount: 'Monthly stipend up to ₹7,000',
    eligibility: 'Class 11, 12 science students with 75%+',
    lastDate: '15-Sep-2025',
    applyLink: 'https://kvpy.iisc.ac.in/',
    benefits: 'Monthly stipend, Research exposure, IISc connection'
  },

  // Need Based
  'Post Matric SC/ST': {
    amount: '₹230–₹1,200/month + Fee',
    eligibility: 'SC/ST students, Class 10 passed',
    lastDate: '30-Sep-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Tuition fee, Maintenance allowance, Study material'
  },
  'Minority Scholarship': {
    amount: 'Up to ₹35,000 per year',
    eligibility: 'Minority community, 10th pass, family income < ₹2L PA',
    lastDate: '15-Nov-2025',
    applyLink: 'https://min.gov.in/',
    benefits: 'Tuition fee, Maintenance allowance, Study material'
  },

  // Minority Scholarships
  'Maulana Azad Fellowship': {
    amount: '₹25,000/month + Contingency',
    eligibility: 'Minority students for research',
    lastDate: '31-Dec-2025',
    applyLink: 'https://ugc.ac.in/',
    benefits: 'Monthly fellowship, Research grant, HRA'
  },
  'Begum Hazrat Scholarship': {
    amount: '₹10,000/year',
    eligibility: 'Muslim girl students, Class 9-12',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Annual scholarship, Educational support'
  },

  // Sports & Arts
  'Pragati Scholarship Girls': {
    amount: '₹30,000 per year',
    eligibility: 'Girls, technical education, family income < ₹8L PA',
    lastDate: '31-Oct-2025',
    applyLink: 'https://scholarships.gov.in/',
    benefits: 'Educational support, Career guidance, Skill development'
  },
  'Cultural Talent Search': {
    amount: '₹2,000/month',
    eligibility: 'Students with cultural talents, age 10-14',
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
        return ['Central Sector Scheme', 'NMMS Scholarship', 'KVPY Fellowship', 'PM YASASVI'];
      case 'Private Scholarships':
        return ['Tata Endowment', 'Aditya Birla Scholarship', 'Vidyadhan Scholarship'];
      case 'Merit Based':
        return ['Inspire Scholarship', 'Kishore Vaigyanik'];
      case 'Need Based':
        return ['Post Matric SC/ST', 'Minority Scholarship'];
      case 'Minority Scholarships':
        return ['Maulana Azad Fellowship', 'Begum Hazrat Scholarship'];
      case 'Sports & Arts':
        return ['Pragati Scholarship Girls', 'Cultural Talent Search'];
      default:
        return [];
    }
  };

  const categories = ['All', 'Government', 'Private', 'Merit', 'Need', 'Minority', 'Sports'];

  const floatingElements = ["💰", "🎓", "📚", "🏆", "✨", "🌟", "⚡", "💎", "🎯"];

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

              {/* Scholarship Types Section */}
              <div className="mb-4">
                <button
                  onClick={toggleTypesInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300 border border-gray-300"
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
                      className="overflow-hidden bg-gray-50 rounded-md mt-2 border border-gray-200"
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
                  to="/after10th/entrance"
                  className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 text-center transition border border-blue-300"
                >
                  🎯 Entrance Exams
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
              <span className="animation-delay-0">💰</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">✨</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Scholarships
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white">{cat}</option>
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
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-lg">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Finding the right scholarship can make your educational dreams affordable and achievable. Whether you're looking for merit-based awards, need-based assistance, or specialized funding for your field of study, <span className="text-blue-600 font-semibold">EduAdvisor</span> helps you discover opportunities that match your profile. From government schemes to private foundations, we provide comprehensive information about eligibility criteria, application deadlines, and benefits. With <span className="text-purple-600 font-semibold">EduAdvisor</span>, you can explore various scholarship categories, understand application processes, and take the first step towards funding your education.
                  </p>
                </div>

                {/* Enhanced Scholarship Type Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
                  {scholarshipTypes.map((type, index) => (
                    <div
                      key={type.name}
                      onClick={() => toggleType(type.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${type.bg} rounded-3xl shadow-xl p-8 flex flex-col justify-between hover:rotate-1 hover:scale-105 transition-all duration-500 transform hover:shadow-blue-500/25 hover:shadow-2xl`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

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
                        <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-yellow-100 transition-colors duration-300">
                          {type.name}
                        </h2>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/30 hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                          <span className="relative z-10">View Scholarships</span>
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">₹500Cr+</div>
                    <div className="text-gray-700 text-sm">Total Funding Available</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">1L+</div>
                    <div className="text-gray-700 text-sm">Students Benefited</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-gray-700 text-sm">Active Scholarships</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                    <div className="text-gray-700 text-sm">Success Rate</div>
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
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg"
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
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-xl transition border border-gray-200"
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
                  className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-300 p-6 rounded-xl shadow-xl"
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
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Types
                </button>
              </div>
            </motion.section>
          )}

          {/* Application Tips */}
          {!activeType && (
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Application Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Before Applying</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Research eligibility criteria thoroughly</li>
                    <li>• Gather all required documents in advance</li>
                    <li>• Check application deadlines carefully</li>
                    <li>• Prepare compelling personal statements</li>
                    <li>• Get recommendation letters ready</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">During Application</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Apply early to avoid last-minute rush</li>
                    <li>• Double-check all information before submitting</li>
                    <li>• Keep copies of all submitted documents</li>
                    <li>• Follow up on application status regularly</li>
                    <li>• Apply to multiple scholarships to increase chances</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Application Timeline */}
          {!activeType && (
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">📅 Application Timeline</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Research", desc: "Find suitable scholarships", icon: "🔍", time: "3-6 months before" },
                  { step: "2", title: "Prepare", desc: "Gather documents & essays", icon: "📋", time: "2-3 months before" },
                  { step: "3", title: "Apply", desc: "Submit applications", icon: "📤", time: "1-2 months before" },
                  { step: "4", title: "Follow Up", desc: "Track application status", icon: "📞", time: "After submission" }
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

export default Scholarship;