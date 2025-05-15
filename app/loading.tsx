"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-900 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;