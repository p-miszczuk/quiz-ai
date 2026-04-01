"use client";

import { InputField } from "../ui/fields/InputField";
import { Button } from "../ui/shadcn/button";
import { Card } from "../ui/shadcn/card";
import { FieldError } from "../ui/shadcn/field";
import { deleteUserSchema } from "@/validators/auth";
import FormWrapper from "../ui/FormWrapper";
import { deleteUserAccount } from "@/actions/auth/delete";

export default function DeleteAccountForm() {
  return (
    <Card className="w-full shadow-lg max-w-[400px]">
      <FormWrapper
        schema={deleteUserSchema}
        action={deleteUserAccount}
        testId="delete-account-form"
        title="Remove Account"
        description="Enter your password to remove your account"
        redirectAfterSuccess="/"
      >
        {({ register, errors, isSubmitting, isSubmitSuccessful }) => (
          <>
            <InputField
              id="current-password"
              type="password"
              placeholder="Enter your password"
              label="Current Password"
              errorMessage={errors?.currentPassword?.message as string}
              {...register("currentPassword")}
            />
            {errors.root && (
              <FieldError data-testid="delete-account-form-error">
                {errors.root.message}
              </FieldError>
            )}
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Remove Account
            </Button>
          </>
        )}
      </FormWrapper>
    </Card>
  );
}
