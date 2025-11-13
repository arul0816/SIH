import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const diplomaFields = [
  {
    name: 'Engineering',
    icon: '⚙️',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    particles: '⚙️🔧🏗️'
  },
  {
    name: 'Medical',
    icon: '🏥',
    bg: 'from-green-50 via-green-100 to-green-200',
    particles: '🏥💊🩺'
  },
  {
    name: 'Education',
    icon: '🎓',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    particles: '🎓📚✏️'
  },
];

const diplomaDetails = {
  // Engineering
  'Civil Engineering': {
    desc: 'Focuses on designing, construction, and maintenance of buildings, roads, bridges, dams.',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass (CBSE/JKBOSE), Min 35-50% marks',
    skills: 'Surveying, AutoCAD, Construction Technology, Project Management',
    advantages: 'High demand in infrastructure, Early job entry, B.Tech lateral entry'
  },
  'Mechanical Engineering': {
    desc: 'Focuses on designing, manufacturing, operation, and maintenance of machines and engines.',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass (CBSE/JKBOSE), Min 35-50% marks',
    skills: 'Machine design, Manufacturing, CAD/CAM, Workshop skills',
    advantages: 'Diverse industries, Hands-on learning, B.Tech lateral entry'
  },
  'Electrical Engineering': {
    desc: 'Focuses on generation, transmission, distribution, and maintenance of electrical systems.',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass (CBSE/JKBOSE), Min 35-50% marks',
    skills: 'Circuit design, Power systems, Control systems, Safety practices',
    advantages: 'High demand in power sector, Automation opportunities, Government jobs'
  },
  'Electronics Engineering': {
    desc: 'Focuses on design, installation, and maintenance of electronic and communication systems.',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass (CBSE/JKBOSE), Min 35-50% marks',
    skills: 'Circuit design, Embedded systems, Communication systems, PCB design',
    advantages: 'IT industry opportunities, IoT and robotics, Telecom sector'
  },
  'Computer Science': {
    desc: 'Focuses on computer systems, software development, networking, and IT infrastructure.',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass (CBSE/JKBOSE), Min 35-50% marks',
    skills: 'Programming, Database management, Web development, Networking',
    advantages: 'High demand in IT, Remote work opportunities, Start-up potential'
  },

  // Medical
  'Lab Assistant': {
    desc: 'Training to work in medical laboratories assisting pathologists and doctors.',
    duration: '1-2 years',
    eligibility: '10th pass, Science background preferred',
    skills: 'Sample collection, Microscopy, Lab testing, Report preparation',
    advantages: 'Short duration, High demand in hospitals, Healthcare sector growth'
  },
  'X-Ray Assistant': {
    desc: 'Training to operate radiology equipment and assist radiologists.',
    duration: '1-2 years',
    eligibility: '10th pass, Science background preferred',
    skills: 'X-Ray operation, Patient positioning, Radiation safety, Image processing',
    advantages: 'Specialized skill, Hospital demand, Diagnostic center opportunities'
  },
  'Pharmacy Assistant': {
    desc: 'Assisting pharmacists and medical staff in dispensing medicines.',
    duration: '1-2 years',
    eligibility: '10th pass, Science background preferred',
    skills: 'Medicine handling, Inventory management, Drug dosage, Patient guidance',
    advantages: 'Healthcare field entry, Pharmacy chains, Hospital opportunities'
  },

  // Education
  'D.Ed': {
    desc: 'Focuses on teaching skills, pedagogy, and classroom management for primary education.',
    duration: '2 years (4 semesters)',
    eligibility: '10+2 pass, Min 50% marks',
    skills: 'Teaching methodology, Child psychology, Classroom management, Educational technology',
    advantages: 'Government teacher jobs, Private school opportunities, B.Ed eligibility'
  },
  'ETT': {
    desc: 'Training to become elementary-level teachers for classes 1-5.',
    duration: '1 year (full-time)',
    eligibility: '10th or 12th pass, Min 50% marks',
    skills: 'Activity-based teaching, Child engagement, Lesson planning, Assessment',
    advantages: 'Quick entry into teaching, Primary school demand, Foundation for higher studies'
  },
  'Physical Education': {
    desc: 'Training for physical education teaching and sports coaching.',
    duration: '2 years (B.P.Ed)',
    eligibility: 'Graduation with 45% marks, PE as subject',
    skills: 'Sports coaching, Fitness training, Sports science, Health education',
    advantages: 'School PE teacher, Sports academies, Fitness industry'
  },
};

const Diploma = () => {
  const [activeField, setActiveField] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fieldsExpanded, setFieldsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [durationFilter, setDurationFilter] = useState('All');

  const toggleField = (field) => {
    setActiveCourse(null);
    setActiveField(activeField === field ? null : field);
  };

  const toggleCourse = (course) => {
    setActiveCourse(activeCourse === course ? null : course);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFieldsInSidebar = () => {
    setFieldsExpanded(!fieldsExpanded);
  };

  const getFieldCourses = (field) => {
    switch (field) {
      case 'Engineering':
        return ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics Engineering', 'Computer Science'];
      case 'Medical':
        return ['Lab Assistant', 'X-Ray Assistant', 'Pharmacy Assistant'];
      case 'Education':
        return ['D.Ed', 'ETT', 'Physical Education'];
      default:
        return [];
    }
  };

  // Fixed search functionality - filter courses within active field
  const getFilteredFieldCourses = (field) => {
    const fieldCourses = getFieldCourses(field);
    return fieldCourses.filter(course => {
      const matchesSearch = course.toLowerCase().includes(search.toLowerCase()) ||
                           diplomaDetails[course].desc.toLowerCase().includes(search.toLowerCase());
      const matchesDuration = durationFilter === 'All' || diplomaDetails[course].duration.includes(durationFilter);
      return matchesSearch && matchesDuration;
    });
  };

  // Get all courses for search functionality when no field is selected
  const allCourses = Object.keys(diplomaDetails);
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.toLowerCase().includes(search.toLowerCase()) ||
                         diplomaDetails[course].desc.toLowerCase().includes(search.toLowerCase());
    const matchesDuration = durationFilter === 'All' || diplomaDetails[course].duration.includes(durationFilter);
    return matchesSearch && matchesDuration;
  });

  const durations = ['All', '1 year', '2 years', '3 years'];
  const floatingElements = ["📜", "⚙️", "🏥", "🎓", "🔬", "💻", "🧬", "📊"];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-poppins select-none">
      {/* Very Light Animated Background Elements */}
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

      {/* Very Light Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

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
                  Menu
                </h3>
              </div>

              {/* Diploma Fields Section */}
              <div className="mb-4">
                <button
                  onClick={toggleFieldsInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-blue-50 hover:bg-blue-100 text-gray-800 transition-colors duration-300 border border-blue-200"
                >
                  Diploma Fields {fieldsExpanded ? '▼' : '▶'}
                </button>
                
                <AnimatePresence>
                  {fieldsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-blue-50 rounded-md mt-2 border border-blue-100"
                    >
                      {diplomaFields.map((field) => (
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
                              : 'hover:bg-blue-100 text-gray-700'
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
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-50 hover:bg-green-100 text-green-700 text-center transition border border-green-200"
                >
                  📚 Explore All Courses
                </Link>

                <Link
                  to="/after10th/entrance"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-center transition border border-blue-200"
                >
                  🎯 Entrance Exams
                </Link>

                <Link
                  to="/after10th/scholarship"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-center transition border border-cyan-200"
                >
                  🎓 Scholarships
                </Link>

                <Link
                  to="/after-10th"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 text-center transition border border-pink-200"
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
              <span className="animation-delay-0">📜</span>
              <span className="animation-delay-200">⚙️</span>
              <span className="animation-delay-400">🎓</span>
            </div>
          </div>
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-6 animate-pulse">
            Diploma Courses
          </h1>

          {/* Search and Filter Section - Removed "View Entrance Exams" button */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search diploma courses..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeField && !search && durationFilter === 'All' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Enhanced Introduction */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-sm">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Diploma courses offer practical, skill-based education that prepares students for immediate employment or higher studies. These courses provide hands-on training in various fields including engineering, medical, and education. <span className="text-blue-600 font-semibold">EduAdvisor</span> helps you explore diploma options that match your interests and career goals. From technical skills to professional development, diploma courses offer a direct pathway to your chosen career. With <span className="text-blue-700 font-semibold">EduAdvisor</span>, you can make an informed decision about your diploma education.
                  </p>
                </div>

                {/* Enhanced Field Cards - Light Colors */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
                  {diplomaFields.map((field, index) => (
                    <div
                      key={field.name}
                      onClick={() => toggleField(field.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${field.bg} rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:scale-105 transition-all duration-500 transform hover:shadow-xl border border-gray-200`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/30"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:animate-spin">
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
                        <h2 className="text-3xl font-bold mb-4 text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                          {field.name}
                        </h2>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/70 text-gray-700 font-bold py-3 px-8 rounded-full border border-gray-300 hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                          <span className="relative z-10">View Courses</span>
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                    <div className="text-gray-600 text-sm">Diploma Courses</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-700 mb-2">50+</div>
                    <div className="text-gray-600 text-sm">Career Options</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-800 mb-2">3</div>
                    <div className="text-gray-600 text-sm">Major Fields</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-900 mb-2">85%</div>
                    <div className="text-gray-600 text-sm">Employment Rate</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results View */}
          {(search || durationFilter !== 'All') && !activeField && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {filteredCourses.length} diploma courses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveCourse(course)}
                  >
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{course}</h3>
                    <p className="text-gray-600 text-sm mb-3">{diplomaDetails[course].desc}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-blue-600 font-semibold text-sm">{diplomaDetails[course].duration}</span>
                    </div>

                    <div className="text-xs text-gray-500">
                      <div>Eligibility: {diplomaDetails[course].eligibility}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse different fields</p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Course Details - Fixed search within field */}
          {activeField && (
            <motion.section
              key={activeField}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {activeField} Diplomas
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Use filtered courses within the active field */}
                {getFilteredFieldCourses(activeField).map((course) => (
                  <motion.div
                    key={course}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => toggleCourse(course)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{course}</h3>
                    <p className="text-gray-600 text-sm mb-3">{diplomaDetails[course]?.desc || 'Detailed information coming soon.'}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">{diplomaDetails[course]?.duration}</span>
                      <span className="text-gray-500">Diploma Course</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show message if no courses found in field */}
              {getFilteredFieldCourses(activeField).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No courses found in {activeField}</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}

              {activeCourse && (
                <motion.div
                  key={activeCourse}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm"
                >
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{activeCourse}</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="mb-3"><strong className="text-blue-700">Description:</strong> {diplomaDetails[activeCourse]?.desc || 'Details are being updated.'}</p>
                      <p className="mb-3"><strong className="text-blue-700">Duration:</strong> {diplomaDetails[activeCourse]?.duration || 'Check with institution'}</p>
                      <p className="mb-3"><strong className="text-blue-700">Eligibility:</strong> {diplomaDetails[activeCourse]?.eligibility || ''}</p>
                    </div>
                    <div>
                      <p className="mb-3"><strong className="text-blue-700">Skills Gained:</strong> {diplomaDetails[activeCourse]?.skills || ''}</p>
                      <p className="mb-3"><strong className="text-blue-700">Advantages:</strong> {diplomaDetails[activeCourse]?.advantages || ''}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link
                      to={`/after10th/diploma/${activeField.toLowerCase()}/${activeCourse.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`}
                      className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Learn More Details →
                    </Link>
                  </div>
                </motion.div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveField(null)}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Fields
                </button>
              </div>
            </motion.section>
          )}

          {/* Diploma Benefits */}
          {!activeField && !search && durationFilter === 'All' && (
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Why Choose Diploma Courses?</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Practical Benefits</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Shorter duration compared to degree courses</li>
                    <li>• Hands-on practical training and skills</li>
                    <li>• Direct entry into job market</li>
                    <li>• Lower fees compared to engineering degrees</li>
                    <li>• Industry-relevant curriculum</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Career Advantages</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Lateral entry to B.Tech 2nd year</li>
                    <li>• Government job opportunities (SSC JE, RRB JE)</li>
                    <li>• Private sector employment</li>
                    <li>• Entrepreneurship opportunities</li>
                    <li>• Foundation for higher studies</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Career Pathways */}
          {!activeField && !search && durationFilter === 'All' && (
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">🚀 Career Pathways After Diploma</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    path: "Direct Employment", 
                    icon: "💼", 
                    description: "Join as Junior Engineer, Technician, or Assistant in government/private sector",
                    timeframe: "Immediately after diploma"
                  },
                  { 
                    path: "Higher Studies", 
                    icon: "🎓", 
                    description: "Lateral entry to B.Tech 2nd year or pursue specialized courses",
                    timeframe: "After diploma completion"
                  },
                  { 
                    path: "Entrepreneurship", 
                    icon: "🚀", 
                    description: "Start your own business, consultancy, or technical services",
                    timeframe: "With experience and skills"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-3">{item.path}</h4>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{item.timeframe}</p>
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

export default Diploma;