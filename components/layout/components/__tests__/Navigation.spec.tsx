import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navigation from "../Navigation";
import { UserId } from "@/types/user";
import { signOut } from "@/services/auth";

const mockPush = jest.fn();

const mockUser = {
  id: "123" as UserId,
  email: "test@test.com",
  name: "John Doe",
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

describe("Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the navigation", () => {
    render(<Navigation user={null} />);
    expect(screen.getByTestId("nav-login-button")).toBeInTheDocument();
    expect(screen.getByTestId("nav-register-button")).toBeInTheDocument();
  });

  it("should navigate to the login page when the login button is clicked", () => {
    render(<Navigation user={null} />);
    const loginButton = screen.getByTestId("nav-login-button");
    fireEvent.click(loginButton);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should navigate to the register page when the register button is clicked", () => {
    render(<Navigation user={null} />);
    const registerButton = screen.getByTestId("nav-register-button");
    fireEvent.click(registerButton);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("should render sign out button when user is authenticated", () => {
    render(<Navigation user={mockUser} />);
    expect(screen.getByTestId("nav-logout-button")).toBeInTheDocument();
  });

  it("should navigate to home when logout button is clicked", async () => {
    render(<Navigation user={mockUser} />);
    const signOutButton = screen.getByTestId("nav-logout-button");
    fireEvent.click(signOutButton);
    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
