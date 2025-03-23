
import React from 'react';
import { cn } from '@/lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  fullWidth = true,
  ...props 
}) => {
  return (
    <button
      className={cn(
        variant === 'default' ? 'popx-button' : 'popx-button-outline',
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;
