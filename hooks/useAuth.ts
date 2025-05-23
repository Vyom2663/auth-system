import axiosInstance from "@/lib/axios";
import { Route } from "@/types/routes";
import { useRouter } from "next/navigation";
import authStore from "@/stores/user-store";
import { removeToken, setToken } from "@/lib/cookie";

export const useAuth = () => {
  const router = useRouter();
  const setUserInStore = authStore.getState().setUser;

  const register = async (formData: FormData, reset: () => void) => {
    await axiosInstance.post("auth/register", formData);

    await login(formData, reset);

    reset();
  };

  const login = async (formData: FormData, reset: () => void) => {
    const response = await axiosInstance.post("auth/login", formData);

    const { token } = response.data;

    setToken("token", token);

    await fetchUser();

    router.push(Route.DASHBOARD_PAGE);

    reset();
  };

  const logout = async () => {
    await axiosInstance.post("auth/logout");

    removeToken("token");

    authStore.setState({ user: null });

    router.push(Route.LOGIN_PAGE);
  };

  const fetchUser = async () => {
    const response = await axiosInstance.get("auth/user");

    const user = response.data.user;

    if (user.email_verified_at) {
      setUserInStore(user);
    }
  };

  const verifyEmail = async (url: string) => {
    await axiosInstance.get(url);

    router.push(Route.DASHBOARD_PAGE);
  };

  const resendEmail = async () => {
    await axiosInstance.post("auth/email/verify/resend");
  };

  return {
    register,
    login,
    logout,
    fetchUser,
    verifyEmail,
    resendEmail,
    isLoggedIn: Boolean(authStore.getState().user),
  };
};
