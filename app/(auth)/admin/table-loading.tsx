import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const TableLoading = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="px-6 py-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </TableCell>
          <TableCell className="px-6 py-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </TableCell>
          <TableCell className="px-6 py-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </TableCell>
          <TableCell className="px-6 py-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </TableCell>
          <TableCell className="px-6 py-3">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </TableCell>
          <TableCell className="px-6 py-3 text-center">
            <div className="flex justify-center gap-3">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableLoading;
