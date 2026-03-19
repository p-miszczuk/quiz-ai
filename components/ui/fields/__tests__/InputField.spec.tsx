import { render, screen } from "@testing-library/react";
import { InputField } from "../InputField";

describe("InputField", () => {
  it("should render the input field", () => {
    render(
      <InputField
        id="email"
        type="email"
        placeholder="Enter your email"
        label="Email"
      />,
    );
    expect(screen.getByTestId("email-label")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("should render the input field with a description", () => {
    const description = "Enter your email to login to your account";
    render(
      <InputField
        id="email"
        type="email"
        placeholder="Enter your email"
        label="Email"
        description={description}
      />,
    );
    expect(screen.getByTestId("email-description")).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render the input field with an error message", () => {
    const errorMessage = "Invalid email address";
    render(
      <InputField
        id="email"
        type="email"
        placeholder="Enter your email"
        label="Email"
        errorMessage={errorMessage}
      />,
    );
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
