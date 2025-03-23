
import React from 'react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center w-full p-4">
      <div className={cn("w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden", className)}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
