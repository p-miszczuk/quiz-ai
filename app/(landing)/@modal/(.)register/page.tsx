import RegisterForm from "@/components/auth/register-form";
import AuthModal from "../_components/AuthModal";

export default function RegisterModalPage() {
  return (
    <AuthModal>
      <RegisterForm isModal />
    </AuthModal>
  );
}
