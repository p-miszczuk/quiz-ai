import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold">
        <span className="text-blue-700">Quiz</span>
        <span className="text-gray-400">AI</span>
      </h1>
      <nav className="flex gap-4">
        <Link
          href="/login"
          className="text-gray-800 font-medium hover:text-gray-600"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-gray-800 font-medium hover:text-gray-600"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
