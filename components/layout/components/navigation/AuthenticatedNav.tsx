import Settings from "./Settings";
import HamburgerMenu from "./HamburgerMenu";

export default function AuthenticatedNav() {
  return (
    <div className="flex items-center gap-2">
      <HamburgerMenu />
      <Settings />
    </div>
  );
}
