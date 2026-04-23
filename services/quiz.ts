import { dbQuery, errorResponse, requireAuth } from "@/lib/query";
import { UserId } from "@/types/user";
import { CreateNewQuizInputs } from "@/validators/quiz";

export const getUserQuizzes = async () => {
  return requireAuth((user) => {
    return findQuizzesByUserId(user.id);
  });
};

const findQuizzesByUserId = async (userId: UserId) => {
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

const createNewQuiz = async (data: CreateNewQuizInputs) => {
  const title = data.title.trim();
  const description = data.description.trim();

  if (!title || !description) {
    return errorResponse({
      type: "validation-error",
      error: "Title and description are required",
    });
  }

  // return dbQuery(async () => {
  //     return {
  //         id: "1",
  //         name: title,
  //         description: description,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //     }
  // })
};

export const createQuiz = async (data: CreateNewQuizInputs) => {
  return requireAuth((data: CreateNewQuizInputs) => {});
};
