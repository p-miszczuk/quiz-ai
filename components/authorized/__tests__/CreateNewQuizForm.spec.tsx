import { createNewQuiz } from "@/actions/quizes/create-quiz";
import CreateNewQuizForm from "../CreateNewQuizForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("@/actions/quizes/create-quiz", () => ({
  createNewQuiz: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockQuiz = [
  {
    id: "test-id",
    question: "Q?",
    answer: "A",
    field_type: "multiple_choice",
    options: ["a", "b"],
  },
];

describe("CreateNewQuizForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form", () => {
    render(<CreateNewQuizForm />);
    expect(
      screen.getByRole("form", { name: "Create New Quiz" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("quiz-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("quiz-description-textarea")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Quiz" }),
    ).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty fields", async () => {
    render(<CreateNewQuizForm />);
    const submitButton = screen.getByRole("button", { name: "Create Quiz" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("Description must be at least 20 characters"),
      ).toBeInTheDocument();
    });
  });

  it("should display success message when form is submitted with valid fields", async () => {
    vi.mocked(createNewQuiz).mockResolvedValue({
      data: mockQuiz,
    });

    render(<CreateNewQuizForm />);

    const title = "Test Quiz";
    const description = "Test Description" + "x".repeat(20);

    const titleInput = screen.getByTestId("quiz-title-input");
    const descriptionTextarea = screen.getByTestId("quiz-description-textarea");
    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(descriptionTextarea, {
      target: { value: description },
    });
    const submitButton = screen.getByRole("button", { name: "Create Quiz" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createNewQuiz).toHaveBeenCalledTimes(1);
    });
    expect(createNewQuiz).toHaveBeenCalledWith({ title, description });

    const firstReturn = vi.mocked(createNewQuiz).mock.results[0].value;
    await expect(firstReturn).resolves.toEqual({ data: mockQuiz });
    expect(
      screen.queryByTestId("create-new-quiz-form-error"),
    ).not.toBeInTheDocument();
  });
});
