
import { Loader } from "lucide-react";

interface LoadingProps {
  size?: number;
  className?: string;
  text?: string;
}

export const Loading = ({ size = 24, className = "", text }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <Loader size={size} className={`animate-spin text-primary ${className}`} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
