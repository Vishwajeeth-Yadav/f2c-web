import { TextField } from "@/modules/forms/components/TextField";
import { DateField } from "@/modules/forms/components/DateField";
import { NumberField } from "@/modules/forms/components/NumberField";
import { RadioButtonField } from "@/modules/forms/components/RadioButtonField";

export const renderFieldComponent = (field: any) => {
  switch (field.type) {
    case "text":
      return <TextField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} />;
    case "date":
      return <DateField key={field.id} id={field.id} label={field.label} />;
    case "radio":
      return <RadioButtonField key={field.id} id={field.id} label={field.label} options={field.options ?? []} />;
    case "number":
      return <NumberField key={field.id} id={field.id} label={field.label} />;
    default:
      return null;
  }
};