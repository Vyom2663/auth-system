"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { CompanyData } from "@/types/auth";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function CompanyForm() {
  const { register, handleSubmit, setValue } = useForm<CompanyData>();

  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getError = (field: string) => {
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setValue("logo", e.target.files);
    } else {
      setLogoPreview(null);
      setValue("logo", null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-20 mt-10 bg-white p-8 rounded-2xl shadow-lg space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-4">
        Company Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">
            Company Name
          </Label>
          <Input
            type="text"
            placeholder="Enter Company Name..."
            {...register("company_name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("company_name") && (
            <p className="text-red-500 text-sm">{getError("company_name")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Email</Label>
          <Input
            type="email"
            placeholder="Enter Email..."
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("email") && (
            <p className="text-red-500 text-sm">{getError("email")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">
            Contact Number
          </Label>
          <Input
            type="tel"
            placeholder="Enter Contact Number..."
            {...register("contact_no")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("contact_no") && (
            <p className="text-red-500 text-sm">{getError("contact_no")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">City</Label>
          <Input
            type="text"
            placeholder="Enter City..."
            {...register("city")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("city") && (
            <p className="text-red-500 text-sm">{getError("city")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">State</Label>
          <Input
            type="text"
            placeholder="Enter State..."
            {...register("state")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("state") && (
            <p className="text-red-500 text-sm">{getError("state")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Country</Label>
          <Input
            type="text"
            placeholder="Enter Country..."
            {...register("country")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("country") && (
            <p className="text-red-500 text-sm">{getError("country")}</p>
          )}
        </div>

        <div className="w-full">
          <Label className="block text-sm font-semibold mb-1">Pincode</Label>
          <Input
            type="text"
            placeholder="Enter Pincode..."
            {...register("pincode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getError("pincode") && (
            <p className="text-red-500 text-sm">{getError("pincode")}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Address</Label>
        <Textarea
          rows={3}
          placeholder="Enter Address..."
          {...register("address")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {getError("address") && (
          <p className="text-red-500 text-sm">{getError("address")}</p>
        )}
      </div>

      <div className="w-full">
        <Label className="block text-sm font-semibold mb-1">Company Logo</Label>
        <Input
          type="file"
          accept="image/*"
          {...register("logo")}
          ref={fileInputRef}
          onChange={handleLogoChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
               file:rounded-md file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        {logoPreview && (
          <div className="relative mt-4 inline-block">
            <Image
              src={logoPreview}
              width={100}
              height={100}
              alt="Logo Preview"
              className="rounded-lg w-45 border border-gray-300 shadow-sm object-cover"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 bg-gray-200 text-red-600 hover:bg-red-500 hover:text-white p-1 rounded-full shadow cursor-pointer"
              onClick={() => {
                setLogoPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                setValue("logo", null);
              }}
            >
              ✕
            </Button>
          </div>
        )}
        {getError("logo") && (
          <p className="text-red-500 text-sm mt-1">{getError("logo")}</p>
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
            "Add Company"
          )}
        </Button>
      </div>
    </form>
  );
}
