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
import { useRouter } from "next/navigation";

type FormHelpers<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
};

interface FormWrapperProps<T extends FieldValues> {
  schema: ZodType<T, T>;
  action: (data: T) => Promise<{ error?: string }>;
  children: (formHelpers: FormHelpers<T>) => React.ReactNode;
  description: string;
  title: string;
  testId: string;
  redirectAfterSuccess?: string;
}

export default function FormWrapper<T extends FieldValues>({
  schema,
  action,
  children,
  description,
  title,
  testId = "form",
  redirectAfterSuccess,
}: FormWrapperProps<T>) {
  const { push } = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<T>({ resolver: zodResolver(schema) as Resolver<T> });

  const onSubmit = async (data: T) => {
    const { error } = await action(data);

    if (!!redirectAfterSuccess && !error) {
      //special condition for deleteUser because of refreshing /settings after deleting user
      push(redirectAfterSuccess);
      return;
    }

    if (!!error) {
      setError("root", { message: getFormErrorMessage(error) });
    }
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
