import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface EmailFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  stylingOptions: any; // Add stylingOptions as a prop
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function EmailField({
  id,
  label,
  placeholder,
  stylingOptions,
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: EmailFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px",
          fontFamily: stylingOptions.fontFamily || "Arial",
        }}
      >
        {label}
      </Label>

      {/* Input */}
      <Input
        id={id}
        type="email"
        placeholder={placeholder || "Enter your email..."}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Handle changes in the email input
        required={required}
        name={name}
        className="w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        style={{
          fontFamily: stylingOptions.fontFamily || "Arial",
          fontSize: stylingOptions.fontSize || "16px",
          color: stylingOptions.textColor || "#000000",
          backgroundColor: stylingOptions.backgroundColor || "#ffffff",
          border: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`,
          padding: stylingOptions.padding || "8px",
          borderRadius: stylingOptions.borderRadius || "6px",
        }}
      />
    </div>
  );
}