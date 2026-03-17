import { Button } from "@/components/ui/shadcn/button";
import { useRouter } from "next/navigation";

interface RedirectFormProps {
  isModal: boolean;
  label: string;
  redirectPath: string;
  text: string;
}

export default function RedirectForm({
  isModal,
  label,
  redirectPath,
  text,
}: RedirectFormProps) {
  const router = useRouter();

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`/${redirectPath}`);
  };

  return (
    <>
      {text}&nbsp;
      {isModal ? (
        <Button
          variant="link"
          onClick={handleRedirect}
          size="sm"
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          {label}
        </Button>
      ) : (
        <a
          href={`/${redirectPath}`}
          className="text-blue-600 font-medium hover:underline"
        >
          {label}
        </a>
      )}
    </>
  );
}
