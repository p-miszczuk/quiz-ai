"use server";

import { signIn } from "@/services/auth";
import { LoginInputs, loginSchema, setTreeifyError } from "@/validators/auth";
import { redirect } from "next/navigation";

export async function login(data: LoginInputs) {
  const validatedData = loginSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: setTreeifyError(validatedData.error) };
  }

  const result = await signIn(data);

  if (result.success) {
    return redirect("/dashboard");
  }

  const message =
    "error" in result.error ? (result.error.error as string) : "Login failed";
  return { error: message };
}
