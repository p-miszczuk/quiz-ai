import { registerSchema } from "@/validators/auth";
import { register } from "../register";
import { createUser } from "@/services/auth";
import { redirect } from "next/navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/services/auth", () => ({
  createUser: vi.fn(),
}));

vi.mock("@/validators/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/validators/auth")>();
  return {
    ...actual,
    registerSchema: {
      safeParse: vi.fn(),
    },
    setTreeifyError: vi.fn(),
  };
});

describe("register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockData = {
    email: "test@test.com",
    password: "12345678",
    confirmPassword: "12345678",
    name: "John",
  };

  it("should return validation error when schema validation fails", async () => {
    const mockError = { message: "Invalid data" };
    vi.mocked(registerSchema.safeParse).mockReturnValue({
      success: false,
      error: mockError,
    } as never);

    const result = await register(mockData);
    expect(result).toEqual({ error: "Validation failed" });
  });

  it("should redirect to dashboard if user is created successfully", async () => {
    (registerSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    } as never);

    (createUser as jest.Mock).mockResolvedValue({
      success: true,
      data: { user: { id: "123" } },
    });

    await register(mockData);
    expect(createUser).toHaveBeenCalledWith(mockData);
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("should return error if user creation fails", async () => {
    (registerSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    } as never);

    (createUser as jest.Mock).mockResolvedValue({
      success: false,
      error: { type: "better-auth-error", error: "User creation failed" },
    });

    const result = await register(mockData);
    expect(result).toEqual({ error: "User creation failed" });
  });
});
