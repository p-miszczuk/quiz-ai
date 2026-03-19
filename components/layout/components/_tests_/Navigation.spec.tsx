import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "../Navigation";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the navigation", () => {
    render(<Navigation />);
    expect(screen.getByTestId("nav-login-button")).toBeInTheDocument();
    expect(screen.getByTestId("nav-register-button")).toBeInTheDocument();
  });

  it("should navigate to the login page when the login button is clicked", () => {
    render(<Navigation />);
    const loginButton = screen.getByTestId("nav-login-button");
    fireEvent.click(loginButton);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should navigate to the register page when the register button is clicked", () => {
    render(<Navigation />);
    const registerButton = screen.getByTestId("nav-register-button");
    fireEvent.click(registerButton);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});
