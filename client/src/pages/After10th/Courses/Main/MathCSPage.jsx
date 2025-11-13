import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MathCSPage = () => {
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
    { id: 'overview', label: 'What is Math-CS?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
   <div className="min-h-screen bg-gradient-to-r from-blue-50 to-cyan-100 font-poppins">

 {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-10 mt-9 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
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
      className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white shadow-xl z-40 overflow-y-auto rounded-r-2xl"
    >
      <div className="p-6">

        {/* Sidebar Header: Hamburger + Contents */}
        <div className="flex items-center mb-6">
      

          <h3 className="text-3xl font-bold text-blue-900 ml-20 mt-3">
            Contents
          </h3>
        </div>

        {/* Sidebar Items */}
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-cyan-200 text-gray-800 transition-colors duration-300"
          >
            {item.label}
          </button>
        ))}

        <div className="mb-1 pt-2 border-t">
          <Link
            to="/after10th/course"
            className="block w-full py-2 px-2 font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-blue-900 mb-4">MATH-CS Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Mathematics + Computer Science stream after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">📘 What is Math-CS?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Math-CS (Mathematics + Computer Science)</strong> is a Non-Medical Science stream that combines core mathematics with modern computer science and technology.
              </p>
              <p>
                This stream is designed for students who are passionate about logical thinking, problem-solving, and technology innovation. It provides a strong foundation for careers in engineering, software development, data science, and emerging tech fields.
              </p>
              <p>
                Math-CS is ideal for students who want to be part of the digital revolution and contribute to technological advancement in areas like AI, machine learning, robotics, and software engineering.
              </p>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Computer Science</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-800 mb-2">Stream Focus:</h4>
                <p className="text-sm text-cyan-700">
                  Instead of Biology, you study Mathematics + Computer Science together, creating a powerful combination for technology and engineering careers.
                </p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">✅ Advantages of Math-CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Strong Engineering Base',
                  desc: 'Perfect foundation for all engineering fields, especially Computer Science and IT.'
                },
                {
                  title: 'High-Demand Careers',
                  desc: 'Opens doors to globally in-demand careers like AI/ML, Data Science, Software Development.'
                },
                {
                  title: 'Competitive Exam Ready',
                  desc: 'Excellent preparation for JEE, CUET, NDA, and government technical posts.'
                },
                {
                  title: 'Innovation Opportunities',
                  desc: 'Strong base for research, startups, and technological innovation.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-800 mb-2">{advantage.title}</h3>
                  <p className="text-green-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">❌ Disadvantages of Math-CS</h2>
            <div className="space-y-4">
              {[
                'Cannot pursue Medical field (MBBS, BDS, etc.) since Biology is not included',
                'Requires strong logical, analytical, and problem-solving skills',
                'Highly competitive field with rapidly changing technology',
                'Need continuous skill upgrades to stay relevant in tech industry'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">🔮 Future Scope of Math-CS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Engineering Fields',
                  items: ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Robotics']
                },
                {
                  category: 'Computer Science',
                  items: ['AI/ML Engineer', 'Software Developer', 'Data Scientist', 'Cybersecurity']
                },
                {
                  category: 'Research & Innovation',
                  items: ['Space Science', 'Big Data', 'Cloud Computing', 'Quantum Computing']
                },
                {
                  category: 'Government Jobs',
                  items: ['Engineering Services', 'Defence Technical', 'ISRO', 'DRDO', 'NIC']
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
            <h2 className="text-3xl font-bold text-blue-900 mb-6">🎓 Courses Eligible After Math-CS</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Engineering & Tech',
                  courses: ['B.Tech (Computer Science, IT, AI, Robotics, Electronics, Mechanical, Civil, Electrical)', 'Integrated B.Tech + M.Tech']
                },
                {
                  category: 'Computer & IT',
                  courses: ['B.Sc (Computer Science, IT, Data Science, Cybersecurity)', 'BCA (Bachelor of Computer Applications)', 'MCA (after graduation)']
                },
                {
                  category: 'Mathematics & Science',
                  courses: ['B.Sc (Mathematics, Physics, Chemistry)', 'Integrated MSc in Maths/Physics/Computer Science']
                },
                {
                  category: 'Other Options',
                  courses: ['NDA (Defence)', 'Architecture (B.Arch with Maths)', 'Law (through CLAT)', 'Management (BBA, MBA)']
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
            <h2 className="text-3xl font-bold text-blue-900 mb-6">💼 Jobs Available</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Engineering & Technical Jobs (Govt & PSU)',
                  jobs: ['Junior Engineer/Assistant Engineer in PWD, PDD, NHPC, JKPDC (through JKPSC/JKSSB)', 'Scientist/Technical roles in DRDO, ISRO, NIC, J&K IT Dept', 'Defence technical jobs (through NDA/CDS/SSC-Tech)']
                  
                },
                {
                  sector: 'IT & Computer Sector Jobs',
                  jobs: ['Software Developer, Web Developer, Mobile App Developer in IT firms at Jammu/Srinagar', 'Data Analyst, Cloud Engineer, AI/ML Engineer', 'Govt IT jobs (JKSSB Computer Programmer, IT Assistant)']
                },
                {
                  sector: 'Research & Education',
                  jobs: ['Lecturer/Professor roles after MSc/MTech/PhD in Universities like NIT Srinagar, Jammu University, Kashmir University', 'Researcher in Computer Science, Mathematics, AI, or Physics']
                },
                {
                  sector: 'Private & Startup Sector',
                  jobs: ['IT companies in Jammu/Srinagar – programming, networking, cybersecurity', 'Startups in AI, Robotics, E-commerce, Software Services', 'Freelancing in software development and data analytics']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
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
          <section id="summary" className="mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Math-CS stream</strong> after Grade 10 deals with Mathematics, Physics, Chemistry, and Computer Science. 
              It is best for careers in <strong>Engineering, Computer Science, IT, Data Science, and Research</strong>. 
              In J&K, it opens doors to <strong>Government engineering jobs, IT jobs, university research positions, and startup opportunities</strong>.
              This stream is perfect for students who want to be part of the technological revolution and contribute to innovation in the digital age.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MathCSPage;