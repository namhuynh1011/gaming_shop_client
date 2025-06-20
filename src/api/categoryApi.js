import axios from "axios";

const API_URL = "http://localhost:5038/api/CategoryAPI";
const getToken = () => localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: API_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Lấy tất cả category
export const getAllCategories = () => {
  return axiosInstance.get("/");
};

// Lấy 1 category theo id
export const getCategoryById = (id) => {
  return axiosInstance.get(`/${id}`);
};

// Thêm mới category
export const createCategory = (category) => {
  return axiosInstance.post("/", category);
};

// Cập nhật category
export const updateCategory = (id, category) => {
  return axiosInstance.put(`/${id}`, category);
};

// Xoá category
export const deleteCategory = (id) => {
  return axiosInstance.delete(`/${id}`);
};