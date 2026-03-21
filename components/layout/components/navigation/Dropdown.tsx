"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu";
import { signOut } from "@/services/auth";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dropdown() {
  const router = useRouter();
  const handleSettings = () => {
    router.push("/settings");
  };

  const handleLogout = async () => {
    const result = await signOut();
    if (result && !result.error) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings
          className="w-6 h-6 cursor-pointer hover:text-gray-700"
          data-testid="settings-button"
          role="button"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleSettings}
          className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3"
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
