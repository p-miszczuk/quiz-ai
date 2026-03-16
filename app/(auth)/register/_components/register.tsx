import { InputField } from "@/components/ui/fields/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] md:w-[400px] h-[calc(100vh-125px)]">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <InputField
              id="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
            />
            <InputField
              id="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
            />
            <InputField
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
            />
            <InputField
              id="name"
              type="text"
              placeholder="Enter your name"
              label="Name"
            />
            <Button size="lg" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
