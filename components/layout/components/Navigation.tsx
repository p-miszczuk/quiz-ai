"use client";

import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { signOut } from "@/services/auth";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";

interface NavigationProps {
  user: User | null;
}

const PATHS_TO_HIDE_AUTH_BUTTONS = ["/login", "/register"];

export default function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogout = async () => {
    const result = await signOut();
    if (!result?.error) {
      router.push("/");
    }
  };

  const isAuthFormPath = PATHS_TO_HIDE_AUTH_BUTTONS.includes(pathname);
  const isAuthenticatedUser = !!user?.id;
  const displayAuthButtons = !isAuthFormPath && !isAuthenticatedUser;

  return (
    <nav className="flex gap-4">
      {displayAuthButtons ? (
        <>
          <Button
            onClick={handleLogin}
            className={buttonVariants({
              variant: "link",
              size: "sm",
              className:
                "text-white font-medium hover:text-gray-300 cursor-pointer hover:no-underline ",
            })}
            data-testid="nav-login-button"
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
            data-testid="nav-register-button"
          >
            Register
          </Button>
        </>
      ) : (
        <div>
          <Button
            onClick={handleLogout}
            className={buttonVariants({
              size: "sm",
              className:
                "text-white font-medium hover:text-gray-300 cursor-pointer hover:no-underline",
            })}
            data-testid="nav-logout-button"
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
