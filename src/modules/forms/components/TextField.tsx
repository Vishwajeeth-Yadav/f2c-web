import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
}

export function TextField({ id, label, placeholder }: TextFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder || "Enter text..."}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}