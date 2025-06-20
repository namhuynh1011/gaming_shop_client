import axios from "axios";

const API_URL = "http://localhost:5038/api/OrderAPI";

// Hàm lấy token, bạn có thể chỉnh sửa nếu lưu token ở nơi khác
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

/**
 * Gửi đơn hàng lên API.
 * @param {Object} orderData
 * @returns {Promise<any>}
 */
export const addOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/checkout", orderData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};