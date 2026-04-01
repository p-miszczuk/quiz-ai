import { setNewPassword } from "@/services/auth";
import { changePassword } from "../change-password";
import { changePasswordSchema } from "@/validators/auth";
import { getTreeifyErrorMessage } from "@/components/utils";

jest.mock("@/services/auth", () => ({
  setNewPassword: jest.fn(),
}));

jest.mock("@/components/utils", () => {
  const actual =
    jest.requireActual<typeof import("@/components/utils")>(
      "@/components/utils",
    );
  return {
    ...actual,
    getTreeifyErrorMessage: jest.fn(),
  };
});

jest.mock("@/validators/auth", () => {
  const actual =
    jest.requireActual<typeof import("@/validators/auth")>("@/validators/auth");
  return {
    ...actual,
    changePasswordSchema: {
      safeParse: jest.fn(),
    },
  };
});

describe("changePassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success when password is changed successfully", async () => {
    const currentPassword = "Test123!";
    const newPassword = "Test123!";
    const confirmNewPassword = "Test123!";

    jest.mocked(setNewPassword).mockResolvedValue({ success: true } as any);

    const result = await changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    expect(result).toEqual({ success: true });
  });

  it("should return error when password is not changed successfully", async () => {
    const currentPassword = "Test123!";
    const newPassword = "Test123!";
    const confirmNewPassword = "Test123!";

    jest.mocked(setNewPassword).mockResolvedValue({
      success: false,
      error: { type: "better-auth-error", error: "Password not changed" },
    } as any);

    const result = await changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    expect(result).toEqual({ error: "Password not changed" });
  });

  it("should return error when schema validation fails", async () => {
    jest.mocked(changePasswordSchema.safeParse).mockReturnValue({
      success: false,
      error: { message: "Invalid data" },
    } as any);

    jest.mocked(getTreeifyErrorMessage).mockReturnValue("Validation failed");
    const result = await changePassword({
      currentPassword: "Test123!",
      newPassword: "Test12!",
      confirmNewPassword: "Test123!",
    });
    expect(result).toEqual({ error: "Validation failed" });
  });
});
