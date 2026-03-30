import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { verifySuccess } from "@/lib/query";
import { getUserSettings } from "@/services/settings";

export default async function SettingsPage() {
  const user = verifySuccess(await getUserSettings());

  console.log("user", user);

  return (
    <section>
      <Tabs defaultValue="account">
        <TabsList className="w w-md">
          <TabsTrigger value="change-password" className="cursor-pointer">
            Change Password
          </TabsTrigger>
          <TabsTrigger value="remove-account" className="cursor-pointer">
            Remove Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="change-password">
          <div>Change Password</div>
        </TabsContent>
        <TabsContent value="remove-account">
          <div>Remove Account</div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
