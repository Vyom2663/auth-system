"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getToken } from "@/lib/cookie";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken("token");
    setIsAuthenticated(!!token);
  }, []);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold cursor-pointer">PayRoll</h1>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <Button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
