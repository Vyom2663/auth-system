import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { Route } from "@/lib/routes";
import { deleteCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const register = async (formData: FormData, reset: () => void) => {
    await axiosInstance.post("auth/register", formData);

    toast.success("Registered successfully!");

    await login(formData, reset);

    reset();
  };

  const login = async (formData: FormData, reset: () => void) => {
    const response = await axiosInstance.post("auth/login", formData);

    const { token } = response.data;

    setCookie("token", token, {
      maxAge: 60 * 60 * 24,
      secure: true,
    });

    toast.success("Login successful!");

    router.push(Route.Dashboard);

    reset();
  };

  const logout = async () => {
    await axiosInstance.post("auth/logout");
    deleteCookie("token");
    toast.success("Logout successfully done!!");
    router.push(Route.Login);
  };

  return {
    register,
    login,
    logout,
  };
};
