
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import Avatar from '@/components/Avatar';
import { usePageTransition } from '@/lib/animations';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  usePageTransition();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthLayout className="max-w-lg">
      <div id="main-content" className="p-6">
        <h1 className="text-xl font-semibold text-popx-text mb-6">Account Settings</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-popx-purple"></div>
          </div>
        ) : user ? (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar 
                src={user.avatar || '/lovable-uploads/03014d2e-8f4b-4aa8-9eaf-78185db2846e.png'} 
                alt={user.fullName} 
                size="lg" 
              />
              
              <div>
                <h2 className="font-medium text-popx-text">{user.fullName}</h2>
                <p className="text-sm text-popx-lightText">{user.email}</p>
                <p className="text-sm text-popx-lightText">{user.phoneNumber}</p>
                {user.companyName && (
                  <p className="text-sm text-popx-lightText">Company: {user.companyName}</p>
                )}
                <p className="text-sm text-popx-lightText">Agency: {user.isAgency}</p>
              </div>
            </div>
            
            <div className="text-sm text-popx-lightText">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed enim nummmy euismod tempus windiunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            </div>
          </>
        ) : null}
      </div>
    </AuthLayout>
  );
};

export default Settings;
