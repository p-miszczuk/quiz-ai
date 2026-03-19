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
      <FieldLabel htmlFor={id} data-testid={`${id}-label`}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
        data-testid={`${id}-input`}
      />
      {description && (
        <FieldDescription data-testid={`${id}-description`}>
          {description}
        </FieldDescription>
      )}
      {errorMessage && (
        <FieldError
          errors={[{ message: errorMessage }]}
          data-testid={`${id}-error`}
        />
      )}
    </Field>
  );
}
