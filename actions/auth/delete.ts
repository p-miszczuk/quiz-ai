"use server";

import { getTreeifyErrorMessage } from "@/components/utils";
import { deleteUser } from "@/services/auth";
import { deleteUserSchema } from "@/validators/auth";
import { redirect } from "next/navigation";

type DeleteUserAccountData = {
  currentPassword: string;
};

export async function deleteUserAccount(data: DeleteUserAccountData) {
  const validatedData = deleteUserSchema.safeParse({
    currentPassword: data.currentPassword,
  });

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData.error) };
  }

  const result = await deleteUser(data);

  if (result.success) {
    return { success: true };
  }

  const message =
    "error" in result.error ? (result.error.error as string) : "Login failed";
  return { error: message };
}
