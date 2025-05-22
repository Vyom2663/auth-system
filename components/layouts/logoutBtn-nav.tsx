"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth"
import { LogOut } from "lucide-react";
import authStore from "@/stores/user-store";

const LogoutBtnNav = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const user = authStore((state) => state.user);

  return (
    <div>
      <div className="flex items-center gap-4">
        {user?.firstname && (
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-blue-700 font-semibold text-sm">
            {user?.firstname.charAt(0).toUpperCase()}
          </div>
        )}
        <Button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-1.5 px-2 sm:px-4 rounded-md shadow-sm cursor-pointer"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutBtnNav;
