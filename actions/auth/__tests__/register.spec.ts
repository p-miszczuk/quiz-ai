import { registerSchema, setTreeifyError } from "@/validators/auth";
import { register } from "../register";
import { createUser } from "@/services/auth";
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/services/auth", () => ({
  createUser: jest.fn(),
}));

jest.mock("@/validators/auth", () => {
  const actual =
    jest.requireActual<typeof import("@/validators/auth")>("@/validators/auth");
  return {
    ...actual,
    registerSchema: {
      safeParse: jest.fn(),
    },
    setTreeifyError: jest.fn(),
  };
});

describe("register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    email: "test@test.com",
    password: "12345678",
    confirmPassword: "12345678",
    name: "John",
  };

  it("should return validation error when schema validation fails", async () => {
    const mockError = { message: "Invalid data" };
    jest.mocked(registerSchema.safeParse).mockReturnValue({
      success: false,
      error: mockError,
    } as never);

    jest.mocked(setTreeifyError).mockReturnValue("FORM_ERROR" as never);

    const result = await register(mockData);
    expect(result).toEqual({ error: "FORM_ERROR" });
    expect(setTreeifyError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid data" }),
    );
  });

  it("should redirect to dashboard if user is created successfully", async () => {
    (registerSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    } as never);

    (createUser as jest.Mock).mockResolvedValue({
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
      error: { errorMessage: "User creation failed" },
    });

    const result = await register(mockData);
    expect(result).toEqual({ error: { errorMessage: "User creation failed" } });
  });
});
