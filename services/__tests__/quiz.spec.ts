import { generateTextWithHuggingFace } from "@/lib/hf";
import { getCurrentUser } from "@/lib/auth";
import type { User } from "@/types/user";
import { UserId } from "@/types/user";
import { createQuiz, getUserQuizzes } from "../quiz";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    collection: vi.fn(() => ({ find, countDocuments })),
  },
  client: {},
}));

vi.mock("@/lib/hf", () => ({ generateTextWithHuggingFace: vi.fn() }));

const toArray = vi.fn();
const limit = vi.fn(() => ({ toArray }));
const skip = vi.fn(() => ({ limit }));
const sort = vi.fn(() => ({ skip }));
const find = vi.fn(() => ({ sort }));
const countDocuments = vi.fn();

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
    sort.mockReturnValue({ skip });
    skip.mockReturnValue({ limit });
    limit.mockReturnValue({ toArray });
    find.mockReturnValue({ sort });
    countDocuments.mockResolvedValue(1);
  });

  it("return no-user error if user is not authenticated", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
    const result = await getUserQuizzes(0);
    expect(result).toEqual({
      success: false,
      error: {
        type: "no-user",
      },
    });
    expect(find).not.toHaveBeenCalled();
  });

  it("returns quizzes if user is authenticated", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);

    const oid = { toString: () => "507f191e810c19729de860ea" };
    toArray.mockResolvedValue([
      {
        _id: oid,
        title: "Q1",
        description: "D1",
        content: null,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
        userId: mockUser.id,
      },
    ]);
    countDocuments.mockResolvedValue(1);
    const result = await getUserQuizzes(0);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.quizzes).toHaveLength(1);
    expect(result.data.totalPages).toBe(1);
    expect(result.data.quizzes[0]._id).toBe("507f191e810c19729de860ea");
    expect(result.data.quizzes[0]?.title).toBe("Q1");
    expect(find).toHaveBeenCalledWith({ userId: mockUser.id });
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1 });
    expect(skip).toHaveBeenCalledWith(0);
    expect(limit).toHaveBeenCalledWith(10);
    expect(countDocuments).toHaveBeenCalledWith({ userId: mockUser.id });
  });
});

describe("createNewQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns no-user where there is no session", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
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
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);

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
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);

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
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);
    vi.mocked(generateTextWithHuggingFace).mockResolvedValue({
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
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);
    const raw = '[{"question":"1","answer":"a"}]';
    vi.mocked(generateTextWithHuggingFace).mockResolvedValue({
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
