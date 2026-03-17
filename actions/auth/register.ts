"use server";

import { createUser } from "@/services/auth";
import {
  RegisterInputs,
  registerSchema,
  setTreeifyError,
} from "@/validators/auth";
import { redirect } from "next/navigation";

export async function register(data: RegisterInputs) {
  const validatedData = registerSchema.safeParse(data);

  if (validatedData?.error) {
    return { error: setTreeifyError(validatedData.error) };
  }

  const { error, data: result } = await createUser(data);

  if (result?.user?.id) {
    return redirect("/dashboard");
  }

  return { error };
}
