import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";

type InputFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  description?: string;
  errorMessage?: string;
};

type InputReadOnlyProps<T extends InputFieldProps> = Readonly<T>;

export function InputField({
  id,
  type,
  placeholder,
  label,
  description,
  errorMessage,
  ...props
}: InputReadOnlyProps<InputFieldProps>) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} type={type} placeholder={placeholder} {...props} />
      {description && <FieldDescription>{description}</FieldDescription>}
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </Field>
  );
}
