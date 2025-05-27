import React from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold cursor-pointer">PlayRoll</h1>
      </div>
      {/* <div className="flex items-center space-x-4">
        <Link href="/register">
          <Button className="cursor-pointer">Register</Button>
        </Link>
        <Link href="/login">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      </div> */}
    </header>
  );
}
