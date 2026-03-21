import { fireEvent, render, screen } from "@testing-library/react";
import UnauthenticatedNav from "../UnauthenticatedNav";

const mockUsePathname = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("UnauthenticatedNav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("/");
  });

  it("should render the UnauthenticatedNav component", () => {
    render(<UnauthenticatedNav />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should not render auth buttons on /login", () => {
    mockUsePathname.mockReturnValue("/login");

    render(<UnauthenticatedNav />);

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });

  it("should not render auth buttons on /register", () => {
    mockUsePathname.mockReturnValue("/register");

    render(<UnauthenticatedNav />);

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });

  it("should redirect to /login when login button is clicked", () => {
    render(<UnauthenticatedNav />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should redirect to /register when register button is clicked", () => {
    render(<UnauthenticatedNav />);
    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});
