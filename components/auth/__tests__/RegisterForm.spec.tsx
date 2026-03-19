import { act, fireEvent, render, screen } from "@testing-library/react";
import { register } from "@/actions/auth/register";
import { REGISTER_ERRORS } from "@/validators/auth";
import RegisterForm from "../RegisterForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("@/actions/auth/register", () => ({
  register: jest.fn().mockResolvedValue({ error: null }),
}));

interface FillInputs {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

const fillInputs = async ({
  email = "test@test.com",
  password = "Password123!",
  confirmPassword = "Password123!",
  name = "John Doe",
}: FillInputs) => {
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");
  const confirmPasswordInput = screen.getByTestId("confirm-password-input");
  const nameInput = screen.getByTestId("name-input");

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });
    fireEvent.change(nameInput, { target: { value: name } });
  });

  return { emailInput, passwordInput, confirmPasswordInput, nameInput };
};

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the register form", () => {
    render(<RegisterForm isModal={false} />);
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("redirect-link")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" }),
    ).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty fields", async () => {
    render(<RegisterForm isModal={false} />);
    const registerForm = screen.getByTestId("register-form");
    await act(async () => {
      fireEvent.submit(registerForm);
    });
    expect(screen.getByText(REGISTER_ERRORS.email)).toBeInTheDocument();
    expect(screen.getByText(REGISTER_ERRORS.password)).toBeInTheDocument();
    expect(
      screen.getByText(REGISTER_ERRORS.matchPasswords),
    ).toBeInTheDocument();
    expect(screen.getByText(REGISTER_ERRORS.name)).toBeInTheDocument();
  });

  it("should display error message if one of the fields is invalid", async () => {
    render(<RegisterForm isModal={false} />);
    const registerForm = screen.getByTestId("register-form");
    const { emailInput, passwordInput, confirmPasswordInput } =
      await fillInputs({ name: "" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(screen.getByText(REGISTER_ERRORS.name)).toBeInTheDocument();

    await fillInputs({ confirmPassword: "" });

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(
      screen.getByText(REGISTER_ERRORS.matchPasswords),
    ).toBeInTheDocument();

    await fillInputs({ password: "" });

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(screen.getByText(REGISTER_ERRORS.password)).toBeInTheDocument();

    await fillInputs({ email: "" });

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(screen.getByText(REGISTER_ERRORS.email)).toBeInTheDocument();
  });

  it("user can submit the register form", async () => {
    render(<RegisterForm isModal={false} />);
    const registerForm = screen.getByTestId("register-form");
    await fillInputs({});

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(register).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
    });
  });

  it("should display error message if the email is already in use", async () => {
    const errorMessage = "User already exists. Use another email.";
    render(<RegisterForm isModal={false} />);
    const registerForm = screen.getByTestId("register-form");
    await fillInputs({});

    (register as jest.Mock).mockResolvedValueOnce({
      error: { errorMessage },
    });

    await act(async () => {
      fireEvent.submit(registerForm);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
