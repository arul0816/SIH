import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const BioMathPage = () => {
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
    { id: 'overview', label: 'What is Bio-Math?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-emerald-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-green-600 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-green-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-green-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-green-900 mb-4">BIO-MATH Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Biology + Mathematics stream after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">📘 What is Bio-Math?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Bio-Math</strong> means you study <strong>Biology + Mathematics + Physics + Chemistry + English</strong> in Class 11–12.
              </p>
              <p>
                It is a Science stream with both Medical and Non-Medical subjects, providing the ultimate flexibility for career choices.
              </p>
              <p>
                This stream prepares students for both <strong>NEET (medical exams)</strong> and <strong>JEE (engineering exams)</strong>, making it the most comprehensive science combination available.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <p className="text-emerald-800 font-medium">
                  🎯 Perfect for ambitious students who want to keep all doors open and decide their career path later!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700">All Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Biology</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">Stream Benefits:</h4>
                <p className="text-sm text-emerald-700 mb-2">
                  <strong>Medical Sciences:</strong> Biology, Medicine, Healthcare
                </p>
                <p className="text-sm text-emerald-700 mb-2">
                  <strong>Engineering:</strong> Mathematics, Physics, Technology
                </p>
                <p className="text-sm text-emerald-700">
                  <strong>Research:</strong> Biotechnology, Bioinformatics, AI in Healthcare
                </p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">✅ Advantages of Bio-Math</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Maximum Career Options',
                  desc: 'Eligible for both Medical & Engineering fields. MBBS, BDS, B.Tech, B.Sc - all doors open!'
                },
                {
                  title: 'Emerging Field Ready',
                  desc: 'Perfect for Biotechnology, AI in Healthcare, Bioinformatics, and Biomedical Engineering.'
                },
                {
                  title: 'Competitive Exam Advantage',
                  desc: 'Strong base for both NEET and JEE, plus CUET, UPSC science streams.'
                },
                {
                  title: 'Research Opportunities',
                  desc: 'Opens doors to cutting-edge research in life sciences, medical technology, and innovation.'
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">❌ Challenges of Bio-Math</h2>
            <div className="space-y-4">
              {[
                'Very tough workload – covers both NEET and JEE syllabus simultaneously',
                'Requires strong memory (Biology) + analytical skills (Mathematics)',
                'High stress & competition due to limited seats in top medical & engineering colleges',
                'Students weak in either Biology or Mathematics may struggle significantly'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-yellow-800">
                <strong>Note:</strong> This stream requires exceptional dedication and time management skills. Only choose if you're genuinely interested in both fields.
              </p>
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">🔮 Future Scope of Bio-Math</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Medicine & Healthcare',
                  items: ['Doctor', 'Dentist', 'Pharmacist', 'Paramedical', 'Physiotherapist', 'Medical Research']
                },
                {
                  category: 'Engineering & Technology',
                  items: ['Computer Science', 'AI/ML', 'Biomedical Engineering', 'Robotics', 'Civil Engineering']
                },
                {
                  category: 'Biotechnology & Research',
                  items: ['Genetic Engineering', 'Microbiology', 'Bioinformatics', 'Biomedical Sciences', 'Agricultural Research']
                },
                {
                  category: 'Government & Academics',
                  items: ['JKPSC', 'UPSC', 'Defence Technical', 'ISRO', 'DRDO', 'University Professor', 'Research Scientist']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-emerald-700 text-sm flex items-center">
                        <span className="text-emerald-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">🎓 Courses Eligible After Bio-Math</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Medical & Paramedical Courses',
                  courses: ['MBBS, BDS, BAMS, BHMS', 'B.Sc Nursing, B.Pharmacy', 'Physiotherapy, Paramedical courses', 'Veterinary Science']
                },
                {
                  category: 'Engineering & Tech Courses',
                  courses: ['B.Tech (CS, IT, Mechanical, Civil, Electrical, Electronics)', 'AI, Robotics, Biomedical Engineering', 'Biotechnology Engineering']
                },
                {
                  category: 'Science & Research',
                  courses: ['B.Sc (Biotech, Microbiology, Botany, Zoology)', 'B.Sc (Chemistry, Physics, Mathematics)', 'Integrated MSc, Research programs', 'B.Sc Bioinformatics']
                },
                {
                  category: 'Other Professional Options',
                  courses: ['BCA, Data Science, Environmental Science', 'Forensic Science, Agricultural Sciences', 'Defence (NDA), Architecture']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">💼 Jobs Available in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Medical Sector (Govt & Private)',
                  jobs: ['Doctors at GMC Jammu, GMC Srinagar, AIIMS Jammu, District Hospitals', 'Dentists, Pharmacists, Nurses, Lab Technicians, Paramedical Staff', 'Jobs in Health Dept (JKPSC, JKSSB recruitments)']
                },
                {
                  sector: 'Engineering Sector',
                  jobs: ['Govt Engineer posts through JKPSC, PWD, NHPC, JKPDC, BRO', 'IT jobs in Jammu/Srinagar private companies', 'Startups in Robotics, AI, Software, Renewable Energy']
                },
                {
                  sector: 'Research & Education',
                  jobs: ['Scientist roles at SKUAST, Jammu University, Kashmir University, NIT Srinagar', 'Lecturer/Professor after MSc/PhD', 'Medical and Agricultural Research institutions']
                },
                {
                  sector: 'Private & Industry Jobs',
                  jobs: ['Pharma companies, Hospitals, Diagnostic Labs', 'IT firms, Data Analytics, Bio-Tech companies', 'Tourism & Environment-based science projects', 'Biomedical device companies']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-emerald-700 flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Bio-Math after 10th</strong> is a challenging but powerful stream that deals with <strong>Medicine + Engineering + Research</strong> fields. 
              It has huge scope in J&K with opportunities in <strong>medical jobs, government engineering services, university research, IT & startups</strong>. 
              This stream is ideal for ambitious students who want maximum career flexibility and are willing to work hard to achieve their goals in both life sciences and technology.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BioMathPage;