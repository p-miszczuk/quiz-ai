import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { REMOVE_ACCOUNT_ERRORS } from "@/validators/auth";
import { deleteUserAccount } from "@/actions/auth/delete";
import DeleteAccountForm from "../DeleteAccountForm";

jest.mock("@/actions/auth/delete", () => ({
  deleteUserAccount: jest.fn(),
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

describe("DeleteAccountForm", () => {
  it("should render the form", () => {
    render(<DeleteAccountForm />);
    expect(screen.getByTestId("delete-account-form")).toBeInTheDocument();
    expect(screen.getByLabelText("Current Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove Account" }),
    ).toBeInTheDocument();
  });

  it("should display error messages when form is submitted with empty password field", async () => {
    render(<DeleteAccountForm />);
    fireEvent.submit(screen.getByTestId("delete-account-form"));
    expect(
      await screen.findByTestId("current-password-error"),
    ).toHaveTextContent(REMOVE_ACCOUNT_ERRORS.currentPassword);
  });

  it("should display error message if delete user account fails", async () => {
    jest.mocked(deleteUserAccount).mockResolvedValue({
      error: "Delete user account failed",
    } as any);

    render(<DeleteAccountForm />);
    fireEvent.change(screen.getByTestId("current-password-input"), {
      target: { value: "Test123!" },
    });
    fireEvent.submit(screen.getByTestId("delete-account-form"));

    expect(
      await screen.findByTestId("delete-account-form-error"),
    ).toHaveTextContent("Delete user account failed");
  });
});
