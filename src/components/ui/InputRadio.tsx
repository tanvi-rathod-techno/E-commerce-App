import React from 'react';

interface InputRadioProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio: React.FC<InputRadioProps> = ({ id, name, label, value, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />
      <label htmlFor={id} className="text-sm sm:text-base">{label}</label>
    </div>
  );
}

export default InputRadio;
