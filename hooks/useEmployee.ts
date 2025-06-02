import axiosInstance from "@/lib/axios";
import { EmployeeData } from "@/types/employee";
import { Route } from "@/types/routes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useEmployee = () => {
  const router = useRouter();

  const addAdmin = async (data: EmployeeData) => {
    try {
      await axiosInstance.post("/admins", data);
      router.push(Route.ADMIN_PAGE);
    } catch {}
  };

  const getAdmin = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/admins");
      return response.data.data;
    } catch {}
  }, []);

  return {
    addAdmin,
    getAdmin,
  };
};
