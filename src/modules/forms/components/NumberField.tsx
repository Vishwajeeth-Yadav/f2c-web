import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface NumberFieldProps {
  id: string;
  label: string;
  placeholder?: string;
}

export function NumberField({ id, label, placeholder }: NumberFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        placeholder={placeholder || "Enter number..."}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}