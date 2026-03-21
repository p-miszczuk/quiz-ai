import Dropdown from "./Settings";
import Menu from "./Menu";

export default function AuthenticatedNav() {
  return (
    <div className="flex items-center gap-2">
      <Menu />
      <Dropdown />
    </div>
  );
}
