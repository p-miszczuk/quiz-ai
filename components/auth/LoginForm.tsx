"use client";

import { InputField } from "../ui/fields/input-field";
import { Button } from "../ui/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/shadcn/card";
import RedirectForm from "./components/RedirectForm";

export default function LoginForm({ isModal = false }: { isModal?: boolean }) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" data-testid="login-form">
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
      <CardFooter className="justify-center text-sm text-gray-500">
        <RedirectForm
          isModal={isModal}
          label="Register"
          redirectPath="register"
          text="Don't have an account?"
        />
      </CardFooter>
    </Card>
  );
}
