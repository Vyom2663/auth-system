import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/useAuth";
import React from "react";
import { useForm } from "react-hook-form";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>();

  const { register: registerUser } = useAuth();

  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData();
    formData.append("firstname", data.firstName);
    formData.append("lastname", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);

    await registerUser(formData, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          First Name <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("firstName", {
            required: "First name is required",
          })}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your first name..."
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Last Name <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("lastName", {
            required: "Last name is required",
          })}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your last name..."
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your email..."
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <Label className="text-xl text-gray-800">
          Confirm Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          className="p-5 border border-blue-950 focus:outline-none focus:border-amber-400"
          placeholder="Re-enter password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <Button
          type="submit"
          className="border bg-blue-500 hover:bg-blue-950 text-white cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;
