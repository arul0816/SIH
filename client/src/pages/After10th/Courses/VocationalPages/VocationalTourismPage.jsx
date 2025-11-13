import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const VocationalTourismPage = () => {
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
    { id: 'overview', label: 'What is Travel & Tourism?' },
    { id: 'subjects', label: 'Subjects & Skills' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope in J&K' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-green-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-emerald-600 text-white p-3 rounded-lg shadow-lg hover:bg-emerald-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-emerald-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-emerald-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-emerald-900 mb-4">Travel & Tourism - Vocational</h1>
            <p className="text-lg text-gray-700">Complete guide for Travel & Tourism vocational course after 10th grade in J&K</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">📘 What is Travel & Tourism?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Travel & Tourism</strong> is a vocational course designed to prepare students for careers in 
                one of the world's fastest-growing industries.
              </p>
              <p>
                This course covers tourism management, hospitality, travel planning, customer service, 
                cultural awareness, and business operations in the tourism sector.
              </p>
              <p>
                <strong>Perfect for J&K students</strong> given the region's immense tourism potential with its natural beauty, 
                cultural heritage, and adventure tourism opportunities.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800 font-medium">
                  🎯 Ideal for J&K students - Tourism is the backbone of Kashmir's economy with huge growth potential!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">📚 Subjects & Skills Covered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Tourism Management</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Geography</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Languages</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Hospitality</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Business Studies</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Practical Skills:</h4>
                <p className="text-sm text-green-700 mb-2">• Tour Planning & Operations</p>
                <p className="text-sm text-green-700 mb-2">• Customer Service & Communication</p>
                <p className="text-sm text-green-700 mb-2">• Cultural Awareness & Heritage</p>
                <p className="text-sm text-green-700">• Travel Documentation & Booking</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">✅ Advantages for J&K Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Natural Advantage',
                  desc: 'J&K is a prime tourist destination with natural beauty and cultural heritage.'
                },
                {
                  title: 'Government Support',
                  desc: 'Tourism development is a government priority with various schemes and support.'
                },
                {
                  title: 'Local Knowledge',
                  desc: 'Native understanding of local culture, geography, and tourist attractions.'
                },
                {
                  title: 'Growing Industry',
                  desc: 'Tourism sector is expanding rapidly with infrastructure development.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="font-semibold text-emerald-800 mb-2">{advantage.title}</h3>
                  <p className="text-emerald-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">❌ Challenges</h2>
            <div className="space-y-4">
              {[
                'Seasonal nature of tourism affects employment and income',
                'Political situations can impact tourist flow',
                'Weather dependency for outdoor tourism activities',
                'Need for continuous skill updates and language learning'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">🔮 Future Scope in J&K Tourism</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Adventure Tourism',
                  items: ['Trekking Guide', 'Skiing Instructor', 'River Rafting Guide', 'Mountain Climbing Guide']
                },
                {
                  category: 'Cultural Tourism',
                  items: ['Heritage Guide', 'Cultural Tour Operator', 'Traditional Arts Promoter', 'Religious Tourism Guide']
                },
                {
                  category: 'Hospitality Services',
                  items: ['Hotel Management', 'Homestay Operations', 'Restaurant Management', 'Travel Desk Operations']
                },
                {
                  category: 'Digital Tourism',
                  items: ['Online Travel Planning', 'Digital Marketing for Tourism', 'Virtual Tour Creator', 'Social Media Tourism Promoter']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-green-700 text-sm flex items-center">
                        <span className="text-green-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">🎓 Further Education Options</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Tourism Management',
                  courses: ['Bachelor in Tourism Management', 'Hotel Management', 'Hospitality Management']
                },
                {
                  category: 'Specialized Tourism',
                  courses: ['Adventure Tourism', 'Eco-tourism', 'Cultural Tourism', 'Medical Tourism']
                },
                {
                  category: 'Business & Management',
                  courses: ['Travel & Tourism Business', 'Event Management', 'Airline & Airport Management']
                },
                {
                  category: 'Skill Development',
                  courses: ['Tourist Guide Certification', 'Hospitality Skills', 'Language Courses', 'Adventure Sports Certification']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">💼 Jobs in Jammu & Kashmir Tourism</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Tourism Sector',
                  jobs: ['Tourism Officer (J&K Tourism Dept)', 'Tourist Information Officer', 'Tourism Development Officer', 'Cultural Tourism Coordinator']
                },
                {
                  sector: 'Private Tourism Industry',
                  jobs: ['Tour Guide', 'Travel Agent', 'Hotel/Resort Manager', 'Tour Operator']
                },
                {
                  sector: 'Adventure & Sports Tourism',
                  jobs: ['Adventure Guide', 'Skiing Instructor', 'Trekking Guide', 'Water Sports Instructor']
                },
                {
                  sector: 'Entrepreneurship',
                  jobs: ['Travel Agency Owner', 'Homestay Business', 'Adventure Tour Company', 'Cultural Experience Provider']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-green-700 flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Travel & Tourism</strong> is an excellent vocational choice for J&K students given the region's 
              <strong> natural beauty, cultural heritage, and tourism potential</strong>. 
              With government focus on tourism development, this field offers opportunities in 
              <strong> adventure tourism, cultural tourism, hospitality, and entrepreneurship</strong>. 
              It's perfect for students who love their region and want to showcase its beauty to the world while building a career.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VocationalTourismPage;