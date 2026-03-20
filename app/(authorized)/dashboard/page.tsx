import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/login");
  }
  return <div>Dashboard</div>;
}
