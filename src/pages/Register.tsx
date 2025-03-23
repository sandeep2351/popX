
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import InputField from '@/components/InputField';
import AuthButton from '@/components/AuthButton';
import RadioGroup from '@/components/RadioGroup';
import { usePageTransition } from '@/lib/animations';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  usePageTransition();
  const { register, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'No'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, isAgency: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/settings" />;
  }

  return (
    <AuthLayout className="max-w-lg">
      <div id="main-content" className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-popx-text mb-2">
            Create your PopX account
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Mary Doe"
            required
          />

          <InputField
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />

          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />

          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create password"
            required
          />

          <InputField
            label="Company Name"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />

          <RadioGroup
            name="isAgency"
            label="Are you an Agency?"
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]}
            value={formData.isAgency}
            onChange={handleRadioChange}
          />

          <div className="mt-8">
            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </AuthButton>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-popx-purple hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
