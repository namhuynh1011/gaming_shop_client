import axios from "axios";

const API_URL = "http://localhost:5038/api/BrandAPI";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getAllBrands = () => {
  return axiosInstance.get("/");
};