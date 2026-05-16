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
import { CreateNewQuizInputs, Quizies } from "@/validators/quiz";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { generateTextWithHuggingFace } from "@/lib/hf";

export type CreateQuiz = Pick<Quizies, "title" | "description" | "content">;

const TABLE_ROWS_LIMIT = 10;

export const getUserQuizzes = async (skip: number = 0) => {
  return requireAuth(async (user) => {
    return findQuizzesByUserId(user.id, skip);
  });
};

const findQuizzesByUserId = async (
  userId: UserId,
  skip: number,
): Promise<
  ServiceReturn<{ quizzes: Quizies[]; totalPages: number }, ServiceError>
> => {
  return dbQuery(async () => {
    const quizzes = await db
      .collection<Quizies & { _id: ObjectId }>("quizzes")
      .find({ userId })
      .sort({ updatedAt: -1 })
      .skip(skip * TABLE_ROWS_LIMIT)
      .limit(TABLE_ROWS_LIMIT)
      .toArray();

    const rowsCount = await db.collection("quizzes").countDocuments({ userId });
    const totalPages = Math.ceil(rowsCount / TABLE_ROWS_LIMIT);

    const quizzesWithId = quizzes.map((quiz: Quizies & { _id: ObjectId }) => ({
      ...quiz,
      _id: quiz._id.toString(),
    }));

    return { quizzes: quizzesWithId, totalPages };
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

  if (!title) {
    return errorResponse({
      type: "validation-error",
      error: "Title is required",
    });
  }

  if (!description || description?.length < 20) {
    return errorResponse({
      type: "validation-error",
      error: "Description must be at least 20 characters",
    });
  }

  const { content, error } = await generateTextWithHuggingFace([
    {
      role: "user",
      content: `{"${description}"}. Insert the key with the right answer (called answer) - do not forget to add the key "answer" to the object and fill it with the right answer not the number of array!. Do not create objects in answer and do not create objects in possible answers (use key "options" to create the possible answers). Stick strictly to the topic. Return a JSON array, nothing else. Add the key "field_type" with the type of the question (multiple_choice, yes_no, short_answer, long_answer)`,
    },
  ]);

  if (error) {
    return errorResponse({
      type: "quiz-generation-error",
      error: "Failed to generate quiz. Please try again later.",
    });
  }

  return successResponse(content);
};

export const saveQuiz = async (data: CreateQuiz) => {
  return requireAuth(async (user) => {
    return saveNewQuiz(user.id, data);
  });
};

const saveNewQuiz = (userId: UserId, data: CreateQuiz) => {
  const { description, title, content } = data || {};

  return dbQuery(async () => {
    const now = new Date();

    const quiz: Omit<Quizies, "_id"> = {
      title: title.trim(),
      description: description.trim(),
      content,
      createdAt: now,
      updatedAt: now,
      userId: userId,
    };

    return await db.collection("quizzes").insertOne(quiz);
  });
};
