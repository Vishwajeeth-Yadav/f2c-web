import { Input } from "@/modules/ui/components/input";
import { Label } from "@/modules/ui/components/label";

interface DateFieldProps {
  id: string;
  label: string;
}

export function DateField({ id, label }: DateFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </Label>
      <Input
        id={id}
        type="date"
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}