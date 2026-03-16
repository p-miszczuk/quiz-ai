import { Separator } from "../ui/shadcn/separator";

export default function Footer() {
  return (
    <div className="md:container mx-auto px-4">
      <Separator />
      <footer className="py-4">
        <p className=" text-sm text-center text-gray-500">
          Copyright 2026 Quiz App
        </p>
      </footer>
    </div>
  );
}
