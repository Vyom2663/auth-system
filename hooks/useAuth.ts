import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { Route } from "@/types/routes";
import { deleteCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UserData } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

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

    router.push(Route.Dashboard);

    reset();
  };

  const logout = async () => {
    await axiosInstance.post("auth/logout");
    deleteCookie("token");
    toast.success("Logout successfully done!!");
    router.push(Route.Login);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get("auth/user");
      const userData = response.data;

      setUserInfo({
        email: userData.user.email,
        firstName: userData.user.firstname,
        lastName: userData.user.lastname,
      });
    } catch {
      setUserInfo(null);
      router.push(Route.Login);
    }
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    register,
    login,
    logout,
    fetchUser,
    userInfo,
  };
};
