import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CommerceWithEntrepreneurshipPage = () => {
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
    { id: 'overview', label: 'What is Entrepreneurship?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-indigo-600 text-white p-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-indigo-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-indigo-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-indigo-900 mb-4">Commerce with Entrepreneurship</h1>
            <p className="text-lg text-gray-700">Complete guide for Commerce + Entrepreneurship combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">📘 What is Entrepreneurship?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Commerce + Entrepreneurship</strong> focuses on business creation, innovation, startup development, and self-employment opportunities.
              </p>
              <p>
                This combination teaches students how to identify opportunities, create business plans, manage resources, and build successful enterprises.
              </p>
              <p>
                Perfect for students who want to <strong>start their own business, become job creators, innovate, and contribute to economic development</strong>.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-purple-800 font-medium">
                  🎯 Especially valuable in J&K with government support for entrepreneurship and startup ecosystem!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">📚 Subjects in Commerce + Entrepreneurship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-indigo-500 mr-2">✓</span> Accountancy</li>
                  <li className="flex items-center"><span className="text-indigo-500 mr-2">✓</span> Business Studies</li>
                  <li className="flex items-center"><span className="text-indigo-500 mr-2">✓</span> Economics</li>
                  <li className="flex items-center"><span className="text-indigo-500 mr-2">✓</span> Entrepreneurship</li>
                  <li className="flex items-center"><span className="text-indigo-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Entrepreneurship Focus:</h4>
                <p className="text-sm text-purple-700 mb-2">• Business Plan Development</p>
                <p className="text-sm text-purple-700 mb-2">• Innovation & Creativity</p>
                <p className="text-sm text-purple-700 mb-2">• Market Research & Analysis</p>
                <p className="text-sm text-purple-700">• Financial Planning & Management</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">✅ Advantages of Commerce + Entrepreneurship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Business Creation Skills',
                  desc: 'Learn to identify opportunities, create business plans, and start ventures.'
                },
                {
                  title: 'Government Support',
                  desc: 'J&K offers various entrepreneurship schemes, funding, and startup support.'
                },
                {
                  title: 'Job Creator Mindset',
                  desc: 'Become an employer rather than employee, contributing to economic growth.'
                },
                {
                  title: 'Innovation Focus',
                  desc: 'Develop creative thinking and problem-solving skills for business challenges.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-800 mb-2">{advantage.title}</h3>
                  <p className="text-indigo-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">❌ Challenges</h2>
            <div className="space-y-4">
              {[
                'Higher risk compared to traditional employment paths',
                'Requires significant self-motivation and persistence',
                'Initial capital and funding challenges for startups',
                'Market uncertainties and business failure risks'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-yellow-800">
                <strong>Note:</strong> J&K government provides various schemes like PMEGP, Stand-Up India, and state entrepreneurship policies to support young entrepreneurs.
              </p>
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">🔮 Future Scope in J&K</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Tourism & Hospitality',
                  items: ['Eco-tourism ventures', 'Homestays & Hotels', 'Adventure tourism', 'Cultural tourism']
                },
                {
                  category: 'Agriculture & Food',
                  items: ['Agri-business', 'Food processing', 'Organic farming', 'Saffron & dry fruits']
                },
                {
                  category: 'Handicrafts & Arts',
                  items: ['Traditional crafts', 'Carpet weaving', 'Woodwork', 'Papier-mâché']
                },
                {
                  category: 'Technology & Services',
                  items: ['IT services', 'E-commerce', 'Digital marketing', 'Online education']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-purple-700 text-sm flex items-center">
                        <span className="text-purple-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">🎓 Courses After Commerce + Entrepreneurship</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Business & Management',
                  courses: ['B.Com', 'BBA', 'BMS', 'Entrepreneurship Programs']
                },
                {
                  category: 'Specialized Programs',
                  courses: ['Startup Programs', 'Business Incubation', 'Innovation Management', 'Family Business Management']
                },
                {
                  category: 'Skill Development',
                  courses: ['Digital Marketing', 'E-commerce', 'Business Analytics', 'Project Management']
                },
                {
                  category: 'Government Schemes',
                  courses: ['PMKVY courses', 'Skill India programs', 'MUDRA loan schemes', 'Startup India initiatives']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">💼 Opportunities in J&K</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Self Employment',
                  jobs: ['Business Owner', 'Startup Founder', 'Freelancer', 'Consultant']
                },
                {
                  sector: 'Tourism Industry',
                  jobs: ['Hotel/Resort Owner', 'Travel Agency', 'Adventure Sports', 'Tour Operations']
                },
                {
                  sector: 'Agriculture & Food',
                  jobs: ['Agri-business Owner', 'Food Processing Unit', 'Organic Farming', 'Export Business']
                },
                {
                  sector: 'Support Organizations',
                  jobs: ['Business Development Officer', 'Incubation Manager', 'Startup Mentor', 'Investment Analyst']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-purple-700 flex items-start">
                        <span className="text-purple-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Commerce + Entrepreneurship</strong> prepares students to become job creators and business innovators. 
              With <strong>government support, rich natural resources, and growing markets</strong>, J&K offers excellent opportunities for 
              young entrepreneurs in <strong>tourism, agriculture, handicrafts, and technology sectors</strong>. 
              This combination develops the mindset and skills needed to build successful businesses and contribute to regional economic development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommerceWithEntrepreneurshipPage;