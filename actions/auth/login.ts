"use server";

import { signIn } from "@/services/auth";
import { LoginInputs, loginSchema, setTreeifyError } from "@/validators/auth";
import { redirect } from "next/navigation";

export async function login(data: LoginInputs) {
  const validatedData = loginSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: setTreeifyError(validatedData.error) };
  }

  const { error, data: result } = await signIn(data);

  if (result?.user?.id) {
    return redirect("/dashboard");
  }

  return { error };
}
