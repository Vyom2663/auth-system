"use client"

import React, { useEffect, useState } from "react";
import RegisterPage from "@/app/(noAuth)/register/register-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Route } from "@/types/routes";
import Loading from "@/app/loading";
import { getToken } from "@/hooks/cookie";

const Page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push(Route.Dashboard);
    }
    setLoading(false);
  }, [router]);

  if(loading){
    return <Loading />
  }

  return (
    <div>
      <div className="pl-0 pt-20 xl:py-10 2xl:py-20">
        <div className="2xl:px-20">
          <div className="2xl:px-20">
            <div className="bg-white mx-4 sm:mx-16 lg:32px xl:mx-64 p-4 sm:p-8 rounded-xl shadow-lg">
              <h1 className="text-3xl text-blue-950 dark:text-white">
                Sign up to portal
              </h1>

              <p className="text-gray-600 mt-2">
                Are a user?
                <Link href="/login">
                  <span className="text-black font-semibold dark:text-white dark:hover:text-blue-500 hover:text-blue-500 duration-300">
                    {" "}
                    Login Here{" "}
                  </span>
                </Link>
              </p>
              <RegisterPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
