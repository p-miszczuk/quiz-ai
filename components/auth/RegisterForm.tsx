"use client";

import { InputField } from "@/components/ui/fields/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInputs, registerSchema } from "@/validators/auth";
import { register } from "@/actions/auth/register";
import { FieldError } from "@/components/ui/shadcn/field";
import RedirectForm from "./components/RedirectForm";

export default function Register({ isModal = false }: { isModal?: boolean }) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterInputs>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInputs) => {
    const { error } = await register(data);

    if (error && "errorMessage" in error) {
      setError("root", { message: error.errorMessage });
    }
  };

  return (
    <div className="w-full shadow-lg">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            data-testid="register-form"
          >
            <InputField
              id="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              data-testid="email-input"
              errorMessage={errors?.email?.message}
              {...formRegister("email")}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              data-testid="password-input"
              errorMessage={errors?.password?.message}
              {...formRegister("password")}
            />
            <InputField
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
              data-testid="confirm-password-input"
              errorMessage={errors?.confirmPassword?.message}
              {...formRegister("confirmPassword")}
            />
            <InputField
              id="name"
              type="text"
              placeholder="Enter your name"
              label="Name"
              data-testid="name-input"
              errorMessage={errors?.name?.message}
              {...formRegister("name")}
            />
            {errors.root && <FieldError>{errors.root.message}</FieldError>}
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500">
          <RedirectForm
            isModal={isModal}
            label="Login"
            redirectPath="login"
            text="Already have an account?"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
