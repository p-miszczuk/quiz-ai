import { loginSchema } from "@/validators/auth";
import { login } from "../login";
import { signIn } from "@/services/auth";
import { redirect } from "next/navigation";
import { getTreeifyErrorMessage } from "@/lib/utils";

vi.mock("@/services/auth", () => ({
  signIn: vi.fn(),
}));

vi.mock("@/validators/auth", () => ({
  loginSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/utils", () => ({
  getTreeifyErrorMessage: vi.fn(),
}));

const mockedData = {
  email: "test@test.com",
  password: "Password123!",
};

describe("login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return success when login is successful", async () => {
    vi.mocked(loginSchema.safeParse).mockReturnValue({
      success: true,
      data: {
        email: mockedData.email,
        password: mockedData.password,
      },
    });
    vi.mocked(signIn).mockResolvedValue({ success: true } as any);

    await login({
      email: "test@test.com",
      password: "Password123!",
    });

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("should return error when login fails", async () => {
    vi.mocked(loginSchema.safeParse).mockReturnValue({
      success: true,
      data: {
        email: mockedData.email,
        password: mockedData.password,
      },
    });
    vi.mocked(signIn).mockResolvedValue({
      success: false,
      error: { type: "better-auth-error", error: "Login failed" },
    } as any);

    const result = await login({
      email: mockedData.email,
      password: mockedData.password,
    });
    expect(result).toEqual({ error: "Login failed" });
  });

  it("should return error when schema validation fails", async () => {
    vi.mocked(loginSchema.safeParse).mockReturnValue({
      success: false,
      error: { message: "Invalid data" },
    } as any);

    vi.mocked(getTreeifyErrorMessage).mockReturnValue("Validation failed");

    const result = await login({
      email: mockedData.email,
      password: "",
    });

    expect(result).toEqual({ error: "Validation failed" });
  });
});
