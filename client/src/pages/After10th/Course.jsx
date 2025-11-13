import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const courseData = {
  'Science - PCM (Non-Medical)': [
    {
      name: 'Math + Computer Science',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'],
      description: 'Perfect for students interested in Engineering, IT, Data Science, and Technology careers.',
      eligibleFor: ['B.Tech', 'B.Sc Computer Science', 'BCA', 'Engineering Entrance Exams'],
      careerOptions: ['Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Cybersecurity Specialist'],
      route: '/courses/math-cs'
    },
    {
      name: 'Math + Informatics Practices (IP)',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Informatics Practices', 'English'],
      description: 'Combines mathematics with practical computer applications and database management.',
      eligibleFor: ['B.Tech', 'BCA', 'B.Sc IT', 'Engineering Courses'],
      careerOptions: ['Software Developer', 'Database Administrator', 'Web Developer', 'System Analyst'],
      route: '/courses/math-ip'
    },
    {
      name: 'Math + Economics',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Economics', 'English'],
      description: 'Bridge between science and commerce, ideal for analytical and business-minded students.',
      eligibleFor: ['B.Tech', 'B.Sc Economics', 'BBA', 'Engineering + MBA'],
      careerOptions: ['Engineer', 'Economic Analyst', 'Business Analyst', 'Consultant'],
      route: '/courses/math-economics'
    },
    {
      name: 'Math + Physical Education',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Physical Education', 'English'],
      description: 'Combines science with sports and fitness, good for sports enthusiasts.',
      eligibleFor: ['B.Tech', 'B.P.Ed', 'Sports Science', 'Engineering'],
      careerOptions: ['Engineer', 'Sports Coach', 'Fitness Trainer', 'Sports Scientist'],
      route: '/courses/math-pe'
    }
  ],
  'Science - PCB (Medical)': [
    {
      name: 'Bio + Math (PCMB)',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
      description: 'Opens doors to both Medical and Engineering fields. Most flexible science combination.',
      eligibleFor: ['MBBS', 'BDS', 'B.Tech', 'BAMS', 'B.Pharmacy', 'Biotechnology'],
      careerOptions: ['Doctor', 'Engineer', 'Biotechnologist', 'Research Scientist', 'Bioinformatics Expert'],
      route: '/courses/bio-math'
    },
    {
      name: 'Bio + Computer Science',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science', 'English'],
      description: 'Perfect blend of life sciences and technology for modern healthcare and research.',
      eligibleFor: ['MBBS', 'BDS', 'BCA', 'Bioinformatics', 'Biomedical Engineering'],
      careerOptions: ['Doctor', 'Bioinformatics Specialist', 'Medical Data Analyst', 'Biotech Researcher'],
      route: '/courses/bio-cs'
    },
    {
      name: 'Bio + Psychology',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Psychology', 'English'],
      description: 'Combines medical science with human behavior study, ideal for mental health careers.',
      eligibleFor: ['MBBS', 'Psychology', 'Psychiatry', 'Clinical Psychology'],
      careerOptions: ['Doctor', 'Psychologist', 'Psychiatrist', 'Counselor', 'Therapist'],
      route: '/courses/bio-psychology'
    }
  ],
  'Commerce': [
    {
      name: 'Commerce + Mathematics',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
      description: 'Traditional commerce with strong mathematical foundation for finance and analytics.',
      eligibleFor: ['B.Com', 'BBA', 'CA', 'CS', 'Economics Honours', 'B.Sc Statistics'],
      careerOptions: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Economist'],
      route: '/courses/commerce-math'
    },
    {
      name: 'Commerce + Computer Science',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Computer Science', 'English'],
      description: 'Modern commerce with IT skills, perfect for digital business and fintech.',
      eligibleFor: ['B.Com', 'BBA', 'BCA', 'Digital Marketing', 'E-commerce'],
      careerOptions: ['Business Analyst', 'Digital Marketing Manager', 'Fintech Developer', 'E-commerce Manager'],
      route: '/courses/commerce-cs'
    },
    {
      name: 'Commerce + Entrepreneurship',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Entrepreneurship', 'English'],
      description: 'Focuses on business creation, innovation, and startup development.',
      eligibleFor: ['B.Com', 'BBA', 'Startup Programs', 'Business Management'],
      careerOptions: ['Entrepreneur', 'Business Consultant', 'Startup Founder', 'Business Development Manager'],
      route: '/courses/commerce-entrepreneurship'
    }
  ],
  'Arts & Humanities': [
    {
      name: 'History + Political Science + Geography',
      subjects: ['History', 'Political Science', 'Geography', 'English', 'Optional Language'],
      description: 'Classic combination for civil services, teaching, and administrative careers.',
      eligibleFor: ['BA', 'Law', 'Civil Services', 'Teaching', 'Journalism'],
      careerOptions: ['IAS/KAS Officer', 'Teacher', 'Lawyer', 'Journalist', 'Historian'],
      route: '/courses/humanities-hpg'
    },
    {
      name: 'Psychology + Sociology + Economics',
      subjects: ['Psychology', 'Sociology', 'Economics', 'English', 'Optional Language'],
      description: 'Understanding human behavior, society, and economic patterns.',
      eligibleFor: ['BA Psychology', 'Social Work', 'Economics', 'Mass Communication'],
      careerOptions: ['Psychologist', 'Social Worker', 'HR Manager', 'Counselor', 'Researcher'],
      route: '/courses/humanities-pse'
    },
    {
      name: 'Literature + Fine Arts + History',
      subjects: ['English Literature', 'Fine Arts', 'History', 'Optional Language'],
      description: 'Creative and cultural studies for artistic and literary careers.',
      eligibleFor: ['BA Fine Arts', 'Literature', 'Creative Writing', 'Cultural Studies'],
      careerOptions: ['Writer', 'Artist', 'Curator', 'Cultural Officer', 'Content Creator'],
      route: '/courses/humanities-arts'
    }
  ],
  'Vocational & Skill-based': [
    {
      name: 'Computer Applications',
      subjects: ['Computer Fundamentals', 'Programming', 'Web Technology', 'Database', 'English'],
      description: 'Practical computer skills for immediate job market entry.',
      eligibleFor: ['BCA', 'Diploma Courses', 'IT Certifications'],
      careerOptions: ['Computer Operator', 'Web Developer', 'Data Entry Operator', 'IT Support'],
      route: '/courses/vocational-computer'
    },
    {
      name: 'Fashion Designing',
      subjects: ['Fashion Studies', 'Textile Science', 'Design Fundamentals', 'Business Studies'],
      description: 'Creative field combining art, design, and business for fashion industry.',
      eligibleFor: ['Fashion Design Diploma', 'Textile Engineering', 'Design Courses'],
      careerOptions: ['Fashion Designer', 'Stylist', 'Fashion Illustrator', 'Boutique Owner'],
      route: '/courses/vocational-fashion'
    },
    {
      name: 'Travel & Tourism',
      subjects: ['Tourism Management', 'Geography', 'Languages', 'Hospitality', 'Business Studies'],
      description: 'Perfect for J&K students given the tourism potential of the region.',
      eligibleFor: ['Hotel Management', 'Tourism Studies', 'Hospitality Management'],
      careerOptions: ['Tour Guide', 'Hotel Manager', 'Travel Agent', 'Tourism Officer'],
      route: '/courses/vocational-tourism'
    }
  ]
};

const Course = () => {
  const [activeCategory, setActiveCategory] = useState('Science - PCM (Non-Medical)');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [search, setSearch] = useState('');

  const toggleExpand = (courseName) => {
    setExpandedCourse(expandedCourse === courseName ? null : courseName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCategoriesInSidebar = () => {
    setCategoriesExpanded(!categoriesExpanded);
  };

  const categories = Object.keys(courseData);

  // Get all courses for search functionality
  const allCourses = [];
  Object.entries(courseData).forEach(([category, courses]) => {
    courses.forEach(course => {
      allCourses.push({ ...course, category });
    });
  });

  const filteredCourses = allCourses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  const floatingElements = ["📚", "🎓", "💻", "🔬", "💼", "🎨", "⚖️", "🏥", "✨"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-800 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-3xl opacity-10 animate-bounce`}
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
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-7 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-black/20 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-white/20"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                
                <h3 className="text-xl font-bold text-white ml-17 -mt-0.5">
                  Contents
                </h3>
              </div>

              {/* Course Categories Section */}
              <div className="mb-4">
                <button
                  onClick={toggleCategoriesInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 backdrop-blur-sm border border-white/20"
                >
                  Course Categories {categoriesExpanded ? '▼' : '▶'}
                </button>
                
                <AnimatePresence>
                  {categoriesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-black/20 backdrop-blur-sm rounded-md mt-2 border border-white/10"
                    >
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveCategory(category)}
                          className={`w-full text-left py-2 px-4 text-sm font-medium rounded transition-colors duration-300 ${
                            activeCategory === category
                              ? 'bg-cyan-500 text-white shadow-md'
                              : 'hover:bg-white/20 text-gray-200'
                          }`}
                        >
                          {category}
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
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-center transition backdrop-blur-sm border border-cyan-500/30"
                >
                  🎓 Scholarships
                </Link>

                <Link
                  to="/after10th/entrance"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-center transition backdrop-blur-sm border border-blue-500/30"
                >
                  🎯 Entrance Exams
                </Link>

                <Link
                  to="/after10th/diploma"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-center transition backdrop-blur-sm border border-purple-500/30"
                >
                  📜 Diploma Courses
                </Link>

                <Link
                  to="/after-10th"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 text-center transition backdrop-blur-sm border border-pink-500/30"
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
              <span className="animation-delay-0">📚</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">🚀</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-6 animate-pulse">
            Course Explorer
          </h1>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!search && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Introduction */}
                <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto mb-12">
                  <p className="text-gray-300 text-xl leading-relaxed">
                    Discover the perfect stream and subject combination for your future career goals. Choose from Science, Commerce, Arts, and Vocational streams with detailed information about subjects, eligibility, and career prospects.
                  </p>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap mb-8 gap-4 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setExpandedCourse(null);
                      }}
                      className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-cyan-600 text-white scale-105 shadow-cyan-500/30'
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-cyan-300 border border-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="wait">
                    {courseData[activeCategory].map((course, index) => (
                      <motion.div
                        key={course.name}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden border border-gray-700"
                      >
                        <div className="p-6">
                          <h2 className="text-xl font-bold text-cyan-400 mb-3">{course.name}</h2>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-300 mb-2">Subjects:</h4>
                            <div className="flex flex-wrap gap-1">
                              {course.subjects.map((subject, subIndex) => (
                                <span
                                  key={subIndex}
                                  className={`px-2 py-1 rounded-md text-xs font-medium border ${
                                    subIndex % 2 === 0 
                                      ? 'bg-blue-900/30 text-blue-300 border-blue-700/50'
                                      : 'bg-purple-900/30 text-purple-300 border-purple-700/50'
                                  }`}
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>

                          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            {course.description}
                          </p>

                          <button
                            onClick={() => toggleExpand(course.name)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-3 shadow-md"
                          >
                            {expandedCourse === course.name ? 'Show Less' : 'View Details'}
                          </button>

                          <AnimatePresence>
                            {expandedCourse === course.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 border-t border-gray-700">
                                  <div className="mb-3">
                                    <h4 className="font-semibold text-gray-300 mb-1">Eligible Courses:</h4>
                                    <p className="text-gray-400 text-sm">
                                      {course.eligibleFor.join(', ')}
                                    </p>
                                  </div>
                                  
                                  <div className="mb-4">
                                    <h4 className="font-semibold text-gray-300 mb-1">Career Options:</h4>
                                    <p className="text-gray-400 text-sm">
                                      {course.careerOptions.join(', ')}
                                    </p>
                                  </div>

                                  <Link
                                    to={course.route}
                                    className="block w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 rounded-lg font-semibold text-center hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md"
                                  >
                                    Learn More Details →
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results View */}
          {search && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <p className="text-gray-400">
                  Found {filteredCourses.length} courses matching "{search}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs text-cyan-400 font-semibold">{course.category}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{course.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                    
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-300 mb-1 text-sm">Subjects:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.subjects.slice(0, 3).map((subject, subIndex) => (
                          <span
                            key={subIndex}
                            className={`px-2 py-1 rounded-md text-xs font-medium border ${
                              subIndex % 2 === 0 
                                ? 'bg-blue-900/30 text-blue-300 border-blue-700/50'
                                : 'bg-purple-900/30 text-purple-300 border-purple-700/50'
                            }`}
                          >
                            {subject}
                          </span>
                        ))}
                        {course.subjects.length > 3 && (
                          <span className="text-xs text-gray-400">+{course.subjects.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={course.route}
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md text-sm"
                    >
                      View Details →
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or browse different categories</p>
                </div>
              )}
            </div>
          )}

          {/* Additional Info Section */}
          {!search && (
            <div className="mt-12 backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Why Choose the Right Stream?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">🎯 Career Alignment</h3>
                  <p className="text-gray-400 text-sm">
                    Your stream choice determines your eligibility for various undergraduate courses and career paths.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">💡 Interest Match</h3>
                  <p className="text-gray-400 text-sm">
                    Choose subjects that align with your interests and strengths for better academic performance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">🏆 Competitive Edge</h3>
                  <p className="text-gray-400 text-sm">
                    Right combination gives you advantage in entrance exams and competitive examinations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">🌟 Future Scope</h3>
                  <p className="text-gray-400 text-sm">
                    Consider emerging fields and job market trends while making your decision.
                  </p>
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

export default Course;