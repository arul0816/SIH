import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CommerceWithMathPage = () => {
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
    { id: 'overview', label: 'What is Commerce?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-amber-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-orange-600 text-white p-3 rounded-lg shadow-lg hover:bg-orange-700 transition"
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
            className="fixed left-0 top-22 h-[calc(100vh-4rem)] w-80 bg-white shadow-xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-6 ml-15 text-orange-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-orange-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-orange-600 hover:bg-orange-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-orange-900 mb-4">Commerce with Mathematics Stream</h1>
            <p className="text-lg text-gray-700">Complete guide for Commerce + Mathematics combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">📘 What is Commerce?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Commerce</strong> is the field of study that deals with trade, business, finance, economy, and management of goods & services.
              </p>
              <p>
                Students learn about accounting, business studies, economics, mathematics, entrepreneurship, and finance.
              </p>
              <p>
                It is best suited for students who are interested in <strong>business, trade, money, management, economics, banking, and entrepreneurship</strong>.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                <p className="text-amber-800 font-medium">
                  🎯 Commerce with Mathematics provides the strongest foundation for finance, data analysis, and quantitative business roles!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">📚 Subjects in Commerce + Math</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Accountancy</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Business Studies</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Economics</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Why Mathematics?</h4>
                <p className="text-sm text-amber-700">
                  Mathematics adds quantitative analysis skills essential for finance, banking, data analysis, economics research, and advanced business studies.
                </p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">✅ Advantages of Commerce + Math</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Wide Career Options',
                  desc: 'Banking, CA, CS, MBA, Law, Finance, Economics honors, Statistics, Data Analysis.'
                },
                {
                  title: 'Professional Courses Early',
                  desc: 'Chartered Accountant (CA), Company Secretary (CS) can be started after 12th.'
                },
                {
                  title: 'High Demand Sector',
                  desc: 'Finance, business, startups, corporates, government jobs always in demand.'
                },
                {
                  title: 'Quantitative Skills',
                  desc: 'Mathematical foundation for financial modeling, data analysis, research.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-800 mb-2">{advantage.title}</h3>
                  <p className="text-orange-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">❌ Disadvantages</h2>
            <div className="space-y-4">
              {[
                'Not suitable for Science/Technology careers (doctor, engineer, pure science researcher)',
                'Competitive field – CA, CS, UPSC, MBA require hard work and dedication',
                'Maths-heavy – Students not good in numbers may struggle',
                'Job market saturation – Need additional skills (computer, communication, certifications)'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">🔮 Future Scope of Commerce + Math</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Finance & Banking',
                  items: ['Investment Banking', 'Financial Analysis', 'Portfolio Management', 'Risk Assessment']
                },
                {
                  category: 'Professional Services',
                  items: ['Chartered Accountant', 'Company Secretary', 'Cost Accountant', 'Financial Consultant']
                },
                {
                  category: 'Data & Analytics',
                  items: ['Business Analyst', 'Financial Modelling', 'Economic Research', 'Market Research']
                },
                {
                  category: 'Government & Public Sector',
                  items: ['Economic Services', 'Revenue Services', 'Banking Services', 'Statistical Services']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-amber-700 text-sm flex items-center">
                        <span className="text-amber-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-orange-900 mb-6">🎓 College Courses after Commerce + Math</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Professional Courses',
                  courses: ['CA (Chartered Accountant)', 'CS (Company Secretary)', 'CMA (Cost Management Accounting)', 'CFA (Chartered Financial Analyst)']
                },
                {
                  category: 'Undergraduate Courses',
                  courses: ['B.Com (General / Honours)', 'BBA (Bachelor of Business Administration)', 'BA Economics', 'B.Com (Banking & Insurance, Accounting & Finance)']
                },
                {
                  category: 'Mathematics & Statistics',
                  courses: ['B.Sc Statistics', 'B.Sc Mathematics', 'B.Sc Economics with Statistics', 'Actuarial Science']
                },
                {
                  category: 'Integrated Programs',
                  courses: ['Integrated Law (BBA LLB / B.Com LLB)', 'Integrated MBA programs', 'Dual degree programs']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-amber-500 pl-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-orange-900 mb-6">💼 Job Opportunities in J&K</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Jobs (JKSSB, JKPSC, UPSC)',
                  jobs: ['Accounts Assistant', 'Sub-Inspector (Finance/Tax)', 'Banking Associate (J&K Bank)', 'Junior Assistant (in Govt Depts)', 'Statistical Assistant']
                },
                {
                  sector: 'Private Sector in J&K',
                  jobs: ['Accountant / Auditor', 'Finance & Tax Consultant', 'Banking sector jobs', 'Business/Startup Entrepreneur', 'Financial Analyst']
                },
                {
                  sector: 'National Opportunities',
                  jobs: ['Chartered Accountant', 'Investment Banker', 'Business Analyst', 'Economic Researcher', 'Corporate Manager']
                },
                {
                  sector: 'Emerging Sectors',
                  jobs: ['Data Analyst', 'Financial Technology', 'Digital Banking', 'E-commerce Finance', 'Cryptocurrency Analysis']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-amber-700 flex items-start">
                        <span className="text-amber-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Commerce with Mathematics</strong> after 10th is ideal for students interested in business, finance, and economics with strong analytical skills. 
              It provides excellent opportunities in <strong>banking, finance, CA, government jobs, and data analysis</strong>. 
              In J&K, this combination is highly valued for <strong>government services, banking sector, and entrepreneurship opportunities</strong> 
              supported by regional development schemes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommerceWithMathPage;