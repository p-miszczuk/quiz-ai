import { auth } from "@/lib/auth";
import {
  setNewPassword,
  createUser,
  signIn,
  signOut,
  deleteUser,
} from "../auth";

jest.mock("next/headers", () => ({
  headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      signUpEmail: jest.fn(),
      signInEmail: jest.fn(),
      signOut: jest.fn(),
      changePassword: jest.fn(),
      deleteUser: jest.fn(),
    },
  },
}));

describe("createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if all fields are not provided in sign up", async () => {
    const result = await createUser({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "All fields are required",
      },
    });
  });

  it("should return success response if all fields are provided in sign up", async () => {
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
      success: true,
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
      success: false,
      error: {
        type: "better-auth-error",
        error: "User already exists. Use another email.",
      },
    });
  });

  it("should return an error if an unknown error occurs after sign up", async () => {
    jest.mocked(auth.api.signUpEmail).mockRejectedValue("unknown error");

    const result = await createUser({
      email: "test@test.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "unknown-error",
        error: "unknown error",
      },
    });
  });
});

describe("signIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if all fields are not provided in sign in", async () => {
    const result = await signIn({
      email: "",
      password: "",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "All fields are required",
      },
    });
  });

  it("should return success response if all fields are provided in sign in", async () => {
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
      success: true,
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
      success: false,
      error: {
        type: "better-auth-error",
        error: "Invalid email or password",
      },
    });
  });

  it("should return an error if an unknown error occurs after sign in", async () => {
    jest.mocked(auth.api.signInEmail).mockRejectedValue("unknown error");

    const result = await signIn({
      email: "test@test.com",
      password: "Password123!",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "unknown-error",
        error: "unknown error",
      },
    });
  });
});

describe("signOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if an unknown error occurs after sign out", async () => {
    jest.mocked(auth.api.signOut).mockRejectedValue("unknown error");

    const result = await signOut();

    expect(result).toEqual({
      success: false,
      error: {
        type: "unknown-error",
        error: "unknown error",
      },
    });
  });
});

describe("setNewPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if all fields are not provided in change password", async () => {
    const result = await setNewPassword({
      currentPassword: "",
      newPassword: "Password123!",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "All fields are required",
      },
    });
  });

  it("should return error if password hasn't been changed", async () => {
    jest.mocked(auth.api.changePassword).mockRejectedValue({
      message: "Password not changed",
    } as never);

    const result = await setNewPassword({
      currentPassword: "Password123!",
      newPassword: "Password123!1",
    });

    expect(result).toEqual({
      success: false,
      error: { type: "better-auth-error", error: "Password not changed" },
    });
  });

  it("should return success if password has been changed", async () => {
    jest.mocked(auth.api.changePassword).mockResolvedValue({
      success: true,
    } as never);

    const result = await setNewPassword({
      currentPassword: "Password123!",
      newPassword: "Password123!",
    });

    expect(result).toEqual({ success: true, data: { success: true } });
  });
});

describe("deleteUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if password filed is not provided in delete user", async () => {
    const result = await deleteUser({
      currentPassword: "",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "validation-error",
        error: "Password is required",
      },
    });
  });

  it("should return an error if an unknown error occurs after delete user", async () => {
    jest.mocked(auth.api.deleteUser).mockRejectedValue("Delete user failed");

    const result = await deleteUser({
      currentPassword: "Password123!",
    });

    expect(result).toEqual({
      success: false,
      error: {
        type: "unknown-error",
        error: "Delete user failed",
      },
    });
  });

  it("should return success if delete user succeeds", async () => {
    jest.mocked(auth.api.deleteUser).mockResolvedValue({
      success: true,
    } as never);

    const result = await deleteUser({
      currentPassword: "Password123!",
    });

    expect(result).toEqual({ success: true, data: { success: true } });
  });
});
