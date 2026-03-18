import RegisterForm from "@/components/auth/RegisterForm";
import AuthModal from "../_components/AuthModal";

export default function RegisterModalPage() {
  return (
    <AuthModal>
      <RegisterForm isModal />
    </AuthModal>
  );
}
