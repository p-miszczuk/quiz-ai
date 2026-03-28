import {
  FieldErrors,
  FieldValues,
  Resolver,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormErrorMessage } from "@/components/utils";
import { ZodType } from "zod";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

type FormHelpers<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
};

export default function FormWrapper<T extends FieldValues>({
  schema,
  action,
  children,
  description,
  title,
}: {
  schema: ZodType<T, T>;
  action: (data: T) => Promise<{ error?: string }>;
  children: (formHelpers: FormHelpers<T>) => React.ReactNode;
  description: string;
  title: string;
}) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<T>({ resolver: zodResolver(schema) as Resolver<T> });

  const onSubmit = async (data: T) => {
    const { error } = await action(data);

    if (!error) return;

    setError("root", { message: getFormErrorMessage(error) });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {children({
            register: formRegister,
            errors,
            isSubmitting,
          })}
        </form>
      </CardContent>
    </>
  );
}
