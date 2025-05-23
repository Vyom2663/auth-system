"use client";

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-auto">
      <p className="text-sm text-gray-600">
        © {currentYear} AppStoneLab. All rights reserved.
      </p>
    </footer>
  );
}
