"use client";

import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <nav className="flex gap-4">
      <Button
        onClick={handleLogin}
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className:
            "text-white font-medium hover:text-gray-300 cursor-pointer hover:no-underline ",
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
    </nav>
  );
}
