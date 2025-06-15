import axios from "axios";

const API_URL = "http://localhost:5200/api/ProductAPI";

// Hàm lấy token, bạn có thể chỉnh sửa nếu lưu token ở nơi khác
const getToken = () => localStorage.getItem("token");

// Tạo một axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor để tự động thêm token vào header (nếu có)
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

// Lấy tất cả sản phẩm
export const getAllProducts = () => {
  return axiosInstance.get("/");
};

// Lấy sản phẩm theo id
export const getProductById = (id) => {
  return axiosInstance.get(`/${id}`);
};

// Thêm sản phẩm mới
export const createProduct = (productData) => {
  return axiosInstance.post("/", productData);
};

// Cập nhật sản phẩm
export const updateProduct = (id, productData) => {
  return axiosInstance.put(`/${id}`, productData);
};

// Xóa sản phẩm
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/${id}`);
};

// Upload nhiều ảnh cho sản phẩm
export const uploadProductImages = (productId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return axiosInstance.post(`/${productId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Lấy danh sách ảnh của sản phẩm
export const getProductImages = (productId) => {
  return axiosInstance.get(`/${productId}/images`);
};

// Xóa ảnh sản phẩm
export const deleteProductImage = (imageId) => {
  return axiosInstance.delete(`/images/${imageId}`);
};