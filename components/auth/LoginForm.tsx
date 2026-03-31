"use client";

import { InputField } from "../ui/fields/InputField";
import { Button } from "../ui/shadcn/button";
import { Card, CardFooter } from "../ui/shadcn/card";
import { login } from "@/actions/auth/login";
import { FieldError } from "../ui/shadcn/field";
import { loginSchema } from "@/validators/auth";
import RedirectForm from "./components/RedirectForm";
import FormWrapper from "../ui/FormWrapper";

export default function LoginForm({ isModal = false }: { isModal?: boolean }) {
  return (
    <Card className="w-full shadow-lg">
      <FormWrapper
        schema={loginSchema}
        action={login}
        testId="login-form"
        title="Login"
        description="Enter your email and password to login to your account"
      >
        {({ register, errors, isSubmitting }) => (
          <>
            <InputField
              id="email"
              type="email"
              placeholder="Enter an email address"
              label="Email"
              errorMessage={errors?.email?.message}
              {...register("email")}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              errorMessage={errors?.password?.message}
              {...register("password")}
            />
            {errors.root && (
              <FieldError data-testid="login-form-error">
                {errors.root.message}
              </FieldError>
            )}
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </>
        )}
      </FormWrapper>
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
