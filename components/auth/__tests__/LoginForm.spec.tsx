import { act, fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { login } from "@/actions/auth/login";
import { LOGIN_ERRORS } from "@/validators/auth";

interface FillInputs {
  email?: string;
  password?: string;
}

const fillInputs = async ({
  email = "test@test.com",
  password = "Password123!",
}: FillInputs) => {
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
  });

  return { emailInput, passwordInput };
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/actions/auth/login", () => ({
  login: jest.fn().mockResolvedValue({ error: null }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form", () => {
    render(<LoginForm isModal />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("redirect-button")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty fields", async () => {
    render(<LoginForm isModal />);
    const loginForm = screen.getByTestId("login-form");
    await act(async () => {
      fireEvent.submit(loginForm);
    });
    expect(screen.getByText(LOGIN_ERRORS.email)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_ERRORS.password)).toBeInTheDocument();
  });

  it("should display error message if one of the fields is invalid", async () => {
    render(<LoginForm isModal />);
    const loginForm = screen.getByTestId("login-form");
    await fillInputs({ password: "" });
    await act(async () => {
      fireEvent.submit(loginForm);
    });
    expect(screen.getByText(LOGIN_ERRORS.password)).toBeInTheDocument();
  });

  it("should display error message if the email is invalid", async () => {
    const errorMessage = "Invalid email or password";
    jest.mocked(login).mockResolvedValueOnce({
      error: errorMessage,
    } as never);
    render(<LoginForm isModal />);

    const loginForm = screen.getByTestId("login-form");
    await fillInputs({
      email: "invalid-email@test.com",
      password: "Password123!",
    });
    await act(async () => {
      fireEvent.submit(loginForm);
    });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
