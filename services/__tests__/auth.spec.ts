import { auth } from "@/lib/auth";
import { createUser, signIn, signOut } from "../auth";

jest.mock("next/headers", () => ({
  headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      signUpEmail: jest.fn(),
      signInEmail: jest.fn(),
      signOut: jest.fn(),
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

describe("signIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if all fields are not provided", async () => {
    const result = await signIn({
      email: "",
      password: "",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "All fields are required" },
    });
  });

  it("should return success response if all fields are provided", async () => {
    jest.mocked(auth.api.signInEmail).mockResolvedValue({
      user: { id: "123" },
    } as never);

    const result = await signIn({
      email: "test@test.com",
      password: "Password123!",
    });

    expect(result).toEqual({
      data: {
        user: { id: "123" },
      },
      error: null,
    });
  });

  it("should return an error if the email is invalid", async () => {
    jest.mocked(auth.api.signInEmail).mockRejectedValue({
      message: "Invalid email or password",
    } as never);

    const result = await signIn({
      email: "invalid-email@test.com",
      password: "Password123!",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "Invalid email or password" },
    });
  });

  it("should return an error if an unknown error occurs", async () => {
    jest.mocked(auth.api.signInEmail).mockRejectedValue("unknown error");

    const result = await signIn({
      email: "test@test.com",
      password: "Password123!",
    });

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "Unknown error" },
    });
  });
});

describe("signOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if an unknown error occurs", async () => {
    jest.mocked(auth.api.signOut).mockRejectedValue("unknown error");

    const result = await signOut();

    expect(result).toEqual({
      data: null,
      error: { errorMessage: "Unknown error" },
    });
  });

  it("should return undefined if the sign out is successful", async () => {
    jest.mocked(auth.api.signOut).mockResolvedValue({
      user: { id: "123" },
    } as never);

    const result = await signOut();

    expect(result).toBeUndefined();
  });
});
