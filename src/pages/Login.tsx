
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import InputField from '@/components/InputField';
import AuthButton from '@/components/AuthButton';
import { usePageTransition } from '@/lib/animations';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  usePageTransition();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/settings" />;
  }

  return (
    <AuthLayout>
      <div id="main-content" className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-popx-text mb-2">
            Sign in to your PopX account
          </h1>
          <p className="text-popx-lightText text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <div className="mt-6">
            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </AuthButton>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <Link to="/register" className="text-sm text-popx-purple hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
