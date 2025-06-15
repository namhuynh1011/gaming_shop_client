import axios from "axios";

const API_URL = "http://localhost:5200/api/AuthAPI";

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const updateProfile = (data) => {
  const token = localStorage.getItem("token")
  return axios.put(`${API_URL}/update-profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Đổi mật khẩu (Yêu cầu token Bearer trong header)
export const changePassword = (data, token) => {
  return axios.post(`${API_URL}/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};