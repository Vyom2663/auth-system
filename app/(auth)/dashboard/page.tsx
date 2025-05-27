"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SkeletonCard } from "@/app/(auth)/dashboard/skeletan-card";
import authStore from "@/stores/user-store";

const Dashboard = () => {
  const userInfo = authStore((state) => state.user);
  console.log(userInfo);

  return (
    <div>
      <main className="p-6 flex-grow">
        <div className="mx-auto">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex text-2xl font-semibold">
                {userInfo ? (
                  `Welcome, ${userInfo?.user?.firstname}!`
                ) : (
                  <SkeletonCard />
                )}
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
                {userInfo?.user?.firstname ? (
                  <p className="text-gray-800 text-base font-medium">
                    {userInfo?.user?.firstname} {userInfo?.user?.lastname ?? ""}
                  </p>
                ) : (
                  <SkeletonCard />
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </Label>
                {userInfo?.user?.email ? (
                  <p className="text-gray-800 text-base font-medium">
                    {userInfo?.user.email}
                  </p>
                ) : (
                  <SkeletonCard />
                )}
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
