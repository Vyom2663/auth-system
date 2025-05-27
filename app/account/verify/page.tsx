"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { resendEmail, verifyEmail } = useAuth();

  useEffect(() => {
    if (!token) return;
    (async () => {
      await verifyEmail(token);
    })();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center mb-6">
          A verification code has been sent to your email address.
        </p>
        <div className="mt-4 text-center">
          <Button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium cursor-pointer"
            onClick={resendEmail}
          >
            Resend Verification Link
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Check your spam folder if you don’t see the email.
        </p>
      </div>
    </div>
  );
}
