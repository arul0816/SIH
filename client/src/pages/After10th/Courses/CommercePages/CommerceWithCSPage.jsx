import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CommerceWithCSPage = () => {
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
    { id: 'overview', label: 'What is Commerce + CS?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-teal-600 text-white p-3 rounded-lg shadow-lg hover:bg-teal-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-teal-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-teal-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-teal-600 hover:bg-teal-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-teal-900 mb-4">Commerce with Computer Science</h1>
            <p className="text-lg text-gray-700">Complete guide for Commerce + Computer Science combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">📘 What is Commerce + CS?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Commerce + Computer Science</strong> is a modern combination that merges traditional business studies with digital technology and IT skills.
              </p>
              <p>
                This stream prepares students for the digital economy, e-commerce, fintech, digital marketing, and technology-driven business solutions.
              </p>
              <p>
                Perfect for students interested in <strong>business, technology, digital innovation, e-commerce, and modern financial systems</strong>.
              </p>
              <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-cyan-800 font-medium">
                  🎯 Ideal for the digital age where business and technology converge!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">📚 Subjects in Commerce + CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Accountancy</li>
                  <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Business Studies</li>
                  <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Economics</li>
                  <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Computer Science</li>
                  <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-800 mb-2">Why Computer Science?</h4>
                <p className="text-sm text-cyan-700">
                  Computer Science adds digital literacy, programming skills, and technology understanding essential for modern business operations, e-commerce, and fintech.
                </p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">✅ Advantages of Commerce + CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Digital Business Ready',
                  desc: 'Perfect for e-commerce, digital marketing, fintech, and online business ventures.'
                },
                {
                  title: 'Dual Skill Set',
                  desc: 'Combines business knowledge with essential IT skills for modern workplace.'
                },
                {
                  title: 'Growing Demand',
                  desc: 'High demand in digital economy, startups, and tech-enabled businesses.'
                },
                {
                  title: 'Entrepreneurship Edge',
                  desc: 'Strong foundation for tech startups and digital business solutions.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <h3 className="font-semibold text-teal-800 mb-2">{advantage.title}</h3>
                  <p className="text-teal-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">❌ Disadvantages</h2>
            <div className="space-y-4">
              {[
                'Cannot pursue pure science careers (medicine, engineering, research)',
                'Limited scope in traditional finance roles compared to Commerce + Math',
                'Requires continuous technology skill updates',
                'May need additional certifications for specialized IT roles'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">🔮 Future Scope of Commerce + CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Digital Business',
                  items: ['E-commerce Management', 'Digital Marketing', 'Online Business', 'Social Media Marketing']
                },
                {
                  category: 'Fintech & Banking',
                  items: ['Digital Banking', 'Payment Systems', 'Cryptocurrency', 'Financial Apps']
                },
                {
                  category: 'IT & Business Analysis',
                  items: ['Business Analyst', 'System Analyst', 'ERP Consultant', 'Data Analyst']
                },
                {
                  category: 'Entrepreneurship',
                  items: ['Tech Startups', 'App Development', 'Digital Services', 'Online Platforms']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-cyan-700 text-sm flex items-center">
                        <span className="text-cyan-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-teal-900 mb-6">🎓 Courses After Commerce + CS</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Business & Management',
                  courses: ['B.Com', 'BBA', 'BMS (Management Studies)', 'Digital Marketing']
                },
                {
                  category: 'Computer & IT',
                  courses: ['BCA', 'B.Sc Computer Science', 'B.Sc IT', 'Cyber Security']
                },
                {
                  category: 'Specialized Programs',
                  courses: ['E-commerce', 'Digital Marketing', 'Business Analytics', 'Information Systems']
                },
                {
                  category: 'Professional Courses',
                  courses: ['CA with IT specialization', 'CS with Tech focus', 'Digital Finance courses']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-cyan-500 pl-6">
                  <h3 className="text-xl font-semibold text-cyan-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-teal-900 mb-6">💼 Jobs in J&K</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Sector',
                  jobs: ['IT Assistant (JKSSB)', 'Computer Operator', 'Data Entry Supervisor', 'Digital Services Officer']
                },
                {
                  sector: 'Private IT & Business',
                  jobs: ['Software Developer', 'Business Analyst', 'Digital Marketing Executive', 'E-commerce Manager']
                },
                {
                  sector: 'Banking & Finance',
                  jobs: ['Digital Banking Associate', 'Fintech Analyst', 'Payment Systems Officer', 'Customer Relationship Manager']
                },
                {
                  sector: 'Entrepreneurship & Startups',
                  jobs: ['Tech Startup Founder', 'App Developer', 'Digital Services Provider', 'Online Business Owner']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-cyan-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-cyan-700 flex items-start">
                        <span className="text-cyan-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Commerce + Computer Science</strong> is the perfect combination for the digital age, merging business knowledge with technology skills. 
              It opens doors to <strong>e-commerce, digital marketing, fintech, business analysis, and tech entrepreneurship</strong>. 
              In J&K, this combination is increasingly valuable for <strong>digital business ventures, government IT roles, and modern business solutions</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommerceWithCSPage;