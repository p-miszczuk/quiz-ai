import { dalRequireAuth } from "@/lib/dal/helpers";
import { findQuizzesByUserId } from "@/services/quiz";

export const getUserQuizzes = async () => {
  return dalRequireAuth((user) => {
    return findQuizzesByUserId(user.id);
  });
};
