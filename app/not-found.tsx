'use client';

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">
          The page you`re looking for doesn`t exist or has been moved.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Go back Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
