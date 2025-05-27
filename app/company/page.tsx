"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { CompanyData } from "@/types/auth";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyData>();

  const { addCompany } = useAuth();

  const onSubmit = async (data: CompanyData) => {
    console.log("Form submitted:", data);
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

    await addCompany(formData);
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
            {...register("company_name", {
              required: "Company name is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.company_name && (
            <p className="text-red-500 text-sm">
              {errors.company_name.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Email</Label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">
            Contact Number
          </Label>
          <Input
            type="tel"
            {...register("contact_no", {
              required: "Contact number is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact_no && (
            <p className="text-red-500 text-sm">{errors.contact_no.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">City</Label>
          <Input
            type="text"
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">State</Label>
          <Input
            type="text"
            {...register("state", { required: "State is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Country</Label>
          <Input
            type="text"
            {...register("country", { required: "Country is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Pincode</Label>
          <Input
            type="text"
            {...register("pincode", { required: "Pincode is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Address</Label>
        <Textarea
          rows={3}
          {...register("address", { required: "Address is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Company Logo</Label>
        <Input
          type="file"
          accept="image/*"
          {...register("logo", { required: "Logo is required" })}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.logo && (
          <p className="text-red-500 text-sm">{errors.logo.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
