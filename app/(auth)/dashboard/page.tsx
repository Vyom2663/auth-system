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
// import { Route } from "@/types/routes";
// import { useRouter } from "next/navigation";
// import Loading from "@/app/loading";

const Dashboard = () => {
  // const router = useRouter();
  const userInfo = authStore((state) => state.user);
  console.log(userInfo);
  
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (userInfo && !userInfo.email_verified_at) {
  //     router.replace(Route.EMAIL_VERIFY_PAGE);
  //   }
  //   setLoading(false);
  // }, [userInfo, router]);

  // if(loading){
  //   return <Loading />
  // }

  return (
    <div>
      <main className="p-6 flex-grow">
        <div className="mx-auto">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex text-2xl font-semibold">
                {userInfo ? (
                  `Welcome, ${userInfo?.firstname}!`
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
                {userInfo?.firstname ? (
                  <p className="text-gray-800 text-base font-medium">
                    {userInfo?.firstname} {userInfo?.lastname ?? ""}
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
                    {userInfo?.email}
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
