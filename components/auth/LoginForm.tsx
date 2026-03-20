"use client";

import { useForm } from "react-hook-form";
import { InputField } from "../ui/fields/InputField";
import { Button } from "../ui/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/shadcn/card";
import RedirectForm from "./components/RedirectForm";
import { LoginInputs, loginSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/auth/login";
import { FieldError } from "../ui/shadcn/field";

export default function LoginForm({ isModal = false }: { isModal?: boolean }) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInputs) => {
    const { error } = await login(data);

    if (error) {
      const message =
        "errorMessage" in error
          ? error.errorMessage
          : (error.errors[0] ?? "Login failed");

      setError("root", { message });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            id="email"
            type="email"
            placeholder="Enter an email address"
            label="Email"
            errorMessage={errors?.email?.message}
            {...formRegister("email")}
          />
          <InputField
            id="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            errorMessage={errors?.password?.message}
            {...formRegister("password")}
          />
          {errors.root && (
            <FieldError data-testid="login-form-error">
              {errors.root.message}
            </FieldError>
          )}
          <Button size="lg" type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-gray-500">
        <RedirectForm
          isModal={isModal}
          label="Register"
          redirectPath="register"
          text="Don't have an account?"
        />
      </CardFooter>
    </Card>
  );
}
