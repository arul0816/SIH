import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const VocationalFashionPage = () => {
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
    { id: 'overview', label: 'What is Fashion Designing?' },
    { id: 'subjects', label: 'Subjects & Skills' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'disadvantages', label: 'Disadvantages' },
    { id: 'scope', label: 'Future Scope' },
    { id: 'courses', label: 'Courses After 12th' },
    { id: 'jobs', label: 'Jobs in J&K' },
    { id: 'summary', label: 'Summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-rose-100 font-poppins">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-27 left-9 z-50 bg-pink-600 text-white p-3 rounded-lg shadow-lg hover:bg-pink-700 transition"
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
              <h3 className="text-3xl font-bold mb-6 ml-15 text-pink-900">Contents</h3>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-3 px-4 mb-2 font-medium rounded-md bg-gray-100 hover:bg-pink-200 text-gray-800 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t">
                <Link
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-600 hover:bg-pink-700 text-white text-center transition"
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
            <h1 className="text-4xl font-bold text-pink-900 mb-4">Fashion Designing - Vocational</h1>
            <p className="text-lg text-gray-700">Complete guide for Fashion Designing vocational course after 10th grade</p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">📘 What is Fashion Designing?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Fashion Designing</strong> is a creative vocational course that combines art, design, and business 
                to create clothing, accessories, and fashion products.
              </p>
              <p>
                This course teaches fashion illustration, textile science, garment construction, pattern making, 
                and fashion business fundamentals.
              </p>
              <p>
                Perfect for students who are <strong>creative, artistic, interested in fashion trends, 
                and want to work in the fashion industry</strong>.
              </p>
              <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500">
                <p className="text-rose-800 font-medium">
                  🎯 Ideal for creative minds who want to express themselves through fashion and design!
                </p>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">📚 Subjects & Skills Covered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-rose-700">Core Subjects:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-pink-500 mr-2">✓</span> Fashion Studies</li>
                  <li className="flex items-center"><span className="text-pink-500 mr-2">✓</span> Textile Science</li>
                  <li className="flex items-center"><span className="text-pink-500 mr-2">✓</span> Design Fundamentals</li>
                  <li className="flex items-center"><span className="text-pink-500 mr-2">✓</span> Business Studies</li>
                  <li className="flex items-center"><span className="text-pink-500 mr-2">✓</span> English</li>
                </ul>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rose-800 mb-2">Practical Skills:</h4>
                <p className="text-sm text-rose-700 mb-2">• Fashion Illustration & Sketching</p>
                <p className="text-sm text-rose-700 mb-2">• Pattern Making & Cutting</p>
                <p className="text-sm text-rose-700 mb-2">• Garment Construction & Sewing</p>
                <p className="text-sm text-rose-700">• Color Theory & Fabric Selection</p>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section id="advantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">✅ Advantages of Fashion Designing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Creative Expression',
                  desc: 'Outlet for artistic creativity and personal style expression.'
                },
                {
                  title: 'Growing Industry',
                  desc: 'Fashion industry is expanding with online retail and designer brands.'
                },
                {
                  title: 'Entrepreneurship Scope',
                  desc: 'Can start own fashion label, boutique, or design studio.'
                },
                {
                  title: 'Traditional Craft Integration',
                  desc: 'J&K\'s rich textile heritage provides unique design opportunities.'
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                  <h3 className="font-semibold text-pink-800 mb-2">{advantage.title}</h3>
                  <p className="text-pink-700 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">❌ Challenges</h2>
            <div className="space-y-4">
              {[
                'Highly competitive industry with irregular income initially',
                'Requires continuous trend research and skill updates',
                'High initial investment for setting up design studio or boutique',
                'Seasonal nature of fashion business affects income stability'
              ].map((disadvantage, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700">{disadvantage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope Section */}
          <section id="scope" className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">🔮 Future Scope in Fashion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Design & Creation',
                  items: ['Fashion Designer', 'Costume Designer', 'Textile Designer', 'Pattern Maker']
                },
                {
                  category: 'Fashion Business',
                  items: ['Fashion Stylist', 'Fashion Merchandiser', 'Boutique Owner', 'Fashion Consultant']
                },
                {
                  category: 'Media & Entertainment',
                  items: ['Fashion Illustrator', 'Fashion Photographer', 'Fashion Blogger', 'Runway Coordinator']
                },
                {
                  category: 'Traditional & Cultural',
                  items: ['Traditional Wear Designer', 'Handicraft Designer', 'Cultural Costume Specialist', 'Heritage Fashion']
                }
              ].map((scope, index) => (
                <div key={index} className="bg-rose-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-rose-800 mb-3">{scope.category}</h3>
                  <ul className="space-y-1">
                    {scope.items.map((item, i) => (
                      <li key={i} className="text-rose-700 text-sm flex items-center">
                        <span className="text-rose-500 mr-2">•</span>
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
            <h2 className="text-3xl font-bold text-pink-900 mb-6">🎓 Further Education Options</h2>
            <div className="space-y-6">
              {[
                {
                  category: 'Diploma Courses',
                  courses: ['Diploma in Fashion Design', 'Diploma in Textile Design', 'Diploma in Garment Technology']
                },
                {
                  category: 'Bachelor Degrees',
                  courses: ['B.Des Fashion Design', 'B.Sc Fashion & Apparel Design', 'B.Sc Textile Engineering']
                },
                {
                  category: 'Specialized Courses',
                  courses: ['Fashion Merchandising', 'Fashion Styling', 'Fashion Photography', 'Fashion Marketing']
                },
                {
                  category: 'Professional Certification',
                  courses: ['Fashion CAD/Design Software', 'Pattern Making Certification', 'Fashion Business Management']
                }
              ].map((courseGroup, index) => (
                <div key={index} className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold text-rose-800 mb-3">{courseGroup.category}</h3>
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
            <h2 className="text-3xl font-bold text-pink-900 mb-6">💼 Jobs in Jammu & Kashmir</h2>
            <div className="space-y-6">
              {[
                {
                  sector: 'Traditional Crafts & Handicrafts',
                  jobs: ['Traditional Wear Designer', 'Handicraft Designer', 'Carpet Design Specialist', 'Pashmina Shawl Designer']
                },
                {
                  sector: 'Fashion Industry',
                  jobs: ['Fashion Designer', 'Boutique Owner', 'Fashion Stylist', 'Custom Tailor/Designer']
                },
                {
                  sector: 'Tourism & Hospitality',
                  jobs: ['Costume Designer for Cultural Shows', 'Hotel Fashion Consultant', 'Traditional Attire Specialist', 'Cultural Tourism Designer']
                },
                {
                  sector: 'Entrepreneurship',
                  jobs: ['Fashion Boutique', 'Online Fashion Store', 'Wedding Wear Designer', 'Traditional Craft Business']
                }
              ].map((jobGroup, index) => (
                <div key={index} className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">{jobGroup.sector}</h3>
                  <ul className="space-y-2">
                    {jobGroup.jobs.map((job, i) => (
                      <li key={i} className="text-rose-700 flex items-start">
                        <span className="text-rose-500 mr-2 mt-1">✓</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <section id="summary" className="mb-12 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">✅ Summary</h2>
            <p className="text-lg leading-relaxed">
              <strong>Fashion Designing</strong> is a creative vocational course perfect for artistic students interested in 
              <strong> fashion, design, and creative expression</strong>. 
              In J&K, with its rich textile heritage (Pashmina, traditional crafts), this field offers unique opportunities in 
              <strong> traditional wear design, handicrafts, tourism, and entrepreneurship</strong>. 
              It's ideal for students who want to combine creativity with business skills.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VocationalFashionPage;