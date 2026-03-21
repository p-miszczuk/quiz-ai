import { getCurrentUser } from "@/lib/auth";
import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnauthenticatedNav";

export default async function NavigationWrapper() {
  const user = await getCurrentUser();

  return (
    <nav className="flex gap-4">
      {user?.id ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </nav>
  );
}
