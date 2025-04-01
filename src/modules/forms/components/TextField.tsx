import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  stylingOptions: any;
  required?:boolean;
  onChange?:(value:string) => void;
  value?:string;
  name?:string;
}

export function TextField({ id, label, placeholder, stylingOptions,required=false,onChange=()=>{} , value='',name=id}: TextFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium mb-1"
        style={{ color: stylingOptions.textColor || "inherit" ,fontSize: stylingOptions.labelFontSize || "inherit", fontFamily: stylingOptions.fontFamily || "inherit",}}>
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder || "Enter text..."}
        onChange={(e)=>onChange(e.target.value)}
        value={value}
        required={required}
        name={name}

        className="w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        style={{
         
          fontSize: stylingOptions.fontSize || "inherit",
          color: stylingOptions.textColor || "inherit",
          backgroundColor: "white",
          border: `1px solid ${stylingOptions.borderColor || "#d1d5db"}`, // Default to slate-300
          padding: stylingOptions.padding || "8px",
          borderRadius: stylingOptions.borderRadius || "6px",
        }}
      />
    </div>
  );
}