"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { CompanyData } from "@/types/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const { register, handleSubmit } = useForm<CompanyData>();

  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const getServerError = (field: string) => {
    const error = serverErrors.find((err) => err.field === field);
    return error?.message;
  };

  const { addCompany } = useAuth();

  const onSubmit = async (data: CompanyData) => {
    setServerErrors([]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("email", data.email);
    formData.append("contact_no", data.contact_no);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("pincode", data.pincode);
    formData.append("address", data.address);

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    try {
      await addCompany(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (Array.isArray(error)) {
        setServerErrors(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-20 mt-10 bg-white p-8 rounded-2xl shadow-lg space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
        Company Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">
            Company Name
          </Label>
          <Input
            type="text"
            {...register("company_name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("company_name") && (
            <p className="text-red-500 text-sm">
              {getServerError("company_name")}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Email</Label>
          <Input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("email") && (
            <p className="text-red-500 text-sm">{getServerError("email")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">
            Contact Number
          </Label>
          <Input
            type="tel"
            {...register("contact_no")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("contact_no") && (
            <p className="text-red-500 text-sm">
              {getServerError("contact_no")}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">City</Label>
          <Input
            type="text"
            {...register("city")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("city") && (
            <p className="text-red-500 text-sm">{getServerError("city")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">State</Label>
          <Input
            type="text"
            {...register("state")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("state") && (
            <p className="text-red-500 text-sm">{getServerError("state")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Country</Label>
          <Input
            type="text"
            {...register("country")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("country") && (
            <p className="text-red-500 text-sm">{getServerError("country")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Pincode</Label>
          <Input
            type="text"
            {...register("pincode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getServerError("pincode") && (
            <p className="text-red-500 text-sm">{getServerError("pincode")}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Address</Label>
        <Textarea
          rows={3}
          {...register("address")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {getServerError("address") && (
          <p className="text-red-500 text-sm">{getServerError("address")}</p>
        )}
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Company Logo</Label>
        <Input
          type="file"
          accept="image/*"
          {...register("logo")}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        {getServerError("logo") && (
          <p className="text-red-500 text-sm">{getServerError("logo")}</p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
