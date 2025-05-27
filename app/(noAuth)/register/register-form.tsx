"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { RegisterData } from "@/types/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm<RegisterData>();

  const { register: registerUser } = useAuth();

  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const getServerError = (field: string) => {
    const error = serverErrors.find((err) => err.field === field);
    return error?.message;
  };

  const onSubmit = async (data: RegisterData) => {
    setServerErrors([]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    try {
      await registerUser(formData, reset);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (Array.isArray(error)) {
        setServerErrors(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          First Name <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("firstname")}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your first name..."
        />
        {getServerError("firstname") && (
          <span className="text-red-500 text-sm">
            {getServerError("firstname")}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Last Name <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("lastname")}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your last name..."
        />
        {getServerError("lastname") && (
          <span className="text-red-500 text-sm">
            {getServerError("lastname")}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("email")}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your email..."
        />
        {getServerError("email") && (
          <span className="text-red-500 text-sm">
            {getServerError("email")}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          {...register("password")}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your password"
        />
        {getServerError("password") && (
          <span className="text-red-500 text-sm">
            {getServerError("password")}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Confirm Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          {...register("password_confirmation")}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Re-enter password"
        />
        {getServerError("password_confirmation") && (
          <span className="text-red-500 text-sm">
            {getServerError("password_confirmation")}
          </span>
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <Button
          type="submit"
          className="border bg-blue-500 hover:bg-blue-950 text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;
