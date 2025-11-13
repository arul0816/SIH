// src/utils/chatApi.js
import axios from "axios";

export const listConversationsApi = async (baseUrl) => {
  const { data } = await axios.get(`${baseUrl}/api/chat/conversations`, { withCredentials: true });
  return data;
};

export const createConversationApi = async (baseUrl, payload) => {
  const { data } = await axios.post(`${baseUrl}/api/chat/conversations`, payload, { withCredentials: true });
  return data;
};

export const getConversationApi = async (baseUrl, id) => {
  const { data } = await axios.get(`${baseUrl}/api/chat/conversations/${id}`, { withCredentials: true });
  return data;
};

export const addMessageApi = async (baseUrl, id, payload) => {
  const { data } = await axios.post(`${baseUrl}/api/chat/conversations/${id}/messages`, payload, { withCredentials: true });
  return data;
};

export const renameConversationApi = async (baseUrl, id, title) => {
  const { data } = await axios.patch(`${baseUrl}/api/chat/conversations/${id}`, { title }, { withCredentials: true });
  return data;
};



