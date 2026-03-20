import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const RouteLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          {/* TODO: add a skeleton loading */}
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default RouteLoadingWrapper;
