"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { LoginData } from "@/types/auth";
import Link from "next/link";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm<LoginData>();

  const { login: loginUser } = useAuth();

  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    setServerErrors([]);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await loginUser(formData, reset);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (Array.isArray(error)) {
        setServerErrors(error);
      }
    }
    setIsLoading(false);
  };

  const getError = (field: string) => {
    const error = serverErrors.find((err) => err.field === field);
    return error?.message;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your email..."
          {...register("email")}
        />
        {getError("email") && (
          <span className="text-red-500 text-sm">
            {getError("email")}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your password"
          {...register("password")}
        />
        {getError("password") && (
          <span className="text-red-500 text-sm">
            {getError("password")}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="border mt-4 bg-blue-500 hover:bg-blue-950 text-white cursor-pointer flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Log In"
        )}
      </Button>

      <Link href="/forgot-password">
        <p className="flex font-semibold dark:text-white text-blkcol dark:hover:text-blue-500 hover:text-blue-500 justify-center">
          Forgot your Password?
        </p>
      </Link>
    </form>
  );
};

export default LoginPage;
