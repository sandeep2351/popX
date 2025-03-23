
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  id, 
  className, 
  required = false,
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="popx-label">
        {label}{required && <span className="text-popx-purple">*</span>}
      </label>
      <input
        id={id}
        className="popx-input"
        {...props}
      />
    </div>
  );
};

export default InputField;
