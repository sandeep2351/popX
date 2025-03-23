
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import AuthButton from '@/components/AuthButton';
import { usePageTransition } from '@/lib/animations';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  usePageTransition();
  const { isAuthenticated, isLoading } = useAuth();

  // If authenticated, redirect to settings
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/settings" />;
  }

  return (
    <AuthLayout>
      <div id="main-content" className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-popx-text mb-2">Welcome to PopX</h1>
          <p className="text-popx-lightText text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="space-y-3">
          <Link to="/register">
            <AuthButton>Create Account</AuthButton>
          </Link>
          
          <Link to="/login">
            <AuthButton variant="outline">Already Registered? Login</AuthButton>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Index;
