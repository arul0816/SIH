import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const VocationalComputerPage = () => {
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
    { id: 'overview', label: 'What is Computer Applications?' },
    { id: 'subjects', label: 'Subjects & Skills' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-blue-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-sky-600 text-white p-3 rounded-lg shadow-lg hover:bg-sky-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-sky-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-sky-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-sky-600 hover:bg-sky-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-sky-900 mb-4">Computer Applications - Vocational</h1>
            <p className="text-lg text-gray-700">Complete guide for Computer Applications vocational course after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-6">📘 What is Computer Applications?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Computer Applications</strong> is a practical vocational course focusing on essential computer skills 
                and office applications for immediate job market entry.
              </p>
              <p>
                This course teaches practical computer skills, programming basics, web technology, and database management 
                that are directly applicable in the workplace.
              </p>
              <p>
                Perfect for students who want <strong>immediate employment opportunities, practical IT skills, 
                and entry into the computer/IT sector</strong>.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium">
                  🎯 Ideal for students who want job-ready skills and quick entry into the IT workforce!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-6">📚 Subjects & Skills Covered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Computer Fundamentals</li>
                  <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Programming (Basic)</li>
                  <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Web Technology</li>
                  <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Database Management</li>
                  <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Practical Skills:</h4>
                <p className="text-sm text-blue-700 mb-2">• MS Office Suite (Word, Excel, PowerPoint)</p>
                <p className="text-sm text-blue-700 mb-2">• Basic Programming (C, Python, Java)</p>
                <p className="text-sm text-blue-700 mb-2">• HTML, CSS, JavaScript</p>
                <p className="text-sm text-blue-700">• Database Management (MySQL, Access)</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-6">✅ Advantages of Computer Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Job-Ready Skills',
                  desc: 'Practical skills that are immediately applicable in the workplace.'
                },
                {
                  title: 'Quick Employment',
                  desc: 'Faster entry into IT sector compared to traditional degree paths.'
                },
                {
                  title: 'Industry Relevant',
                  desc: 'Curriculum designed based on current industry requirements.'
                },
                {
                  title: 'Foundation for Growth',
                  desc: 'Strong base for further studies in computer science and IT.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-500">
                  <h3 className="font-semibold text-sky-800 mb-2">{advantage.title}</h3>
                  <p className="text-sky-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-6">❌ Limitations</h2>
            <div className="space-y-4">
              {[
                'Limited scope compared to full computer science degree',
                'Entry-level positions with lower starting salaries initially',
                'Requires continuous skill updates due to rapidly changing technology',
                'May need additional certifications for specialized roles'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-6">🔮 Future Scope</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Office & Administration',
                  items: ['Computer Operator', 'Data Entry Operator', 'Office Assistant', 'Administrative Support']
                },
                {
                  category: 'Web Development',
                  items: ['Web Developer', 'Frontend Developer', 'Website Designer', 'Web Maintainer']
                },
                {
                  category: 'IT Support',
                  items: ['Technical Support', 'Help Desk', 'System Maintenance', 'Network Assistant']
                },
                {
                  category: 'Freelancing',
                  items: ['Freelance Developer', 'Content Management', 'Digital Services', 'Online Tutoring']
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
            <h2 className="text-3xl font-bold text-sky-900 mb-6">🎓 Further Education Options</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Diploma Courses',
                  courses: ['Diploma in Computer Applications', 'Diploma in IT', 'Diploma in Web Designing']
                },
                {
                  category: 'Bachelor Degrees',
                  courses: ['BCA (Bachelor of Computer Applications)', 'B.Sc Computer Science', 'B.Sc IT']
                },
                {
                  category: 'Professional Certifications',
                  courses: ['Microsoft Office Certification', 'Web Development Certificates', 'Database Certifications']
                },
                {
                  category: 'Specialized Courses',
                  courses: ['Digital Marketing', 'Graphic Design', 'Cyber Security Basics', 'Cloud Computing']
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
            <h2 className="text-3xl font-bold text-sky-900 mb-6">💼 Jobs in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Government Sector',
                  jobs: ['Computer Operator (JKSSB)', 'Data Entry Operator', 'IT Assistant', 'Digital Services Support']
                },
                {
                  sector: 'Private Companies',
                  jobs: ['Office Computer Operator', 'Data Processing Executive', 'Customer Support (IT)', 'Web Content Manager']
                },
                {
                  sector: 'IT Companies in J&K',
                  jobs: ['Junior Developer', 'Web Designer', 'Technical Support', 'Quality Assurance Tester']
                },
                {
                  sector: 'Entrepreneurship',
                  jobs: ['Computer Training Center', 'Web Services Provider', 'Digital Services', 'Online Business Support']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 rounded-lg">
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
          <section id="summary" className="mb-12 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Computer Applications</strong> is a practical vocational course that provides 
              <strong> job-ready IT skills for immediate employment</strong>. 
              In J&K's growing IT sector, this course offers opportunities in 
              <strong> government offices, private companies, IT firms, and entrepreneurship</strong>. 
              It's perfect for students who want quick entry into the computer field with practical, applicable skills.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VocationalComputerPage;