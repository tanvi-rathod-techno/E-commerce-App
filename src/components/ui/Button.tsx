import React from 'react'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
  }
  
  export default function Button({
    children,
    onClick,
    type = 'button',
    className = '',
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition duration-200 ${className}`}
      >
        {children}
      </button>
    )
  }
  