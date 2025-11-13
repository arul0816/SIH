import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const BioPsychologyPage = () => {
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
    { id: 'overview', label: 'What is Bio-Psychology?' },
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
            <h1 className="text-4xl font-bold text-purple-900 mb-4">BIO-PSYCHOLOGY Stream Guide</h1>
            <p className="text-lg text-gray-700">Complete guide for Biology + Psychology combination after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">📘 What is Bio-Psychology?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Bio-Psychology (Biology + Psychology)</strong> is a Medical Science stream that combines life sciences with the study of human behavior and mental processes.
              </p>
              <p>
                This combination provides deep insights into the biological basis of behavior, mental health, neuroscience, and the intersection between physical and mental well-being.
              </p>
              <p>
                Perfect for students interested in <strong>medicine, mental health, counseling, neuroscience, and understanding the complex relationship between mind and body</strong>.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <p className="text-indigo-800 font-medium">
                  🎯 Ideal for students who want to understand both the biological and psychological aspects of human health!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">📚 Subjects Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-indigo-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Physics</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Chemistry</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Biology</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> Psychology</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Psychology Focus:</h4>
                <p className="text-sm text-indigo-700 mb-2">• Biological Psychology</p>
                <p className="text-sm text-indigo-700 mb-2">• Cognitive Psychology</p>
                <p className="text-sm text-indigo-700 mb-2">• Abnormal Psychology</p>
                <p className="text-sm text-indigo-700">• Research Methods in Psychology</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">✅ Advantages of Bio-Psychology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Holistic Health Understanding',
                  desc: 'Combines biological and psychological aspects of human health and behavior.'
                },
                {
                  title: 'Mental Health Focus',
                  desc: 'Strong foundation for careers in mental health and counseling.'
                },
                {
                  title: 'Medical Career Ready',
                  desc: 'Excellent preparation for medical studies with added psychological insights.'
                },
                {
                  title: 'Research Opportunities',
                  desc: 'Opens doors to neuroscience, behavioral research, and clinical studies.'
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
            <h2 className="text-3xl font-bold text-purple-900 mb-6">❌ Disadvantages of Bio-Psychology</h2>
            <div className="space-y-4">
              {[
                'Cannot pursue Engineering fields since Mathematics is not included',
                'Psychology careers often require extensive higher education and specialization',
                'Mental health field can be emotionally demanding and challenging',
                'Limited scope in technical and computer science fields'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">🔮 Future Scope of Bio-Psychology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Medical & Healthcare',
                  items: ['Psychiatrist', 'Medical Doctor', 'Neurologist', 'Healthcare Psychologist']
                },
                {
                  category: 'Mental Health Services',
                  items: ['Clinical Psychologist', 'Counselor', 'Therapist', 'Mental Health Counselor']
                },
                {
                  category: 'Research & Academia',
                  items: ['Neuroscience Researcher', 'Behavioral Scientist', 'Psychology Professor', 'Clinical Researcher']
                },
                {
                  category: 'Specialized Psychology',
                  items: ['Neuropsychologist', 'Health Psychologist', 'Rehabilitation Psychologist', 'Forensic Psychologist']
                },
                {
                  category: 'Healthcare Administration',
                  items: ['Mental Health Program Director', 'Healthcare Administrator', 'Patient Care Coordinator', 'Health Policy Analyst']
                },
                {
                  category: 'Community Services',
                  items: ['Community Mental Health Worker', 'Social Worker', 'Crisis Counselor', 'Substance Abuse Counselor']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-indigo-700 text-sm flex items-center">
                        <span className="text-indigo-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-purple-900 mb-6">🎓 Courses Eligible After Bio-Psychology</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Medical Courses',
                  courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing', 'B.Pharmacy']
                },
                {
                  category: 'Psychology Courses',
                  courses: ['BA Psychology', 'B.Sc Psychology', 'Applied Psychology', 'Clinical Psychology']
                },
                {
                  category: 'Life Sciences',
                  courses: ['B.Sc Biology', 'B.Sc Biotechnology', 'B.Sc Microbiology', 'B.Sc Neuroscience']
                },
                {
                  category: 'Interdisciplinary Programs',
                  courses: ['Neuropsychology', 'Health Psychology', 'Behavioral Sciences', 'Cognitive Science']
                },
                {
                  category: 'Professional Programs',
                  courses: ['Social Work (MSW)', 'Counseling Psychology', 'Rehabilitation Sciences', 'Mental Health Studies']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">{courseGroup.category}</h3>
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
                  sector: 'Government Healthcare',
                  jobs: ['Psychiatrist in GMC Jammu/Srinagar', 'Clinical Psychologist in Government Hospitals', 'Mental Health Officer', 'Counselor in Educational Institutions']
                },
                {
                  sector: 'Private Healthcare',
                  jobs: ['Private Practice Psychologist', 'Hospital Counselor', 'Rehabilitation Center Psychologist', 'Mental Health Clinic operator']
                },
                {
                  sector: 'Educational Institutions',
                  jobs: ['School Counselor', 'Educational Psychologist', 'Student Welfare Officer', 'Special Needs Educator']
                },
                {
                  sector: 'Social Services & NGOs',
                  jobs: ['Community Mental Health Worker', 'Trauma Counselor', 'NGO Mental Health Programs', 'Social Welfare Officer']
                },
                {
                  sector: 'Research & Academia',
                  jobs: ['Psychology Research Associate', 'University Psychology Faculty', 'Behavioral Research Analyst', 'Mental Health Policy Researcher']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-indigo-700 flex items-start">
                        <span className="text-indigo-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Bio-Psychology stream</strong> after Grade 10 uniquely combines life sciences with psychology, 
              focusing on <strong>the biological basis of behavior and mental health</strong>. 
              It's perfect for students interested in <strong>medicine, mental health, neuroscience, and counseling</strong>. 
              In J&K, with growing awareness of mental health importance, this combination offers opportunities in 
              <strong>healthcare, education, social services, and research</strong>. 
              Ideal for students who want to contribute to both physical and mental well-being of society.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BioPsychologyPage;