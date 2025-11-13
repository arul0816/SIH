import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MathEconomicsPage = () => {
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
    { id: 'overview', label: 'What is Math-Economics?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 to-yellow-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-amber-600 text-white p-3 rounded-lg shadow-lg hover:bg-amber-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-amber-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-amber-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-amber-600 hover:bg-amber-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-amber-900 mb-4">MATH-ECONOMICS Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Mathematics + Economics combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">📘 What is Math-Economics?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Math-Economics</strong> is a unique Non-Medical Science stream that bridges the gap between pure sciences and commerce, combining mathematical concepts with economic principles.
              </p>
              <p>
                This combination provides analytical and quantitative skills essential for understanding economic patterns, financial markets, and business decision-making.
              </p>
              <p>
                Perfect for students who are interested in <strong>economics, finance, business analysis, policy-making, and data-driven decision making</strong>.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-yellow-800 font-medium">
                  🎯 Ideal bridge between science and commerce - opens doors to both engineering and business fields!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-amber-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-amber-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-amber-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-amber-500 mr-2">✓</span> Economics</li>
                  <li className="flex items-center"><span className="text-amber-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Economics Focus:</h4>
                <p className="text-sm text-yellow-700 mb-2">• Microeconomics & Macroeconomics</p>
                <p className="text-sm text-yellow-700 mb-2">• Mathematical Economics</p>
                <p className="text-sm text-yellow-700 mb-2">• Statistical Analysis</p>
                <p className="text-sm text-yellow-700">• Economic Policy & Development</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">✅ Advantages of Math-Economics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Dual Career Paths',
                  desc: 'Opens doors to both engineering and economics/business fields.'
                },
                {
                  title: 'Analytical Skills',
                  desc: 'Develops strong quantitative and analytical thinking abilities.'
                },
                {
                  title: 'Policy & Research',
                  desc: 'Excellent foundation for economic research and policy analysis.'
                },
                {
                  title: 'Business Analytics',
                  desc: 'Strong background for business analysis and financial modeling.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-800 mb-2">{advantage.title}</h3>
                  <p className="text-amber-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">❌ Disadvantages of Math-Economics</h2>
            <div className="space-y-4">
              {[
                'Cannot pursue Medical field (MBBS, BDS, etc.) since Biology is not included',
                'Requires strong analytical and mathematical aptitude',
                'Limited computer science depth compared to Math-CS combination',
                'Economics field can be highly competitive and policy-dependent'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">🔮 Future Scope of Math-Economics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Economics & Research',
                  items: ['Economist', 'Economic Researcher', 'Policy Analyst', 'Economic Consultant']
                },
                {
                  category: 'Finance & Banking',
                  items: ['Financial Analyst', 'Investment Banker', 'Risk Analyst', 'Portfolio Manager']
                },
                {
                  category: 'Business & Analytics',
                  items: ['Business Analyst', 'Market Researcher', 'Data Analyst', 'Business Consultant']
                },
                {
                  category: 'Government & Policy',
                  items: ['Economic Services Officer', 'Statistical Officer', 'Policy Advisor', 'Development Economist']
                },
                {
                  category: 'Engineering & Tech',
                  items: ['Industrial Engineer', 'Operations Research', 'Financial Engineering', 'Quantitative Analyst']
                },
                {
                  category: 'Academia & Teaching',
                  items: ['Economics Professor', 'Research Scholar', 'Economic Journalist', 'Training Specialist']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-yellow-700 text-sm flex items-center">
                        <span className="text-yellow-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-amber-900 mb-6">🎓 Courses Eligible After Math-Economics</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Engineering & Technology',
                  courses: ['B.Tech (Industrial Engineering, Operations Research)', 'B.Tech (Computer Science, IT, Electronics)', 'Engineering Economics specialization']
                },
                {
                  category: 'Economics & Commerce',
                  courses: ['BA Economics Honours', 'B.Com (Hons) with Economics', 'BBA (Economics & Finance)', 'Integrated BA-MA Economics']
                },
                {
                  category: 'Mathematics & Statistics',
                  courses: ['B.Sc (Mathematics, Statistics, Data Science)', 'B.Sc (Economics & Statistics)', 'Actuarial Science', 'Mathematical Economics']
                },
                {
                  category: 'Professional Courses',
                  courses: ['Chartered Accountancy (CA)', 'Cost & Management Accountancy (CMA)', 'Company Secretary (CS)', 'Financial Risk Manager (FRM)']
                },
                {
                  category: 'Management & Finance',
                  courses: ['BBA (Finance & Economics)', 'Bachelor of Financial Markets', 'Investment & Portfolio Management', 'Business Economics']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-amber-900 mb-6">💼 Jobs Available in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Economic Services',
                  jobs: ['Economic Services Officer (JKPSC)', 'Statistical Officer (J&K Govt)', 'Planning Officer', 'Development Officer (Rural/Urban)']
                },
                {
                  sector: 'Banking & Financial Institutions',
                  jobs: ['Economist in J&K Bank', 'Financial Analyst in regional banks', 'Credit Analyst', 'Investment Advisor']
                },
                {
                  sector: 'Research & Policy Organizations',
                  jobs: ['Research Associate at J&K institutes', 'Policy Researcher', 'Economic Survey teams', 'Development project analyst']
                },
                {
                  sector: 'Private Sector & Consulting',
                  jobs: ['Business Analyst', 'Market Research Analyst', 'Economic Consultant', 'Financial Planning specialist']
                },
                {
                  sector: 'Engineering & Technical',
                  jobs: ['Industrial Engineer', 'Operations Research Analyst', 'Quality Control Engineer', 'Process Improvement Specialist']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-yellow-700 flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Math-Economics stream</strong> after Grade 10 is a unique bridge between science and commerce, 
              combining <strong>mathematical analysis with economic understanding</strong>. 
              It opens doors to <strong>engineering, economics, finance, business analysis, and policy research</strong>. 
              In J&K, this combination is valuable for <strong>government economic services, banking sector, research institutions, 
              and development projects</strong>, making it ideal for students interested in data-driven decision making and economic development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MathEconomicsPage;