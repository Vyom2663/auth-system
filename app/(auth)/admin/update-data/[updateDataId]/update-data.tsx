"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEmployee } from "@/hooks/useEmployee";
import { DisplayData, UpdateEmployeeData } from "@/types/employee";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function UpdateEmployeeForm() {
  const [defaultData, setDefaultData] = useState<
    DisplayData | undefined
  >();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateEmployeeData>({
    defaultValues: {
      gender: defaultData?.gender,
      marital_status: defaultData?.marital_status,
      date_of_birth: "",
      date_of_joining: "",
      probation_end_date: "",
      status: defaultData?.status,
      blood_group: defaultData?.blood_group,
      pf_contribution: defaultData?.pf_contribution,
      abry_contribution: defaultData?.abry_contribution,
      esi_contribution: defaultData?.esi_contribution,
      city : defaultData?.address.city
    },
  });

  const { getAdminById, updateAdmin } = useEmployee();

  const params = useParams();
  const id = params.updateDataId as string;

  const onSubmit = async (data: UpdateEmployeeData) => {
    if (!id) {
      return;
    }
    console.log(data);

    await updateAdmin(data, id);
  };

  const fetchAdminDetail = useCallback(async () => {
    const data = await getAdminById(id);
    console.log(data);

    setDefaultData(data);

    reset({
      ...data,
    });
  }, [getAdminById, id, reset]);

  useEffect(() => {
    fetchAdminDetail();
  }, [fetchAdminDetail]);

  //josn data of api like address etc baki to display in defoult data

  useEffect(() => {
    if (!defaultData) return;

    const formatDate = (dateString?: string) =>
      dateString ? new Date(dateString).toISOString().split("T")[0] : "";

    setValue("date_of_birth", formatDate(defaultData.date_of_birth));
    setValue("date_of_joining", formatDate(defaultData.date_of_joining));
    setValue("probation_end_date", formatDate(defaultData.probation_end_date));
  }, [defaultData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      {/* Personal Info */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </Label>
            <Input
              placeholder="Enter First Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("firstname")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </Label>
            <Input
              placeholder="Enter Middle Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("middlename")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </Label>
            <Input
              placeholder="Enter Last Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("lastname")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input
              placeholder="Enter email..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              type="email"
              {...register("email")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input
              placeholder="Enter Password..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              type="password"
              {...register("password")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Marital Status
            </Label>
            <Controller
              name="marital_status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="engaged">Engaged</SelectItem>
                    <SelectItem value="unmarried">Unmarried</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </Label>
            <Input
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              type="date"
              {...register("date_of_birth")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Joining
            </Label>
            <Input
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              type="date"
              {...register("date_of_joining")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Probation End Date
            </Label>
            <Input
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              type="date"
              {...register("probation_end_date")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </Label>
            <Controller
              name="blood_group"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contributions */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Controller
            name="pf_contribution"
            control={control}
            // defaultValue="0"
            render={({ field }) => (
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  PF Contribution
                </Label>
                <Switch
                  checked={field.value === 1}
                  onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
                />
              </div>
            )}
          />

          <Controller
            name="abry_contribution"
            control={control}
            render={({ field }) => (
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  ABRY Contribution
                </Label>
                <Switch
                  checked={field.value === 1}
                  onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
                />
              </div>
            )}
          />

          <Controller
            name="esi_contribution"
            control={control}
            render={({ field }) => (
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  ESI Contribution
                </Label>
                <Switch
                  checked={field.value === 1}
                  onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
                />
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Address
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Residential Address
            </Label>
            <Textarea
              placeholder="Enter Address..."
              
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              {...register("residential")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </Label>
            <Input
              placeholder="Enter City..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("city")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </Label>
            <Input
              placeholder="Enter State..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("state")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </Label>
            <Input
              placeholder="Enter Country..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("country")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </Label>
            <Input
              placeholder="Enter Pincode..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("pincode")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Personal Contact
            </Label>
            <Input
              placeholder="Enter Personal Contact..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("personal")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Home Contact
            </Label>
            <Input
              placeholder="Enter Home Contact..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("home")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bank Info */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Bank Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </Label>
            <Input
              placeholder="Enter Bank Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("bank_name")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </Label>
            <Input
              placeholder="Enter Account Holder Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("account_holder_name")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </Label>
            <Input
              placeholder="Enter Account Number..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("account_no")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name
            </Label>
            <Input
              placeholder="Enter Branch Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("branch_name")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code
            </Label>
            <Input
              placeholder="Enter IFSC Code..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("ifsc_code")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </Label>
            <Controller
              name="account_type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </Label>
            <Input
              placeholder="Enter Degree Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("degree")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              College Name
            </Label>
            <Input
              placeholder="Enter Collage Name..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("college_name")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Start Month/Year
            </Label>
            <Input
              type="month"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("start_month_year")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              End Month/Year
            </Label>
            <Input
              type="month"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("end_month_year")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Employment */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Employment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </Label>
            <Input
              placeholder="Enter Designation..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("designation")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              PF Account No
            </Label>
            <Input
              placeholder="Enter PF No..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("pf_account_no")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              UAN No
            </Label>
            <Input
              placeholder="Enter UAN No..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("uan_no")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              ESI No
            </Label>
            <Input
              placeholder="Enter ESI No..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("esi_no")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Identity */}
      <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Card No
            </Label>
            <Input
              placeholder="Enter Aadhar Card No..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("aadhar_card")}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              PAN Card No
            </Label>
            <Input
              placeholder="Enter PAN Card No..."
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-sm"
              {...register("pan_card")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="px-4 pb-6 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Updating..." : "Update Employee"}
        </Button>
      </div>
    </form>
  );
}
