
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div 
      className={cn(
        "rounded-full overflow-hidden bg-gray-200 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-popx-lightText font-medium text-sm">
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;
