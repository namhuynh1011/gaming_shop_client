import axios from "axios";

// Đặt baseURL API backend của bạn ở đây
const API_BASE_URL = "http://localhost:5038/api/UserAPI"; // thay đổi nếu port khác

// Thêm token vào header nếu cần kiểm tra quyền Admin
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getAllUsers = async () => {
  return axios.get(API_BASE_URL, getAuthHeaders());
};

export const getUserById = async (id) => {
  return axios.get(`${API_BASE_URL}/${id}`, getAuthHeaders());
};

export const banUser = async (id) => {
  return axios.post(`${API_BASE_URL}/${id}/ban`, {}, getAuthHeaders());
};

export const unbanUser = async (id) => {
  return axios.post(`${API_BASE_URL}/${id}/unban`, {}, getAuthHeaders());
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
};

export const setRolesForUser = async (id, roles) => {
  // roles là array, ví dụ: ["Admin", "Customer"]
  return axios.post(
    `${API_BASE_URL}/${id}/set-roles`,
    { Roles: roles },
    getAuthHeaders()
  );
};