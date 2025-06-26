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
/**
 * Lấy danh sách đơn hàng của người dùng hiện tại
 * @returns {Promise<any[]>}
 */
export const getMyOrders = async () => {
  try {
    const response = await axiosInstance.get("/my-orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy chi tiết đơn hàng của người dùng theo id
 * @param {number} orderId
 * @returns {Promise<any>}
 */
export const getMyOrderById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/my-orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy danh sách tất cả đơn hàng (Admin)
 * @returns {Promise<any[]>}
 */
export const getAllOrdersAdmin = async () => {
  try {
    const response = await axiosInstance.get("/admin/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy chi tiết đơn hàng theo id (Admin)
 * @param {number} orderId
 * @returns {Promise<any>}
 */
export const getOrderByIdAdmin = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/admin/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 * Cập nhật trạng thái đơn hàng (Admin)
 * @param {number} orderId
 * @param {string} status
 * @returns {Promise<any>}
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axiosInstance.put(
      `/admin/orders/${orderId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};