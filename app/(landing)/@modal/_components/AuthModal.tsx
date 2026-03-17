"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded w-full max-w-md relative">
        <XIcon
          className="absolute top-2 right-2 cursor-pointer hover:text-gray-500 hover:scale-110 transition-all duration-300"
          size={20}
          role="button"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>
  );
}
