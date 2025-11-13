import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const governmentColleges = [
  // Degree Colleges
  {
    id: 1,
    name: 'Government Degree College, Baramulla (Boys)',
    type: 'Degree College',
    category: 'Arts & Science',
    state: 'Jammu & Kashmir',
    district: 'Baramulla',
    location: 'Khwaja Bagh, Baramulla',
    established: 1943,
    affiliation: 'University of Kashmir',
    accreditation: 'NAAC Grade A',
    fees: 25000,
    rating: 4.2,
    courses: ['B.A.', 'B.Sc.', 'B.Com', 'BBA', 'BCA', 'Bio-Technology', 'Electronics', 'IT'],
    facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Auditorium', 'Wi-Fi'],
    distance: 51, // km from Srinagar
    website: 'baramullacollege.net',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'Merit-based admission',
    placementRate: 75,
    studentStrength: 2500,
    facultyCount: 85
  },
  {
    id: 2,
    name: 'Government Degree College (Women), Baramulla',
    type: 'Degree College',
    category: 'Arts & Science',
    state: 'Jammu & Kashmir',
    district: 'Baramulla',
    location: 'National Highway Road, Baramulla',
    established: 1986,
    affiliation: 'University of Kashmir',
    accreditation: 'NAAC Grade B',
    fees: 22000,
    rating: 3.8,
    courses: ['B.A.', 'B.Sc.', 'B.Com', 'BCA'],
    facilities: ['Library', 'Labs', 'Computer Lab', 'Sports'],
    distance: 54,
    website: 'gdcwbla.ac.in',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'Merit-based admission',
    placementRate: 68,
    studentStrength: 1800,
    facultyCount: 45
  },
  {
    id: 3,
    name: 'Government Degree College, Sopore',
    type: 'Degree College',
    category: 'Arts & Science',
    state: 'Jammu & Kashmir',
    district: 'Baramulla',
    location: 'Sopore town, Baramulla',
    established: 1951,
    affiliation: 'University of Kashmir',
    accreditation: 'NAAC Grade B+',
    fees: 28000,
    rating: 4.0,
    courses: ['B.A.', 'B.Sc.', 'B.Com', 'BBA', 'BCA', 'M.A. English', 'M.A. Urdu'],
    facilities: ['Central Library', 'Science Labs', 'IT Labs', 'Auditorium', 'Sports', 'Women Study Centre'],
    distance: 50,
    website: 'gdcsopore.ac.in',
    phone: '01954-222507',
    email: 'info@gdcsopore.ac.in',
    admissionProcess: 'Merit-based admission',
    placementRate: 72,
    studentStrength: 3200,
    facultyCount: 95
  },

  // Engineering Colleges
  {
    id: 4,
    name: 'Government Polytechnic College, Jammu',
    type: 'Engineering College',
    category: 'Polytechnic',
    state: 'Jammu & Kashmir',
    district: 'Jammu',
    location: 'Khellani, Jammu',
    established: 1960,
    affiliation: 'AICTE Approved',
    accreditation: 'AICTE Approved',
    fees: 20070, // 3 years total
    rating: 3.8,
    courses: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics & Communication', 'Computer Science'],
    facilities: ['Hostels', 'Labs', 'Library', 'Wi-Fi', 'Sports', 'Cafeteria', 'Auditorium'],
    distance: 0, // Reference point
    website: 'Not specified',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'JKBOTE Entrance Exam',
    placementRate: 78,
    studentStrength: 1850,
    facultyCount: 40
  },
  {
    id: 5,
    name: 'Government Polytechnic College, Baramulla',
    type: 'Engineering College',
    category: 'Polytechnic',
    state: 'Jammu & Kashmir',
    district: 'Baramulla',
    location: 'Baramulla, Kashmir',
    established: 1965,
    affiliation: 'AICTE Approved',
    accreditation: 'AICTE Approved',
    fees: 20070,
    rating: 3.7,
    courses: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
    facilities: ['Labs', 'Library', 'Wi-Fi', 'Sports', 'Cafeteria'],
    distance: 51,
    website: 'Not specified',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'JKBOTE Entrance Exam',
    placementRate: 65,
    studentStrength: 900,
    facultyCount: 30
  },
  {
    id: 6,
    name: 'Kashmir Government Polytechnic College, Srinagar',
    type: 'Engineering College',
    category: 'Polytechnic',
    state: 'Jammu & Kashmir',
    district: 'Srinagar',
    location: 'Srinagar, Kashmir',
    established: 1958,
    affiliation: 'AICTE Approved',
    accreditation: 'AICTE Approved',
    fees: 20070,
    rating: 3.9,
    courses: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics & Communication', 'Computer Science'],
    facilities: ['Hostels', 'Labs', 'Library', 'Wi-Fi', 'Sports', 'Cafeteria'],
    distance: 15,
    website: 'Not specified',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'JKBOTE Entrance Exam',
    placementRate: 82,
    studentStrength: 2100,
    facultyCount: 42
  },

  // Medical Colleges
  {
    id: 7,
    name: 'Government Medical College, Jammu',
    type: 'Medical College',
    category: 'Medical',
    state: 'Jammu & Kashmir',
    district: 'Jammu',
    location: 'Jammu, Jammu & Kashmir',
    established: 1973,
    affiliation: 'NMC Approved',
    accreditation: 'NMC Approved',
    fees: 50000, // 5.5 years total
    rating: 4.3,
    courses: ['MBBS', 'MD/MS Specializations', 'Diploma Courses', 'Nursing Programs'],
    facilities: ['Hospital', 'Labs', 'Library', 'Hostels', 'Wi-Fi', 'Sports', 'Cafeteria'],
    distance: 0,
    website: 'gmcjammu.nic.in',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'NEET Qualification',
    placementRate: 95,
    studentStrength: 800,
    facultyCount: 120
  },
  {
    id: 8,
    name: 'Government Medical College, Srinagar',
    type: 'Medical College',
    category: 'Medical',
    state: 'Jammu & Kashmir',
    district: 'Srinagar',
    location: 'Srinagar, Kashmir',
    established: 1959,
    affiliation: 'NMC Approved',
    accreditation: 'NMC Approved',
    fees: 50000,
    rating: 4.5,
    courses: ['MBBS', 'MD/MS Specializations', 'Diploma Courses', 'Nursing Programs'],
    facilities: ['Hospital', 'Labs', 'Library', 'Hostels', 'Wi-Fi', 'Sports', 'Cafeteria'],
    distance: 15,
    website: 'gmcsrinagar.edu.in',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'NEET Qualification',
    placementRate: 98,
    studentStrength: 1200,
    facultyCount: 150
  },
  {
    id: 9,
    name: 'SKIMS (Sher-I-Kashmir Institute of Medical Sciences)',
    type: 'Medical College',
    category: 'Medical',
    state: 'Jammu & Kashmir',
    district: 'Srinagar',
    location: 'Soura, Srinagar',
    established: 1982,
    affiliation: 'Institute of National Importance',
    accreditation: 'NMC Approved',
    fees: 60000,
    rating: 4.8,
    courses: ['MBBS', 'MD/MS', 'DM/MCh', 'Nursing', 'Paramedical'],
    facilities: ['Super Specialty Hospital', 'Research Labs', 'Library', 'Hostels', 'Wi-Fi', 'Sports'],
    distance: 12,
    website: 'skims.ac.in',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'NEET Qualification',
    placementRate: 99,
    studentStrength: 1500,
    facultyCount: 200
  },

  // MBA Colleges
  {
    id: 10,
    name: 'IIM Jammu',
    type: 'Management College',
    category: 'MBA',
    state: 'Jammu & Kashmir',
    district: 'Jammu',
    location: 'Jagti, Jammu',
    established: 2016,
    affiliation: 'Institute of National Importance',
    accreditation: 'NIRF Ranking 41',
    fees: 1750000, // 2 years total
    rating: 4.7,
    courses: ['MBA General', 'Executive MBA', 'PhD Management'],
    facilities: ['Smart Classrooms', 'Bloomberg Lab', 'Hostels', 'Library', 'Sports', 'Entrepreneurship Cell'],
    distance: 5,
    website: 'iimjammu.ac.in',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'CAT + WAT/PI',
    placementRate: 100,
    studentStrength: 400,
    facultyCount: 35
  },

  // Education Colleges
  {
    id: 11,
    name: 'Government College of Education, Jammu',
    type: 'Education College',
    category: 'Teacher Training',
    state: 'Jammu & Kashmir',
    district: 'Jammu',
    location: 'Jammu, Jammu & Kashmir',
    established: 1965,
    affiliation: 'University of Jammu',
    accreditation: 'NCTE Recognized',
    fees: 46360, // B.Ed 2 years
    rating: 4.0,
    courses: ['B.Ed', 'M.Ed', 'B.Ed-M.Ed Integrated'],
    facilities: ['Hostels', 'Library', 'Labs', 'Sports', 'Cafeteria', 'IT Infrastructure'],
    distance: 2,
    website: 'Not specified',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'JKBOPEE Entrance',
    placementRate: 80,
    studentStrength: 600,
    facultyCount: 40
  },
  {
    id: 12,
    name: 'Government College of Physical Education, Ganderbal',
    type: 'Education College',
    category: 'Physical Education',
    state: 'Jammu & Kashmir',
    district: 'Ganderbal',
    location: 'Ganderbal, Kashmir',
    established: 1985,
    affiliation: 'University of Kashmir',
    accreditation: 'NCTE Recognized',
    fees: 50000, // B.P.Ed 2 years
    rating: 4.1,
    courses: ['B.P.Ed (Bachelor of Physical Education)'],
    facilities: ['Sports Facilities', 'Gymnasium', 'Hostels', 'Library', 'Labs', 'Athletics Track'],
    distance: 25,
    website: 'Not specified',
    phone: 'Not specified',
    email: 'Not specified',
    admissionProcess: 'University Entrance + Fitness Test',
    placementRate: 70,
    studentStrength: 320,
    facultyCount: 25
  }
];

const GovernmentColleges = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    type: 'All',
    category: 'All',
    district: 'All',
    accreditation: 'All',
    feesRange: 'All'
  });
  
  // Sort state
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openCollegeDetails = (college) => {
    setSelectedCollege(college);
  };

  const closeCollegeDetails = () => {
    setSelectedCollege(null);
  };

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    return [...new Set(governmentColleges.map(college => college[key]))].sort();
  };

  // Filter and sort colleges
  const filteredAndSortedColleges = useMemo(() => {
    let filtered = governmentColleges.filter(college => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase())) ||
        college.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const typeMatch = filters.type === 'All' || college.type === filters.type;
      
      // Category filter
      const categoryMatch = filters.category === 'All' || college.category === filters.category;
      
      // District filter
            // District filter
      const districtMatch = filters.district === 'All' || college.district === filters.district;
      
      // Accreditation filter
      const accreditationMatch = filters.accreditation === 'All' || 
        college.accreditation.toLowerCase().includes(filters.accreditation.toLowerCase());
      
      // Fees range filter
      let feesMatch = true;
      if (filters.feesRange !== 'All') {
        switch (filters.feesRange) {
          case 'Under 50k':
            feesMatch = college.fees < 50000;
            break;
          case '50k-1L':
            feesMatch = college.fees >= 50000 && college.fees <= 100000;
            break;
          case '1L-5L':
            feesMatch = college.fees > 100000 && college.fees <= 500000;
            break;
          case 'Above 5L':
            feesMatch = college.fees > 500000;
            break;
          default:
            feesMatch = true;
        }
      }

      return searchMatch && typeMatch && categoryMatch && districtMatch && accreditationMatch && feesMatch;
    });

    // Sort colleges
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'fees':
          aValue = a.fees;
          bValue = b.fees;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'established':
          aValue = a.established;
          bValue = b.established;
          break;
        case 'distance':
          aValue = a.distance;
          bValue = b.distance;
          break;
        case 'placementRate':
          aValue = a.placementRate;
          bValue = b.placementRate;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy, sortOrder]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const clearAllFilters = () => {
    setFilters({
      type: 'All',
      category: 'All',
      district: 'All',
      accreditation: 'All',
      feesRange: 'All'
    });
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const floatingElements = ["🏫", "🎓", "📚", "🔬", "⚙️", "🏥", "⚖️", "🎨"];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-2xl opacity-5 animate-bounce`}
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
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-5 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Enhanced Sidebar with Filters */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/90 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18">
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
                >
                  Clear All
                </button>
              </div>

              {/* Search Box */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="College name, district, course..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* College Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">College Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="All">All Types</option>
                  {getUniqueValues('type').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="All">All Categories</option>
                  {getUniqueValues('category').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="All">All Districts</option>
                  {getUniqueValues('district').map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Fees Range Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fees Range</label>
                <select
                  value={filters.feesRange}
                  onChange={(e) => handleFilterChange('feesRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="All">All Ranges</option>
                  <option value="Under 50k">Under ₹50,000</option>
                  <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                  <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                  <option value="Above 5L">Above ₹5,00,000</option>
                </select>
              </div>

              {/* Accreditation Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation</label>
                <select
                  value={filters.accreditation}
                  onChange={(e) => handleFilterChange('accreditation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="All">All Accreditations</option>
                  <option value="NAAC">NAAC Accredited</option>
                  <option value="AICTE">AICTE Approved</option>
                  <option value="NMC">NMC Approved</option>
                  <option value="NCTE">NCTE Recognized</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-lg mr-2">📊</span>
                  Search Results
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Found:</span>
                    <span className="font-semibold text-blue-600">{filteredAndSortedColleges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg Rating:</span>
                    <span className="font-semibold text-green-600">
                      {filteredAndSortedColleges.length > 0 
                        ? (filteredAndSortedColleges.reduce((sum, college) => sum + college.rating, 0) / filteredAndSortedColleges.length).toFixed(1)
                        : '0.0'
                      }⭐
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/after10th/course"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-700 text-center transition text-sm"
                >
                  📚 All Courses
                </Link>
                <Link
                  to="/after10th/colleges"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 text-center transition text-sm"
                >
                  🏫 All Colleges
                </Link>
                <Link
                  to="/after-10th"
                  className="block w-full py-2 px-3 font-medium rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-700 text-center transition text-sm"
                >
                  🏠 Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} relative z-10`}>
        
        {/* Header */}
        <div className="text-center py-12 px-4">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 text-3xl animate-bounce">
              <span className="animation-delay-0">🏛️</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">📍</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-green-700 to-blue-800 bg-clip-text text-transparent mb-6 animate-pulse">
            Nearby Government Colleges
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover government colleges in Jammu & Kashmir with detailed information about courses, fees, ratings, and distances from major cities.
          </p>
        </div>

        {/* Sort Options */}
        <div className="px-8 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'fees', label: 'Fees' },
                    { key: 'rating', label: 'Rating' },
                                        { key: 'distance', label: 'Distance' },
                    { key: 'established', label: 'Established' },
                    { key: 'placementRate', label: 'Placement' }
                  ].map(sort => (
                    <button
                      key={sort.key}
                      onClick={() => handleSortChange(sort.key)}
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        sortBy === sort.key
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {sort.label}
                      {sortBy === sort.key && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredAndSortedColleges.length} of {governmentColleges.length} colleges
              </div>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="px-8 pb-8">
          {filteredAndSortedColleges.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No colleges found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearAllFilters}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedColleges.map((college) => (
                <motion.div
                  key={college.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => openCollegeDetails(college)}
                >
                  {/* College Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2">
                        {college.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">{college.type}</p>
                    </div>
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {college.rating}⭐
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      <span>{college.district}, {college.state}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🚗</span>
                      <span>{college.distance} km from Jammu</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      <span>Est. {college.established}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">💰</span>
                      <span>₹{college.fees.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Courses Preview */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Popular Courses:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.courses.slice(0, 3).map((course, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                      {college.courses.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{college.courses.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{college.placementRate}%</div>
                      <div className="text-xs text-gray-500">Placement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{college.studentStrength}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                  </div>

                   {/* Summary Statistics */}
      {/* {!selectedCollege && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-xs">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Quick Stats</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Colleges:</span>
                <span className="font-semibold">{governmentColleges.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Filtered Results:</span>
                <span className="font-semibold text-blue-600">{filteredAndSortedColleges.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Distance:</span>
                <span className="font-semibold">
                  {filteredAndSortedColleges.length > 0 
                    ? Math.round(filteredAndSortedColleges.reduce((sum, college) => sum + college.distance, 0) / filteredAndSortedColleges.length)
                    : 0
                  } km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee Range:</span>
                <span className="font-semibold text-green-600">
                  {filteredAndSortedColleges.length > 0 
                    ? `₹${Math.min(...filteredAndSortedColleges.map(c => c.fees)).toLocaleString()} - ₹${Math.max(...filteredAndSortedColleges.map(c => c.fees)).toLocaleString()}`
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )} */}

                  {/* Accreditation Badge */}
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {college.accreditation}
                    </span>
                    <span className="text-blue-600 text-xs font-medium">
                      Click for details →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* College Details Popup */}
      <AnimatePresence>
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCollegeDetails}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCollegeDetails}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>

              {/* College Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCollege.name}</h2>
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedCollege.type}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedCollege.rating}⭐ Rating
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedCollege.accreditation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* College Details Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">🏛️</span>
                      Basic Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-semibold">{selectedCollege.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Affiliation:</span>
                        <span className="font-semibold text-sm">{selectedCollege.affiliation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-semibold">{selectedCollege.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Fees:</span>
                        <span className="font-semibold text-green-600">₹{selectedCollege.fees.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Distance */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">📍</span>
                      Location & Distance
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-semibold text-sm">{selectedCollege.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">District:</span>
                        <span className="font-semibold">{selectedCollege.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-semibold">{selectedCollege.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance from Jammu:</span>
                        <span className="font-semibold text-blue-600">{selectedCollege.distance} km</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        🚗 Approximate travel time: {Math.ceil(selectedCollege.distance / 40)} hours by road
                      </div>
                    </div>
                  </div>

                  {/* Courses Offered */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">📚</span>
                      Courses Offered
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedCollege.courses.map((course, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">📞</span>
                      Contact Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Website:</span>
                        <span className="font-semibold text-blue-600">{selectedCollege.website}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-semibold">{selectedCollege.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-semibold">{selectedCollege.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Statistics */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">📊</span>
                      College Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedCollege.placementRate}%</div>
                        <div className="text-sm text-green-700">Placement Rate</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedCollege.studentStrength}</div>
                        <div className="text-sm text-blue-700">Total Students</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedCollege.facultyCount}</div>
                        <div className="text-sm text-purple-700">Faculty Members</div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{selectedCollege.rating}</div>
                        <div className="text-sm text-orange-700">Overall Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                                    {/* Facilities */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">🏢</span>
                      Facilities & Infrastructure
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {selectedCollege.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <span className="text-green-500 mr-2">✓</span>
                            {facility}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admission Process */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">📝</span>
                      Admission Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 text-sm">Admission Process:</span>
                          <p className="font-semibold text-sm">{selectedCollege.admissionProcess}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Application Period:</span>
                          <p className="font-semibold text-sm">Usually June - August</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Selection Criteria:</span>
                          <p className="font-semibold text-sm">
                            {selectedCollege.type === 'Medical College' ? 'NEET Score + Counseling' :
                             selectedCollege.type === 'Engineering College' ? 'JEE/Polytechnic Entrance' :
                             selectedCollege.type === 'Management College' ? 'CAT/MAT Score + Interview' :
                             'Merit-based on 12th marks'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Travel Information */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">🚗</span>
                      Travel Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">From Jammu:</span>
                          <span className="font-semibold text-blue-600">{selectedCollege.distance} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">By Road:</span>
                          <span className="font-semibold text-sm">~{Math.ceil(selectedCollege.distance / 40)} hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Nearest Airport:</span>
                          <span className="font-semibold text-sm">
                            {selectedCollege.district === 'Srinagar' ? 'Srinagar Airport (15 km)' :
                             selectedCollege.district === 'Jammu' ? 'Jammu Airport (10 km)' :
                             'Srinagar/Jammu Airport'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Nearest Railway:</span>
                          <span className="font-semibold text-sm">
                            {selectedCollege.district === 'Jammu' ? 'Jammu Tawi (5 km)' : 'Jammu Tawi Railway Station'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee Structure */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">💰</span>
                      Fee Structure
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Course Fee:</span>
                          <span className="font-bold text-green-600">₹{selectedCollege.fees.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Fee:</span>
                          <span className="font-semibold">
                            ₹{Math.ceil(selectedCollege.fees / (
                              selectedCollege.type === 'Medical College' ? 5.5 :
                              selectedCollege.type === 'Engineering College' ? 3 :
                              selectedCollege.type === 'Management College' ? 2 :
                              selectedCollege.type === 'Education College' ? 2 : 3
                            )).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          * Fees may vary for different courses and categories
                        </div>
                        <div className="text-xs text-gray-500">
                          * Additional charges for hostel, mess, and other facilities
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to={`/college-details/${selectedCollege.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/,/g, '')}`}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  View Complete Profile →
                </Link>
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${selectedCollege.location}`, '_blank')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  📍 View on Map
                </button>
                <button
                  onClick={closeCollegeDetails}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Quick Access Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => handleSortChange('distance')}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
              title="Sort by Distance"
            >
              📍
            </button>
            <button
              onClick={() => handleSortChange('fees')}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
              title="Sort by Fees"
            >
              💰
            </button>
            <button
              onClick={() => handleSortChange('rating')}
              className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
              title="Sort by Rating"
            >
              ⭐
            </button>
          </div>
        </div>
      </div>

     

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default GovernmentColleges;