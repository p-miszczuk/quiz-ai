import { dbQuery, requireAuth } from "@/lib/query";
import { UserId } from "@/types/user";

export const getUserQuizzes = async () => {
  return requireAuth((user) => {
    return findQuizzesByUserId(user.id);
  });
};

export const findQuizzesByUserId = async (userId: UserId) => {
  return dbQuery(async () => {
    return [
      {
        id: "1",
        name: "Quiz 1",
        description: "Quiz 1 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
      },
      {
        id: "2",
        name: "Quiz 2",
        description: "Quiz 2 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
      },
    ];
  });
};
