import axios from "axios";

const API_URL = "http://localhost:5038/api/BrandAPI";

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

export const getAllBrands = () => {
  return axiosInstance.get("/");
};

export const getBrandById = (id) => {
  return axiosInstance.get(`/${id}`);
};

// Thêm mới brand
export const createBrand = (brand) => {
  return axiosInstance.post("/", brand);
};

// Cập nhật brand
export const updateBrand = (id, brand) => {
  return axiosInstance.put(`/${id}`, brand);
};

// Xoá brand
export const deleteBrand = (id) => {
  return axiosInstance.delete(`/${id}`);
};