import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MathIPPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'What is Math-IP?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-blue-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50  bg-cyan-600 text-white p-3 rounded-lg shadow-lg hover:bg-cyan-700 transition"
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
            className="fixed left-0 top-22 h-[calc(100vh-5rem)] w-80 bg-white shadow-xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-6 ml-15 text-cyan-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-cyan-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-600 hover:bg-cyan-700 text-white text-center transition"
                >
                  ← Back to All Courses
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} p-8`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-cyan-900 mb-4">MATH-IP Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Mathematics + Informatics Practices stream after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">📘 What is Math-IP?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Math-IP (Mathematics + Informatics Practices)</strong> is a Non-Medical Science stream that combines core mathematics with practical computer applications and database management.
              </p>
              <p>
                Informatics Practices focuses on practical aspects of computing including database management, web development, and business applications of technology.
              </p>
              <p>
                This stream is ideal for students who want a balance between mathematical concepts and practical computer applications for business and IT solutions.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium">
                  🎯 Perfect for students who prefer practical computer applications over theoretical computer science!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-cyan-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-cyan-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-cyan-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-cyan-500 mr-2">✓</span> Informatics Practices</li>
                  <li className="flex items-center"><span className="text-cyan-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">IP Focus Areas:</h4>
                <p className="text-sm text-blue-700 mb-2">• Database Management & SQL</p>
                <p className="text-sm text-blue-700 mb-2">• Web Development (HTML, CSS, JS)</p>
                <p className="text-sm text-blue-700 mb-2">• Python Programming</p>
                <p className="text-sm text-blue-700">• Data Handling & Analytics</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">✅ Advantages of Math-IP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Practical Computer Skills',
                  desc: 'Focuses on practical applications rather than theoretical computer science.'
                },
                {
                  title: 'Database & Web Skills',
                  desc: 'Strong foundation in database management and web development.'
                },
                {
                  title: 'Business Applications',
                  desc: 'Learn computer applications relevant to business and office environments.'
                },
                {
                  title: 'Engineering Eligibility',
                  desc: 'Eligible for engineering entrance exams with mathematical foundation.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <h3 className="font-semibold text-cyan-800 mb-2">{advantage.title}</h3>
                  <p className="text-cyan-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">❌ Disadvantages of Math-IP</h2>
            <div className="space-y-4">
              {[
                'Less theoretical computer science depth compared to Math-CS combination',
                'Cannot pursue Medical field (MBBS, BDS, etc.) since Biology is not included',
                'May need additional programming skills for advanced computer science roles',
                'Competitive IT field requires continuous skill updates and certifications'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">🔮 Future Scope of Math-IP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Database & Analytics',
                  items: ['Database Administrator', 'Data Analyst', 'Business Intelligence', 'SQL Developer']
                },
                {
                  category: 'Web Development',
                  items: ['Web Developer', 'Frontend Developer', 'Full Stack Developer', 'Web Designer']
                },
                {
                  category: 'Business IT',
                  items: ['Business Analyst', 'System Analyst', 'IT Consultant', 'ERP Specialist']
                },
                {
                  category: 'Engineering & Tech',
                  items: ['Software Engineer', 'IT Engineer', 'System Engineer', 'Technical Support']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-blue-700 text-sm flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Courses Section */}
          <section id="courses" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">🎓 Courses Eligible After Math-IP</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Engineering & Tech',
                  courses: ['B.Tech (Computer Science, IT, Information Systems)', 'B.Tech (Software Engineering, Data Science)', 'Integrated B.Tech + M.Tech programs']
                },
                {
                  category: 'Computer Applications',
                  courses: ['BCA (Bachelor of Computer Applications)', 'B.Sc (Computer Science, IT, Information Systems)', 'MCA (after graduation)']
                },
                {
                  category: 'Mathematics & Science',
                  courses: ['B.Sc (Mathematics, Statistics, Data Science)', 'B.Sc (Physics, Chemistry with Mathematics)', 'Integrated MSc programs']
                },
                {
                  category: 'Professional & Other',
                  courses: ['BBA (Information Systems)', 'Commerce with Computer Applications', 'Management with IT specialization']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{courseGroup.category}</h3>
                  <ul className="space-y-2">
                    {courseGroup.courses.map((course, i) => (
                      <li key={i} className="text-gray-700">{course}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Jobs Section */}
          <section id="jobs" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-900 mb-6">💼 Jobs Available in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government IT Sector',
                  jobs: ['Database Administrator (NIC, J&K IT Dept)', 'System Analyst (Government offices)', 'IT Assistant (JKSSB)', 'Web Developer (Government portals)']
                },
                {
                  sector: 'Private IT Companies',
                  jobs: ['Software Developer in Jammu/Srinagar IT firms', 'Database Developer', 'Web Developer', 'Business Application Developer']
                },
                {
                  sector: 'Banking & Finance IT',
                  jobs: ['Database Administrator in J&K Bank', 'IT Support in financial institutions', 'Business Analyst in banking sector', 'System Maintainer']
                },
                {
                  sector: 'Entrepreneurship & Freelancing',
                  jobs: ['Web Development Services', 'Database Solutions Provider', 'IT Consulting', 'Software Solutions for local businesses']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-blue-700 flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Math-IP stream</strong> after Grade 10 combines Mathematics with Informatics Practices, focusing on 
              <strong> practical computer applications, database management, and web development</strong>. 
              It's ideal for students who want <strong>engineering eligibility with practical IT skills</strong>. 
              In J&K, it opens doors to <strong>government IT jobs, private sector opportunities, and tech entrepreneurship</strong> 
              with a strong foundation in both mathematics and practical computing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MathIPPage;