"use client";

import { Card } from "../ui/shadcn/card";
import { InputField } from "../ui/fields/InputField";
import { FieldError } from "../ui/shadcn/field";
import { Button } from "../ui/shadcn/button";
import { changePassword } from "@/actions/auth/change-password";
import { changePasswordSchema } from "@/validators/auth";
import FormWrapper from "../ui/FormWrapper";
import FormSuccessMessage from "../ui/FormSuccessMessage";

export default function ChangePasswordForm() {
  return (
    <Card className="w-full shadow-lg max-w-[400px]">
      <FormWrapper
        schema={changePasswordSchema}
        action={changePassword}
        testId="change-password-form"
        title="Change Password"
        description="Enter your current password and new password to change your password"
      >
        {({ register, errors, isSubmitting, isSubmitSuccessful }) => (
          <>
            <InputField
              id="current-password"
              type="password"
              placeholder="Enter your current password"
              label="Current Password"
              errorMessage={errors?.currentPassword?.message}
              {...register("currentPassword")}
            />
            <InputField
              id="new-password"
              type="password"
              placeholder="Enter your new password"
              label="Password"
              errorMessage={errors?.newPassword?.message}
              {...register("newPassword")}
            />
            <InputField
              id="confirm-new-password"
              type="password"
              placeholder="Confirm your new password"
              label="Confirm New Password"
              errorMessage={errors?.confirmNewPassword?.message}
              {...register("confirmNewPassword")}
            />
            {errors.root && (
              <FieldError data-testid="change-password-form-error">
                {errors.root.message}
              </FieldError>
            )}
            {isSubmitSuccessful && (
              <FormSuccessMessage text="Password changed successfully" />
            )}
            <Button size="lg" type="submit" disabled={isSubmitting}>
              Change Password
            </Button>
          </>
        )}
      </FormWrapper>
    </Card>
  );
}
