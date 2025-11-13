// pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    USERDATA,
    conversations,
    fetchConversations,
    getSessionAnalytics,
    getUserEducationLevel,
    getUserLocation,
    updateAIProfile
  } = useContext(AppContext);

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    educationLevel: '',
    location: { district: '', city: '' },
    preferences: { theme: 'light' }
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (USERDATA) {
      setProfileData({
        educationLevel: getUserEducationLevel(),
        location: getUserLocation(),
        preferences: USERDATA.aiProfile?.preferences || { theme: 'light' }
      });
    }
  }, [USERDATA]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      await fetchConversations();
      const analyticsResult = await getSessionAnalytics();
      if (analyticsResult.success) {
        setAnalytics(analyticsResult.analytics);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateAIProfile(profileData);
    if (result.success) {
      toast.success('Profile updated successfully!');
    }
  };

  const getRecentSessions = () => {
    return conversations
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
  };

  const getCompletedSessions = () => {
    return conversations.filter(conv => conv.status === 'completed');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {USERDATA?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Track your career guidance journey and manage your profile
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analytics?.totalSessions || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {analytics?.completedSessions || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(analytics?.completionRate || 0)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">📈</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {analytics?.averageRating || 0}/5
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'sessions', label: 'Sessions', icon: '💬' },
                  { id: 'profile', label: 'Profile', icon: '👤' },
                  { id: 'recommendations', label: 'Recommendations', icon: '🎯' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => navigate('/career-ai')}
                        className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🤖</span>
                          <div>
                            <h4 className="font-semibold">Start AI Assessment</h4>
                            <p className="text-sm opacity-90">Get career recommendations</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => navigate('/colleges')}
                        className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🏫</span>
                          <div>
                            <h4 className="font-semibold">Explore Colleges</h4>
                            <p className="text-sm opacity-90">Find the right institution</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => navigate('/resource-hub')}
                        className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">📚</span>
                          <div>
                            <h4 className="font-semibold">Study Resources</h4>
                            <p className="text-sm opacity-90">Access learning materials</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {getRecentSessions().length > 0 ? (
                        getRecentSessions().map((session) => (
                          <div key={session._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                session.status === 'completed' ? 'bg-green-500' :
                                session.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}></div>
                              <div>
                                <p className="font-medium text-gray-800">{session.title}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(session.updatedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate('/career-ai')}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View →
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <span className="text-4xl mb-4 block">🎯</span>
                          <p className="text-gray-500">No sessions yet</p>
                          <button
                            onClick={() => navigate('/career-ai')}
                            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Start your first assessment →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Sessions Tab */}
              {activeTab === 'sessions' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">All Sessions</h3>
                    <button
                      onClick={() => navigate('/career-ai')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      New Session
                    </button>
                  </div>

                  <div className="space-y-4">
                    {conversations.length > 0 ? (
                      conversations.map((session) => (
                        <div key={session._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full ${
                                session.status === 'completed' ? 'bg-green-500' :
                                session.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}></div>
                              <div>
                                <h4 className="font-medium text-gray-800">{session.title}</h4>
                                <p className="text-sm text-gray-500">
                                  Created: {new Date(session.createdAt).toLocaleDateString()} • 
                                  Updated: {new Date(session.updatedAt).toLocaleDateString()}
                                </p>
                                {session.context?.progressPercentage && (
                                  <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                                        <div
                                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                                                          style={{ width: `${session.context.progressPercentage}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {session.context.progressPercentage}%
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                session.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {session.status}
                              </span>
                              <button
                                onClick={() => navigate('/career-ai')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Open →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">💬</span>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">No sessions yet</h4>
                        <p className="text-gray-500 mb-4">Start your first AI career assessment to get personalized recommendations</p>
                        <button
                          onClick={() => navigate('/career-ai')}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Start Assessment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Settings</h3>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-4">Basic Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={USERDATA?.name || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={USERDATA?.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education Level */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-4">Education Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Education Level
                        </label>
                        <select
                          value={profileData.educationLevel}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            educationLevel: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select education level</option>
                          <option value="after10th">After 10th Grade</option>
                          <option value="after12th">After 12th Grade</option>
                          <option value="graduate">Graduate</option>
                          <option value="postgraduate">Post Graduate</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-4">Location</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            value="Jammu & Kashmir"
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            District
                          </label>
                          <select
                            value={profileData.location.district}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              location: { ...prev.location, district: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select district</option>
                            {[
                              "Jammu", "Srinagar", "Baramulla", "Budgam", "Anantnag", 
                              "Pulwama", "Shopian", "Kulgam", "Ganderbal", "Bandipora",
                              "Kupwara", "Kathua", "Udhampur", "Reasi", "Ramban",
                              "Doda", "Kishtwar", "Rajouri", "Poonch", "Samba"
                            ].map(district => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City/Town
                          </label>
                          <input
                            type="text"
                            value={profileData.location.city}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              location: { ...prev.location, city: e.target.value }
                            }))}
                            placeholder="Enter your city"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-4">Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Theme
                          </label>
                          <select
                            value={profileData.preferences.theme}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, theme: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={profileData.preferences.language || 'English'}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, language: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Urdu">Urdu</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-4">Account Status</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            USERDATA?.isAccountVerified ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm text-gray-700">
                            Email {USERDATA?.isAccountVerified ? 'Verified' : 'Not Verified'}
                          </span>
                        </div>
                        {!USERDATA?.isAccountVerified && (
                          <button
                            type="button"
                            onClick={() => navigate('/email-verify')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Verify Now
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Career Recommendations</h3>
                  
                  {getCompletedSessions().length > 0 ? (
                    <div className="space-y-6">
                      {getCompletedSessions().map((session) => (
                        <div key={session._id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-800">{session.title}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(session.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {/* This would show actual recommendations from the session */}
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-blue-800 text-sm">
                              🎯 View your personalized career recommendations by opening this session
                            </p>
                            <button
                              onClick={() => navigate('/career-ai')}
                              className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                              View Recommendations →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <span className="text-6xl mb-4 block">🎯</span>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">No recommendations yet</h4>
                      <p className="text-gray-500 mb-4">Complete an AI assessment to get personalized career recommendations</p>
                      <button
                        onClick={() => navigate('/career-ai')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Assessment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Career Fields */}
            {analytics?.topCareers && analytics.topCareers.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Career Fields</h3>
                <div className="space-y-3">
                  {analytics.topCareers.map((career, index) => (
                    <div key={career.career} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📊'}
                        </span>
                        <span className="font-medium text-gray-800">{career.career}</span>
                      </div>
                      <span className="text-sm text-gray-500">{career.count} recommendations</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Explore Colleges', icon: '🏫', path: '/colleges' },
                  { label: 'Study Resources', icon: '📚', path: '/resource-hub' },
                  { label: 'Course Mapping', icon: '🗺️', path: '/course-career-mapping' },
                  { label: 'Government Colleges', icon: '🏛️', path: '/nearby-gov-college' }
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium text-gray-800">{link.label}</span>
                                       <span className="ml-auto text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;