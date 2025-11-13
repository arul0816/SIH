// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "After 10th",
      text: "Science, Commerce, Arts & Diploma options",
      path: "/after-10th",
      gradient: "from-blue-500 to-cyan-600",
      icon: "🎓",
    },
    {
      title: "After 12th",
      text: "Engineering, Medicine, Law & Arts paths",
      path: "/after-12th",
      gradient: "from-indigo-500 to-blue-600",
      icon: "🚀",
    },
    {
      title: "Courses",
      text: "Higher education programs & certifications",
      path: "/courses",
      gradient: "from-purple-500 to-indigo-600",
      icon: "📚",
    },
    {
      title: "Colleges",
      text: "Top institutions, rankings & admissions",
      path: "/colleges",
      gradient: "from-pink-500 to-purple-600",
      icon: "🏛️",
    },
    {
      title: "Exams",
      text: "JEE, NEET, CLAT, UPSC & preparation",
      path: "/entrance",
      gradient: "from-amber-500 to-orange-600",
      icon: "📝",
    },
    {
      title: "Career Sectors",
      text: "IT, Healthcare, Finance & emerging fields",
      path: "/course-career-mapping",
      gradient: "from-teal-500 to-emerald-600",
      icon: "💼",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
    

      {/* === HERO SECTION === */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/70"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 mt-10 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-tight animate-slideUp">
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              Shape Your Future Career
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideUp animation-delay-200">
            Personalized guidance and AI-powered recommendations for students
            after 10th & 12th.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20 animate-slideUp animation-delay-400">
            <button
              onClick={() =>
                document
                  .getElementById("cards-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-blue-600/30 hover:scale-105"
            >
              <span className="relative z-10">Explore Options</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              onClick={() => navigate("/career-ai")}
              className="group relative overflow-hidden bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <span>AI Career Test</span>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2 uppercase tracking-wider">Explore</span>
            <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section
        id="cards-section"
        className="relative z-10 py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Career Pathways
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the right direction for your educational and professional
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cardData.map((card, index) => (
              <div
                key={card.title}
                className="group relative bg-white rounded-2xl p-1 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(card.path)}
              >
                {/* Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-7 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{card.text}</p>
                  <button
                    className={`w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r ${card.gradient} shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group`}
                  >
                    <span>Explore</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

{/* === COURSE TO CAREER PATH MAPPING SECTION === */}
<section className="relative z-10 py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto max-w-6xl">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎓</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Course → Career Path Mapping</h2>
              <p className="text-green-100">Understand how each course leads to different career opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left - Course Examples */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Courses & Their Career Paths</h3>
              <div className="space-y-4">
                
                {/* Engineering Example */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="font-semibold text-blue-700">Engineering (Computer Science)</div>
                  <div className="text-sm text-gray-700 mt-2">Careers: Software Developer, Data Scientist, Cybersecurity Analyst, AI/ML Engineer</div>
                </div>

                {/* Medical Example */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <div className="font-semibold text-pink-700">Medical (Pharmacy)</div>
                  <div className="text-sm text-gray-700 mt-2">Careers: Pharmacist, Research Scientist, Clinical Data Analyst</div>
                </div>

                {/* Education Example */}
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="font-semibold text-yellow-700">Education (B.Ed / D.Ed)</div>
                  <div className="text-sm text-gray-700 mt-2">Careers: School Teacher, Curriculum Designer, Educational Consultant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
              <h4 className="text-lg font-bold text-gray-800 mb-3">What You’ll Discover</h4>
              <ul className="space-y-3">
                {[
                  "Direct mapping from course to industries",
                  "Future job market demand insights",
                  "Alternative career switches",
                  "Recommended higher studies",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 text-sm">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/course-career-mapping")}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Explore Course Mapping</span>
                <span>🎯</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-medium text-indigo-800">Smart Choices</div>
                  <div className="text-sm text-indigo-700">Choose the right course today for a successful career tomorrow</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>




      {/* === NEARBY GOVERNMENT COLLEGES DIRECTORY SECTION === */}
<section className="relative z-10 py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
  <div className="container mx-auto max-w-6xl">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏫</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Nearby Government Colleges Directory</h2>
              <p className="text-blue-100">Find trusted government institutions around your location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left - Highlights */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Why Use This Directory?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Location-Based Search</div>
                  <p className="text-sm text-gray-600">Get a list of nearby government colleges based on your district and state.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Verified Data</div>
                  <p className="text-sm text-gray-600">All colleges listed are verified and recognized by government authorities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Course Availability</div>
                  <p className="text-sm text-gray-600">Check which government colleges offer the courses you’re interested in.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Action Card */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Features Available</h4>
              <ul className="space-y-3">
                {[
                  "Filter by district & state",
                  "Course-wise directory (Arts, Science, Engineering, etc.)",
                  "Maps integration for navigation",
                  "Admission details & cutoff info",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 text-sm">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/nearby-gov-college")}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Browse Government Colleges</span>
                <span>📍</span>
              </button>
            </div>

            {/* Extra Info Card */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <div className="font-medium text-green-800">Trusted Resource</div>
                  <div className="text-sm text-green-700">Built to help students make informed education decisions</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>




      {/* === RESOURCE HUB SECTION === */}
<section className="relative z-10 py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto max-w-6xl">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Resource Hub</h2>
              <p className="text-green-100">All-in-one study materials, books, and academic resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left - Highlights */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">What You’ll Find Here</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">E-Books & Textbooks</div>
                  <p className="text-sm text-gray-600">Download subject-specific books in PDF/eBook format.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Notes & Study Guides</div>
                  <p className="text-sm text-gray-600">Access concise handwritten notes, summaries, and quick revision material.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Previous Year Papers</div>
                  <p className="text-sm text-gray-600">Solve past question papers and practice sets for better preparation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-800">Extra Materials</div>
                  <p className="text-sm text-gray-600">Research papers, lab manuals, project docs, and reference materials.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Action Card */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Available Resources</h4>
              <ul className="space-y-3">
                {[
                  "NCERT & State Board Textbooks",
                  "Engineering & Medical Entrance Guides",
                  "UG/PG Reference Books",
                  "Notes by Toppers",
                  "Lab & Practical Manuals",
                  "Solved Assignments & Model Papers",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 text-sm">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/resource-hub")}
                className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Access Study Materials</span>
                <span>📖</span>
              </button>
            </div>

            {/* Extra Info Card */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-medium text-yellow-800">Smart Learning</div>
                  <div className="text-sm text-yellow-700">Stay ahead with curated, exam-focused study materials</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>


{/* === STUDENT DROPOUT ANALYSIS SECTION === */} 
<section className="relative z-10 py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"> 
  <div className="container mx-auto max-w-6xl">
     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"> 
      {/* Header */} 
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white">
         <div className="flex items-center justify-between"> 
          <div className="flex items-center space-x-4">
             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">📊</span> 
              </div> <div> <h2 className="text-3xl font-bold mb-2">Student Retention Analytics</h2>
               <p className="text-purple-100">Understanding dropout patterns to improve education outcomes</p> </div> </div> 
               <div className="hidden md:block"> <div className="text-right"> 
                <div className="text-3xl font-bold">94.3%</div> <div className="text-sm text-purple-200">Current Retention Rate</div> </div> </div> </div> </div> {/* Content */} <div className="p-8"> <div className="grid md:grid-cols-2 gap-8"> {/* Left Side - Info */} <div className="space-y-6"> <div> <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3> <div className="space-y-4"> <div className="flex items-start space-x-3"> <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div> <div> <div className="font-medium text-gray-800">Improving Trends</div> <div className="text-sm text-gray-600">Student retention rates have improved by 3% since 2020 across all school types</div> </div> </div> <div className="flex items-start space-x-3"> <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div> <div> <div className="font-medium text-gray-800">School Type Analysis</div> <div className="text-sm text-gray-600">Private schools maintain lowest dropout rates at 2.7%, while government schools improved to 8.3%</div> </div> </div> <div className="flex items-start space-x-3"> <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div> <div> <div className="font-medium text-gray-800">Critical Transitions</div> <div className="text-sm text-gray-600">Grade transitions (elementary to middle, middle to high) remain key intervention points</div> </div> </div> </div> </div> <div className="bg-gray-50 rounded-xl p-6"> <h4 className="font-semibold text-gray-800 mb-3">Quick Stats (2025)</h4> <div className="grid grid-cols-3 gap-4 text-center"> <div> <div className="text-2xl font-bold text-purple-600">8.3%</div> <div className="text-xs text-gray-600">Government</div> </div> <div> <div className="text-2xl font-bold text-blue-600">6.2%</div> <div className="text-xs text-gray-600">Aided</div> </div> <div> <div className="text-2xl font-bold text-green-600">2.7%</div> <div className="text-xs text-gray-600">Private</div> </div> </div> </div> </div> {/* Right Side - Action */} <div className="flex flex-col justify-center space-y-6"> <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200"> <h4 className="text-lg font-bold text-gray-800 mb-3">Comprehensive Analysis Available</h4> <p className="text-gray-600 mb-6"> Access detailed dropout analytics with interactive comparisons across school types, grade levels, and yearly trends from 2016-2025. </p> <div className="space-y-3 mb-6"> <div className="flex items-center text-sm text-gray-700"> <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> Interactive comparison charts </div> <div className="flex items-center text-sm text-gray-700"> <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> Grade-wise breakdown analysis </div> <div className="flex items-center text-sm text-gray-700"> <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> 10-year trend visualization </div> <div className="flex items-center text-sm text-gray-700"> <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> Actionable insights & recommendations </div> </div> <button onClick={() => navigate('/dropout')} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2" > <span>View Detailed Analytics</span> <span>📊</span> </button> </div> {/* Additional Info Card */} <div className="bg-green-50 rounded-xl p-4 border border-green-200"> <div className="flex items-center space-x-3"> <span className="text-2xl">💡</span> <div> <div className="font-medium text-green-800">Data-Driven Decisions</div> <div className="text-sm text-green-700">Help improve education policies with real-time analytics</div> </div> </div> </div> </div> </div> </div> </div> </div> </section>


      {/* === AI ADVISOR SECTION === */}
      <section className="relative z-10 py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 skew-y-3 transform origin-top-left"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 -skew-y-3 transform origin-bottom-right"></div>

        <div className="relative container mx-auto py-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Intelligent Career Matching
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Our AI system analyzes your strengths, interests, and goals to
                  match you with the perfect career path. Get personalized
                  recommendations based on real-time market data.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Skill & Interest Assessment",
                    "Industry Trend Analysis",
                    "Personalized Roadmaps",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-white">
                      <svg
                        className="w-5 h-5 mr-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/career-ai")}
                  className="bg-white text-blue-700 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition shadow-lg w-fit"
                >
                  Try AI Assessment
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-800/50 to-indigo-900/50 flex items-center justify-center p-12">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-full h-full flex items-center justify-center">
                    <span className="text-8xl animate-float">🤖</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  EA
                </div>
                <h3 className="text-xl font-bold">EduAdvisor</h3>
              </div>
              <p className="text-gray-400">
                Your partner in making informed career decisions with AI-powered
                guidance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Home",
                  "Courses",
                  "Colleges",
                  "Exams",
                  "About",
                  "Contact",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>📧 support@eduadvisor.com</p>
                <p>📱 +91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2025 EduAdvisor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* === ANIMATIONS === */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0px); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default Home;
