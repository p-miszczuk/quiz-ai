import LoginForm from "@/components/auth/LoginForm";
import AuthModal from "../_components/AuthModal";

export default function LoginModalPage() {
  return (
    <AuthModal>
      <LoginForm isModal />
    </AuthModal>
  );
}
