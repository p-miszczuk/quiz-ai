import { createQuiz } from "@/services/quiz";
import { createNewQuiz } from "../create-quiz";

jest.mock("@/services/quiz", () => ({
  createQuiz: jest.fn(),
}));

jest.mock("@/services/utils", () => ({
  createQuizArray: jest.fn((raw: string) =>
    JSON.parse(raw).map((item: Record<string, unknown>, i: number) => ({
      ...item,
      id: `test-id-${i}`,
    })),
  ),
}));

const mockReturnData = {
  success: true as const,
  data: JSON.stringify([
    {
      question:
        "Which of the following NBA players did NOT play for the Chicago Bulls?",
      options: [
        "Michael Jordan",
        "Scottie Pippen",
        "Dennis Rodman",
        "Kobe Bryant",
      ],
      answer: "Kobe Bryant",
      field_type: "multiple_choice",
    },
  ]),
};

describe("create new quiz", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns validation error when title is empty", async () => {
    const result = await createNewQuiz({
      title: "",
      description: "description",
    });
    expect(result).toEqual({
      error: "Title is required",
    });
  });

  it("returns validation error when description is less than 20 characters", async () => {
    const result = await createNewQuiz({
      title: "title",
      description: "description",
    });
    expect(result).toEqual({
      error: "Description must be at least 20 characters",
    });
  });

  it("returns success when quiz is created", async () => {
    jest.mocked(createQuiz).mockResolvedValue(mockReturnData);

    const result = await createNewQuiz({
      title: "title",
      description: "description" + "x".repeat(20),
    });

    expect(result).toMatchObject({
      data: [
        expect.objectContaining({
          answer: "Kobe Bryant",
          field_type: "multiple_choice",
          id: "test-id-0",
        }),
      ],
    });
  });
});
