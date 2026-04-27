"use server";

import {
  dbQuery,
  errorResponse,
  requireAuth,
  ServiceError,
  ServiceReturn,
} from "@/lib/query";
import { UserId } from "@/types/user";
import { CreateNewQuizInputs, type QuiziesSchema } from "@/validators/quiz";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { createQuizArray } from "./utils";

export const getUserQuizzes = async () => {
  return requireAuth((user) => {
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
  return requireAuth((user) => {
    return createNewQuiz(user.id, data);
  });
};

const createNewQuiz = async (userId: UserId, data: CreateNewQuizInputs) => {
  const title = data.title.trim();
  const description = data.description.trim();

  if (!title || !description) {
    return errorResponse({
      type: "validation-error",
      error: "Title and description are required",
    });
  }

  const { quiz: quizContent, error } =
    await generateQuizInBackground(description);

  if (error) {
    return errorResponse({
      type: "quiz-generation-error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return dbQuery(async () => {
    const now = new Date();

    const quiz: Omit<QuiziesSchema, "_id"> = {
      name: title,
      description,
      content: quizContent || null,
      createdAt: now,
      updatedAt: now,
      userId: userId,
    };

    return await db.collection("quizzes").insertOne(quiz);
  });
};

export const generateQuizInBackground = async (description: string) => {
  try {
    const res = await fetch(process.env.HUGGINGFACE_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: "google/flan-t5-base",
        // model: "meta-llama/Llama-2-13b-chat-hf",
        // model: "HuggingFaceH4/zephyr-7b-beta",
        model: process.env.HUGGINGFACE_MODEL!,
        messages: [
          {
            role: "user",
            content: `{"${description}"}. Insert the key with the right answer (called answer). Do not create objects in answer and do not create objects in possible answers. Stick strictly to the topic. Return a JSON array, nothing else.`,
          },
        ],
        temperature: 0.1,
      }),
    });

    const text = await res.text();
    const data = JSON.parse(text);

    return {
      quiz: createQuizArray(data.choices[0].message.content) || null,
      error: null,
    };
  } catch (e) {
    return { quiz: null, error: e };
  }
};
