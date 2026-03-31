import { loginSchema } from "@/validators/auth";
import { login } from "../login";
import { signIn } from "@/services/auth";
import { redirect } from "next/navigation";
import { getTreeifyErrorMessage } from "@/components/utils";

jest.mock("@/services/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/validators/auth", () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/components/utils", () => ({
  getTreeifyErrorMessage: jest.fn(),
}));

const mockedData = {
  email: "test@test.com",
  password: "Password123!",
};

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success when login is successful", async () => {
    jest.mocked(loginSchema.safeParse).mockReturnValue({
      success: true,
      data: {
        email: mockedData.email,
        password: mockedData.password,
      },
    });
    jest.mocked(signIn).mockResolvedValue({ success: true } as any);

    await login({
      email: "test@test.com",
      password: "Password123!",
    });

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("should return error when login fails", async () => {
    jest.mocked(loginSchema.safeParse).mockReturnValue({
      success: true,
      data: {
        email: mockedData.email,
        password: mockedData.password,
      },
    });
    jest.mocked(signIn).mockResolvedValue({
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
    jest.mocked(loginSchema.safeParse).mockReturnValue({
      success: false,
      error: { message: "Invalid data" },
    } as any);

    jest.mocked(getTreeifyErrorMessage).mockReturnValue("Validation failed");

    const result = await login({
      email: mockedData.email,
      password: "",
    });

    expect(result).toEqual({ error: "Validation failed" });
  });
});
