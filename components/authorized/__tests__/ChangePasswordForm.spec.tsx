import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CHANGE_PASSWORD_ERRORS, REGISTER_ERRORS } from "@/validators/auth";
import { changePassword } from "@/actions/auth/change-password";
import ChangePasswordForm from "../ChangePasswordForm";

vi.mock("@/actions/auth/change-password", () => ({
  changePassword: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/validators/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/validators/auth")>();
  return {
    ...actual,
  };
});

describe("ChangePasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the change password form", () => {
    render(<ChangePasswordForm />);
    expect(
      screen.getByRole("form", { name: "Change Password" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Current Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^Confirm New Password$/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Change Password" }),
    ).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty fields", async () => {
    render(<ChangePasswordForm />);

    fireEvent.submit(screen.getByRole("form", { name: "Change Password" }));

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
    vi.mocked(changePassword).mockResolvedValue({
      error: "Password not changed",
    } as any);

    render(<ChangePasswordForm />);
    const currentPasswordInput = screen.getByLabelText(/^Current Password$/i);
    const newPasswordInput = screen.getByLabelText(/^Password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^Confirm New Password$/i,
    );

    fireEvent.change(currentPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(newPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "Test123!" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Change Password" }));

    await waitFor(() => {
      expect(screen.getByText("Password not changed")).toBeInTheDocument();
    });
  });

  it("should display success message when password is changed successfully", async () => {
    vi.mocked(changePassword).mockResolvedValue({ success: true } as any);
    render(<ChangePasswordForm />);
    const currentPasswordInput = screen.getByLabelText(/^Current Password$/i);
    const newPasswordInput = screen.getByLabelText(/^Password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^Confirm New Password$/i,
    );

    fireEvent.change(currentPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(newPasswordInput, { target: { value: "Test123!" } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "Test123!" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Change Password" }));

    await waitFor(() => {
      expect(
        screen.getByText("Password changed successfully"),
      ).toBeInTheDocument();
    });
  });
});
