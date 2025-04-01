import { Label } from "@/modules/ui/components/label";

interface CountryFieldProps {
  id: string;
  label: string;
  countries: string[]; // List of countries
  stylingOptions: any; // Add stylingOptions as a prop
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function CountryField({
  id,
  label,
  countries,
  stylingOptions,
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: CountryFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px",
        }}
      >
        {label}
      </Label>

      {/* Select Dropdown */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Handle changes in the dropdown
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
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}