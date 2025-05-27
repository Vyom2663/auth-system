
import axios from "axios";
import { toast } from "sonner";
import { getServerToken } from "@/lib/server-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getServerToken("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Accept = `application/json`;
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.success) {
      toast.success(response.data.success);
    }

    if (response?.data?.error) {
      toast.error(response.data.error);
    }

    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    if (status === 422 && data?.errors) {
      return Promise.reject({
        validationErrors: data.errors,
      });
    } else if (data?.error) {
      toast.error(data.error);
    } else if (status !== 401 && data?.message) {
      toast.error(data.message);
    } else if (status === 404) {
      toast.error(error?.message);
    } else  {
      // toast.info("Secure access required. Please log in to your account.");
      // console.log(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
