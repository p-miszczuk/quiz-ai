import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/shadcn/field";
import { Textarea } from "@/components/ui/shadcn/textarea";

type TextareaFieldProps = {
  id: string;
  placeholder: string;
  label: string;
  description?: string;
  errorMessage?: string;
  rows?: number;
};

type TextareaReadOnlyProps<T extends TextareaFieldProps> = Readonly<T>;

export function TextareaField({
  id,
  placeholder,
  label,
  description,
  errorMessage,
  rows = 5,
  ...props
}: TextareaReadOnlyProps<TextareaFieldProps>) {
  return (
    <Field>
      <FieldLabel htmlFor={id} data-testid={`${id}-label`}>
        {label}
      </FieldLabel>
      <Textarea
        id={id}
        placeholder={placeholder}
        {...props}
        data-testid={`${id}-textarea`}
        rows={rows}
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
