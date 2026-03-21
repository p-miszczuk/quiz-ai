import Link from "next/link";
import Dropdown from "./Dropdown";

export default function AuthenticatedNav() {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard"
        className="text-lg cursor-pointer hover:text-gray-700"
      >
        Dashboard
      </Link>{" "}
      <span className="text-gray-500 text-lg">|</span>
      <Link
        href="/create-new-quiz"
        className="text-lg cursor-pointer hover:text-gray-700"
      >
        New Quiz
      </Link>
      <span className="text-gray-500 text-lg">|</span>
      <Dropdown />
    </div>
  );
}
