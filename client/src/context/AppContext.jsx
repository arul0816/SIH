// context/AppContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const BACKENDURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [USERDATA, SETUSERDATA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverConnected, setServerConnected] = useState(false);

  // ✅ ADD MISSING STATE VARIABLES
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // First check if server is running
        const serverCheck = await axios.get(BACKENDURL + "/api/test");
        if (serverCheck.data.success) {
          setServerConnected(true);
          
          // Then check authentication
          try {
            const authResponse = await axios.get(BACKENDURL + "/api/auth/is-auth");
            if (authResponse.data.success) {
              const profileResponse = await axios.get(BACKENDURL + "/api/auth/profile");
              if (profileResponse.data.success) {
                SETUSERDATA(profileResponse.data.userData);
                setIsLoggedIn(true);
              }
            }
          } catch (authError) {
            // Auth errors are normal for non-logged-in users
            console.log("Auth check: User not logged in");
          }
        }
      } catch (error) {
        console.log("Server connection failed:", error.message);
        setServerConnected(false);
        // ✅ REMOVE TOAST ERROR FOR NOW TO AVOID SPAM
        // toast.error("Cannot connect to server. Please check if the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [BACKENDURL]);

  // Fetch user profile data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(BACKENDURL + "/api/auth/profile");
      if (data.success) {
        SETUSERDATA(data.userData);
        setIsLoggedIn(true);
      } else {
        SETUSERDATA(null);
        setIsLoggedIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Get user data error:", error.message);
      SETUSERDATA(null);
      setIsLoggedIn(false);
    }
  };

  // Update user AI profile
  const updateAIProfile = async (profileData) => {
    try {
      const { data } = await axios.put(BACKENDURL + "/api/auth/ai-profile", profileData);
      if (data.success) {
        SETUSERDATA(data.userData);
        toast.success("Profile updated successfully");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to update profile");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Apply theme changes
  useEffect(() => {
    if (USERDATA?.aiProfile?.preferences?.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [USERDATA?.aiProfile?.preferences?.theme]);

  // ===== AI CHAT FUNCTIONS =====

  // Fetch all conversations
  const fetchConversations = async () => {
    if (!serverConnected) return [];
    
    try {
      const { data } = await axios.get(BACKENDURL + "/api/chat/conversations");
      if (data.success) {
        setConversations(data.conversations);
        return data.conversations;
      }
      return [];
    } catch (error) {
      console.error("Fetch conversations error:", error);
      return [];
    }
  };

  // Create new AI session
  const createAISession = async (educationLevel) => {
    if (!serverConnected) {
      toast.error("Server not connected");
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.post(BACKENDURL + "/api/chat/ai-session", {
        educationLevel
      });
      
      if (data.success) {
        setCurrentConversation(data.conversation);
        await fetchConversations(); // Refresh conversations list
        toast.success("New career guidance session started!");
        return { success: true, conversation: data.conversation };
      } else {
        toast.error(data.message || "Failed to start session");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to start session";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Send message in conversation
  const sendMessage = async (conversationId, messageData) => {
    if (!serverConnected) {
      toast.error("Server not connected");
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.post(
        BACKENDURL + `/api/chat/conversations/${conversationId}/message`,
        messageData
      );
      
      if (data.success) {
        setCurrentConversation(data.conversation);
        return { success: true, response: data.aiResponse };
      } else {
        toast.error(data.message || "Failed to send message");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send message";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Get specific conversation
  const getConversation = async (conversationId) => {
    if (!serverConnected) {
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.get(
        BACKENDURL + `/api/chat/conversations/${conversationId}`
      );
      
      if (data.success) {
        setCurrentConversation(data.conversation);
        return { success: true, conversation: data.conversation };
      } else {
        toast.error(data.message || "Conversation not found");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load conversation";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId) => {
    if (!serverConnected) {
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.delete(
        BACKENDURL + `/api/chat/conversations/${conversationId}`
      );
      
      if (data.success) {
        await fetchConversations(); // Refresh list
        if (currentConversation?._id === conversationId) {
          setCurrentConversation(null);
        }
        toast.success("Conversation deleted successfully");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to delete conversation");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete conversation";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Rename conversation
  const renameConversation = async (conversationId, newTitle) => {
    if (!serverConnected) {
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.patch(
        BACKENDURL + `/api/chat/conversations/${conversationId}/rename`,
        { title: newTitle }
      );
      
      if (data.success) {
        await fetchConversations(); // Refresh list
        if (currentConversation?._id === conversationId) {
          setCurrentConversation(data.conversation);
        }
        toast.success("Conversation renamed successfully");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to rename conversation");
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to rename conversation";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Get session analytics
  const getSessionAnalytics = async () => {
    if (!serverConnected) {
      return { success: false, message: "Server not connected" };
    }

    try {
      const { data } = await axios.get(BACKENDURL + "/api/chat/analytics");
      if (data.success) {
        return { success: true, analytics: data.analytics };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Analytics fetch error:", error);
      return { success: false, message: "Failed to fetch analytics" };
    }
  };

  // ===== UTILITY FUNCTIONS =====

  // Logout function
  const logout = async () => {
    try {
      if (serverConnected) {
        const { data } = await axios.post(BACKENDURL + "/api/auth/logout");
        if (data.success) {
          toast.success("Logged out successfully");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state
      setIsLoggedIn(false);
      SETUSERDATA(null);
      setCurrentConversation(null);
      setConversations([]);
    }
  };

  // Clear current conversation
  const clearCurrentConversation = () => {
    setCurrentConversation(null);
  };

  // Check if user has completed assessment
  const hasCompletedAssessment = () => {
    return conversations.some(conv => conv.status === 'completed');
  };

  // Get user's education level
  const getUserEducationLevel = () => {
    return USERDATA?.aiProfile?.educationLevel || '';
  };

  // Get user's location
  const getUserLocation = () => {
    return USERDATA?.aiProfile?.location || {
      state: "Jammu & Kashmir",
      district: "",
      city: ""
    };
  };

  const value = {
    // Basic app state
    BACKENDURL,
    isLoggedIn,
    setIsLoggedIn,
    USERDATA,
    SETUSERDATA,
    loading,
    serverConnected,
    
    // Auth functions
    getUserData,
    updateAIProfile,
    logout,
    
    // AI Chat state
    currentConversation,
    setCurrentConversation,
    conversations,
    setConversations,
    
    // AI Chat functions
    fetchConversations,
    createAISession,
    sendMessage,
    getConversation,
    deleteConversation,
    renameConversation,
    getSessionAnalytics,
    clearCurrentConversation,
    
    // Utility functions
    hasCompletedAssessment,
    getUserEducationLevel,
    getUserLocation
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};