interface WrapperProps {
  children: React.ReactNode;
  error?: string | null;
  noData?: boolean;
  noDataMessage?: string;
}

type ContentWrapperProps = Readonly<WrapperProps>;

export default function ContentWrapper({
  children,
  error,
  noData,
  noDataMessage,
}: ContentWrapperProps) {
  return (
    <div className="w-full">
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
