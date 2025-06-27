import axios from "axios";

const API_URL = "http://localhost:5038/api/ProductAPI";

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

// Thêm sản phẩm mới (có thể có ảnh)
export const createProduct = (productData) => {
  const formData = new FormData();
  formData.append("productName", productData.productName);
  formData.append("price", productData.price);
  formData.append("brandId", productData.brandId);
  formData.append("categoryId", productData.categoryId);
  if (productData.description) formData.append("description", productData.description);
  if (productData.imageFile) formData.append("imageFile", productData.imageFile);

  return axiosInstance.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Cập nhật sản phẩm (có thể có/không ảnh mới)
export const updateProduct = (id, productData) => {
  const formData = new FormData();
  formData.append("productName", productData.productName);
  formData.append("price", productData.price);
  formData.append("brandId", productData.brandId);
  formData.append("categoryId", productData.categoryId);
  if (productData.description) formData.append("description", productData.description);
  if (productData.imageFile) formData.append("imageFile", productData.imageFile);

  return axiosInstance.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Xóa sản phẩm
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/${id}`);
};

export const setProductHidden = (id, isHidden) => {
  // isHidden: true (ẩn), false (hiện)
  return axiosInstance.put(
    `/${id}/hide`,
    isHidden,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};