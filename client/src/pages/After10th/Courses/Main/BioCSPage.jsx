import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const BioCSPage = () => {
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
    { id: 'overview', label: 'What is Bio-CS?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-purple-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-purple-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-purple-600 hover:bg-purple-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-purple-900 mb-4">BIO-CS Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Biology + Computer Science stream after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">📘 What is Bio-CS?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Bio-CS (Biology + Computer Science)</strong> is a combination in the Science stream where students study:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Biology</li>
                <li>Computer Science</li>
                <li>English</li>
              </ul>
              <p>
                Instead of Mathematics, you take Computer Science along with Biology. This stream is best for students interested in <strong>Life Sciences + Technology/Computers</strong>.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <p className="text-pink-800 font-medium">
                  🎯 Perfect blend of biological sciences and modern technology for healthcare and research innovation!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-pink-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Biology</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Computer Science</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">Stream Combinations:</h4>
                <p className="text-sm text-pink-700 mb-2">
                  <strong>Biology & Life Sciences:</strong> Medicine, Biotechnology, Genetics
                </p>
                <p className="text-sm text-pink-700 mb-2">
                  <strong>Computer Science:</strong> Programming, IT, Data Science
                </p>
                <p className="text-sm text-pink-700">
                  <strong>Interdisciplinary:</strong> Bioinformatics, Computational Biology, Biomedical Engineering
                </p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">✅ Advantages of Bio-CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Perfect for Non-Math Students',
                  desc: 'Good for students interested in Biology but not strong in Mathematics.'
                },
                {
                  title: 'Medical + Tech Combination',
                  desc: 'Opens up Medical fields plus tech-related careers without engineering through JEE.'
                },
                {
                  title: 'Emerging Career Fields',
                  desc: 'Excellent for Bioinformatics, Data Analysis in Healthcare, Biomedical research.'
                },
                {
                  title: 'Balanced Skill Set',
                  desc: 'Develops both biological knowledge and essential computer/IT skills.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-800 mb-2">{advantage.title}</h3>
                  <p className="text-purple-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">❌ Disadvantages of Bio-CS</h2>
            <div className="space-y-4">
              {[
                'Cannot apply for Engineering (JEE/B.Tech core) since Mathematics is missing',
                'Career options are narrower compared to Bio-Math combination',
                'Some competitive exams require Mathematics, limiting opportunities',
                'Needs strong interest in both computers and biology to succeed effectively'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">🔮 Future Scope of Bio-CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Medical Field',
                  items: ['MBBS', 'BDS', 'BAMS', 'Nursing', 'Pharmacy', 'Paramedical courses']
                },
                {
                  category: 'Computer & IT Field',
                  items: ['BCA', 'B.Sc Computer Science', 'Software Development', 'Web Development']
                },
                {
                  category: 'Biotech & Research',
                  items: ['Bioinformatics', 'Computational Biology', 'Biomedical Science', 'Medical Research']
                },
                {
                  category: 'Healthcare Technology',
                  items: ['AI in Healthcare', 'Medical Data Analysis', 'Hospital IT systems', 'Health Informatics']
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
            <h2 className="text-3xl font-bold text-purple-900 mb-6">🎓 Courses Eligible After Bio-CS</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Medical & Paramedical',
                  courses: ['MBBS, BDS, BAMS, BHMS', 'B.Sc Nursing, B.Pharmacy', 'Physiotherapy, Paramedical courses']
                },
                {
                  category: 'Computer/IT',
                  courses: ['BCA, B.Sc (Computer Science, IT, Data Science)', 'Cyber Security, Software Development']
                },
                {
                  category: 'Life Sciences',
                  courses: ['B.Sc (Biotechnology, Microbiology, Genetics)', 'B.Sc (Zoology, Botany, Environmental Science)']
                },
                {
                  category: 'Interdisciplinary',
                  courses: ['B.Sc Bioinformatics, Biomedical Science', 'Biostatistics, Health Informatics']
                },
                {
                  category: 'Other Options',
                  courses: ['Law, BBA, Hotel Management', 'Tourism (via CUET or direct admission)']
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
            <h2 className="text-3xl font-bold text-purple-900 mb-6">💼 Jobs Available in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Medical Sector (Govt & Private)',
                  jobs: ['Doctors, Dentists, Nurses, Pharmacists in GMC Jammu/Srinagar, AIIMS Jammu', 'District Hospitals, Paramedical staff and lab technicians through JKSSB']
                },
                {
                  sector: 'Computer/IT Sector',
                  jobs: ['IT jobs in Jammu/Srinagar software firms (programmer, web developer, data analyst)', 'Govt IT posts (NIC, J&K IT Dept, JKSSB IT Assistant)', 'Cyber Security & Networking jobs']
                },
                {
                  sector: 'Research & Academia',
                  jobs: ['Bioinformatics researcher at SKUAST, Kashmir University, Jammu University, NIT Srinagar', 'Teaching jobs in schools/colleges after higher education']
                },
                {
                  sector: 'Private Sector & Startups',
                  jobs: ['Hospital IT management, Medical Data Analyst', 'Biotech and Pharma industry jobs', 'Entrepreneurship in IT services, e-health, diagnostics']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
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
          <section id="summary" className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Bio-CS stream</strong> after Grade 10 is for students who want a mix of Biology and Computer Science. 
              It deals with <strong>medicine, IT, and bioinformatics</strong> fields. In J&K, it leads to jobs in 
              <strong> medical services, IT companies, research institutions, universities, and startups</strong>. 
              This stream is ideal for students who want to combine life sciences with modern technology.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BioCSPage;