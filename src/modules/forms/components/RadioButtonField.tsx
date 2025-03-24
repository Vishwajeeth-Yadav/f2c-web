import { RadioGroup, RadioGroupItem } from "@/modules/ui/components/radio-group";
import { Label } from "@/modules/ui/components/label";

interface RadioButtonFieldProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export function RadioButtonField({ id, label, options }: RadioButtonFieldProps) {
  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-slate-700 mb-2">{label}</Label>
      <RadioGroup id={id}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2 mb-1">
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              className="h-4 w-4 border border-slate-300 focus:ring-2 focus:ring-blue-500"
            />
            <Label
              htmlFor={`${id}-${option.value}`}
              className="text-sm text-slate-700"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}