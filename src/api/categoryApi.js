import axios from "axios";

const API_URL = "http://localhost:5200/api/CategoryAPI";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getAllCategories = () => {
  return axiosInstance.get("/");
};