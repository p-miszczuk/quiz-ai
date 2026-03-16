import { InputField } from "../ui/fields/input-field";
import { Button } from "../ui/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/shadcn/card";

export default function LoginForm() {
  return (
    <Card className="w-full">
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
            placeholder="Enter an email address"
            label="Email"
          />
          <InputField
            id="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <Button size="lg" type="submit">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
