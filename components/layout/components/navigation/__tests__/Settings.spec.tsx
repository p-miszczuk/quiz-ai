import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dropdown from "../Settings";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/auth", () => ({
  signOut: jest.fn().mockResolvedValue({ success: true }),
}));

describe("Dropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Dropdown component", () => {
    render(<Dropdown />);
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  it("should open dropdown menu when settings button is clicked", () => {
    render(<Dropdown />);
    const settingsButton = screen.getByTestId("settings-button");
    fireEvent.click(settingsButton);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should redirect to /settings when settings button is clicked", async () => {
    render(<Dropdown />);
    const settingsButton = screen.getByTestId("settings-button");
    fireEvent.click(settingsButton);
    const settingsMenuItem = screen.getByText("Settings");
    fireEvent.click(settingsMenuItem);
    expect(mockPush).toHaveBeenCalledWith("/settings");
  });

  it("should redirect to / when logout button is clicked", async () => {
    render(<Dropdown />);
    const settingsButton = screen.getByTestId("settings-button");
    fireEvent.click(settingsButton);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
