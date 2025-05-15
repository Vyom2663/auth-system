"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { hasCookie } from "cookies-next/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/routes";
import Loading from "@/app/loading";
import { useAuth } from "@/lib/useAuth";

type UserData = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

const Dashboard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserData>({
    email: null,
    firstName: null,
    lastName: null,
  });
  const [loading, setLoading] = useState(true);

  const {logout : logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    const token = hasCookie("token");
    if (!token) {
      router.push(Route.Login);
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("auth/user");
        const userData = response.data;

        setUserInfo({
          email: userData.user.email,
          firstName: userData.user.firstname,
          lastName: userData.user.lastname,
        });
      } catch {
        router.push(Route.Login);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

          <div className="flex items-center gap-4">
            {userInfo.firstName && (
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-blue-700 font-semibold text-sm">
                {userInfo.firstName.charAt(0).toUpperCase()}
              </div>
            )}
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white py-1.5 px-4 rounded-md shadow-sm cursor-pointer"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 flex-grow">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome, {userInfo.firstName ?? "Loading..."}!
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Here’s a quick look at your profile information.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </Label>
                <p className="text-gray-800 text-base font-medium">
                  {userInfo.firstName || "Loading..."} {userInfo.lastName || ""}
                </p>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </Label>
                <p className="text-gray-800 text-base font-medium">
                  {userInfo.email || "Loading..."}
                </p>
              </div>
            </CardContent>

            <CardFooter className="text-sm text-gray-500">
              Thank you for visiting your dashboard.
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
