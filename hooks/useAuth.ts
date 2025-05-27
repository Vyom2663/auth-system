import axiosInstance from "@/lib/axios";
import { Route } from "@/types/routes";
import { useRouter } from "next/navigation";
import authStore from "@/stores/user-store";
import { removeToken, setToken } from "@/lib/cookie";

export const useAuth = () => {
  const router = useRouter();
  const setUserInStore = authStore.getState().setUser;

  const register = async (formData: FormData, reset: () => void) => {
    try {
      await axiosInstance.post("/auth/register", formData);

      await login(formData, reset);

      reset();
    } catch {}
  };

  const login = async (formData: FormData, reset: () => void) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);

      const { token } = response.data;

      setToken("token", token);

      await fetchUser();

      router.push(Route.DASHBOARD_PAGE);

      reset();
    } catch {}
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      removeToken("token");

      authStore.setState({ user: null });

      router.push(Route.LOGIN_PAGE);
    } catch {}
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/user");

      const user = response.data.user;

      if (user.email_verified_at) {
        setUserInStore(user);
      }
    } catch {}
  };

  const verifyEmail = async (url: string) => {
    try {
      await axiosInstance.get(url);

      router.push(Route.DASHBOARD_PAGE);
    } catch {}
  };

  const resendEmail = async () => {
    try {
      await axiosInstance.post("/auth/email/verify/resend");
    } catch {}
  };

  const forgotPassword = async (formData : FormData) => {
    try {
      await axiosInstance.post("/auth/password/forgot",formData);
      router.push(Route.LOGIN_PAGE);
    } catch {}
  };

   const addCompany = async (formData : FormData) => {
    try {
      await axiosInstance.post("/company",formData);
      router.push(Route.DASHBOARD_PAGE);
    } catch(error) {
      console.log(error);
    }
  };

  return {
    register,
    login,
    logout,
    fetchUser,
    verifyEmail,
    resendEmail,
    forgotPassword,
    addCompany,
  };
};
