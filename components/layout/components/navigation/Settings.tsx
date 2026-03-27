"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu";
import { signOut } from "@/services/auth";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const handleSettings = () => {
    router.push("/settings");
  };

  const handleLogout = async () => {
    const result = await signOut();
    if (result?.success) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SettingsIcon
          className="w-6 h-6 cursor-pointer hover:text-gray-700"
          data-testid="settings-button"
          role="button"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          role="button"
          onClick={handleSettings}
          className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3"
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          role="button"
          onClick={handleLogout}
          className="cursor-pointer hover:bg-transparent hover:text-primary font-medium justify-center py-3"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
