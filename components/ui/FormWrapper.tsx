import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ZodType } from "zod";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { useFormWrapper } from "./hooks/useFormWrapper";

type FormHelpers<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
};

export interface FormWrapperProps<T extends FieldValues, R = unknown> {
  schema: ZodType<T, T>;
  action: (data: T) => Promise<{ error?: string; data?: R }>;
  children: (formHelpers: FormHelpers<T>) => React.ReactNode;
  description?: string;
  onSuccess?: (data: R, title: string) => void;
  onSubmitStart?: () => void;
  onSubmitError?: () => void;
  title: string;
  testId: string;
  redirectAfterSuccess?: string;
}

export default function FormWrapper<T extends FieldValues, R = unknown>({
  schema,
  action,
  children,
  onSuccess,
  onSubmitStart,
  onSubmitError,
  description,
  title,
  testId = "form",
  redirectAfterSuccess,
}: FormWrapperProps<T, R>) {
  const {
    register: formRegister,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
  } = useFormWrapper({
    schema,
    action,
    redirectAfterSuccess,
    onSuccess,
    onSubmitStart,
    onSubmitError,
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        {!!description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          data-testid={testId}
        >
          {children({
            register: formRegister,
            errors,
            isSubmitting,
            isSubmitSuccessful,
          })}
        </form>
      </CardContent>
    </>
  );
}
