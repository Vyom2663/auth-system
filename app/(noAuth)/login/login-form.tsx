import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { LoginData } from "@/types/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  const {login : loginUser } = useAuth();

  const onSubmit = async (data: LoginData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    await loginUser(formData, reset);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Email
          <span className="text-red-500">*</span>
        </Label>
        <Input
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your email..."
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Password
          <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="border mt-4 bg-blue-500 hover:bg-blue-950 text-white cursor-pointer"
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginPage;
