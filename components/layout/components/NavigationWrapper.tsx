import { getCurrentUser } from "@/lib/auth";
import Navigation from "./Navigation";

export default async function NavigationWrapper() {
  const user = await getCurrentUser();

  return <Navigation user={user} />;
}
