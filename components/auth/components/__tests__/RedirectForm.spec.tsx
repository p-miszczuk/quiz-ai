import { render, screen } from "@testing-library/react";
import RedirectForm from "../RedirectForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe("RedirectForm", () => {
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
});
