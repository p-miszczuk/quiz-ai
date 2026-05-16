import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  error?: string | null;
  className?: string;
  noData?: boolean;
  noDataMessage?: string;
}

type ContentWrapperProps = Readonly<WrapperProps>;

export default function ContentWrapper({
  children,
  error,
  className = "",
  noData,
  noDataMessage,
}: ContentWrapperProps) {
  return (
    <div className={cn("w-full", className)}>
      {children}
      {!!error && <p className="text-center text-red-500">{error}</p>}
      {noData && (
        <p className="text-center text-gray-500 font-semibold text-lg">
          {noDataMessage}
        </p>
      )}
    </div>
  );
}
