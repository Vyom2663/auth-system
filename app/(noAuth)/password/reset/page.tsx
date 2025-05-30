"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetPasswordData = {
  password: string;
  password_confirmation: string;
};

const ForgetPasswordForm = () => {
  const searchParams = useSearchParams();
  const resetUrl = searchParams.get("token");

  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordData) => {
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    await resetPassword(formData, resetUrl!);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter a new password below. Make sure it’s strong and secure.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </Label>
            <Input
              type="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
