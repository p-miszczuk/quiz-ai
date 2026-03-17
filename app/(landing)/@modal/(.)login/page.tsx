import LoginForm from "@/components/auth/login-form";
import AuthModal from "../_components/AuthModal";

export default function LoginModalPage() {
  return (
    <AuthModal>
      <LoginForm isModal />
    </AuthModal>
  );
}
