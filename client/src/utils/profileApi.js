// src/utils/profileApi.js
import axios from "axios";

export const getMyProfileApi = async (baseUrl) => {
  const { data } = await axios.get(`${baseUrl}/api/profile/me`, { withCredentials: true });
  return data;
};

export const updateMyProfileApi = async (baseUrl, updates) => {
  const { data } = await axios.put(`${baseUrl}/api/profile/me`, updates, { withCredentials: true });
  return data;
};



