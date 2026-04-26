import { dbQuery, errorResponse, requireAuth } from "@/lib/query";
import { UserId } from "@/types/user";
import { CreateNewQuizInputs } from "@/validators/quiz";
import { db } from "@/lib/db";

export const getUserQuizzes = async () => {
  return requireAuth((user) => {
    return findQuizzesByUserId(user.id);
  });
};

const findQuizzesByUserId = async (userId: UserId) => {
  return dbQuery(async () => {
    return db.collection("quizzes").find({ userId }).toArray();
  });
};

export const createNewServiceQuiz = async (data: CreateNewQuizInputs) => {
  return requireAuth((user) => {
    return createQuiz(user.id, data);
  });
};

const createQuiz = async (userId: UserId, data: CreateNewQuizInputs) => {
  const title = data.title.trim();
  const description = data.description.trim();

  if (!title || !description) {
    return errorResponse({
      type: "validation-error",
      error: "Title and description are required",
    });
  }

  return dbQuery(async () => {
    const now = new Date();

    const quiz = {
      name: title,
      description,
      createdAt: now,
      updatedAt: now,
      status: "pending",
      userId: userId,
    };

    return await db.collection("quizzes").insertOne(quiz);
  });
};
