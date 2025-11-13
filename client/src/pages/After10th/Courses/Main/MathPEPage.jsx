import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MathPEPage = () => {
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
    { id: 'overview', label: 'What is Math-PE?' },
    { id: 'subjects', label: 'Subjects Included' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-lime-100 font-poppins">
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
            className="fixed left-0 top-22 h-[calc(100vh-5rem)] w-80 bg-white shadow-xl z-40 overflow-y-auto"
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
            <h1 className="text-4xl font-bold text-green-900 mb-4">MATH-PE Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Mathematics + Physical Education combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">📘 What is Math-PE?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Math-PE (Mathematics + Physical Education)</strong> is a Non-Medical Science stream that combines core sciences with sports science and fitness studies.
              </p>
              <p>
                This unique combination caters to students who are academically inclined towards mathematics and sciences while maintaining a passion for sports, fitness, and physical wellness.
              </p>
              <p>
                Perfect for students who want to pursue <strong>engineering with sports background, sports science, fitness industry, or sports management</strong>.
              </p>
              <div className="bg-lime-50 p-4 rounded-lg border-l-4 border-lime-500">
                <p className="text-lime-800 font-medium">
                  🎯 Ideal for sports enthusiasts who don't want to compromise on academic excellence!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-lime-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Mathematics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Physical Education</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-lime-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lime-800 mb-2">PE Focus Areas:</h4>
                <p className="text-sm text-lime-700 mb-2">• Sports Science & Biomechanics</p>
                <p className="text-sm text-lime-700 mb-2">• Exercise Physiology</p>
                <p className="text-sm text-lime-700 mb-2">• Nutrition & Fitness</p>
                <p className="text-sm text-lime-700">• Sports Psychology & Management</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">✅ Advantages of Math-PE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Dual Career Paths',
                  desc: 'Opens doors to both engineering and sports science careers.'
                },
                {
                  title: 'Physical & Mental Balance',
                  desc: 'Maintains physical fitness while pursuing academic excellence.'
                },
                {
                  title: 'Sports Quota Opportunities',
                  desc: 'Eligible for sports quota admissions in engineering and other courses.'
                },
                {
                  title: 'Unique Skill Set',
                  desc: 'Rare combination of technical knowledge with sports expertise.'
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">❌ Disadvantages of Math-PE</h2>
            <div className="space-y-4">
              {[
                'Cannot pursue Medical field (MBBS, BDS, etc.) since Biology is not included',
                'Limited computer science depth compared to Math-CS combination',
                'Sports careers can be unpredictable and injury-dependent',
                'Requires maintaining both academic performance and physical fitness'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-900 mb-6">🔮 Future Scope of Math-PE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Engineering & Technology',
                  items: ['Sports Engineering', 'Biomechanical Engineer', 'Fitness Technology', 'Sports Equipment Design']
                },
                {
                  category: 'Sports Science',
                  items: ['Sports Scientist', 'Exercise Physiologist', 'Biomechanics Specialist', 'Fitness Researcher']
                },
                {
                  category: 'Coaching & Training',
                  items: ['Professional Coach', 'Fitness Trainer', 'Sports Analyst', 'Athletic Performance Coach']
                },
                {
                  category: 'Sports Management',
                  items: ['Sports Manager', 'Event Organizer', 'Sports Marketing', 'Facility Manager']
                },
                {
                  category: 'Health & Wellness',
                  items: ['Fitness Consultant', 'Rehabilitation Specialist', 'Wellness Coach', 'Nutritionist']
                },
                {
                  category: 'Defense & Security',
                  items: ['Physical Training Instructor', 'Defense Sports Officer', 'Fitness Assessor', 'Adventure Sports Guide']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-lime-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lime-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-lime-700 text-sm flex items-center">
                        <span className="text-lime-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">🎓 Courses Eligible After Math-PE</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Engineering & Technology',
                  courses: ['B.Tech (any branch via JEE)', 'Sports Engineering', 'Biomedical Engineering', 'Mechanical Engineering (Sports Equipment)']
                },
                {
                  category: 'Sports Science & Education',
                  courses: ['B.P.Ed (Bachelor of Physical Education)', 'B.Sc Sports Science', 'B.Sc Exercise Physiology', 'Sports Management']
                },
                {
                  category: 'Health & Fitness',
                  courses: ['Bachelor in Fitness & Wellness', 'Exercise & Sports Science', 'Physiotherapy', 'Nutrition & Dietetics']
                },
                {
                  category: 'Mathematics & Science',
                  courses: ['B.Sc Mathematics', 'B.Sc Physics', 'B.Sc Chemistry', 'Applied Mathematics']
                },
                {
                  category: 'Professional & Management',
                  courses: ['Sports Management', 'Event Management', 'Adventure Tourism', 'Hospitality with Sports specialization']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-lime-500 pl-6">
                  <h3 className="text-xl font-semibold text-lime-800 mb-3">{courseGroup.category}</h3>
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
                  sector: 'Government Sports & Education',
                  jobs: ['Physical Education Teacher (through JKSSB)', 'Sports Officer (J&K Sports Council)', 'District Sports Officer', 'Adventure Sports Guide (J&K Tourism)']
                },
                {
                  sector: 'Engineering & Technical',
                  jobs: ['Engineer in any field (via JEE/B.Tech)', 'Sports Equipment Technician', 'Facility Design Engineer', 'Biomechanics Analyst']
                },
                {
                  sector: 'Sports & Tourism Industry',
                  jobs: ['Adventure Tourism Guide', 'Skiing Instructor (Gulmarg)', 'Trekking Guide', 'Sports Event Organizer']
                },
                {
                  sector: 'Private Fitness & Wellness',
                  jobs: ['Fitness Trainer', 'Gym Manager', 'Personal Coach', 'Wellness Center Operator']
                },
                {
                  sector: 'Defense & Paramilitary',
                  jobs: ['Physical Training Instructor (Army/Police)', 'Sports Officer in Defense', 'Fitness Assessor', 'Adventure Training Specialist']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-lime-50 to-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-lime-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-lime-700 flex items-start">
                        <span className="text-lime-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Math-PE stream</strong> after Grade 10 uniquely combines science and mathematics with sports science, 
              perfect for <strong>sports enthusiasts who want academic excellence</strong>. 
              It opens doors to <strong>engineering, sports science, fitness industry, and defense services</strong>. 
              In J&K, with its adventure tourism potential and growing sports infrastructure, this combination offers opportunities in 
              <strong>adventure tourism, sports education, fitness industry, and government sports services</strong>. 
              Ideal for students who want to balance physical fitness with academic achievement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MathPEPage;