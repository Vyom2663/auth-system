"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useEmployee } from "@/hooks/useEmployee";
import { Button } from "@/components/ui/button";
import { AdminData } from "@/types/employee";
import TableLoading from "./table-loading";
import Link from "next/link";
import DeleteConfirmationDialog from "../delete-dialog";

const AdminTable = ({ refreshFlag }: { refreshFlag: boolean }) => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { getAdmin, deleteAdmin } = useEmployee();

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    const data = await getAdmin();
    setAdmins(data);
    setLoading(false);
  }, [getAdmin]);

  const handleDelete = async () => {
    if (!selectedAdminId) return;
    setIsDeleting(true);
    try {
      await deleteAdmin(selectedAdminId);
      await fetchAdmins();
    } catch {
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
      setSelectedAdminId(null);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refreshFlag, fetchAdmins]);

  return (
    <div className="mt-10 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin List</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-200">
              <TableHead className="px-6 py-4">First Name</TableHead>
              <TableHead className="px-6 py-4">Last Name</TableHead>
              <TableHead className="px-6 py-4">Email</TableHead>
              <TableHead className="px-6 py-4">Date of Joining</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoading />
            ) : (
              admins.map((admin, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-3">{admin.firstname}</TableCell>
                  <TableCell className="px-6 py-3">{admin.lastname}</TableCell>
                  <TableCell className="px-6 py-3">{admin.email}</TableCell>
                  <TableCell className="px-6 py-3">
                    {admin.date_of_joining}
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <Badge
                      variant="outline"
                      className={
                        admin.status === "active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <Link href={`/admin/update-data/${admin.id}`}>
                        <Button className="p-2 bg-transparent hover:bg-blue-100 rounded-md cursor-pointer">
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </Button>
                      </Link>
                      <Button
                        className="p-2 bg-transparent hover:bg-red-100 rounded-md cursor-pointer"
                        onClick={() => {
                          setSelectedAdminId(admin.id);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedAdminId(null);
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminTable;
