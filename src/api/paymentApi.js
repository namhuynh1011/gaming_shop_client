import axios from "axios";

const API_URL = "http://localhost:5038/api/PaymentAPI";

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

// Tạo URL thanh toán (GET)
export const createPaymentUrl = async (money, description) => {
  const response = await axiosInstance.get(
    `/CreatePaymentUrl?money=${money}&description=${encodeURIComponent(description)}`
  );
  return response.data;
};

// Xử lý callback sau thanh toán (GET)
export const getPaymentCallback = async (queryString) => {
  // queryString là chuỗi sau dấu '?', ví dụ: "vnp_Amount=10000&vnp_ResponseCode=00"
  const response = await axiosInstance.get(`/Callback?${queryString}`);
  return response.data;
};

// Xử lý IPN (Instant Payment Notification) từ VNPay (nếu cần)
export const getIpnAction = async (queryString) => {
  const response = await axiosInstance.get(`/IpnAction?${queryString}`);
  return response.data;
};