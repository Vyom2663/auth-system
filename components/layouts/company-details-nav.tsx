"use client";

import Image from "next/image";
import React from "react";
import authStore from "@/stores/user-store";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyDetailsNav = () => {
  const userInfo = authStore((state) => state.user);
  const company = userInfo?.company?.[0];

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center w-full ">
        <Skeleton className="h-[50px] w-[175px] rounded-xl" />
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="flex items-center gap-2">
      {company.logo_url && (
        <Image
          src={company.logo_url}
          alt={`${company.name} Logo`}
          width={45}
          height={45}
          className="rounded-full"
        />
      )}
      <h2 className="text-xl font-bold text-white truncate max-w-[150px]">
        {company.name}
      </h2>
    </div>
  );
};

export default CompanyDetailsNav;
