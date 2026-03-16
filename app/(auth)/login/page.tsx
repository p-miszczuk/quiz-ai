import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] md:w-[400px] h-[calc(100vh-125px)]">
      <LoginForm />
    </div>
  );
}
