import { fireEvent, render, screen } from "@testing-library/react";
import RedirectForm from "../RedirectForm";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("RedirectForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the redirect form", () => {
    render(
      <RedirectForm
        isModal={false}
        label="Register"
        redirectPath="register"
        text="Don't have an account?"
      />,
    );
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByTestId("redirect-link")).toBeInTheDocument();
  });

  it("should render button when isModal is true", () => {
    render(
      <RedirectForm
        isModal={true}
        label="Login"
        redirectPath="login"
        text="Already have an account?"
      />,
    );
    expect(screen.getByTestId("redirect-button")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("user can click on redirect button and be redirected to the redirect path", () => {
    render(
      <RedirectForm
        isModal
        label="Login"
        redirectPath="login"
        text="Already have an account?"
      />,
    );
    const redirectButton = screen.getByTestId("redirect-button");
    fireEvent.click(redirectButton);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("user can click on redirect link and be redirected to the redirect path", () => {
    render(
      <RedirectForm
        isModal={false}
        label="Register"
        redirectPath="register"
        text="Don't have an account?"
      />,
    );
    const redirectLink = screen.getByTestId("redirect-link");
    expect(redirectLink).toHaveAttribute("href", "/register");
    fireEvent.click(redirectLink);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
