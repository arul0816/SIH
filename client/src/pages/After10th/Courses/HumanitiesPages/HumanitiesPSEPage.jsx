import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HumanitiesPSEPage = () => {
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
    { id: 'overview', label: 'What is PSE?' },
    { id: 'subjects', label: 'PSE Combination' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100 font-poppins">
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
            <h1 className="text-4xl font-bold text-emerald-900 mb-4">Psychology, Sociology & Economics</h1>
            <p className="text-lg text-gray-700">Complete guide for the PSE combination in Humanities stream</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">📘 What is PSE Combination?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The <strong>Psychology + Sociology + Economics (PSE)</strong> combination focuses on understanding 
                human behavior, society, and economic patterns.
              </p>
              <p>
                This combination provides insights into individual psychology, social dynamics, and economic systems 
                that govern human societies.
              </p>
              <p>
                Perfect for students interested in <strong>human behavior, social work, mental health, economics, 
                research, and community development</strong>.
              </p>
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <p className="text-teal-800 font-medium">
                  🎯 Ideal for students who want to understand and help people while contributing to social change!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">📚 PSE Combination Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-teal-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Psychology</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Sociology</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Economics</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> English</li>
                  <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Optional Language</li>
                </ul>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-2">Subject Focus:</h4>
                <p className="text-sm text-teal-700 mb-2"><strong>Psychology:</strong> Human behavior, mental processes</p>
                <p className="text-sm text-teal-700 mb-2"><strong>Sociology:</strong> Society, social relationships</p>
                <p className="text-sm text-teal-700"><strong>Economics:</strong> Economic systems, market behavior</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">✅ Advantages of PSE Combination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Human Understanding',
                  desc: 'Deep insights into human behavior, mental health, and social dynamics.'
                },
                {
                  title: 'Diverse Career Options',
                  desc: 'Opens doors to counseling, social work, HR, research, and community development.'
                },
                {
                  title: 'Research Skills',
                  desc: 'Develops analytical and research skills for social and economic studies.'
                },
                {
                  title: 'Social Impact',
                  desc: 'Enables contribution to mental health, social welfare, and policy making.'
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
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">❌ Disadvantages</h2>
            <div className="space-y-4">
              {[
                'Limited scope in technical and pure science fields',
                'Some psychology careers require extensive higher education and specialization',
                'Social work and counseling fields may have emotional demands',
                'Economics without mathematics limits quantitative analysis opportunities'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">🔮 Future Scope of PSE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Mental Health & Counseling',
                  items: ['Clinical Psychologist', 'Counselor', 'Therapist', 'Mental Health Worker']
                },
                {
                  category: 'Social Work & Development',
                  items: ['Social Worker', 'Community Development', 'NGO Work', 'Rural Development']
                },
                {
                  category: 'Human Resources & Management',
                  items: ['HR Manager', 'Organizational Psychologist', 'Training Specialist', 'Employee Counselor']
                },
                {
                  category: 'Research & Academia',
                  items: ['Researcher', 'Professor', 'Policy Analyst', 'Social Scientist']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-teal-700 text-sm flex items-center">
                        <span className="text-teal-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">🎓 Courses After PSE</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Psychology Courses',
                  courses: ['BA Psychology', 'B.Sc Psychology', 'Clinical Psychology', 'Counseling Psychology']
                },
                {
                  category: 'Social Work',
                  courses: ['BSW (Bachelor of Social Work)', 'MSW (Master of Social Work)', 'Community Development', 'Rural Development']
                },
                {
                  category: 'Economics & Management',
                  courses: ['BA Economics', 'BBA', 'Human Resource Management', 'Public Administration']
                },
                {
                  category: 'Specialized Programs',
                  courses: ['Mass Communication', 'Criminology', 'Anthropology', 'Development Studies']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-6">
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">💼 Jobs in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Healthcare & Mental Health',
                  jobs: ['Counselor in hospitals', 'Mental Health Worker', 'Community Health Officer', 'Rehabilitation Specialist']
                },
                {
                  sector: 'Social Welfare & NGOs',
                  jobs: ['Social Welfare Officer', 'NGO Program Manager', 'Community Development Officer', 'Women & Child Development']
                },
                {
                  sector: 'Education & Research',
                  jobs: ['School Counselor', 'Educational Psychologist', 'Research Assistant', 'University Professor']
                },
                {
                  sector: 'Corporate & Private Sector',
                  jobs: ['HR Executive', 'Training Coordinator', 'Market Research Analyst', 'Customer Relations Manager']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Psychology + Sociology + Economics</strong> combination is perfect for students interested in 
              <strong> human behavior, social work, mental health, and community development</strong>. 
              In J&K, this combination offers opportunities in <strong>healthcare, social welfare, education, NGOs, 
              and research</strong>. It's ideal for students who want to make a positive impact on society and help others.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HumanitiesPSEPage;