import React, { useState } from 'react';

const dropoutData = {
  '2016': { government: 14.7, aided: 8.1, private: 3.4, retention: 91.3 },
  '2017': { government: 11.1, aided: 8.9, private: 6.0, retention: 91.3 },
  '2018': { government: 12.8, aided: 8.4, private: 3.0, retention: 91.9 },
  '2019': { government: 12.6, aided: 7.9, private: 5.9, retention: 91.2 },
  '2020': { government: 8.0, aided: 8.8, private: 2.2, retention: 93.7 },
  '2021': { government: 11.2, aided: 9.3, private: 3.6, retention: 92.0 },
  '2022': { government: 9.9, aided: 5.5, private: 3.7, retention: 93.6 },
  '2023': { government: 10.5, aided: 8.9, private: 4.9, retention: 91.9 },
  '2024': { government: 9.5, aided: 7.0, private: 3.3, retention: 93.4 },
  '2025': { government: 8.3, aided: 6.2, private: 2.7, retention: 94.3 }
};

const StudentAnalytics = () => {
  const [selectedComparison, setSelectedComparison] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const goBack = () => {
    alert('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getChartData = () => {
    const yearData = dropoutData[selectedYear];
    
    switch(selectedComparison) {
      case 'govt-aided':
        return [
          { name: 'Government Schools', value: yearData.government, color: '#673ab7' },
          { name: 'Aided Schools', value: yearData.aided, color: '#2196f3' }
        ];
      case 'govt-private':
        return [
          { name: 'Government Schools', value: yearData.government, color: '#673ab7' },
          { name: 'Private Schools', value: yearData.private, color: '#4caf50' }
        ];
      case 'aided-private':
        return [
          { name: 'Aided Schools', value: yearData.aided, color: '#2196f3' },
          { name: 'Private Schools', value: yearData.private, color: '#4caf50' }
        ];
      default:
        return [
          { name: 'Government', value: yearData.government, color: '#673ab7' },
          { name: 'Aided', value: yearData.aided, color: '#2196f3' },
          { name: 'Private', value: yearData.private, color: '#4caf50' }
        ];
    }
  };

  // Calculate proper bar heights based on max value
  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => item.value));
  const chartHeight = 200; // Fixed chart height in pixels

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-6 z-50 mt-5 bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Enhanced Sidebar */}
      <div className={`fixed left-0 top-0 h-full mt-22 w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-3 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"></span>
            Analytics Controls
          </h3>
          
          {/* Comparison Options */}
          <div className="space-y-3 mb-8">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Select Comparison</h4>
            {[
              { id: 'all', label: 'All Schools Overview', icon: '📈', color: 'purple', desc: 'Compare all school types' },
              { id: 'govt-aided', label: 'Government vs Aided', icon: '🏛️', color: 'blue', desc: 'Public sector comparison' },
              { id: 'govt-private', label: 'Government vs Private', icon: '🏢', color: 'green', desc: 'Public vs private analysis' },
              { id: 'aided-private', label: 'Aided vs Private', icon: '⚖️', color: 'orange', desc: 'Non-government comparison' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedComparison(option.id)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-102 ${
                  selectedComparison === option.id
                    ? `bg-gradient-to-r from-${option.color}-500 to-${option.color}-600 text-white shadow-lg`
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-0.5">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className={`text-xs mt-1 ${
                      selectedComparison === option.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {option.desc}
                    </div>
                  </div>
                  {selectedComparison === option.id && (
                    <span className="text-white">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="space-y-4 mb-8">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Filters</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {Object.keys(dropoutData).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Grades</option>
                <option value="1-5">Primary (1-5)</option>
                <option value="6-8">Middle (6-8)</option>
                <option value="9-12">Secondary (9-12)</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-lg mr-2">💡</span>
              Quick Insights
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Year:</span>
                <span className="font-semibold text-purple-600">{selectedYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lowest Dropout:</span>
                <span className="font-semibold text-green-600">
                  {Math.min(...chartData.map(item => item.value)).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Highest Dropout:</span>
                <span className="font-semibold text-red-600">
                  {Math.max(...chartData.map(item => item.value)).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={goBack}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">←</span>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'} p-8`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 mt-12 lg:mt-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Dropout Analytics</h1>
            <p className="text-gray-600">Comprehensive analysis of student retention patterns across school types</p>
          </div>

          {/* Main Chart Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Chart Header */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedComparison.replace('-', ' vs ').replace(/\b\w/g, l => l.toUpperCase())} Analysis
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Academic Year {selectedYear} • {selectedGrade === 'all' ? 'All Grades' : `Grades ${selectedGrade}`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Average Dropout</div>
                    <div className="text-lg font-bold text-purple-600">
                      {(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic Bar Chart */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex justify-between items-end" style={{ height: `${chartHeight}px` }}>
                  {chartData.map((item, index) => {
                    // Calculate proportional height (minimum 20px for visibility)
                    const barHeight = Math.max((item.value / maxValue) * chartHeight, 20);
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 mx-2">
                        {/* Value label on top */}
                        <div className="mb-2 text-sm font-semibold text-gray-700">
                          {item.value.toFixed(1)}%
                        </div>
                        
                        {/* Bar */}
                        <div 
                          className="w-full max-w-20 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group"
                          style={{
                            height: `${barHeight}px`,
                            backgroundColor: item.color,
                            boxShadow: `0 4px 12px ${item.color}40`
                          }}
                        >
                          {/* Hover tooltip */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {item.value.toFixed(1)}% dropout rate
                          </div>
                        </div>
                        
                        {/* Label */}
                        <div className="mt-3 text-center">
                          <div className="text-sm font-medium text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.name.includes('Government') ? '🏛️' : 
                             item.name.includes('Private') ? '🏢' : '🤝'} Schools
                          </div>
                        </div>
                      </div>
                                    );
                  })}
                </div>
                
                {/* Y-axis labels */}
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>0%</span>
                  <span>{(maxValue * 0.25).toFixed(1)}%</span>
                  <span>{(maxValue * 0.5).toFixed(1)}%</span>
                  <span>{(maxValue * 0.75).toFixed(1)}%</span>
                  <span>{maxValue.toFixed(1)}%</span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Analysis Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Best Performing
                  </h4>
                  <div className="space-y-2">
                    {chartData
                      .sort((a, b) => a.value - b.value)
                      .slice(0, 1)
                      .map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-green-700">{item.name}</span>
                          <span className="font-semibold text-green-800">{item.value.toFixed(1)}%</span>
                        </div>
                      ))}
                    <p className="text-xs text-green-600 mt-2">
                      Lowest dropout rate in {selectedYear}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Trend Analysis
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Average Rate</span>
                      <span className="font-semibold text-blue-800">
                        {(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Variance</span>
                      <span className="font-semibold text-blue-800">
                        {(Math.max(...chartData.map(item => item.value)) - Math.min(...chartData.map(item => item.value))).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Year-over-year comparison
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                    Needs Attention
                  </h4>
                  <div className="space-y-2">
                    {chartData
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 1)
                      .map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-orange-700">{item.name}</span>
                          <span className="font-semibold text-orange-800">{item.value.toFixed(1)}%</span>
                        </div>
                      ))}
                    <p className="text-xs text-orange-600 mt-2">
                      Highest dropout rate - requires intervention
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-xl mr-2">💡</span>
                  Actionable Recommendations
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-700 mb-2">Immediate Actions</h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Implement early warning systems for at-risk students</li>
                      <li>• Strengthen transition support between grade levels</li>
                      <li>• Expand scholarship and financial aid programs</li>
                      <li>• Enhance career guidance and counseling services</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">Long-term Strategies</h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Improve infrastructure in underperforming schools</li>
                      <li>• Develop community engagement programs</li>
                      <li>• Integrate technology for remote learning support</li>
                      <li>• Create industry partnerships for practical training</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Historical Comparison */}
              <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-xl mr-2">📈</span>
                  5-Year Trend Overview
                </h4>
                <div className="grid grid-cols-5 gap-4">
                  {['2021', '2022', '2023', '2024', '2025'].map(year => {
                    const yearData = dropoutData[year];
                    const avgDropout = ((yearData.government + yearData.aided + yearData.private) / 3).toFixed(1);
                    return (
                      <div key={year} className="text-center">
                        <div className="text-lg font-bold text-purple-600">{avgDropout}%</div>
                        <div className="text-sm text-gray-600">{year}</div>
                        <div className={`text-xs mt-1 ${
                          year === selectedYear ? 'text-purple-600 font-semibold' : 'text-gray-500'
                        }`}>
                          {year === selectedYear ? 'Current' : 'Historical'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;