import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dropdown from "../Settings";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/services/auth", () => ({
  signOut: vi.fn().mockResolvedValue({ success: true }),
}));

describe("Dropdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Dropdown component", () => {
    render(<Dropdown />);
    expect(
      screen.getByRole("button", { name: "Settings Button" }),
    ).toBeInTheDocument();
  });

  it("should open dropdown menu when settings button is clicked", () => {
    render(<Dropdown />);
    const settingsButton = screen.getByRole("button", {
      name: "Settings Button",
    });
    fireEvent.click(settingsButton);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should redirect to /settings when settings button is clicked", async () => {
    render(<Dropdown />);
    const settingsButton = screen.getByRole("button", {
      name: "Settings Button",
    });
    fireEvent.click(settingsButton);
    const settingsMenuItem = screen.getByText("Settings");
    fireEvent.click(settingsMenuItem);
    expect(mockPush).toHaveBeenCalledWith("/settings");
  });

  it("should redirect to / when logout button is clicked", async () => {
    render(<Dropdown />);
    const settingsButton = screen.getByRole("button", {
      name: "Settings Button",
    });
    fireEvent.click(settingsButton);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
