import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CHANGE_PASSWORD_ERRORS, REGISTER_ERRORS } from "@/validators/auth";
import { changePassword } from "@/actions/auth/change-password";
import ChangePasswordForm from "../ChangePasswordForm";

jest.mock("@/actions/auth/change-password", () => ({
  changePassword: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/validators/auth", () => {
  const actual =
    jest.requireActual<typeof import("@/validators/auth")>("@/validators/auth");
  return {
    ...actual,
  };
});

describe("ChangePasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the change password form", () => {
    render(<ChangePasswordForm />);
    expect(screen.getByTestId("change-password-form")).toBeInTheDocument();
    expect(screen.getByTestId("current-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("new-password-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("confirm-new-password-input"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Change Password" }),
    ).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty fields", async () => {
    render(<ChangePasswordForm />);

    fireEvent.submit(screen.getByTestId("change-password-form"));

    await waitFor(() => {
      expect(
        screen.getByText(CHANGE_PASSWORD_ERRORS.currentPassword),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(REGISTER_ERRORS.password)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(REGISTER_ERRORS.matchPasswords),
      ).toBeInTheDocument();
    });
  });

  it("should display error if password hasn't been changed", async () => {
    jest.mocked(changePassword).mockResolvedValue({
      error: "Password not changed",
    } as any);

    render(<ChangePasswordForm />);
    const currentPasswordInput = screen.getByTestId("current-password-input");
    const newPasswordInput = screen.getByTestId("new-password-input");
    const confirmNewPasswordInput = screen.getByTestId(
      "confirm-new-password-input",
    );

    fireEvent.change(currentPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(newPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "Test123!" },
    });
    fireEvent.submit(screen.getByTestId("change-password-form"));

    await waitFor(() => {
      expect(screen.getByText("Password not changed")).toBeInTheDocument();
    });
  });

  it("should display success message when password is changed successfully", async () => {
    jest.mocked(changePassword).mockResolvedValue({ success: true } as any);
    render(<ChangePasswordForm />);
    const currentPasswordInput = screen.getByTestId("current-password-input");
    const newPasswordInput = screen.getByTestId("new-password-input");
    const confirmNewPasswordInput = screen.getByTestId(
      "confirm-new-password-input",
    );

    fireEvent.change(currentPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(newPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "Test123!" },
    });
    fireEvent.submit(screen.getByTestId("change-password-form"));

    await waitFor(() => {
      expect(
        screen.getByText("Password changed successfully"),
      ).toBeInTheDocument();
    });
  });
});
