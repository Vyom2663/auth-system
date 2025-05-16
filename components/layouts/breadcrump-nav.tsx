"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes: {
  [key: string]: { title: string; parent?: string };
} = {
  "/": { title: "Dashboard" },
  "/dashboard": { title: "Dashboard" },
//   "/personal-information/basic-details": {
//     title: "Basic Details",
//     parent: "Personal Information",
//   },
};

// Get route metadata safely
function getPageMeta(path: string) {
  return routes[path] || { title: "Unknown Page" };
}

// Find the path for a given parent title
function findParentPath(title: string) {
  return Object.entries(routes).find(([, meta]) => meta.title === title)?.[0];
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const current = getPageMeta(pathname);
  const parentPath = current.parent ? findParentPath(current.parent) : null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {current.parent && parentPath && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={parentPath} className="text-blue-900">
                {current.parent}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-900">
            {current.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
