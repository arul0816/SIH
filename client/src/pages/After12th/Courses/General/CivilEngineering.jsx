import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CivilEngineering = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Course Overview', icon: '🏗️' },
    { id: 'eligibility', title: 'Eligibility', icon: '📋' },
    { id: 'subjects', title: 'Subjects', icon: '📚' },
    { id: 'practical', title: 'Lab/Practical Work', icon: '🔧' },
    { id: 'duration', title: 'Duration', icon: '⏱️' },
    { id: 'skills', title: 'Skills Developed', icon: '💡' },
    { id: 'advantages', title: 'Advantages', icon: '✅' },
    { id: 'disadvantages', title: 'Disadvantages', icon: '⚠️' },
    { id: 'future', title: 'Future Scope', icon: '🚀' },
    { id: 'internships', title: 'Internships & Projects', icon: '🎯' },
    { id: 'exams', title: 'Further Studies/Exams', icon: '📝' },
    { id: 'career', title: 'Career Opportunities', icon: '💼' }
  ];

  const civilEngineeringData = {
    overview: [
      "Focuses on designing, constructing, and maintaining infrastructure like roads, bridges, buildings, and dams",
      "Covers structural engineering, transportation, environmental, and geotechnical engineering",
      "Teaches planning and execution of large-scale construction projects",
      "Emphasizes sustainable development and green building practices",
      "Introduces modern construction technologies like BIM and smart materials"
    ],
    eligibility: [
      "10+2 with Physics, Chemistry, and Mathematics (PCM)",
      "Minimum aggregate 50-60% in PCM subjects",
      "Entrance exams like JEE Main, JEE Advanced, state CETs",
      "Some colleges accept direct admission based on 12th marks",
      "Lateral entry available for diploma holders in 2nd year"
    ],
    subjects: [
      "Engineering Mathematics and Applied Mechanics",
      "Structural Analysis and Design (RCC, Steel Structures)",
      "Geotechnical Engineering and Foundation Design",
      "Transportation Engineering and Traffic Management",
      "Environmental Engineering, Water Resources, and Hydraulics"
    ],
    practical: [
      "Surveying lab with modern equipment (Total Station, GPS)",
      "Concrete technology and material testing laboratory",
      "CAD/CAM labs with software like AutoCAD, STAAD Pro, ETABS",
      "Soil mechanics and geotechnical testing facilities",
      "Structural engineering lab for load testing and analysis"
    ],
    duration: [
      "4 years for B.Tech/BE degree, divided into 8 semesters",
      "Each semester includes theory courses, labs, and projects",
      "6-month industrial training/internship in 3rd or 4th year",
      "Final year project spanning 2 semesters",
      "Option for integrated M.Tech (5 years) in some institutes"
    ],
    skills: [
      "Technical drawing and design visualization skills",
      "Project management and cost estimation abilities",
      "Problem-solving for complex structural challenges",
      "Software proficiency in AutoCAD, STAAD Pro, Primavera",
      "Leadership and team coordination for site management"
    ],
    advantages: [
      "High demand in infrastructure development and construction sector",
      "Government job opportunities in PWD, Railways, Defense",
      "Scope for entrepreneurship in construction business",
      "Global opportunities in mega infrastructure projects",
      "Stable career with good growth prospects"
    ],
    disadvantages: [
      "Frequent site visits and outdoor work in harsh conditions",
      "High responsibility for safety and structural integrity",
      "Initial salary may be lower compared to IT sector",
      "Work pressure during project deadlines",
      "Physical demands and safety risks at construction sites"
    ],
    future: [
      "Project Manager or Construction Manager roles",
      "Structural Design Consultant or Chief Engineer",
      "Infrastructure Development Specialist",
      "Green Building Consultant or Sustainability Expert",
      "Government positions like Executive Engineer, Chief Engineer"
    ],
    internships: [
      "Internships with construction companies like L&T, DLF, Shapoorji Pallonji",
      "Projects on structural design and analysis of buildings",
      "Highway and bridge design projects",
      "Smart city and urban planning initiatives",
      "Research projects on sustainable construction materials"
    ],
    exams: [
      "GATE (Graduate Aptitude Test in Engineering) for M.Tech/PSU jobs",
      "IES/ESE (Engineering Services Examination) for government posts",
      "State PSC exams for Assistant Engineer positions",
      "Certifications in software like STAAD Pro, Primavera",
      "PMP (Project Management Professional) certification"
    ],
    career: [
      "Site Engineer, Design Engineer, or Project Engineer",
      "Structural Consultant or Construction Manager",
      "Government Engineer in PWD, Railways, or Defense",
      "Infrastructure Analyst or Urban Planner",
      "Entrepreneur in construction or real estate development"
    ]
  };

  const cardColors = {
    overview: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    eligibility: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    subjects: 'from-green-500/20 to-green-600/20 border-green-500/30',
    practical: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
    duration: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    skills: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    advantages: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
    disadvantages: 'from-red-500/20 to-red-600/20 border-red-500/30',
    future: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
    internships: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    exams: 'from-teal-500/20 to-teal-600/20 border-teal-500/30',
    career: 'from-violet-500/20 to-violet-600/20 border-violet-500/30'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-4"
          >
            B.Tech in Civil Engineering
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center text-blue-100"
          >
            Building the Infrastructure of Tomorrow
          </motion.p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {civilEngineeringData[activeSection].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`bg-gradient-to-br ${cardColors[activeSection]} backdrop-blur-sm rounded-xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Additional Information Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Average Starting Salary</span>
                <span className="font-semibold text-gray-800">₹3.5 - 6 LPA</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Top Recruiters</span>
                <span className="font-semibold text-gray-800">L&T, Tata Projects</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Job Growth Rate</span>
                <span className="font-semibold text-gray-800">8-10% annually</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Higher Study Options</span>
                <span className="font-semibold text-gray-800">M.Tech, MBA, MS</span>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Civil Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Civil Engineering?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Essential role in nation-building and infrastructure development</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Diverse specializations from structures to environmental engineering</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Opportunities in both government and private sectors</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Scope for innovation in sustainable construction</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            to="/courses"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Explore More Engineering Courses
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CivilEngineering;
