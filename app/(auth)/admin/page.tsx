"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmployeeForm from "@/app/(auth)/admin/add-data/page";
import AdminTable from "@/app/(auth)/admin/admin-table";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshTable = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded my-4 hover:bg-primary-dark transition cursor-pointer"
        >
          Add Admin
        </Button>
      </div>

      <div>
        <AdminTable refreshFlag={refreshFlag} />
      </div>

      <EmployeeForm
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSuccess={refreshTable}
      />
    </div>
  );
};

export default Page;
