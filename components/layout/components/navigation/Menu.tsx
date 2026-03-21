import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <>
      <div className="hidden md:flex gap-2">
        <Link
          href="/dashboard"
          className="text-lg cursor-pointer hover:text-gray-700"
        >
          Dashboard
        </Link>
        <span className="text-gray-500 text-lg">|</span>
        <Link
          href="/create-new-quiz"
          className="text-lg cursor-pointer hover:text-gray-700"
        >
          New Quiz
        </Link>
        <span className="text-gray-500 text-lg">|</span>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-2">
            <MenuIcon
              className="w-6 h-6 cursor-pointer hover:text-gray-700"
              role="button"
              data-testid="menu-icon"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3">
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3">
              <Link href="/create-new-quiz">New Quiz</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
