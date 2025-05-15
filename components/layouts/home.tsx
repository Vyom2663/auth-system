import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HomePage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-blue-900 font-serif mb-4 text-center">
          Welcome to Auth System 🔐
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          This is a simple authentication system built with Next.js.
          You can register a new account, login, and access protected data. 
          Use the buttons below to get started.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full cursor-pointer">
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full cursor-pointer">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
