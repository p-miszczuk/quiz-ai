import { generateTextWithHuggingFace } from "@/lib/hf";
import { getCurrentUser } from "@/lib/auth";
import type { User } from "@/types/user";
import { UserId } from "@/types/user";
import { createQuiz, getUserQuizzes } from "../quiz";

jest.mock("next/headers", () => ({
  headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("@/lib/auth", () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock("@/lib/db", () => ({
  db: {
    collection: jest.fn(() => ({ find })),
  },
  client: {},
}));

jest.mock("@/lib/hf", () => ({ generateTextWithHuggingFace: jest.fn() }));

const toArray = jest.fn();
const sort = jest.fn(() => ({ toArray }));
const find = jest.fn(() => ({ sort }));

const mockUser: User = {
  id: "user-1" as UserId,
  email: "u@test.com",
  name: "Test",
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("getUserQuizzes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    toArray.mockReset();
    sort.mockReturnValue({ toArray });
    find.mockReturnValue({ sort });
  });

  it("return no-user error if user is not authenticated", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(null);
    const result = await getUserQuizzes();
    expect(result).toEqual({
      success: false,
      error: {
        type: "no-user",
      },
    });
    expect(find).not.toHaveBeenCalled();
  });

  it("returns quizzes if user is authenticated", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);

    const oid = { toString: () => "507f191e810c19729de860ea" };
    toArray.mockResolvedValue([
      {
        _id: oid,
        name: "Q1",
        description: "D1",
        content: null,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
        userId: mockUser.id,
      },
    ]);
    const result = await getUserQuizzes();

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(1);
    expect(result.data[0]._id).toBe("507f191e810c19729de860ea");
    expect(result.data[0].name).toBe("Q1");
    expect(find).toHaveBeenCalledWith({ userId: mockUser.id });
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1 });
  });
});

describe("createNewQuiz", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns no-user where there is no session", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(null);
    const result = await createQuiz({
      title: "Test",
      description: "Test",
    });
    expect(result).toEqual({
      success: false,
      error: { type: "no-user" },
    });
    expect(generateTextWithHuggingFace).not.toHaveBeenCalled();
  });

  it("returns validation error when title is empty", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);

    const result = await createQuiz({
      title: "",
      description: "Test",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "Title is required",
      },
    });
    expect(generateTextWithHuggingFace).not.toHaveBeenCalled();
  });

  it("returns validation error when description is less than 20 characters", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);

    const result = await createQuiz({
      title: "Test",
      description: "Test description",
    });
    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "Description must be at least 20 characters",
      },
    });
    expect(generateTextWithHuggingFace).not.toHaveBeenCalled();
  });

  it("returns quiz-generation-error when Hugging Face fails", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);
    jest.mocked(generateTextWithHuggingFace).mockResolvedValue({
      content: null,
      error: new Error("upstream"),
    });
    const result = await createQuiz({
      title: "My quiz",
      description: "x".repeat(20),
    });
    expect(result).toEqual({
      success: false,
      error: {
        type: "quiz-generation-error",
        error: "Failed to generate quiz. Please try again later.",
      },
    });
    expect(generateTextWithHuggingFace).toHaveBeenCalled();
  });

  it("returns generated content on success", async () => {
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);
    const raw = '[{"question":"1","answer":"a"}]';
    jest.mocked(generateTextWithHuggingFace).mockResolvedValue({
      content: raw,
      error: null,
    });
    const result = await createQuiz({
      title: "My quiz",
      description: "x".repeat(20),
    });
    expect(result).toEqual({ success: true, data: raw });
    expect(generateTextWithHuggingFace).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          role: "user",
          content: expect.stringContaining("x".repeat(20)),
        }),
      ]),
    );
  });
});
