// src/components/ui/Label.tsx

interface LabelProps {
    text: string
    className?: string
  }
  
  export default function Label({ text, className }: LabelProps) {
    return (
      <span
        className={`text-sm font-semibold text-gray-600 ${className}`}
      >
        {text}
      </span>
    )
  }
  