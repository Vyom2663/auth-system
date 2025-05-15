"use client";

import React, { useEffect, useState } from "react";
import LoginPage from "@/app/(noAuth)/login/login-form";
import Link from "next/link";
import Loading from "@/app/loading";
import { Route } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace(Route.Dashboard);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="pl-0 pt-20 xl:py-10 2xl:py-20">
        <div className="2xl:px-20">
          <div className="2xl:px-20">
            <div className="bg-white mx-4 sm:mx-16 lg:32px xl:mx-64 p-4 sm:p-8 rounded-xl shadow-lg">
              <h1 className="text-3xl text-blue-950 dark:text-white">
                Log In to portal
              </h1>

              <p className="text-gray-600 mt-2">
                Heaven`t register yet?
                <Link href="/register">
                  <span className="text-black font-semibold dark:text-white dark:hover:text-blue-500 hover:text-blue-500 duration-300">
                    {" "}
                    register Here{" "}
                  </span>
                </Link>
              </p>
              <LoginPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
