import { FieldValues, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import { getFormErrorMessage } from "@/lib/utils";
import { isDataInResponse } from "@/lib/utils";
import { FormWrapperProps } from "../FormWrapper";

type UseFormWrapperProps<T extends FieldValues, R = unknown> = Pick<
  FormWrapperProps<T, R>,
  | "action"
  | "onSuccess"
  | "onSubmitStart"
  | "onSubmitError"
  | "redirectAfterSuccess"
> & { schema: ZodType<T, T> };

export function useFormWrapper<T extends FieldValues, R = unknown>({
  schema,
  action,
  redirectAfterSuccess,
  onSuccess,
  onSubmitStart,
  onSubmitError,
}: UseFormWrapperProps<T, R>) {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<T>({ resolver: zodResolver(schema) as Resolver<T> });

  const onSubmit = async (formData: T) => {
    onSubmitStart?.();
    const { error, data: result } = await action(formData);

    if (!error && isDataInResponse(result) && onSuccess) {
      onSuccess(result as R, String(formData?.title) || "");
      return;
    }

    if (redirectAfterSuccess && !error) {
      push(redirectAfterSuccess);
      return;
    }

    if (error) {
      onSubmitError?.();
      setError("root", { message: getFormErrorMessage(error) });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
  };
}
