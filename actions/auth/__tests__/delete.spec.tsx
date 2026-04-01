import { deleteUserSchema, REMOVE_ACCOUNT_ERRORS } from "@/validators/auth";
import { deleteUserAccount } from "../delete";
import { getTreeifyErrorMessage } from "@/components/utils";
import { deleteUser } from "@/services/auth";

jest.mock("@/services/auth", () => ({
  deleteUser: jest.fn(),
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
    deleteUserSchema: {
      safeParse: jest.fn(),
    },
  };
});

describe("deleteUserAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error when schema validation fails", async () => {
    jest.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: false,
      error: { message: REMOVE_ACCOUNT_ERRORS.currentPassword },
    } as never);
    jest
      .mocked(getTreeifyErrorMessage)
      .mockReturnValue(REMOVE_ACCOUNT_ERRORS.currentPassword);

    const result = await deleteUserAccount({ currentPassword: "" });
    expect(result).toEqual({ error: REMOVE_ACCOUNT_ERRORS.currentPassword });
  });

  it("should return error when deleteUser fails", async () => {
    jest.mocked(deleteUser).mockResolvedValue({
      success: false,
      error: { type: "better-auth-error", error: "Delete user failed" },
    } as any);

    jest.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: true,
    } as never);

    const result = await deleteUserAccount({
      currentPassword: "Password123!",
    });
    expect(result).toEqual({ error: "Delete user failed" });
  });

  it("should return success when deleteUser succeeds", async () => {
    jest.mocked(deleteUser).mockResolvedValue({ success: true } as any);

    jest.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: true,
    } as never);

    const result = await deleteUserAccount({ currentPassword: "Password123!" });
    expect(result).toEqual({ success: true });
  });
});
