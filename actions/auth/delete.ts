"use server";

import { getTreeifyErrorMessage } from "@/lib/utils";
import { deleteUser } from "@/services/auth";
import { deleteUserSchema } from "@/validators/auth";

type DeleteUserAccountData = {
  currentPassword: string;
};

export async function deleteUserAccount(data: DeleteUserAccountData) {
  const validatedData = deleteUserSchema.safeParse({
    currentPassword: data.currentPassword,
  });

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData) };
  }

  const result = await deleteUser(data);

  if (result.success) {
    return { success: true };
  }

  const message =
    "error" in result.error ? (result.error.error as string) : "Login failed";
  return { error: message };
}
