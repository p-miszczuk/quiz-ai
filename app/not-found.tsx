"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-50 w-full">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Oops! Page not found</h1>
        <p className="text-gray-500 mb-6 text-center">
          The page you are looking for does not exist.
          <br />
          You can return to the homepage.
        </p>
        <Button onClick={() => router.push("/")} size="lg">
          Go Home
        </Button>
      </div>
    </div>
  );
}
