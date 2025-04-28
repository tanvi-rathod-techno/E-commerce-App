import React from 'react'

type InputFieldProps = {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  label?: string
  required?: boolean
}

export default function InputField({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  label,
  required = false,
}: InputFieldProps) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>
  )
}
