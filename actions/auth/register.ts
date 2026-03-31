"use server";

import { getTreeifyErrorMessage } from "@/components/utils";
import { createUser } from "@/services/auth";
import {
  RegisterInputs,
  registerSchema,
} from "@/validators/auth";
import { redirect } from "next/navigation";

export async function register(data: RegisterInputs) {
  const validatedData = registerSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: getTreeifyErrorMessage(validatedData.error) };
  }

  const result = await createUser(data);

  if (result.success) {
    return redirect("/dashboard");
  }

  const message =
    "error" in result.error ? (result.error.error as string) : "Login failed";

  return { error: message };
}
