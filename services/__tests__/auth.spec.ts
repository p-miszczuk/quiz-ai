import { auth } from "@/lib/auth";
import { createUser } from "../auth";

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      signUpEmail: jest.fn(),
    },
  },
}));

describe("createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if all fields are not provided", async () => {
    const result = await createUser({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "All fields are required" },
    });
  });

  it("should return success response if all fields are provided", async () => {
    jest.mocked(auth.api.signUpEmail).mockResolvedValue({
      user: { id: "123" },
    } as never);

    const result = await createUser({
      email: "test@test.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
    });

    expect(result).toEqual({
      data: {
        user: {
          id: "123",
        },
      },
      error: null,
    });
  });

  it("should return an error if the email is already in use", async () => {
    jest.mocked(auth.api.signUpEmail).mockRejectedValue({
      message: "User already exists. Use another email.",
    } as never);

    const result = await createUser({
      email: "test@test.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "User already exists. Use another email." },
    });
  });

  it("should return an error if an unknown error occurs", async () => {
    jest.mocked(auth.api.signUpEmail).mockRejectedValue("unknown error");

    const result = await createUser({
      email: "test@test.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "Unknown error" },
    });
  });
});
