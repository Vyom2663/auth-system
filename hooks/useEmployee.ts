import axiosInstance from "@/lib/axios";
import { EmployeeData, UpdateEmployeeData } from "@/types/employee";
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

  const updateAdmin = async (data : UpdateEmployeeData , id : string) => {
    try {
      await axiosInstance.post(`/admins/${id}` , data);

      router.push(Route.ADMIN_PAGE);
    } catch {}
  };

  const getAdminById = useCallback(async (id : string) => {
    try {
      const response = await axiosInstance.get(`/admins/${id}`);

      return response.data;
    } catch {}
  },[]);

  const deleteAdmin = async (id : string) => {
    try {
      const response = await axiosInstance.delete(`/admins/${id}`);

      return response.data;
    } catch {}
  }

  return {
    addAdmin,
    getAdmin,
    updateAdmin,
    getAdminById,
    deleteAdmin
  };
};
