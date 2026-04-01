import ChangePasswordForm from "@/components/authorized/ChangePasswordForm";
import DeleteAccountForm from "@/components/authorized/DeleteAccountForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { verifySuccess } from "@/lib/query";
import { getUserSettings } from "@/services/settings";

export default async function SettingsPage() {
  verifySuccess(await getUserSettings());

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
          <ChangePasswordForm />
        </TabsContent>
        <TabsContent value="remove-account">
          <DeleteAccountForm />
        </TabsContent>
      </Tabs>
    </section>
  );
}
