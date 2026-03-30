import { PageHeader } from "@/components/layout/PageHeader";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Settings"
        description="Manage your account, privacy, and preferences"
      />
      {children}
    </div>
  );
}
