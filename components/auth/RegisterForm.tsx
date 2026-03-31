"use client";

import { InputField } from "@/components/ui/fields/InputField";
import { Card, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { registerSchema } from "@/validators/auth";
import { FieldError } from "@/components/ui/shadcn/field";
import { register } from "@/actions/auth/register";
import RedirectForm from "./components/RedirectForm";
import FormWrapper from "../ui/FormWrapper";

export default function RegisterForm({
  isModal = false,
}: {
  isModal?: boolean;
}) {
  return (
    <div className="w-full shadow-lg">
      <Card className="w-full shadow-lg">
        <FormWrapper
          schema={registerSchema}
          action={register}
          testId="register-form"
          title="Register"
          description="Enter your email and password to register to your account"
        >
          {({ register, errors, isSubmitting }) => (
            <>
              <InputField
                id="email"
                type="email"
                placeholder="Enter your email"
                label="Email"
                data-testid="email-input"
                errorMessage={errors?.email?.message}
                {...register("email")}
              />
              <InputField
                id="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                data-testid="password-input"
                errorMessage={errors?.password?.message}
                {...register("password")}
              />
              <InputField
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                label="Confirm Password"
                data-testid="confirm-password-input"
                errorMessage={errors?.confirmPassword?.message}
                {...register("confirmPassword")}
              />
              <InputField
                id="name"
                type="text"
                placeholder="Enter your name"
                label="Name"
                data-testid="name-input"
                errorMessage={errors?.name?.message}
                {...register("name")}
              />
              {errors.root && <FieldError>{errors.root.message}</FieldError>}
              <Button size="lg" type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </>
          )}
        </FormWrapper>
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
