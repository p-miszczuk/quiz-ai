import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] md:w-[400px] h-[calc(100vh-125px)]">
      <RegisterForm />
    </div>
  );
}
