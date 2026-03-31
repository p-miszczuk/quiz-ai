"use server";

import { getTreeifyErrorMessage } from "@/components/utils";
import { setNewPassword } from "@/services/auth";
import { ChangePasswordInputs, changePasswordSchema } from "@/validators/auth";

export async function changePassword(data: ChangePasswordInputs) {
  const validatedData = changePasswordSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData.error) };
  }

  const result = await setNewPassword({
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });

  if (result.success) {
    return { success: true };
  }

  const message =
    "error" in result.error ? (result.error.error as string) : "Login failed";
  return { error: message };
}
