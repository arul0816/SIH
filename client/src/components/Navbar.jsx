// components/Navbar.jsx (Fix the duplicate key issue)
import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { USERDATA, BACKENDURL, SETUSERDATA, setIsLoggedIn } = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(BACKENDURL + "/api/auth/profile");

        if (data.success) {
          SETUSERDATA({
            name: data.userData.name,
            email: data.userData.email,
            isAccountVerified: data.userData.isAccountVerified,
          });
          setIsLoggedIn(true);
        } else {
          SETUSERDATA(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, [BACKENDURL, SETUSERDATA, setIsLoggedIn]);

  // Send OTP
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(BACKENDURL + "/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      setIsLoggedIn(false);
      SETUSERDATA(null);
      setShowProfile(false);
      setShowDropdown(false);
      navigate("/");

      const { data } = await axios.post(BACKENDURL + "/api/auth/logout");
      if (data.success) {
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Fixed navItems with unique keys
  const navItems = [
    {
      name: "Home",
      href: "/",
      id: "home",
      icon: "",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      name: "HSC",
      href: "/after-10th",
      id: "after10th",
      icon: "",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      name: "Degree",
      href: "/after-12th",
      id: "after12th",
      icon: "",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      name: "Courses",
      href: "/courses",
      id: "courses",
      icon: "",
      gradient: "from-orange-400 to-red-500"
    },
    {
      name: "Colleges",
      href: "/colleges",
      id: "colleges",
      icon: "",
      gradient: "from-violet-400 to-indigo-500"
    },
    {
      name: "Exams",
      href: "/entrance",
      id: "exams",
      icon: "",
      gradient: "from-amber-400 to-yellow-500"
    },
    {
      name: "Sectors",
      href: "/course-career-mapping",
      id: "sectors",
      icon: "",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      name: "AI Advisor",
      href: "/career-ai",
      id: "ai-advisor", // Changed from "advisor" to "ai-advisor"
      icon: "",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      id: "dashboard", // Changed from "advisor" to "dashboard"
      icon: "",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <>
      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`} // Fixed key
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

        {/* Wider Container */}
        <div className="relative z-10 px-4 py-4 max-w-full">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo Section */}
            <Link to="/" className="group flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src="/Code2Carrer.jpg"
                  alt="EduAdvisor Logo"
                  className="w-14 h-14 rounded-full shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 group-hover:from-cyan-400/40 group-hover:to-purple-400/40 transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  EduAdvisor
                </h1>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                   Your trusted career companion
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.id} // Now using unique IDs
                  to={item.href}
                  className="group relative px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* User Profile / Login Section */}
            <div className="flex items-center space-x-4">
              {USERDATA ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {USERDATA.name ? USERDATA.name[0].toUpperCase() : 'U'}
                  </div>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute top-12 right-0 z-50 text-black rounded shadow-lg">
                      <div className="bg-white p-3 rounded-lg w-44 shadow-xl border border-gray-200">
                        <button
                          onClick={() => {
                            setShowProfile(true);
                            setShowDropdown(false);
                          }}
                          className="w-full py-2 px-3 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
                        >
                          👤 User Profile
                        </button>
                        {!USERDATA.isAccountVerified && (
                          <button
                            onClick={() => {
                              sendVerificationOtp();
                              setShowDropdown(false);
                            }}
                            className="w-full py-2 px-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-sm font-medium transition-colors duration-200"
                          >
                            ✉️ Verify Email
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="space-y-1">
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 animate-slideDown">
            <nav className="px-6 py-4 space-y-2">
              {navItems.map((item, navIndex) => (
                <Link
                  key={`mobile-${item.id}`} // Fixed mobile key
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${navIndex * 50}ms` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Profile Modal */}
      {showProfile && USERDATA && (
        <div className="fixed top-23 right-1 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-80 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              👤 User Profile
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4">
              <p className="text-gray-800 font-medium mb-2">
                <strong>Name:</strong> {USERDATA.name || 'N/A'}
              </p>
              <p className="text-gray-800 font-medium">
                <strong>Email:</strong> {USERDATA.email || 'N/A'}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowProfile(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </>
  );
};

export default Navbar;