
import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  name, 
  options, 
  value, 
  onChange, 
  label 
}) => {
  return (
    <div className="mb-4">
      <p className="popx-label mb-2">{label}</p>
      <div className="flex space-x-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-popx-purple focus:ring-popx-purple"
            />
            <span className="text-sm text-popx-text">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
