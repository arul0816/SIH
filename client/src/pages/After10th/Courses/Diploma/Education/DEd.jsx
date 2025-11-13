import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DEd = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const courseData = {
    title: "D.Ed (Diploma in Education)",
    icon: "🎓",
    duration: "2 years (4 semesters)",
    eligibility: "10+2 (Senior Secondary) pass from CBSE/JKBOSE, Minimum 50% marks",
    
    overview: {
      description: "Focuses on teaching skills, pedagogy, and classroom management. Prepares students to become primary and elementary school teachers. Covers educational psychology, curriculum planning, and teaching methodology.",
      keyFeatures: [
        "Direct eligibility to work as primary/elementary teacher",
        "Government and private school job opportunities",
        "Foundation for further studies (B.Ed, M.Ed)",
        "Early career start in teaching profession",
        "Develops communication, leadership, and interpersonal skills"
      ]
    },

    subjects: [
      "Child Development & Pedagogy",
      "Educational Psychology",
      "Teaching Methodology",
      "Curriculum & Instructional Planning",
      "Language & Communication Skills",
      "Assessment & Evaluation Techniques",
      "Computer Applications in Education"
    ],

    labs: [
      {
        name: "Teaching Practice / Internship",
        description: "Conducting mock classes in schools"
      },
      {
        name: "Educational Technology Lab", 
        description: "Using smart boards, projectors, and teaching software"
      },
      {
        name: "Observational Practice",
        description: "Classroom observation under mentor supervision"
      }
    ],

    skills: [
      "Classroom management & lesson planning",
      "Teaching strategies for primary & elementary students",
      "Use of educational technology tools",
      "Student assessment & evaluation",
      "Communication & presentation skills"
    ],

    advantages: [
      "Direct eligibility to work as primary/elementary school teacher",
      "Government & private school jobs available",
      "Foundation for further studies (B.Ed, M.Ed)",
      "Early career start in teaching",
      "Develops communication, leadership, and interpersonal skills"
    ],

    disadvantages: [
      "Salary may be lower initially compared to higher degrees",
      "Career growth limited without further studies (B.Ed, M.Ed)",
      "Requires patience and continuous skill development",
      "Teaching jobs may be competitive in urban areas"
    ],

    futureScope: [
      "Elementary / Primary School Teacher",
      "Lateral entry to B.Ed → M.Ed → Senior Teacher, School Administrator",
      "Educational consultancy & private tutoring",
      "Teacher training programs & NGO education initiatives"
    ],

    careerOpportunities: [
      "Primary / Elementary School Teacher",
      "Tutor / Private Educator",
      "Curriculum Developer",
      "Teacher Trainer (after experience)",
      "Educational Consultant in schools or NGOs"
    ],

    examsEligible: [
      "Eligibility for B.Ed programs in India",
      "Jobs in government & private schools as primary/elementary teacher",
      "Optional certification courses in special education, Montessori, or computer education"
    ]
  };

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'subjects', name: 'Subjects', icon: '📚' },
    { id: 'labs', name: 'Practical Training', icon: '🎯' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'career', name: 'Career', icon: '💼' },
    { id: 'future', name: 'Future Scope', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-poppins">
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-15 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
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
            className="fixed left-0 top-[8rem] h-[80vh] w-80 bg-white/90 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Navigation</h3>
              
              {/* Course Sections */}
              <div className="space-y-2 mb-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                <Link
                  to="/after10th/diploma"
                  className="block w-full py-2 px-4 text-center bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200"
                >
                  📜 Back to Diplomas
                </Link>
                <Link
                  to="/after-10th"
                  className="block w-full py-2 px-4 text-center bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg border border-pink-200"
                >
                  🏠 Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} p-8`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{courseData.icon}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{courseData.title}</h1>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>📅 {courseData.duration}</span>
            <span>🎓 {courseData.eligibility}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {activeSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{courseData.overview.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                                {courseData.overview.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'subjects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Subjects Covered</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {courseData.subjects.map((subject, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <span className="text-purple-800 font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'labs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Practical Training</h2>
              <div className="space-y-4">
                {courseData.labs.map((lab, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">{lab.name}</h3>
                    <p className="text-gray-600">{lab.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills You'll Gain</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-4">Teaching Skills</h3>
                  <div className="space-y-2">
                    {courseData.skills.map((skill, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">🎓</span>
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Advantages</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    {courseData.advantages.map((advantage, index) => (
                      <li key={index}>• {advantage}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Challenges</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    {courseData.disadvantages.map((disadvantage, index) => (
                      <li key={index}>• {disadvantage}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'career' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Career Opportunities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {courseData.careerOpportunities.map((career, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">🎓</span>
                      <span className="font-medium text-purple-800">{career}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Exams & Further Studies</h3>
                <div className="space-y-3">
                  {courseData.examsEligible.map((exam, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <span className="text-gray-700">{exam}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'future' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Future Scope (5-10 years)</h2>
              <div className="space-y-4">
                {courseData.futureScope.map((scope, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span className="text-gray-700">{scope}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">💡 Pro Tip</h3>
                <p className="text-green-700">
                  Teaching is a noble profession with growing opportunities in both government and private sectors. 
                  Consider pursuing B.Ed after D.Ed for better career advancement and higher salary prospects. 
                  Specializing in areas like special education or educational technology can open additional opportunities.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DEd;