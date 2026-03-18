import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form", () => {
    render(<LoginForm isModal />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("redirect-button")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  // it("user can submit the login form", () => {
  //   render(<LoginForm isModal />);
  //   const loginForm = screen.getByTestId("login-form");
  //   fireEvent.submit(loginForm);
  //   expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  // });
});
