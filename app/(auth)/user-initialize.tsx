"use client";

import { Suspense, useRef } from "react";
import authStore from "@/stores/user-store";
import { UserData } from "@/types/auth";
import Loading from "@/app/loading";

export default function InitializeUser({
  user,
  children,
}: {
  user: UserData | null;
  children: React.ReactNode;
}) {
  const ref = useRef(false);

  if (!ref.current) {
    authStore.setState({ user });
    ref.current = true;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
