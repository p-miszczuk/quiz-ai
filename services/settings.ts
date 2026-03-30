import { requireAuth } from "@/lib/query";
import { successResponse } from "@/lib/query";

export const getUserSettings = async () => {
  return requireAuth(async (user) => {
    return successResponse({ ...user });
  });
};
