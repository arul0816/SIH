import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HumanitiesHPGPage = () => {
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
    { id: 'overview', label: 'What is Humanities?' },
    { id: 'subjects', label: 'HPG Combination' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-50 to-pink-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-rose-600 text-white p-3 rounded-lg shadow-lg hover:bg-rose-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-rose-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-rose-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-rose-900 mb-4">Humanities - History, Political Science & Geography</h1>
            <p className="text-lg text-gray-700">Complete guide for the classic HPG combination in Humanities stream</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-rose-900 mb-6">📘 What is Humanities?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Humanities</strong> is a stream focused on arts, social sciences, culture, history, law, and human society.
              </p>
              <p>
                The <strong>History + Political Science + Geography (HPG)</strong> combination is the classic humanities combination 
                that provides deep understanding of human civilization, governance systems, and our planet.
              </p>
              <p>
                This combination prepares students for careers in <strong>civil services, teaching, law, journalism, administration, and public policy</strong>.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <p className="text-pink-800 font-medium">
                  🎯 Perfect for students who want to understand society, governance, and contribute to public service!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-rose-900 mb-6">📚 HPG Combination Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-pink-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-rose-500 mr-2">✓</span> History</li>
                  <li className="flex items-center"><span className="text-rose-500 mr-2">✓</span> Political Science</li>
                  <li className="flex items-center"><span className="text-rose-500 mr-2">✓</span> Geography</li>
                  <li className="flex items-center"><span className="text-rose-500 mr-2">✓</span> English</li>
                  <li className="flex items-center"><span className="text-rose-500 mr-2">✓</span> Optional Language</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">Subject Focus:</h4>
                <p className="text-sm text-pink-700 mb-2"><strong>History:</strong> Ancient, Medieval, Modern History</p>
                <p className="text-sm text-pink-700 mb-2"><strong>Political Science:</strong> Government systems, Constitution</p>
                <p className="text-sm text-pink-700"><strong>Geography:</strong> Physical, Human, Economic Geography</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-rose-900 mb-6">✅ Advantages of HPG Combination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Civil Services Ready',
                  desc: 'Perfect preparation for UPSC, JKPSC, and other administrative service exams.'
                },
                {
                  title: 'Comprehensive Knowledge',
                  desc: 'Develops understanding of history, governance, and geographical factors.'
                },
                {
                  title: 'Communication Skills',
                  desc: 'Enhances writing, analytical, and critical thinking abilities.'
                },
                {
                  title: 'Flexible Career Options',
                  desc: 'Opens doors to law, journalism, teaching, research, and administration.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500">
                  <h3 className="font-semibold text-rose-800 mb-2">{advantage.title}</h3>
                  <p className="text-rose-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-rose-900 mb-6">❌ Disadvantages</h2>
            <div className="space-y-4">
              {[
                'Limited scope in science and technology-related fields',
                'Requires excellent writing and memorization skills for exams',
                'Some careers require long-term study and competitive examinations',
                'Misconception of being an "easy stream" sometimes reduces societal perception'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-rose-900 mb-6">🔮 Future Scope of HPG</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Government Administration',
                  items: ['Civil Services (IAS, IPS, IFS)', 'JKPSC', 'UPSC', 'Administrative Services']
                },
                {
                  category: 'Law & Legal Services',
                  items: ['Advocate', 'Judge', 'Legal Advisor', 'Constitutional Law']
                },
                {
                  category: 'Education & Research',
                  items: ['Teacher', 'Professor', 'Researcher', 'Educational Administration']
                },
                {
                  category: 'Media & Communication',
                  items: ['Journalist', 'Political Reporter', 'Content Writer', 'Policy Analyst']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-pink-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-pink-700 text-sm flex items-center">
                        <span className="text-pink-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-rose-900 mb-6">🎓 Courses After HPG</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Undergraduate Courses',
                  courses: ['BA (History, Political Science, Geography)', 'BA LLB (Law)', 'BJMC (Journalism & Mass Communication)', 'BA Public Administration']
                },
                {
                  category: 'Professional Courses',
                  courses: ['Civil Services Preparation', 'Law (LLB)', 'Journalism courses', 'Public Administration']
                },
                {
                  category: 'Education & Teaching',
                  courses: ['B.Ed (Bachelor of Education)', 'Teaching Training courses', 'Educational Administration']
                },
                {
                  category: 'Specialized Programs',
                  courses: ['International Relations', 'Public Policy', 'Development Studies', 'Archaeological Studies']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-pink-500 pl-6">
                  <h3 className="text-xl font-semibold text-pink-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-rose-900 mb-6">💼 Jobs in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Sector',
                  jobs: ['KAS (Kashmir Administrative Service)', 'Tehsildar, Naib Tehsildar', 'Block Development Officer', 'District Collector Assistant']
                },
                {
                  sector: 'Education Sector',
                  jobs: ['Government Teacher (through JKSSB)', 'Lecturer in colleges', 'Principal/Headmaster', 'Education Department Officer']
                },
                {
                  sector: 'Legal & Judicial',
                  jobs: ['Advocate in J&K High Court', 'District Courts', 'Legal Advisor in Government', 'Judicial Services']
                },
                {
                  sector: 'Media & Tourism',
                  jobs: ['Local Journalist/Reporter', 'Tourism Officer', 'Cultural Officer', 'Heritage Conservation']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-pink-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-pink-700 flex items-start">
                        <span className="text-pink-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>History + Political Science + Geography</strong> combination is the classic humanities stream 
              for students interested in <strong>civil services, law, teaching, journalism, and administration</strong>. 
              In J&K, this combination provides excellent opportunities in <strong>government jobs, education sector, 
              legal profession, and cultural preservation</strong>. It's ideal for students who want to contribute to 
              society through public service and governance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HumanitiesHPGPage;