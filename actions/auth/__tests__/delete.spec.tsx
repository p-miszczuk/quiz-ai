import { deleteUserSchema, REMOVE_ACCOUNT_ERRORS } from "@/validators/auth";
import { deleteUserAccount } from "../delete";
import { getTreeifyErrorMessage } from "@/lib/utils";
import { deleteUser } from "@/services/auth";

vi.mock("@/services/auth", () => ({
  deleteUser: vi.fn(),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    getTreeifyErrorMessage: vi.fn(),
  };
});

vi.mock("@/validators/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/validators/auth")>();

  return {
    ...actual,
    deleteUserSchema: {
      safeParse: vi.fn(),
    },
  };
});

describe("deleteUserAccount", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return error when schema validation fails", async () => {
    vi.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: false,
      error: { message: REMOVE_ACCOUNT_ERRORS.currentPassword },
    } as never);
    vi.mocked(getTreeifyErrorMessage).mockReturnValue(
      REMOVE_ACCOUNT_ERRORS.currentPassword,
    );

    const result = await deleteUserAccount({ currentPassword: "" });
    expect(result).toEqual({ error: REMOVE_ACCOUNT_ERRORS.currentPassword });
  });

  it("should return error when deleteUser fails", async () => {
    vi.mocked(deleteUser).mockResolvedValue({
      success: false,
      error: { type: "better-auth-error", error: "Delete user failed" },
    } as any);

    vi.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: true,
    } as never);

    const result = await deleteUserAccount({
      currentPassword: "Password123!",
    });
    expect(result).toEqual({ error: "Delete user failed" });
  });

  it("should return success when deleteUser succeeds", async () => {
    vi.mocked(deleteUser).mockResolvedValue({ success: true } as any);

    vi.mocked(deleteUserSchema.safeParse).mockReturnValue({
      success: true,
    } as never);

    const result = await deleteUserAccount({ currentPassword: "Password123!" });
    expect(result).toEqual({ success: true });
  });
});
