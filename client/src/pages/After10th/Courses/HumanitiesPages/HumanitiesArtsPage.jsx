import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HumanitiesArtsPage = () => {
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
    { id: 'overview', label: 'What is Arts Stream?' },
    { id: 'subjects', label: 'Literature + Fine Arts + History' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 to-fuchsia-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-violet-600 text-white p-3 rounded-lg shadow-lg hover:bg-violet-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-violet-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-violet-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-violet-600 hover:bg-violet-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-violet-900 mb-4">Literature + Fine Arts + History</h1>
            <p className="text-lg text-gray-700">Complete guide for the creative arts combination in Humanities stream</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">📘 What is Arts Stream?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The <strong>Literature + Fine Arts + History</strong> combination focuses on creative expression, 
                cultural studies, and artistic development.
              </p>
              <p>
                This combination nurtures creativity, cultural awareness, and artistic skills while providing 
                historical context and literary appreciation.
              </p>
              <p>
                Perfect for students interested in <strong>creative writing, visual arts, cultural preservation, 
                literature, and artistic careers</strong>.
              </p>
              <div className="bg-fuchsia-50 p-4 rounded-lg border-l-4 border-fuchsia-500">
                <p className="text-fuchsia-800 font-medium">
                  🎯 Ideal for creative minds who want to express themselves through art, literature, and cultural work!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">📚 Creative Arts Combination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-fuchsia-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-violet-500 mr-2">✓</span> English Literature</li>
                  <li className="flex items-center"><span className="text-violet-500 mr-2">✓</span> Fine Arts</li>
                  <li className="flex items-center"><span className="text-violet-500 mr-2">✓</span> History</li>
                  <li className="flex items-center"><span className="text-violet-500 mr-2">✓</span> Optional Language</li>
                  <li className="flex items-center"><span className="text-violet-500 mr-2">✓</span> Optional Creative Subject</li>
                </ul>
              </div>
              <div className="bg-fuchsia-50 p-4 rounded-lg">
                <h4 className="font-semibold text-fuchsia-800 mb-2">Subject Focus:</h4>
                <p className="text-sm text-fuchsia-700 mb-2"><strong>Literature:</strong> Creative writing, literary analysis</p>
                <p className="text-sm text-fuchsia-700 mb-2"><strong>Fine Arts:</strong> Painting, sculpture, visual arts</p>
                <p className="text-sm text-fuchsia-700"><strong>History:</strong> Cultural heritage, art history</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">✅ Advantages of Creative Arts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Creative Expression',
                  desc: 'Develops artistic skills, creativity, and self-expression abilities.'
                },
                {
                  title: 'Cultural Awareness',
                  desc: 'Deep understanding of heritage, traditions, and cultural values.'
                },
                {
                  title: 'Communication Skills',
                  desc: 'Enhances writing, presentation, and artistic communication abilities.'
                },
                {
                  title: 'Unique Career Paths',
                  desc: 'Opens doors to creative industries, media, and cultural organizations.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-violet-50 p-4 rounded-lg border-l-4 border-violet-500">
                  <h3 className="font-semibold text-violet-800 mb-2">{advantage.title}</h3>
                  <p className="text-violet-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">❌ Challenges</h2>
            <div className="space-y-4">
              {[
                'Limited scope in technical and scientific fields',
                'Creative careers may have unpredictable income initially',
                'Requires continuous portfolio development and skill enhancement',
                'May need additional certifications for specialized creative roles'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">🔮 Future Scope of Creative Arts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Creative Industries',
                  items: ['Writer', 'Artist', 'Designer', 'Content Creator']
                },
                {
                  category: 'Media & Entertainment',
                  items: ['Scriptwriter', 'Art Director', 'Creative Director', 'Film Industry']
                },
                {
                  category: 'Cultural Organizations',
                  items: ['Museum Curator', 'Art Gallery Manager', 'Cultural Officer', 'Heritage Specialist']
                },
                {
                  category: 'Education & Academia',
                  items: ['Art Teacher', 'Literature Professor', 'Creative Writing Instructor', 'Cultural Researcher']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-fuchsia-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-fuchsia-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-fuchsia-700 text-sm flex items-center">
                        <span className="text-fuchsia-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-violet-900 mb-6">🎓 Courses After Creative Arts</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Fine Arts Courses',
                  courses: ['BFA (Bachelor of Fine Arts)', 'Applied Arts', 'Visual Arts', 'Sculpture & Painting']
                },
                {
                  category: 'Literature & Writing',
                  courses: ['BA English Literature', 'Creative Writing', 'Journalism', 'Mass Communication']
                },
                {
                  category: 'Cultural Studies',
                  courses: ['Cultural Studies', 'Art History', 'Museum Studies', 'Archaeology']
                },
                {
                  category: 'Digital & Modern Arts',
                  courses: ['Graphic Design', 'Animation', 'Digital Arts', 'Multimedia']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-fuchsia-500 pl-6">
                  <h3 className="text-xl font-semibold text-fuchsia-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-violet-900 mb-6">💼 Jobs in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Cultural & Tourism',
                  jobs: ['Cultural Officer (J&K Tourism)', 'Museum Curator', 'Heritage Site Guide', 'Art Gallery Manager']
                },
                {
                  sector: 'Education & Academia',
                  jobs: ['Art Teacher', 'Literature Teacher', 'Creative Writing Instructor', 'University Lecturer']
                },
                {
                  sector: 'Media & Entertainment',
                  jobs: ['Content Writer', 'Graphic Designer', 'Local Film Industry', 'Radio/TV Creative']
                },
                {
                  sector: 'Freelance & Entrepreneurship',
                  jobs: ['Freelance Artist', 'Art Studio Owner', 'Handicraft Business', 'Cultural Event Organizer']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-fuchsia-50 to-violet-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-fuchsia-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-fuchsia-700 flex items-start">
                        <span className="text-fuchsia-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              The <strong>Literature + Fine Arts + History</strong> combination is perfect for creative students interested in 
              <strong> artistic expression, cultural preservation, and creative careers</strong>. 
              In J&K, with its rich cultural heritage, this combination offers opportunities in 
              <strong> tourism, education, media, and cultural organizations</strong>. 
              It's ideal for students who want to contribute to arts, culture, and creative industries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HumanitiesArtsPage;