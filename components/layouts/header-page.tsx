import React from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold cursor-pointer">
          AppStoneLab
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button>Register</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
}
