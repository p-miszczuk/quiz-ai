"use server";

import {
  dbQuery,
  errorResponse,
  requireAuth,
  ServiceError,
  ServiceReturn,
  successResponse,
} from "@/lib/query";
import { UserId } from "@/types/user";
import { CreateNewQuizInputs, type QuiziesSchema } from "@/validators/quiz";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { createQuizArray } from "./utils";
import { generateTextWithHuggingFace } from "@/lib/hf";

export const getUserQuizzes = async () => {
  return requireAuth(async (user) => {
    return findQuizzesByUserId(user.id);
  });
};

const findQuizzesByUserId = async (
  userId: UserId,
): Promise<ServiceReturn<QuiziesSchema[], ServiceError>> => {
  return dbQuery(async () => {
    const quizzes = await db
      .collection<QuiziesSchema & { _id: ObjectId }>("quizzes")
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    const quizzesWithId = quizzes.map(
      (quiz: QuiziesSchema & { _id: ObjectId }) => ({
        ...quiz,
        _id: quiz._id.toString(),
      }),
    );

    return quizzesWithId;
  });
};

export const createQuiz = async (data: CreateNewQuizInputs) => {
  return requireAuth(() => {
    return createNewQuiz(data);
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

  const { content, error } = await generateTextWithHuggingFace([
    {
      role: "user",
      content: `{"${description}"}. Insert the key with the right answer (called answer) - do not forget to add the key "answer" to the object and fill it with the right answer not the number of array!. Do not create objects in answer and do not create objects in possible answers (use key "options" to create the possible answers). Stick strictly to the topic. Return a JSON array, nothing else. Add the key "field_type" with the type of the question (multiple_choice, true_false, short_answer, long_answer)`,
    },
  ]);

  if (error) {
    return errorResponse({
      type: "quiz-generation-error",
      error: "Failed to generate quiz. Please try again later.",
    });
  }

  return successResponse(content);

  //   return dbQuery(async () => {
  //     const now = new Date();

  //     const quiz: Omit<QuiziesSchema, "_id"> = {
  //       name: title,
  //       description,
  //       content: quizContent || null,
  //       createdAt: now,
  //       updatedAt: now,
  //       userId: userId,
  //     };

  //     return await db.collection("quizzes").insertOne(quiz);
  //   });
};
