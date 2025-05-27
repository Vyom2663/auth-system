import axiosInstance from "@/lib/axios";

export const fetchUserRepository = async () => {
  try {
    const res = await axiosInstance.get("auth/user");
    return res.data;
  } catch {
    // console.error("User fetch failed:", error); 
    // return null;
  }
};
