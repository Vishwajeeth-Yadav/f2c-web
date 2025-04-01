import { TextField } from "@/modules/forms/components/TextField";
import { DateField } from "@/modules/forms/components/DateField";
import { NumberField } from "@/modules/forms/components/NumberField";
import { RadioButtonField } from "@/modules/forms/components/RadioButtonField";
import { HeadingField } from "../../components/HeadingFeild";
import { DescriptionField } from "../../components/DescriptionFeild";
import { CountryField } from "../../components/CountryFeild";
import { MobileField } from "../../components/Mobile";
import { EmailField } from "../../components/EmailFeild";

export const renderFieldComponent = (field: any, stylingOptions: any) => {
  switch (field.type) {
    case "text":
      return <TextField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "date":
      return <DateField key={field.id} id={field.id} label={field.label} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "radio":
      return <RadioButtonField key={field.id} id={field.id} label={field.label} options={field.options ?? []} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "number":
      return <NumberField key={field.id} id={field.id} label={field.label} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "email":
      return <EmailField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} stylingOptions={stylingOptions} required={field.required ?? false}/>;
    case "mobile":
      return <MobileField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "country":
      return <CountryField key={field.id} id={field.id} label={field.label} countries={field.countries ?? []} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "description":
      return <DescriptionField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder || ""} stylingOptions={stylingOptions} required={field.required ?? false} />;
    case "heading":
      return <HeadingField key={field.id} id={field.id} label={field.label} stylingOptions={stylingOptions} />;
    default:
      return null;
  }
};