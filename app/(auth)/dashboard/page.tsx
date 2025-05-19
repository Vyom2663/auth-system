"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Route } from "@/types/routes";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { SkeletonCard } from "@/app/(auth)/dashboard/skeletan-card";
import { getToken } from "@/hooks/cookie";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push(Route.Login);
      return;
    }
    setLoading(false);
  }, [router]);

  const { userInfo } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <main className="p-6 flex-grow">
        <div className="mx-auto">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex text-2xl font-semibold">
                Welcome, {userInfo?.firstName ?? <SkeletonCard />}!
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
                {userInfo?.firstName ? (
                  <p className="text-gray-800 text-base font-medium">
                    {userInfo.firstName} {userInfo.lastName ?? ""}
                  </p>
                ) : (
                  <SkeletonCard />
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </Label>
                {userInfo?.email ? (
                  <p className="text-gray-800 text-base font-medium">
                    {userInfo?.email || <SkeletonCard />}
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
