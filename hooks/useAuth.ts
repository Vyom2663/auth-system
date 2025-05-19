import axiosInstance from "@/lib/axios";
import { Route } from "@/types/routes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UserData } from "@/types/auth";
import { deleteToken, setToken } from "@/hooks/cookie";

export const useAuth = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  const register = async (formData: FormData, reset: () => void) => {
    await axiosInstance.post("auth/register", formData);

    await login(formData, reset);

    reset();
  };

  const login = async (formData: FormData, reset: () => void) => {
    const response = await axiosInstance.post("auth/login", formData);

    const { token } = response.data;

    setToken(token);

    router.push(Route.Dashboard);

    reset();
  };

  const logout = async () => {
    await axiosInstance.post("auth/logout");
    deleteToken();
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
    }
  }, []);

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
