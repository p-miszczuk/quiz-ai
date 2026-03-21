"use client";

import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { usePathname, useRouter } from "next/navigation";

const PATHS_TO_HIDE_AUTH_BUTTONS = ["/login", "/register"];

export default function UnauthenticatedNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const isAuthFormPath = PATHS_TO_HIDE_AUTH_BUTTONS.includes(pathname);

  if (isAuthFormPath) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleLogin}
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className:
            "text-white font-medium hover:text-gray-300 cursor-pointer hover:no-underline",
        })}
      >
        Login
      </Button>
      <Button
        onClick={handleRegister}
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className:
            "text-white font-medium hover:text-gray-300 cursor-pointer hover:no-underline",
        })}
      >
        Register
      </Button>
    </div>
  );
}
