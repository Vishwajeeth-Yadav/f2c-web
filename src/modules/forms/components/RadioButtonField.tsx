// import { RadioGroup, RadioGroupItem } from "@/modules/ui/components/radio-group";
// import { Label } from "@/modules/ui/components/label";

// interface RadioButtonFieldProps {
//   id: string;
//   label: string;
//   options: { value: string; label: string }[];
//   stylingOptions: any; // Add stylingOptions as a prop
// }

// export function RadioButtonField({ id, label, options, stylingOptions }: RadioButtonFieldProps) {
//   return (
//     <div className="mb-4">
//       {/* Label */}
//       <Label
//         className="block text-sm font-medium mb-2"
//         style={{
//           color: stylingOptions.textColor || "#000000",
//           fontSize: stylingOptions.labelFontSize || "14px", // Use labelFontSize
//           fontFamily: stylingOptions.fontFamily || "Arial",

//         }}
//       >
//         {label}
//       </Label>

//       {/* Radio Group */}
//       <RadioGroup id={id}>
//         {options.map((option) => (
//           <div key={option.value} className="flex items-center space-x-2 mb-1">
//             <RadioGroupItem
//               value={option.value}
//               id={`${id}-${option.value}`}
//               className="h-4 w-4 border rounded-full focus:ring-2 bg-white focus:ring-blue-500"
//               style={{
//                 borderColor: stylingOptions.borderColor || "#d1d5db",
//                 // backgroundColor: stylingOptions.backgroundColor || "#ffffff",
//               }}
//             />
//             <Label
//               htmlFor={`${id}-${option.value}`}
//               className="text-sm font-normal"
//               style={{
//                 color: stylingOptions.textColor || "#000000",
//                 fontSize: stylingOptions.labelFontSize || "14px", // Use labelFontSize
//               }}
//             >
//               {option.label}
//             </Label>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// }

import { RadioGroup, RadioGroupItem } from "@/modules/ui/components/radio-group";
import { Label } from "@/modules/ui/components/label";

interface RadioButtonFieldProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  stylingOptions: any; // Add stylingOptions as a prop
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function RadioButtonField({
  id,
  label,
  options,
  stylingOptions,
  required = false,
  name = id,
  value = "",
  onChange = () => {},
}: RadioButtonFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <Label
        htmlFor={id}
        className="block text-sm font-medium mb-2"
        style={{
          color: stylingOptions.textColor || "#000000",
          fontSize: stylingOptions.labelFontSize || "14px", // Use labelFontSize
          fontFamily: stylingOptions.fontFamily || "Arial",
        }}
      >
        {label}
      </Label>

      {/* Radio Group */}
      <RadioGroup
        id={id}
        name={name}
        required={required}
        value={value}
        onValueChange={onChange} // Handle changes in the radio group
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2 mb-1">
            <RadioGroupItem
              value={option.value}
              
              id={`${id}-${option.value}`}
              className="h-4 w-4 border rounded-full focus:ring-2 bg-white focus:ring-blue-500"
              style={{
                borderColor: stylingOptions.borderColor || "#d1d5db",
                backgroundColor: stylingOptions.backgroundColor || "#ffffff",
              }}
            />
            <Label
              htmlFor={`${id}-${option.value}`}
              className="text-sm font-normal"
              style={{
                color: stylingOptions.textColor || "#000000",
                fontSize: stylingOptions.fontSize || "14px", // Use fontSize
              }}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}