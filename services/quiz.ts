import { dalDbQuery } from "@/lib/dal/helpers";
import { UserId } from "@/types/user";

export const findQuizzesByUserId = async (userId: UserId) => {
  return dalDbQuery(async () => {
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
