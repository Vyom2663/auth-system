"use client";

import { Button } from "@/components/ui/button";
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
import { useEmployee } from "@/hooks/useEmployee";
import { EmployeeData } from "@/types/employee";
import { useForm, Controller } from "react-hook-form";

export default function EmployeeForm({
  isOpen,
  closeModal,
  onSuccess,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeData>();

  const { addAdmin } = useEmployee();

  const onSubmit = async (data: EmployeeData) => {

    await addAdmin(data);

    closeModal();

    reset();

    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 mt-20 ml-20">
      <div className="bg-gray-50 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Admin Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                First Name
              </Label>
              <Input
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Middle Name
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("middlename")}
              />
            </div>

            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Email
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Password
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Gender
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Select gender" />
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
              <Label className="block mb-1 font-medium text-gray-700">
                Marital Status
              </Label>
              <Controller
                name="marital_status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Select status" />
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
              <Label className="block mb-1 font-medium text-gray-700">
                Date of Birth
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="date"
                {...register("date_of_birth")}
              />
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Blood Group
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("blood_group")}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Employment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Date of Joining
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="date"
                {...register("date_of_joining")}
              />
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Probation End Date
              </Label>
              <Input
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="date"
                {...register("probation_end_date")}
              />
            </div>
            <div>
              <Label className="block mb-1 font-medium text-gray-700">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Contributions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
              name="pf_contribution"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <div>
                  <Label className="block mb-1 font-medium text-gray-700">
                    PF Contribution
                  </Label>
                  <Switch
                    checked={field.value === "1"}
                    onCheckedChange={(val) => field.onChange(val ? "1" : "0")}
                  />
                </div>
              )}
            />

            <Controller
              name="abry_contribution"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <div>
                  <Label className="block mb-1 font-medium text-gray-700">
                    ABRY Contribution
                  </Label>
                  <Switch
                    checked={field.value === "1"}
                    onCheckedChange={(val) => field.onChange(val ? "1" : "0")}
                  />
                </div>
              )}
            />

            <Controller
              name="esi_contribution"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <div>
                  <Label className="block mb-1 font-medium text-gray-700">
                    ESI Contribution
                  </Label>
                  <Switch
                    checked={field.value === "1"}
                    onCheckedChange={(val) => field.onChange(val ? "1" : "0")}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex pt-4 gap-2">
          <div>
            <Button
              type="button"
              onClick={() => {
                closeModal();
              }}
              className="px-8 py-3 bg-white text-black hover:bg-gray-200 border border-gray-400 rounded-lg transition duration-300 shadow-md cursor-pointer"
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
