import { Label } from "@/modules/ui/components/label";

interface HeadingFieldProps {
  id: string;
  label: string;
  stylingOptions: any; // Add stylingOptions as a prop
}

export function HeadingField({ id, label, stylingOptions }: HeadingFieldProps) {

  return (
    <div className="mb-4">
      {/* Heading */}
      <Label
        id={id}
        className="text-lg font-semibold"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontFamily: stylingOptions.fontFamily || "Arial",
          fontSize: stylingOptions.headingSize || "20px",
        }}
      >
        {label}
      </Label>
    </div>
  );
}