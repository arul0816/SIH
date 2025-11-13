import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const After10th = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const floatingElements = ["🎨", "🔬", "💻", "📊", "🎭", "🏛️", "⚡", "🧬", "💼"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-4xl opacity-20 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-6 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>
          
      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/95 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">
                  Menu
                </h3>
              </div>

              {/* Enhanced Navigation Links */}
              <Link
                to="/after10th/course"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-center transition backdrop-blur-sm border border-yellow-300"
              >
                📚 Explore All Streams
              </Link>

              <Link
                to="/after10th/scholarship"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-center transition backdrop-blur-sm border border-cyan-300"
              >
                🎓 Scholarships
              </Link>

              <Link
                to="/after10th/entrance"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 text-center transition backdrop-blur-sm border border-blue-300"
              >
                🎯 Entrance Exams
              </Link>

              <Link
                to="/after10th/diploma"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-purple-100 hover:bg-purple-200 text-purple-800 text-center transition backdrop-blur-sm border border-purple-300"
              >
                📜 Diploma Courses
              </Link>

              <Link
                to="/"
                className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-100 hover:bg-pink-200 text-pink-800 text-center transition border border-pink-300"
              >
                🏠 Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} relative z-10`}>
        
        {/* Animated Header */}
        <div className="text-center py-12 px-4">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 text-3xl animate-bounce">
              <span className="animation-delay-0">🎓</span>
              <span className="animation-delay-200">✨</span>
              <span className="animation-delay-400">🚀</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-pulse">
            After 10th Guidance
          </h1>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            {/* Enhanced Introduction */}
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-lg">
              <p className="text-gray-700 text-xl leading-relaxed">
                Choosing the right course after 10th is a turning point in every student's life. It decides the subjects you will study, the skills you will build, and the career opportunities you can explore in the future. Many students and parents feel confused while selecting between Science, Commerce, Arts, or vocational courses. To make this important decision easier, <span className="text-blue-600 font-semibold">EduAdvisor</span> provides proper guidance, expert advice, and information about different courses, colleges, and career paths. With <span className="text-purple-600 font-semibold">EduAdvisor</span>, you can match your interests and strengths with the right stream, explore future opportunities, and confidently step into the next stage of your education.
              </p>
            </div>

            {/* Single Explore All Streams Link */}
            <div className="max-w-2xl mx-auto text-center">
              <Link
                to="/after10th/course"
                className="inline-block py-4 px-8 font-bold text-lg rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 text-center transition backdrop-blur-sm border border-blue-300 hover:scale-105 transform duration-300 shadow-md"
              >
                📚 Explore All Streams
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .animation-delay-4000 { animation-delay: 4000ms; }
      `}</style>
    </div>
  );
};

export default After10th;