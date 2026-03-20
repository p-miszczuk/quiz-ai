import Link from "next/link";
import NavigationWrapper from "./components/NavigationWrapper";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 w-full">
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-700">Quiz</span>
        <span className="text-gray-400">AI</span>
      </Link>
      <NavigationWrapper />
    </header>
  );
}
