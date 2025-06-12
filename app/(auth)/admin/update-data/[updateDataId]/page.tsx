import React from "react";
import UpdateEmployeeForm from "@/app/(auth)/admin/update-data/[updateDataId]/update-data";

const Page = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2 ml-4">Update Employee</h1>
      <UpdateEmployeeForm />
    </div>
  );
};

export default Page;